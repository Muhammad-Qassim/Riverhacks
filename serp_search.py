# Import libraries
from serpapi import GoogleSearch
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get SerpApi key from the environment
SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

# Check if API key exists
if not SERPAPI_API_KEY:
    raise ValueError("No SERPAPI_API_KEY found. Please add it to your .env file.")

# Function to search Google
def search_google_maps(place):
    params = {
        "engine": "google_maps",
        "q": place,
        "location": "Austin, Texas",
        "api_key": SERPAPI_API_KEY,
        "type": "search",  # important: tells SerpApi we are doing a search
        "hl": "en",
        "gl": "us"
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    # Print place names and addresses
    if "local_results" in results:
        for idx, result in enumerate(results["local_results"], 1):
            name = result.get("title", "No Name")
            address = result.get("address", "No Address")
            print(f"{idx}. {name}")
            print(f"   {address}\n")
    else:
        print("No results found.")

# Example usage
if __name__ == "__main__":
    searchTarget = input("Enter the place you're searching for (example: coffee): ")
    zipcode = input("Enter the zipcode (example: 78701): ")
    
    place = searchTarget + " at " + zipcode
    
    search_google_maps(place)