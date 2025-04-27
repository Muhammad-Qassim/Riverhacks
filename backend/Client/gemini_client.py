import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("models/gemini-2.0-flash")

def ask_gemini(context: str, user_query: str) -> str:
    """Send context + query to Gemini and get final answer."""
    prompt = (
        f"You are a friendly neighborhood specialist who helps people find their ideal place to live." 
        f"The person is asking: {user_query} Here is the neighborhood data you can use: {context} Based only on this information,"
        "recommend the top 2 neighborhoods with zipcode that offer the best balance of low crime, convenient amenities, and affordable housing."
        "and Write your response as two conversational paragraphs - one for each recommendation. Do not use bullet points, markdown,"
        "or line breaks. Make your response flow naturally like a text message conversation."
        "Only include information that appears in the provided neighborhood data and do not invent any details."
        "If certain information isn't available, simply focus on what you do know from the context."
        "after end of each query add a link to Zillow for each neighborhood after line break, like this: 'Zillow Link:"
    )

    response = model.generate_content(prompt)
    return response.text.strip()
