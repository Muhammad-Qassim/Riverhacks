
import os
import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import requests

from SlerpAPI.extractor import extract_info
from SlerpAPI.serpapi_helper import search_top_businesses
from Qdrant.embed_utils import embed_text
from Qdrant.my_qdrant_client import qdrant_client
from Client.gemini_prompt import build_context_for_gemini
from Client.gemini_client import ask_gemini


load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
LOOPMESSAGE_API_KEY = os.getenv("LOOPMESSAGE_API_KEY")
LOOPMESSAGE_SEND_URL = "https://server.loopmessage.com/api/v1/message/send/"
LOOPMESSAGE_SECRET_KEY = os.getenv("LOOPMESSAGE_SECRET_KEY")


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


import time

received_message_ids = set()

@app.route("/loopmessage-webhook", methods=["POST"])
def loopmessage_webhook():
    data = request.get_json()
    print("Received webhook:", data)

    if not data or 'text' not in data or 'recipient' not in data:
        return jsonify({"status": "invalid"}), 400

    message_id = data.get('message_id')
    alert_type = data.get('alert_type', '')

    if message_id in received_message_ids:
        print(f"Ignored duplicate webhook: {message_id}")
        return jsonify({"status": "duplicate"}), 200

    if alert_type != "message_inbound":
        print("Ignored non-user-initiated event.")
        return jsonify({"status": "ignored"}), 200

    received_message_ids.add(message_id)

    user_message = data['text']
    phone_number = data['recipient']

    try:
        rag_response = requests.post(
            "https://238d-206-77-151-195.ngrok-free.app/api/search",
            json={"query": user_message}
        )

        rag_response.raise_for_status()
        reply_data = rag_response.json()
        reply_text = reply_data.get("result", "Sorry, I couldn't generate a reply.")

        payload = {
            "recipient": phone_number,
            "text": reply_text
        }

        headers = {
            "Authorization": f"{LOOPMESSAGE_API_KEY}",
            "Loop-Secret-Key": f"{LOOPMESSAGE_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        send_response = requests.post(LOOPMESSAGE_SEND_URL, json=payload, headers=headers)
        send_response.raise_for_status()

    except Exception as e:
        print(f"Error: {e}")

    return jsonify({"status": "ok"}), 200


if __name__ == '__main__':  
    app.run(host=os.getenv("HOST"), port=int(os.getenv("PORT")))
    