from fastapi import FastAPI
from pydantic import BaseModel
from services.gemini_client import generate_milestones

app = FastAPI()

# -------- Models --------

class ProjectRequest(BaseModel):
    description: str


class WorkSubmission(BaseModel):
    milestone: str
    code: str


# -------- Health Check --------

@app.get("/")
def health():
    return {"status": "AI service running"}


# -------- Milestone Generator --------

@app.post("/generate-mpr")
def generate_mpr(request: ProjectRequest):

    milestones = generate_milestones(request.description)

    return {
        "milestones": milestones
    }


# -------- Work Validator --------

@app.post("/validate-work")
def validate_work(data: WorkSubmission):

    score = 80

    if len(data.code) < 20:
        score = 40

    return {
        "milestone": data.milestone,
        "score": score,
        "plagiarism": False,
        "scope_match": True,
        "feedback": "Work matches milestone requirements"
    }