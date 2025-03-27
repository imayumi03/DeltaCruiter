# import logging
# from openai import OpenAI
# import os
# from typing import Dict, Optional
# import json

# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# class OpenRouterClient:
#     def __init__(self):
#         self.client = OpenAI(
#             base_url="https://openrouter.ai/api/v1",
#             api_key= my apiiiiiiiiiiiii
#         )
#         self.headers = {
#             "X-Title": "DeltaCrutter Job Matching"
#         }

#     async def get_match_analysis(self, job_desc: str, resume_text: str) -> Optional[Dict]:
#         prompt = f"""Analyze the job requirements and candidate profile:
# Job Requirements: {job_desc[:3000]}
# Candidate Profile: {resume_text[:3000]}

# Provide a JSON analysis with:
# - technical_fit (0-100)
# - culture_fit (0-100)
# - missing_hard_skills (list)
# - missing_soft_skills (list)
# - strength_analysis (3 bullet points)
# - concern_analysis (3 bullet points)

# Return only valid JSON."""

#         try:
#             response = self.client.chat.completions.create(
#                 model="nvidia/llama-3.1-nemotron-70b-instruct",
#                 messages=[{
#                     "role": "user",
#                     "content": prompt
#                 }],
#                 temperature=0.0,
#                 max_tokens=1000,
#                 response_format={"type": "json_object"},
#                 headers=self.headers
#             )

#             # Parse and validate the JSON response
#             result = json.loads(response.choices[0].message.content)
            
#             # Additional validation if needed
#             if not all(key in result for key in ['technical_fit', 'culture_fit']):
#                 logger.warning("Incomplete match analysis")
#                 return None

#             return result

#         except json.JSONDecodeError:
#             logger.error("Failed to parse LLM response")
#         except Exception as e:
#             logger.error(f"OpenRouter error: {str(e)}")
        
#         return None

import re
from typing import Dict

class JobCandidateMatcher:
    def calculate_match(self, job: Dict, candidate: Dict) -> Dict:
        # 1. Skill Matching (50% weight)
        job_skills = set(skill.lower() for skill in job.get("req_skills", []))
        candidate_skills = set(skill.lower() for skill in candidate.get("skills", []))
        skill_match = len(job_skills & candidate_skills) / max(1, len(job_skills))
        
        # 2. Experience Matching (30% weight) - Updated with text parsing
        exp_match = self._parse_experience_match(
            job.get("experience", ""),
            candidate.get("experience", 0)
        )
        
        # 3. Qualification Matching (20% weight)
        qual_match = 1.0 if set(job.get("qualifications", [])).issubset(
            set(candidate.get("education", []))
        ) else 0.8  # Partial match
        
        # Composite Score
        total_score = 0.5 * skill_match + 0.3 * exp_match + 0.2 * qual_match
        
        return {
            "job_id": str(job["_id"]),
            "candidate_id": str(candidate["_id"]),
            "match_score": round(total_score, 2),
            "matching_skills": list(job_skills & candidate_skills),
            "missing_skills": list(job_skills - candidate_skills)
        }

    def _parse_experience_match(self, job_exp: str, candidate_exp: float) -> float:
        """
        Parse job experience requirements and compare with candidate experience
        Examples handled:
        - "3+ years"
        - "5 years minimum"
        - "1-3 years"
        """
        try:
            # Extract numbers from job experience string
            numbers = re.findall(r"\d+", job_exp)
            if not numbers:
                return 0.7  # Default if no numbers found
            
            # Take the first number as requirement
            req_exp = float(numbers[0])
            
            # Calculate match ratio (cap at 1.0)
            return min(candidate_exp / max(1, req_exp), 1.0)
            
        except Exception:
            return 0.7  # Fallback value if parsing fails