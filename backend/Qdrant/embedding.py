import json
from sentence_transformers import SentenceTransformer
from tqdm import tqdm

# Load model
model = SentenceTransformer("all-MiniLM-L6-v2")

def load_merged_data(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def save_embedded_data(data, output_file="embedded_data.json"):
    with open(output_file, "w") as f:
        json.dump(data, f, indent=2)
    print(f"[SUCCESS] Saved embedded data to {output_file}")

def generate_embedding_text(entry):
    """Create a text string combining crime + neighborhood info for better embedding."""
    parts = []
    
    parts.append(f"Zipcode {entry['payload']['zipcode']}")
    parts.append(f"Total Crimes: {entry['payload']['crime_count']}")
    
    # Add crime breakdown
    crimes = entry['payload'].get("crime_breakdown", {})
    crime_list = [f"{crime} ({count})" for crime, count in crimes.items()]
    if crime_list:
        parts.append("Top Crimes: " + ", ".join(crime_list[:3])) 
    
    # Add neighborhoods
    neighborhoods = entry['payload'].get("neighborhoods_info", [])
    neighborhood_names = [n['neighborhood'] for n in neighborhoods if n['neighborhood']]
    if neighborhood_names:
        parts.append("Neighborhoods: " + ", ".join(neighborhood_names))

    return " | ".join(parts)

def embed_entries(data):
    texts = [generate_embedding_text(entry) for entry in data]
    embeddings = model.encode(texts, show_progress_bar=True).tolist()

    # Attach embeddings back into each entry
    for idx, entry in enumerate(data):
        entry["embedding"] = embeddings[idx]
    
    return data

import os

merged_data_file = os.path.join(os.path.dirname(__file__), "merged_data.json")

if __name__ == "__main__":
    merged_data = load_merged_data(merged_data_file)

    embedded_data = embed_entries(merged_data)
    save_embedded_data(embedded_data, output_file="embedded_data.json")
