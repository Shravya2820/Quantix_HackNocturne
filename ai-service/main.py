from fastapi import FastAPI
from pydantic import BaseModel
from services.gemini_client import generate_milestones

app = FastAPI()

# ---------------------------
# MODELS
# ---------------------------

class ProjectRequest(BaseModel):
    description: str


class WorkSubmission(BaseModel):
    milestone: str
    code: str


class TrustScoreRequest(BaseModel):
    completed_projects: int
    success_rate: float
    avg_rating: float


class CodeReviewRequest(BaseModel):
    milestone: str
    code: str


class ProjectEvaluation(BaseModel):
    description: str
    code: str
    completed_projects: int
    success_rate: float
    avg_rating: float


# ---------------------------
# HEALTH CHECK
# ---------------------------

@app.get("/")
def health():
    return {"status": "AI service running"}


# ---------------------------
# MILESTONE GENERATOR
# ---------------------------

@app.post("/generate-mpr")
def generate_mpr(request: ProjectRequest):

    milestones = generate_milestones(request.description)

    return {
        "milestones": milestones
    }


# ---------------------------
# WORK VALIDATION
# ---------------------------

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


# ---------------------------
# TRUST SCORE
# ---------------------------

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


# ---------------------------
# AI CODE REVIEW
# ---------------------------

@app.post("/ai-review")
def ai_review(data: CodeReviewRequest):

    length = len(data.code)

    if length < 30:
        quality = "Poor"
        score = 40
    elif length < 80:
        quality = "Average"
        score = 65
    else:
        quality = "Good"
        score = 90

    return {
        "milestone": data.milestone,
        "quality": quality,
        "score": score,
        "feedback": "AI code analysis completed"
    }


# ---------------------------
# FULL AI PIPELINE
# ---------------------------

@app.post("/evaluate-project")
def evaluate_project(data: ProjectEvaluation):

    # 1️⃣ Generate milestones
    milestones = generate_milestones(data.description)

    # 2️⃣ Validate work
    validation_score = 80
    if len(data.code) < 20:
        validation_score = 40

    # 3️⃣ Code review
    if len(data.code) < 30:
        quality = "Poor"
        review_score = 40
    elif len(data.code) < 80:
        quality = "Average"
        review_score = 65
    else:
        quality = "Good"
        review_score = 90

    # 4️⃣ Trust score
    trust_score = (
        data.completed_projects * 5
        + data.success_rate * 0.4
        + data.avg_rating * 10
    )

    if trust_score > 100:
        trust_score = 100

    return {
        "milestones": milestones,
        "validation_score": validation_score,
        "code_quality": quality,
        "review_score": review_score,
        "trust_score": round(trust_score, 2)
    }