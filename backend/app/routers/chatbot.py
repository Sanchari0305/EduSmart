# app/routers/chatbot.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

api_key = os.getenv("OPENAI_API_KEY")
api_base = os.getenv("OPENAI_API_BASE")

if not api_key:
    raise RuntimeError("OPENAI_API_KEY not found in .env")

client = OpenAI(api_key=api_key, base_url=api_base)

class ChatRequest(BaseModel):
    message: str

@router.post("/")
async def chat(req: ChatRequest):
    try:
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": "You're a friendly and helpful educational assistant."},
                {"role": "user", "content": req.message},
            ],
        )
        reply = response.choices[0].message.content.strip()
        return {"response": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
