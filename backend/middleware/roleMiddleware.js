import supabase from "../config/supabaseClient.js";

export const requireRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // 1. Get the session token from the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid authorization header" });
      }

      const token = authHeader.split(" ")[1];

      // 2. Verify the token with Supabase
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);

      if (authError || !user) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      // 3. Fetch the user's role from the profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        return res.status(500).json({ error: "Could not retrieve user role." });
      }

      // 4. Check if the user's role is in the allowedRoles array
      if (!allowedRoles.includes(profile.role)) {
        return res.status(403).json({ error: "Forbidden: You do not have the required role to access this resource." });
      }

      // 5. Attach the user and role to the request object for downstream routes
      req.user = user;
      req.role = profile.role;
      next();

    } catch (err) {
      console.error("Middleware error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};
