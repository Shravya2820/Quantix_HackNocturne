from flask import Blueprint, request, jsonify
from config import supabase
import api.ai_service as ai_service
import uuid

project_bp = Blueprint('project', __name__)

@project_bp.route('/projects', methods=['POST'])
def create_project():
    """
    1️⃣ Create Project
    Receives project data, generates milestones via AI, stores in DB, returns data.
    """
    data = request.get_json()
    description = data.get('description')
    client_id = data.get('client_id')
    freelancer_id = data.get('freelancer_id')

    if not description or not client_id or not freelancer_id:
        return jsonify({"error": "Missing required fields"}), 400

    # 1. Call AI endpoint to generate MPR (Milestones)
    # The AI response format may vary, assuming it returns {"milestones": [...]}
    ai_response = ai_service.generate_mpr(description)
    if "error" in ai_response:
        return jsonify(ai_response), 502

    milestones_data = ai_response.get("milestones", [])

    try:
        # 2. Store the project in the database
        project_res = supabase.table("projects").insert({
            "client_id": client_id,
            "freelancer_id": freelancer_id,
            "description": description,
            "status": "active"
        }).execute()

        new_project = project_res.data[0]
        project_id = new_project["id"]

        # 3. Store milestones in database
        db_milestones = []
        for ms in milestones_data:
            ms_title = ms.get("title", "Untitled Milestone")
            ms_amount = ms.get("amount", 0)
            
            ms_res = supabase.table("milestones").insert({
                "project_id": project_id,
                "title": ms_title,
                "amount": ms_amount,
                "status": "pending"
            }).execute()
            db_milestones.append(ms_res.data[0])

        new_project["milestones"] = db_milestones

        # 4. Return response to frontend
        return jsonify(new_project), 201

    except Exception as e:
        # Handle database errors
        return jsonify({"error": "Failed to create project", "details": str(e)}), 500


@project_bp.route('/submit-code', methods=['POST'])
def submit_code():
    """
    2️⃣ Submit Code
    Receives code & project_id, runs validation/review/fraud checks via AI, stores submission.
    """
    data = request.get_json()
    milestone_id = data.get('milestone_id')
    project_id = data.get('project_id')
    code = data.get('code')

    if not milestone_id or not project_id or not code:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Run AI evaluations
        # Note: If one fails, the others shouldn't necessarily block it, but here we run them sequentially.
        val_res = ai_service.validate_work(project_id, code)
        rev_res = ai_service.ai_review(project_id, code)
        fraud_res = ai_service.fraud_check(project_id, code)

        validation_score = val_res.get("score", val_res.get("validation_score", None))
        review_score = rev_res.get("score", rev_res.get("review_score", None))
        fraud_detected = fraud_res.get("fraud_detected", False)

        # Store the submission report in PostgreSQL
        sub_res = supabase.table("submissions").insert({
            "milestone_id": milestone_id,
            "code": code,
            "validation_score": validation_score,
            "review_score": review_score,
            "fraud_detected": fraud_detected
        }).execute()

        return jsonify(sub_res.data[0]), 201

    except Exception as e:
         return jsonify({"error": "Submission processing failed", "details": str(e)}), 500


@project_bp.route('/trust-score/<user_id>', methods=['GET'])
def get_trust_score(user_id):
    """
    3️⃣ Calculate Trust Score
    Fetches user data, calculates trust score via AI, updates DB.
    """
    try:
        # Get user stats from database
        user_res = supabase.table("users").select("completed_projects, success_rate, avg_rating").eq("id", user_id).execute()
        
        if not user_res.data:
            return jsonify({"error": "User not found"}), 404
            
        user_data = user_res.data[0]
        
        # Call AI endpoint
        ai_res = ai_service.trust_score(
            user_data.get("completed_projects", 0),
            user_data.get("success_rate", 0),
            user_data.get("avg_rating", 0)
        )
        
        if "error" in ai_res:
            return jsonify(ai_res), 502
            
        new_trust_score = ai_res.get("trust_score", 0)

        # Update user trust score in DB
        update_res = supabase.table("users").update({"trust_score": new_trust_score}).eq("id", user_id).execute()
        
        return jsonify(update_res.data[0]), 200

    except Exception as e:
        return jsonify({"error": "Failed to update trust score", "details": str(e)}), 500


@project_bp.route('/evaluate-project', methods=['POST'])
def evaluate_project():
    """
    4️⃣ Full Project Evaluation
    Runs comprehensive project evaluation through AI and stores report.
    """
    data = request.get_json()
    project_id = data.get('project_id')
    description = data.get('description')
    code = data.get('code')
    completed_projects = data.get('completed_projects', 0)
    success_rate = data.get('success_rate', 0.0)
    avg_rating = data.get('avg_rating', 0.0)
    
    if not project_id:
        return jsonify({"error": "Missing project_id"}), 400

    # Call AI endpoint
    ai_res = ai_service.project_report(description, code, completed_projects, success_rate, avg_rating)
    if "error" in ai_res:
             return jsonify(ai_res), 502

    try:
        # Expected response contains validation_score, review_score, fraud_detected, trust_score, feedback, etc.
        trust_score_val = ai_res.get("trust_score")
        feedback = ai_res.get("feedback", json.dumps(ai_res))

        # Store report in database
        report_res = supabase.table("ai_reports").insert({
            "project_id": project_id,
            "trust_score": trust_score_val,
            "feedback": feedback
        }).execute()
        
        return jsonify({
            "report_saved": report_res.data[0],
            "ai_evaluation": ai_res
        }), 201
        
    except Exception as e:
        return jsonify({"error": "Failed to save project evaluation", "details": str(e)}), 500
