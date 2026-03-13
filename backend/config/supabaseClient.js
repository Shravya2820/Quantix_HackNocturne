import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "https://your-project.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "your-anon-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;