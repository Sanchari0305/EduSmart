# app/routers/quiz_builder.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

api_key = os.getenv("OPENAI_API_KEY")
api_base = os.getenv("OPENAI_API_BASE")

if not api_key:
    raise RuntimeError("OPENAI_API_KEY not found in .env")

client = OpenAI(api_key=api_key, base_url=api_base)

class QuizRequest(BaseModel):
    topic: str
    num_questions: int

@router.post("/")
async def generate_quiz(req: QuizRequest):
    try:
        prompt = (
            f"Generate a multiple-choice quiz with {req.num_questions} questions based on the following topic:\n\n{req.topic}\n\n"
            "Format:\nQ1. ...\nA. ...\nB. ...\nC. ...\nD. ...\nAnswer: ..."
        )

        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": "You're a quiz generator AI."},
                {"role": "user", "content": prompt},
            ],
        )

        output = (
            response.choices[0].message.content.strip()
            if response.choices and response.choices[0].message
            else "⚠️ No quiz generated"
        )

        return {"quiz": output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
