# app/routers/flashcards.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

api_key = os.getenv("OPENAI_API_KEY")
api_base = os.getenv("OPENAI_API_BASE")

client = OpenAI(api_key=api_key, base_url=api_base)

class FlashcardRequest(BaseModel):
    notes: str

@router.post("/")
async def generate_flashcards(req: FlashcardRequest):
    try:
        prompt = (
            "You're an AI that turns notes into spaced-repetition flashcards. "
            "From the text below, extract 5–10 key concepts as Q&A flashcards. "
            "Format: \n\nFlashcard 1:\nQ: ...\nA: ...\n\nFlashcard 2:\nQ: ...\nA: ...\n\nNotes:\n"
            f"{req.notes}"
        )

        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": "You generate flashcards for spaced repetition."},
                {"role": "user", "content": prompt},
            ],
        )

        result = response.choices[0].message.content.strip()
        return {"flashcards": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
