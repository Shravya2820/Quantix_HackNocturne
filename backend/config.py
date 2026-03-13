import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Force load .env from current directory
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

print("SUPABASE_URL:", SUPABASE_URL)  # debug check

if SUPABASE_URL is None:
    raise Exception("SUPABASE_URL not found. Check your .env file.")

if SUPABASE_KEY is None:
    raise Exception("SUPABASE_KEY not found. Check your .env file.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)