import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL", "https://your-project.supabase.co")
key: str = os.environ.get("SUPABASE_KEY", "your-anon-key")

supabase: Client = create_client(url, key)
