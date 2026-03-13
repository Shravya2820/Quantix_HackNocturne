from flask import Blueprint, request, jsonify
from config import supabase

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON payload provided"}), 400

        email = data.get('email')
        password = data.get('password')
        wallet = data.get('wallet')
        role = data.get('role')

        if not all([email, password, wallet, role]):
            return jsonify({"error": "Missing required fields"}), 400

        if role not in ['client', 'freelancer']:
            return jsonify({"error": "Invalid role. Must be 'client' or 'freelancer'."}), 400

        # Create Supabase Auth user
        auth_response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })

        if not auth_response.user:
            return jsonify({"error": "Failed to create user in Supabase auth."}), 400

        user_id = auth_response.user.id

        # Insert user into profiles table
        profile_data = {
            "id": user_id,
            "wallet_addr": wallet,
            "role": role,
            "trust_score": 0
        }
        
        insert_response = supabase.table("profiles").insert(profile_data).execute()

        # The Python client throws exceptions on HTTP errors by default, 
        # but just in case we verify we got data back
        if len(insert_response.data) == 0:
            return jsonify({"error": "Failed to insert into profiles table."}), 500

        return jsonify({
            "message": "User registered successfully",
            "user": {
                "id": user_id,
                "email": email
            }
        }), 201

    except Exception as e:
        print(f"Registration error: {e}")
        return jsonify({"error": "Internal server error occurred.", "details": str(e)}), 500


@auth_bp.route('/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON payload provided"}), 400

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Email and password required"}), 400

        # Sign in
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })

        if not auth_response.session:
            return jsonify({"error": "Failed to authenticate."}), 401

        session_token = auth_response.session.access_token
        user_id = auth_response.user.id

        # Fetch the user's role and wallet_addr from profiles table
        profile_response = supabase.table("profiles").select("role, wallet_addr").eq("id", user_id).single().execute()

        profile_data = profile_response.data
        if not profile_data:
            return jsonify({"error": "User profile not found."}), 404

        return jsonify({
            "message": "Login successful",
            "session_token": session_token,
            "user_id": user_id,
            "wallet_address": profile_data.get("wallet_addr"),
            "role": profile_data.get("role")
        }), 200

    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({"error": "Internal server error occurred.", "details": str(e)}), 500
