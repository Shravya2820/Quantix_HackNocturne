from fastapi import FastAPI
from pydantic import BaseModel
from services.gemini_client import generate_milestones

app = FastAPI()

# ----------------------
# Models
# ----------------------

class ProjectRequest(BaseModel):
    description: str

class WorkSubmission(BaseModel):
    milestone: str
    code: str

class TrustScoreRequest(BaseModel):
    completed_projects: int
    success_rate: float
    avg_rating: float


# ----------------------
# Health Check
# ----------------------

@app.get("/")
def health():
    return {"status": "AI service running"}


# ----------------------
# Milestone Generator
# ----------------------

@app.post("/generate-mpr")
def generate_mpr(request: ProjectRequest):

    milestones = generate_milestones(request.description)

    return {
        "milestones": milestones
    }


# ----------------------
# Work Validator
# ----------------------

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


# ----------------------
# Trust Score Endpoint
# ----------------------

@app.post("/trust-score")
def calculate_trust_score(data: TrustScoreRequest):

    score = 0

    score += data.completed_projects * 5
    score += data.success_rate * 0.4
    score += data.avg_rating * 10

    if score > 100:
        score = 100

    if score < 40:
        risk = "High"
    elif score < 70:
        risk = "Medium"
    else:
        risk = "Low"

    return {
        "trust_score": round(score, 2),
        "risk_level": risk,
        "loan_eligible": score > 60
    }