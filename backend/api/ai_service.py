import os
import requests
import json

AI_SERVICE_URL = os.environ.get("AI_SERVICE_URL", "http://127.0.0.1:5000")

def _call_ai_service(endpoint, data):
    """
    Helper function to make POST requests to the AI microservice.
    Includes basic error handling/retries logic as requested.
    """
    url = f"{AI_SERVICE_URL}{endpoint}"
    try:
        # Example of a basic retry on failure could be implemented via requests.adapters
        # For simplicity, we'll run a standard post request.
        response = requests.post(url, json=data, timeout=30)
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"AI Service Error ({response.status_code}): {response.text}")
            return {"error": f"AI service returned {response.status_code}", "details": response.text}
            
    except requests.exceptions.RequestException as e:
        print(f"AI Service Connection Error: {str(e)}")
        # If AI service is unavailable, handle it gracefully
        return {"error": "AI service is unavailable", "details": str(e)}

def generate_mpr(description: str):
    """
    POST /generate-mpr
    Generates milestones for a project.
    """
    return _call_ai_service("/generate-mpr", {"description": description})

def validate_work(project_id: str, code: str):
    """
    POST /validate-work
    Validates submitted code logic.
    """
    return _call_ai_service("/validate-work", {"project_id": project_id, "code": code})

def ai_review(project_id: str, code: str):
    """
    POST /ai-review
    Conducts qualitative review of the code.
    """
    return _call_ai_service("/ai-review", {"project_id": project_id, "code": code})

def fraud_check(project_id: str, code: str):
    """
    POST /fraud-check
    Checks if the submission is fraudulent.
    """
    return _call_ai_service("/fraud-check", {"project_id": project_id, "code": code})

def trust_score(completed_projects: int, success_rate: float, avg_rating: float):
    """
    POST /trust-score
    Updates/calculates the trust score for a user.
    """
    return _call_ai_service("/trust-score", {
        "completed_projects": completed_projects,
        "success_rate": success_rate,
        "avg_rating": avg_rating
    })

def project_report(description: str, code: str, completed_projects: int, success_rate: float, avg_rating: float):
    """
    POST /project-report
    Comprehensive project evaluation.
    """
    return _call_ai_service("/project-report", {
        "description": description,
        "code": code,
        "completed_projects": completed_projects,
        "success_rate": success_rate,
        "avg_rating": avg_rating
    })
