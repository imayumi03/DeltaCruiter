import os
import requests
from dotenv import load_dotenv

load_dotenv()  

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def get_gemini_response(prompt):
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    response = requests.post(f"{url}?key={GEMINI_API_KEY}", headers=headers, json=data)
    return response.json()["candidates"][0]["content"]["parts"][0]["text"]
