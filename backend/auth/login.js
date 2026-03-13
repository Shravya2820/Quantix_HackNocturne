import supabase from "../config/supabaseClient.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  res.json({
    message: "Login successful",
    session: data.session
  });
};