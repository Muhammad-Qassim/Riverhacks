# Import libraries
import sys
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
def search_google_maps(place, zipcode):
    params = {
        "engine": "google_maps",
        "q": place + " at " + zipcode,
        "location": "Texas",
        "api_key": SERPAPI_API_KEY,
        "type": "search",
        "hl": "en",
        "gl": "us"
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    output = []

    if "local_results" in results:
        businesses = results["local_results"]
        
        for result in businesses:
            name = result.get("title", "No Name")
            address = result.get("address", "No Address")
            rating = result.get("rating", "No rating")
            reviewsNum = result.get("reviews", "No review")

            business_data = {
                "name": name,
                "address": address,
                "rating": rating,
                "reviews": reviewsNum
            }
            output.append(business_data)
    else:
        output.append({"error": "No results found."})

    return output


 ## this failed to work
def search_for_address(placename, zipcode, locationInfo):
    params = {
        "engine": "google_maps",
        "q": placename + "at" + zipcode,
        "location": locationInfo,
        "api_key": SERPAPI_API_KEY,
        "type": "search",  # important: tells SerpApi we are doing a search
        "hl": "en",
        "gl": "us"
    }
    search = GoogleSearch(params)
    results = search.get_dict()

    if "local_results" in results and len(results["local_results"]) > 0:
        first_result = results["local_results"][0]
        name = first_result.get("title", "No Name")
        if name == placename:
            address = first_result.get("address", "No Address")
            return address if address else "Address not found"
    else:
        return "Address notfound"


def search_with_yelp(place, zipcode, locationInfo):
    params = {
        "api_key": SERPAPI_API_KEY,
        "engine": "yelp",
        "find_loc": locationInfo,
        "find_desc": place,
        "l": zipcode
    }
    search = GoogleSearch(params)
    results = search.get_dict()

    output = []

    if "organic_results" in results:
        for business in results["organic_results"]:
            name = business.get("title", "No name")
            address = business.get("address", "Address not found")
            rating = business.get("rating", "No rating")
            link = business.get("link", "No Link")

            if address == "Address not found":
                address = search_for_address(place, zipcode, locationInfo)

            business_data = {
                "name": name,
                "address": address,
                "rating": rating,
                "link": link
            }
            output.append(business_data)
    else:
        output.append({"error": "No results found."})

    return output

    

import json

def main():
    choice = sys.argv[1]
    place = sys.argv[2]
    zipcode = sys.argv[3] if len(sys.argv) > 3 else ""
    locationInfo = sys.argv[4] if len(sys.argv) > 4 else ""

    output = {}

    if choice == "1":
        output = search_google_maps(place, zipcode)
    elif choice == "2":
        if not zipcode or not locationInfo:
            output = {"error": "Zipcode and location required for Yelp search."}
        else:
            output = search_with_yelp(place, zipcode, locationInfo)
    else:
        output = {"error": "Invalid option. Use 1 for Google Maps, 2 for Yelp."}

    # Print JSON to stdout
    print(json.dumps(output, indent=2))

if __name__ == "__main__":
    main()