from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def health_check():
    return {"status": "AI service running"}

@app.post("/generate-mpr")
def generate_mpr(data: dict):

    description = data["description"]

    milestones = [
        {"title": "UI Design"},
        {"title": "Product Catalog"},
        {"title": "Cart System"},
        {"title": "Deployment"}
    ]

    return {"milestones": milestones}