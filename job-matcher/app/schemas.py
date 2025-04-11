from typing import Dict, List, Optional

from bson import ObjectId
from pydantic import BaseModel, Field, field_validator


class JobDescriptionInput(BaseModel):
    title: Optional[str] = None
    job_type: Optional[str] = None
    Department: Optional[str] = None
    description: str
    company: Optional[str] = None
    location: Optional[str] = None

    class Config:
        extra = "ignore"  
        json_encoders = {ObjectId: str}

class ParsedJobPosting(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    title: str
    description: str
    company: str
    job_type: Optional[str] = None
    location: str
    req_skills: List[str]
    experience: Optional[str] = None
    qualifications: Optional[List[str]] = None
    vid: Optional[str] = None

    @field_validator('id', mode='before')
    def validate_objectid(cls, value):
        if isinstance(value, ObjectId):
            return str(value)
        return value

    class Config:
        extra = "ignore"  
        json_encoders = {ObjectId: str}

class Candidate(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    name: str
    skills: List[str]
    experience: float  
    education: List[str]
    resume_text: str  
    matches: List[Dict] = []  

    class Config:
        ##populate_by_name = True
        extra = "ignore" 
        json_encoders = {
            ObjectId: str
        }
class MatchResult(BaseModel):
    job_id: str
    candidate_id: str
    match_score: float
    matching_skills: List[str]
    missing_skills: List[str]