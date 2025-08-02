# app/routers/study_plan.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

api_key = os.getenv("OPENAI_API_KEY")
api_base = os.getenv("OPENAI_API_BASE")

client = OpenAI(api_key=api_key, base_url=api_base)


class StudyPlanRequest(BaseModel):
    subject: str
    chapters: list[str]
    study_days: int
    hours_per_day: int


@router.post("/")
async def generate_study_plan(req: StudyPlanRequest):
    try:
        prompt = (
            f"Create a study plan for the subject '{req.subject}' with the following chapters:\n"
            f"{', '.join(req.chapters)}\n"
            f"Available study days: {req.study_days}, Hours per day: {req.hours_per_day}.\n"
            "Distribute chapters evenly, include date-wise breakdown, and keep it structured in JSON format like:\n"
            "[{{'day': 1, 'topic': 'Chapter 1: Introduction', 'duration': 2}}, ...]"
        )

        response = client.chat.completions.create(
            model="llama3-8b-8192",  # or "gpt-4"
            messages=[
                {"role": "system", "content": "You are an educational assistant."},
                {"role": "user", "content": prompt},
            ],
        )

        output = response.choices[0].message.content.strip()

        return {"plan": output}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
