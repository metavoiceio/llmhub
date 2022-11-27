from supabase import Client, create_client

url: str = "https://ynmrxmxganprxliyqppn.supabase.co"
key: str = (
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIs"
    + "InJlZiI6InlubXJ4bXhnYW5wcnhsaXlxcHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2"
    + "Njk1NDU3MjAsImV4cCI6MTk4NTEyMTcyMH0.5oaHv2n7NJ2b5OjlDwjdpzilcjujnd2z"
    + "j1JUkA_zOhU"
)
supabase: Client = create_client(url, key)
