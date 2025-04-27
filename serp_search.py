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

    if "local_results" in results:
        businesses = results["local_results"]

        '''
        # Sort businesses by rating (highest first)
        businesses_sorted = sorted(
            businesses,
            key=lambda x: x.get("rating", 0),
            reverse=True
        )

        # Only take top 5 after sorting
        top5_businesses = businesses_sorted[:5]
        '''
        for idx, result in enumerate(businesses, 1):
            name = result.get("title", "No Name")
            address = result.get("address", "No Address")
            rating = result.get("rating", "No rating")
            reviewsNum = result.get("reviews", "No review")
            print(f"{idx}. {name}")
            print(f"   {address}")
            print(f"   {rating} ⭐ ({reviewsNum} reviews)\n")
    else:
        print("No results found.")

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


###
def search_with_yelp(place, zipcode, locationInfo):
    params = {
        "api_key": SERPAPI_API_KEY,
        "engine": "yelp",
        "find_loc": locationInfo , # Ex: Pflugerville, Texas
        "find_desc": place, #Ex: Boba
        "l":  zipcode
        }
    search = GoogleSearch(params)
    results = search.get_dict()
    #print name, addresses, and rating (number of rating)
    if "organic_results" in results:
        for idx, business in enumerate(results["organic_results"], 1):
            name = business.get("title", "No name")
            address = business.get("address", "Address not found")
            rating = business.get("rating", "No rating")
            link = business.get("link", "No Link")
            if address == "Address not found":
                print(search_for_address(place, zipcode, locationInfo))
            print(f"{idx}. {name} ({rating} ⭐)")
            #print(f"{address}")
            print(f"{link}\n")
    else:
        print("Nandemonaiya")
    

def main():
    choice = sys.argv[1]
    place = sys.argv[2]
    zipcode = sys.argv[3] if len(sys.argv) > 3 else ""
    locationInfo = sys.argv[4] if len(sys.argv) > 4 else ""
    
    if choice == "1":
        search_google_maps(place + zipcode)
    elif choice == "2":
        if not zipcode or not locationInfo:
            print("Zipcode and location required for Yelp search.")
            sys.exit(1)
        search_with_yelp(place, zipcode, locationInfo)
    else:
        print("Invalid option. Use 1 for Google Maps, 2 for Yelp.")
# Example usage
if __name__ == "__main__":
    main()