from functools import wraps
from flask import request, jsonify, g
from config import supabase

def require_role(allowed_roles):
    """
    Decorator to protect routes based on user roles stored in Supabase 'profiles' table.
    Usage: @require_role(['client', 'freelancer'])
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            try:
                # 1. Get the session token from the Authorization header
                auth_header = request.headers.get("Authorization")
                if not auth_header or not auth_header.startswith("Bearer "):
                    return jsonify({"error": "Missing or invalid authorization header"}), 401
                
                token = auth_header.split(" ")[1]

                # 2. Verify the token with Supabase
                user_response = supabase.auth.get_user(token)
                
                if not user_response.user:
                    return jsonify({"error": "Invalid or expired token"}), 401
                
                user = user_response.user

                # 3. Fetch the user's role from the profiles table
                profile_response = supabase.table("profiles").select("role").eq("id", user.id).single().execute()
                profile = profile_response.data

                if not profile:
                    return jsonify({"error": "Could not retrieve user role."}), 500

                user_role = profile.get("role")

                # 4. Check if the user's role is in the allowed_roles array
                if user_role not in allowed_roles:
                    return jsonify({"error": "Forbidden: You do not have the required role to access this resource."}), 403

                # 5. Attach the user and role to Flask's global 'g' object for downstream use
                g.user = user
                g.role = user_role

                return f(*args, **kwargs)

            except Exception as e:
                print(f"Middleware error: {e}")
                return jsonify({"error": "Internal server error"}), 500
                
        return decorated_function
    return decorator
