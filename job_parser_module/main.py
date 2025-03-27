from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from job_parser import parse_job_description
from matching_engine import match_candidate

app = FastAPI()
class JobDescription(BaseModel):
    description:str

@app.post("/upload_job_description")
async def upload_job_description(job: JobDescription):
    try:
        content = parse_job_description(job.description)
        return {"parsed_job": content}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/match_candidate")
async def match_candidate(job: JobDescription, candidate: dict):
    try:
        score, details = match_candidate(candidate, job.description)
        return {"match_score": score, "details": details}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))