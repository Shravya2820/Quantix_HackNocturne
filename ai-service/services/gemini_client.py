import os
import google.generativeai as genai


# Configure Gemini API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Load Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")


def generate_milestones(description: str):

    prompt = f"""
    Break the following project into development milestones.

    Project description:
    {description}

    Return 4-5 short milestones.
    """

    try:
        # Call Gemini API
        response = model.generate_content(prompt)

        text = response.text

        milestones = []

        for line in text.split("\n"):
            line = line.strip()

            if line:
                milestones.append({"title": line})

        if len(milestones) == 0:
            raise Exception("Empty response")

        return milestones

    except Exception as e:
        print("Gemini error:", e)

        # fallback milestones if Gemini fails
        return [
            {"title": "UI Design"},
            {"title": "Product Catalog"},
            {"title": "Cart System"},
            {"title": "Backend API"},
            {"title": "Deployment"}
        ]