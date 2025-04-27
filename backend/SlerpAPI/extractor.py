# extractor.py

import google.generativeai as genai
import os
import json

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def extract_info(user_query: str):
    """Extract budget and amenities from user query using Gemini."""
    prompt = (
        f"Extract the following information from this query:\n\n"
        f"\"{user_query}\"\n\n"
        f"Return STRICT JSON ONLY with two keys: 'budget' (number) and 'amenities' (list of strings).\n"
        f"If budget is missing, set it to null. If amenities missing, use empty list [].\n"
        f"No extra text, just JSON."
    )

    response = model.generate_content(prompt)
    raw_text = response.text.strip()

    try:
        # Force to parse as real JSON
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:-3].strip()  # remove ```json and ```
        extracted = json.loads(raw_text)
        return extracted
    except Exception as e:
        print("[ERROR] Failed to extract info:", e)
        return {"budget": None, "amenities": []}
