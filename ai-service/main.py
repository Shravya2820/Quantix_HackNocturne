from fastapi import FastAPI
from pydantic import BaseModel
from services.gemini_client import generate_milestones

app = FastAPI()


# -----------------------------
# MODELS
# -----------------------------

class ProjectData(BaseModel):
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
# PROJECT REPORT (FINAL AI PIPELINE)
# -----------------------------

@app.post("/project-report")
def project_report(data: ProjectData):

    # 1️⃣ Generate milestones
    milestones = generate_milestones(data.description)

    # 2️⃣ Validate code
    validation_score = 80
    if len(data.code) < 20:
        validation_score = 40

    # 3️⃣ AI code review
    if len(data.code) < 30:
        code_quality = "Poor"
        review_score = 40
    elif len(data.code) < 80:
        code_quality = "Average"
        review_score = 65
    else:
        code_quality = "Good"
        review_score = 90

    # 4️⃣ Fraud detection
    plagiarism = False
    similarity_score = 10
    risk_level = "Low"

    if "copy" in data.code.lower():
        plagiarism = True
        similarity_score = 80
        risk_level = "High"

    # 5️⃣ Trust score
    trust_score = (
        data.completed_projects * 5 +
        data.success_rate * 0.4 +
        data.avg_rating * 10
    )

    if trust_score > 100:
        trust_score = 100

    # 6️⃣ AI feedback
    feedback = []

    if len(data.code) < 30:
        feedback.append("Code is too short. Add more logic.")

    if "function" not in data.code.lower():
        feedback.append("Consider organizing code into functions.")

    if "return" not in data.code.lower():
        feedback.append("Add return statements.")

    if len(data.code) > 80:
        feedback.append("Good structure detected.")

    if not feedback:
        feedback.append("Code looks good overall.")

    return {
        "milestones": milestones,
        "validation_score": validation_score,
        "code_quality": code_quality,
        "review_score": review_score,
        "fraud_check": {
            "plagiarism": plagiarism,
            "similarity_score": similarity_score,
            "risk_level": risk_level
        },
        "trust_score": trust_score,
        "feedback": feedback
    }