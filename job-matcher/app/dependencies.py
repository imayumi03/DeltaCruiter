# from app.llm_client import OpenRouterClient
# from app.matching import MatchingService
# from app.db import get_database
# from fastapi import Depends

# async def get_llm_client():
#     return OpenRouterClient()

# async def get_matching_service(db = Depends(get_database), 
#                             llm_client = Depends(get_llm_client)):
#     return MatchingService(db, llm_client)