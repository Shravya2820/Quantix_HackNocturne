import supabase from "../config/supabaseClient.js";

export const registerUser = async (req, res) => {
  const { email, password, wallet, role } = req.body;

  if (!["client", "freelancer"].includes(role)) {
    return res.status(400).json({ error: "Invalid role. Must be 'client' or 'freelancer'." });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const userId = data.user.id;

  const { error: insertError } = await supabase.from("profiles").insert([
    {
      id: userId,
      wallet_addr: wallet,
      role: role,
      trust_score: 0
    }
  ]);

  if (insertError) {
    return res.status(500).json({ error: "Failed to create user profile.", details: insertError.message });
  }

  res.status(201).json({
    message: "User registered successfully",
    user: data.user
  });
};