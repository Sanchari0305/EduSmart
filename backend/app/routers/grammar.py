# app/routers/grammar.py

from fastapi import APIRouter
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


class GrammarRequest(BaseModel):
    text: str


@router.post("/")
async def check_grammar(payload: GrammarRequest):
    text = payload.text

    try:
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful grammar corrector. Fix any grammatical errors in the user's input.",
                },
                {"role": "user", "content": text},
            ],
        )

        # DEBUG print full response
        print("=== RAW RESPONSE ===")
        print(response)

        # Safely get content
        corrected = (
            response.choices[0].message.content.strip()
            if response.choices and response.choices[0].message
            else None
        )

        if corrected:
            return {"output": corrected}
        else:
            return {"error": "No correction returned by model."}

    except Exception as e:
        print("❌ EXCEPTION:", str(e))
        return {"error": str(e)}

