import supabase from "../config/supabaseClient.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (authError) {
    return res.status(401).json({ error: authError.message });
  }

  const userId = authData.user.id;

  // Fetch the user's role and wallet_addr from the profiles table
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("role, wallet_addr")
    .eq("id", userId)
    .single();

  if (profileError) {
    return res.status(500).json({ error: "Failed to fetch user profile.", details: profileError.message });
  }

  res.status(200).json({
    message: "Login successful",
    session_token: authData.session.access_token,
    user_id: userId,
    wallet_address: profileData.wallet_addr,
    role: profileData.role
  });
};