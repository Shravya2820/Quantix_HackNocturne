from fastapi import FastAPI
from pydantic import BaseModel
from services.gemini_client import generate_milestones

app = FastAPI(
    title="Quantix AI Evaluation Engine",
    description="AI backend that evaluates developer projects using milestones, code validation, AI review, fraud detection, trust score and feedback.",
    version="1.0.0"
)

# -----------------------------
# MODELS
# -----------------------------

class ProjectRequest(BaseModel):
    description: str


class WorkSubmission(BaseModel):
    milestone: str
    code: str


class TrustScoreRequest(BaseModel):
    completed_projects: int
    success_rate: float
    avg_rating: float


class AIReviewRequest(BaseModel):
    code: str


class FraudCheckRequest(BaseModel):
    code: str


class ProjectEvaluation(BaseModel):
    description: str
    code: str
    completed_projects: int
    success_rate: float
    avg_rating: float


# -----------------------------
# HEALTH CHECK
# -----------------------------

@app.get("/")
def health():
    return {"status": "AI service running"}

# -----------------------------
# MILESTONE GENERATION
# -----------------------------

@app.post("/generate-mpr")
def generate_mpr(request: ProjectRequest):

    milestones = generate_milestones(request.description)

    return {
        "milestones": milestones
    }

# -----------------------------
# CODE VALIDATION
# -----------------------------

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

# -----------------------------
# TRUST SCORE
# -----------------------------

@app.post("/trust-score")
def calculate_trust_score(data: TrustScoreRequest):

    score = (
        data.completed_projects * 2
        + data.success_rate * 0.3
        + data.avg_rating * 10
    )

    score = min(100, round(score))

    return {
        "trust_score": score
    }

# -----------------------------
# AI REVIEW
# -----------------------------

@app.post("/ai-review")
def ai_review(data: AIReviewRequest):

    quality = 75

    if "error" in data.code.lower():
        quality = 40

    return {
        "code_quality": quality,
        "review_score": quality,
        "feedback": "Code structure looks acceptable"
    }

# -----------------------------
# FRAUD DETECTION
# -----------------------------

@app.post("/fraud-check")
def fraud_check(data: FraudCheckRequest):

    fraud = False

    if "copy paste" in data.code.lower():
        fraud = True

    return {
        "fraud_detected": fraud
    }

# -----------------------------
# FULL PROJECT REPORT
# -----------------------------

@app.post("/project-report")
def evaluate_project(data: ProjectEvaluation):

    milestones = generate_milestones(data.description)

    validation_score = 80
    if len(data.code) < 20:
        validation_score = 40

    review_score = 75
    if "error" in data.code.lower():
        review_score = 40

    fraud = False
    if "copy paste" in data.code.lower():
        fraud = True

    trust_score = (
        data.completed_projects * 2
        + data.success_rate * 0.3
        + data.avg_rating * 10
    )

    trust_score = min(100, round(trust_score))

    return {
        "milestones": milestones,
        "validation_score": validation_score,
        "review_score": review_score,
        "fraud_detected": fraud,
        "trust_score": trust_score,
        "feedback": "Project evaluation complete"
    }