from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from transformers import pipeline

router = APIRouter()

# Load the summarization pipeline (Facebook BART model)
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

class SummaryRequest(BaseModel):
    text: str
    mode: str  # short, medium, detailed

@router.post("/")
def summarize_text(req: SummaryRequest):
    try:
        max_length = {"short": 50, "medium": 100, "detailed": 200}.get(req.mode, 100)
        summary = summarizer(
            req.text,
            max_length=max_length,
            min_length=30,
            do_sample=False
        )[0]["summary_text"]
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
