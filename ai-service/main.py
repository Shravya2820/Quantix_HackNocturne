from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def health_check():
    return {"service": "TrustChain AI Service", "status": "running"}