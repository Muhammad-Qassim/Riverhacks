
import os
import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv

from SlerpAPI.extractor import extract_info
from SlerpAPI.serpapi_helper import search_top_businesses
from Qdrant.embed_utils import embed_text
from Qdrant.my_qdrant_client import qdrant_client
from Client.gemini_prompt import build_context_for_gemini
from Client.gemini_client import ask_gemini


load_dotenv()

app = flask.Flask(__name__)

CORS(app)

@app.route('/api/hello', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
def hello_world():
    return {'message': 'Hello, World!'}

@app.route('/api/search', methods=['POST'])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
def search_neighborhoods():
    data = request.json
    user_query = data.get("query")

    if not user_query:
        return jsonify({"error": "Missing query"}), 400

    # 1. Extract budget and amenities
    extracted = extract_info(user_query)
    budget = extracted.get("budget")
    amenities = extracted.get("amenities", [])

    if budget is None:
        budget = 500000  

    print(f"[INFO] Extracted budget: {budget}, amenities: {amenities}")

    # 2. Embed query
    query_embedding = embed_text([user_query])[0]

    # 3. Search Qdrant
    search_result = qdrant_client.search(
        collection_name="move-safe",
        query_vector=query_embedding,
        limit=5
    )

    # 4. Build businesses nearby (default zipcodes assumed from Qdrant payloads)
    businesses_lookup = {}
    for match in search_result:
        zipcode = match.payload.get("zipcode")
        if zipcode:
            businesses_lookup[zipcode] = search_top_businesses(amenities, zipcode, top_k=3)

    # 5. Build Context for Gemini
    context_text = build_context_for_gemini(search_result, businesses_lookup)

    # 6. Final Output from Gemini
    final_response = ask_gemini(context_text, user_query)

    return jsonify({"result": final_response})
if __name__ == '__main__':  
    app.run(host=os.getenv("HOST"), port=int(os.getenv("PORT")))
    