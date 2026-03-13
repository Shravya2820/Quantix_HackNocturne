import supabase from "../config/supabaseClient.js";

export const registerUser = async (req, res) => {
  const { email, password, wallet } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const userId = data.user.id;

  await supabase.from("profiles").insert([
    {
      id: userId,
      wallet_addr: wallet,
      trust_score: 0
    }
  ]);

  res.json({
    message: "User registered",
    user: data.user
  });
};