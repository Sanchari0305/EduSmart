# app/routers/question_generator.py

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

class QuestionRequest(BaseModel):
    syllabus: str
    marks: int
    num_questions: int

@router.post("/generate-questions/")
async def generate_questions(req: QuestionRequest):
    try:
        prompt = (
            f"Generate {req.num_questions} exam questions each worth {req.marks} marks "
            f"based on the following syllabus:\n{req.syllabus}\n"
        )

        response = client.chat.completions.create(
            model="llama3-8b-8192",  # or gpt-3.5-turbo / gpt-4
            messages=[
                {"role": "system", "content": "You're a question generator AI."},
                {"role": "user", "content": prompt},
            ],
        )

        output = (
            response.choices[0].message.content.strip()
            if response.choices and response.choices[0].message
            else "⚠️ No response generated"
        )

        return {"questions": output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
