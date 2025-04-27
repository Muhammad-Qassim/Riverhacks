import os
import json
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, CollectionStatus, PointStruct
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

# Initialize client
qdrant_client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY,
)

def create_collection_if_not_exists(name="move-safe", vector_size=384, distance=Distance.COSINE):
    collections = qdrant_client.get_collections().collections
    if any(c.name == name for c in collections):
        print(f"[INFO] Collection '{name}' already exists.")
        return

    print(f"[INFO] Creating collection '{name}'...")
    qdrant_client.recreate_collection(
        collection_name=name,
        vectors_config=VectorParams(size=vector_size, distance=distance)
    )
    print(f"[SUCCESS] Collection '{name}' created.")

def collection_ready(name="move-safe"):
    info = qdrant_client.get_collection(name)
    return info.status == CollectionStatus.GREEN

def load_embedded_data(file_path="embedded_data.json"):
    with open(file_path, 'r') as f:
        return json.load(f)

def upload_points(collection_name, data):
    points = []
    for entry in data:
        point = PointStruct(
            id=int(entry["id"]),
            vector=entry["embedding"],
            payload=entry["payload"]
        )
        points.append(point)

    qdrant_client.upsert(
        collection_name=collection_name,
        points=points,
    )
    print(f"[SUCCESS] Uploaded {len(points)} points to '{collection_name}'.")

import os

embedded_data_file = os.path.join(os.path.dirname(__file__), "embedded_data.json")

if __name__ == "__main__":
    collection_name = "move-safe"
    create_collection_if_not_exists(name=collection_name)

    if collection_ready(name=collection_name):
        embedded_data = load_embedded_data(embedded_data_file)
        upload_points(collection_name, embedded_data)
    else:
        print("[ERROR] Collection is not ready yet!")
