import json

def load_crime_data(crime_file_path):
    """Load crime dataset."""
    with open(crime_file_path, 'r') as f:
        return json.load(f)

def load_neighborhood_data(neighborhood_file_path):
    """Load scraped neighborhoods dataset."""
    with open(neighborhood_file_path, 'r') as f:
        return json.load(f)

def parse_crime_breakdown(crime_breakdown_str):
    """Convert crime breakdown from string to dictionary."""
    crime_dict = {}
    if not crime_breakdown_str:
        return crime_dict
    
    crimes = crime_breakdown_str.split(", ")
    for crime in crimes:
        if ":" in crime:
            key, value = crime.split(":")
            crime_dict[key.strip()] = int(value.strip())
    
    return crime_dict

def merge_data(crime_data, neighborhood_data):
    """Merge both datasets by zipcode."""
    # Build a lookup for neighborhood data
    neighborhood_lookup = {entry["zipcode"]: entry["neighborhoods_info"] for entry in neighborhood_data}

    merged = []

    for entry in crime_data:
        zipcode = entry.get("zipcode")
        if not zipcode:
            continue
        
        merged_entry = {
            "id": zipcode,
            "payload": {
                "zipcode": zipcode,
                "crime_count": int(entry.get("crime_count", 0)),
                "crime_breakdown": parse_crime_breakdown(entry.get("crime_breakdown", "")),
                "neighborhoods_info": neighborhood_lookup.get(zipcode, [])  # If no match, empty list
            }
        }

        merged.append(merged_entry)
    
    return merged

def save_merged_data(merged_data, output_file="merged_data.json"):
    """Save the merged dataset to JSON."""
    with open(output_file, "w") as f:
        json.dump(merged_data, f, indent=2)
    print(f"[SUCCESS] Merged data saved to {output_file}")

from os import path
import os

crime_file = os.path.join(os.path.dirname(__file__), "data", "crime_summary.json")
neighborhood_file = os.path.join(os.path.dirname(__file__), "data", "homes.json")

if __name__ == "__main__":  

    crime_data = load_crime_data(crime_file)
    neighborhood_data = load_neighborhood_data(neighborhood_file)

    merged = merge_data(crime_data, neighborhood_data)
    save_merged_data(merged)
