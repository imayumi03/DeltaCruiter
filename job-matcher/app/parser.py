# import re
# from typing import List, Optional
# from app.schemas import ParsedJobPosting

# def parse_job_description(text: str) -> ParsedJobPosting:
    
#     title_match = re.search(r"^(.+?)\s*\n\s*\n", text, re.MULTILINE)
#     title = title_match.group(1).strip() if title_match else "Unknown Position"
    
#     company_match = re.search(r"(?:at|for)\s(.+?)\s*\n", text, re.IGNORECASE)
#     company = company_match.group(1).strip() if company_match else "Unknown Company"
    
#     skills_match = re.search(r"Skills:\s*(.+?)\n", text, re.IGNORECASE)
#     skills = [s.strip().lower() for s in skills_match.group(1).split(",")] if skills_match else []
    
#     exp_match = re.search(r"Experience:\s*(.+?)\n", text, re.IGNORECASE)
#     experience = exp_match.group(1).strip() if exp_match else "Not specified"
    
#     loc_match = re.search(r"Location:\s*(.+?)\n", text, re.IGNORECASE)
#     location = loc_match.group(1).strip() if loc_match else "Remote"
   
#     qual_match = re.search(r"Qualifications:\s*([\s\S]+?)(?:\n\s*\n|\Z)", text, re.IGNORECASE)
#     qualifications = []
#     if qual_match:
#         qual_text = qual_match.group(1)
#         qualifications = [q.strip() for q in re.split(r"\n\s*[-•]", qual_text) if q.strip()]
#         return ParsedJobPosting(
#             title=title,
#             description=text,
#             company=company,
#             location=location,
#             req_skills=skills,
#             experience=experience,
#             qualifications=qualifications,
#             vid=None 
#         )
        
    
import re
from typing import List, Optional
from app.schemas import ParsedJobPosting

def parse_job_description(text: str) -> ParsedJobPosting:
    title_match = re.search(r"^(.+?)\s*\n\s*\n", text, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else "Unknown Position"
    
    company_match = re.search(r"(?:at|for)\s(.+?)\s*\n", text, re.IGNORECASE)
    company = company_match.group(1).strip() if company_match else "Unknown Company"
    
    skills_match = re.search(r"Skills:\s*(.+?)\n", text, re.IGNORECASE)
    skills = [s.strip().lower() for s in skills_match.group(1).split(",")] if skills_match else []
    
    exp_match = re.search(r"Experience:\s*(.+?)\n", text, re.IGNORECASE)
    experience = exp_match.group(1).strip() if exp_match else "Not specified"
    
    loc_match = re.search(r"Location:\s*(.+?)\n", text, re.IGNORECASE)
    location = loc_match.group(1).strip() if loc_match else "Remote"
   
    qual_match = re.search(r"Qualifications:\s*([\s\S]+?)(?:\n\s*\n|\Z)", text, re.IGNORECASE)
    qualifications = []
    if qual_match:
        qual_text = qual_match.group(1)
        qualifications = [q.strip() for q in re.split(r"\n\s*[-•]", qual_text) if q.strip()]

    
    return ParsedJobPosting(
        title=title,
        description=text,
        company=company,
        location=location,
        req_skills=skills,
        experience=experience,
        qualifications=qualifications,
        vid=None 
    )
