from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import (
    grammar,
    summarizer,
    question_generator,
    chatbot,
    notes_generator,
    quiz_builder,
    plagiarism_checker,
    study_plan,
    flashcards
)

app = FastAPI()

# Allow frontend requests (e.g., from localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with prefixes
app.include_router(grammar.router, prefix="/grammar")
app.include_router(summarizer.router, prefix="/summarize")
app.include_router(question_generator.router, prefix="/questions")
app.include_router(chatbot.router, prefix="/chat")
app.include_router(notes_generator.router, prefix="/notes")
app.include_router(quiz_builder.router, prefix="/quiz")
app.include_router(plagiarism_checker.router, prefix="/plagiarism")
app.include_router(study_plan.router, prefix="/study-plan")
app.include_router(flashcards.router, prefix="/flashcards")
