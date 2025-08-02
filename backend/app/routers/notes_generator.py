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

class NotesRequest(BaseModel):
    topic: str

@router.post("/")
async def generate_notes(req: NotesRequest):
    try:
        prompt = (
            f"Generate notes in a question-and-answer format for the following topic:\n\n{req.topic}\n\n"
            "Make sure to cover key points, definitions, and explanations."
        )

        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": "You are a helpful study assistant that writes notes in a question-answer format."},
                {"role": "user", "content": prompt},
            ],
        )

        output = (
            response.choices[0].message.content.strip()
            if response.choices and response.choices[0].message
            else "⚠️ No response generated"
        )

        return {"notes": output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
