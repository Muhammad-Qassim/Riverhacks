import os
import time
import serpapi
from dotenv import load_dotenv

load_dotenv()

SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

if not SERPAPI_API_KEY:
    raise ValueError("No SERPAPI_API_KEY found in .env file.")

def search_google_maps(place, zipcode):
    """Search for a place using SerpApi (Google Maps engine)."""
    params = {
        "engine": "google_maps",
        "q": f"{place} near {zipcode}",
        "location": "Texas",
        "api_key": SERPAPI_API_KEY,
        "type": "search",
        "hl": "en",
        "gl": "us"
    }

    search = serpapi.search(params)
    results = search.as_dict()

    output = []

    if "local_results" in results:
        businesses = results["local_results"]
        for result in businesses:
            name = result.get("title", "No Name")
            output.append(name)
    else:
        output.append("No results found")

    return output

def search_top_businesses(amenities: list, zipcode: str, top_k=3) -> list:
    """Searches top businesses for each amenity and returns a flat list."""
    all_businesses = []

    for amenity in amenities:
        businesses = search_google_maps(amenity, zipcode)

        if businesses:
            top_businesses = businesses[:top_k]
            all_businesses.extend(top_businesses)
            print(f"[INFO] Found businesses for '{amenity}': {top_businesses}")
        else:
            print(f"[WARN] No businesses found for '{amenity}'")

    return all_businesses
