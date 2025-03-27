from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongodb:27017")  # Matches Docker service name
client = AsyncIOMotorClient(MONGO_URI)
database = client.job_matcher

async def get_database():
    return database