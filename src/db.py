
from dotenv import load_dotenv
load_dotenv()
import os
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

MONGO_URL = os.getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)
db = client["RECYCLENS_db"]
predictions_collection = db["predictions"]

# Add this for standalone testing:
async def test_connection():
    try:
        collections = await db.list_collection_names()
        print("Connected! Collections:", collections)
    except Exception as e:
        print("Connection failed:", e)

if __name__ == "__main__":
    asyncio.run(test_connection())