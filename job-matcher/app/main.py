from fastapi import FastAPI, File, UploadFile, HTTPException, APIRouter
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from app.schemas import ParsedJobPosting, JobDescriptionInput
from app.parser import parse_job_description
from typing import List, Optional 
from app.schemas import MatchResult  
from app.db import get_database
import PyPDF2
import io
from app.llm_client import JobCandidateMatcher
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

router = APIRouter()
matcher = JobCandidateMatcher()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_db():
    return await get_database()

@app.post("/create-job", response_model=ParsedJobPosting)
async def create_job(job_input: JobDescriptionInput):
    try:
        parsed_job = parse_job_description(job_input.description)

        print("PARSED JOB OBJECT:", parsed_job)
        print("PARSED JOB TYPE:", type(parsed_job))

        job_posting = parsed_job.model_copy(update={
            "title": job_input.title or parsed_job.title,
            "company": job_input.company or parsed_job.company,
            "location": job_input.location or parsed_job.location,
            "job_type": job_input.job_type or parsed_job.job_type,
            "description": job_input.description
        })

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Parsing failed: {str(e)}")

    try:
        db = await get_database()
        data_to_insert = job_posting.model_dump(by_alias=True, exclude_unset=True)
        data_to_insert.pop("_id", None)  
        result = await db.jobs.insert_one(data_to_insert)
        job_posting.id = str(result.inserted_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database insert failed: {str(e)}")

    return job_posting




@app.post("/upload-job/")
async def upload_job_pdf(file: UploadFile = File(..., description="PDF file containing job description")):
    try:
        db = await get_database()
        await db.command("ping") 
    except Exception as e:
        raise HTTPException(500, f"MongoDB connection failed: {str(e)}")

    if not file.filename.lower().endswith('.pdf'):
        return JSONResponse(
            status_code=400,
            content={"message": "Only PDF files allowed"}
        )
    
    try:
        contents = await file.read()
        pdf = PyPDF2.PdfReader(io.BytesIO(contents))
        
        if pdf.is_encrypted:
            raise HTTPException(400, "Encrypted PDFs are not supported")
            
        text = "\n".join([page.extract_text() or "" for page in pdf.pages]) 
        print(f"\n=== RAW PDF TEXT ===\n{text}\n================")   
        parsed_job = parse_job_description(text)
        clean_data = ParsedJobPosting(**parsed_job.model_dump()).model_dump()
        print(f"\n=== PARSED DATA ===\n{parsed_job.model_dump()}\n================")
        result = await db.jobs.insert_one(clean_data)
        
        return {
            "message": "Job processed", 
            "job_id": str(result.inserted_id),
            "title": parsed_job.title  # 🆕 Helpful debug info
        }
        
    except PyPDF2.errors.PdfReadError as e:
        raise HTTPException(400, f"Invalid PDF: {str(e)}")
    except Exception as e:
        raise HTTPException(500, f"Processing failed: {str(e)}")

@app.get("/jobs/", response_model=List[ParsedJobPosting])
async def list_jobs(limit: int = 100, skip: int = 0):
    try:
        db = await get_db()
        jobs = await db.jobs.find().skip(skip).limit(limit).to_list(length=limit)
        return [ParsedJobPosting.from_mongo(job) for job in jobs]
    except Exception as e:
        raise HTTPException(500, detail=f"Failed to retrieve jobs: {str(e)}")

@app.get("/match/job/{job_id}", response_model=List[MatchResult])
async def match_job_to_candidates(
    job_id: str,
    min_score: float = 0.4,
    limit: int = 10,
    location: Optional[str] = None
):
    try:
        db = await get_database()
        job = await db.jobs.find_one({"_id": ObjectId(job_id)})
        if not job:
            raise HTTPException(404, detail="Job not found")
        query = {}
        if location:
            query["location"] = {"$regex": location, "$options": "i"}
        
        candidates = await db.candidates.find(query).to_list(length=1000)
        matches = [
            match for match in (
                matcher.calculate_match(job, candidate)
                for candidate in candidates
            )
            if match["match_score"] >= min_score
        ]
        
        matches.sort(key=lambda x: x["match_score"], reverse=True)
        return matches[:limit]
        
    except Exception as e:
        raise HTTPException(500, detail=f"Matching failed: {str(e)}")

# # Keep your existing list endpoint
# @app.get("/jobs/", response_model=List[ParsedJobPosting])
# async def list_jobs():
#     db = await get_database()
#     jobs = await db.jobs.find().to_list(100)
#     return [ParsedJobPosting(**job) for job in jobs]

# @app.delete("/jobs/reset")
# async def reset_jobs():
#     db = await get_database()
#     await db.jobs.delete_many({})
#     return {"message": "Collection cleared"} 