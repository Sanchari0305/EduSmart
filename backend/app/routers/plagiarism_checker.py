from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from difflib import SequenceMatcher

router = APIRouter()

class PlagiarismRequest(BaseModel):
    content: str

# Dummy corpus for comparison
reference_texts = [
    "Artificial intelligence is the simulation of human intelligence processes by machines.",
    "Machine learning is a subset of AI that focuses on the development of algorithms that can learn.",
    "Deep learning is a type of machine learning using neural networks with many layers.",
]

def calculate_similarity(a, b):
    return SequenceMatcher(None, a, b).ratio()

@router.post("/")
def check_plagiarism(req: PlagiarismRequest):
    try:
        input_text = req.content
        max_similarity = 0

        for ref in reference_texts:
            similarity = calculate_similarity(input_text, ref)
            max_similarity = max(max_similarity, similarity)

        return {
            "plagiarism_score": round(max_similarity * 100, 2),
            "message": "Content similarity check complete."
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
