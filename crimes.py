import requests
import pandas as pd
import json
from collections import defaultdict

map_df = pd.read_csv("with_zipcodes.csv", dtype=str)
geoid_to_zip = dict(zip(map_df["Geo ID"], map_df["ZIPCODE"]))

BASE_URL = "https://data.austintexas.gov/resource/fdj4-gpfu.json"
offset = 0
limit = 50000
all_data = []

while True:
   params = {
       "$select": "census_block_group, crime_type, count(incident_report_number) AS crime_count",
       "$where": "occ_date >= '2024-01-01T00:00:00'::floating_timestamp",
       "$group": "census_block_group, crime_type",
       "$limit": limit,
       "$offset": offset
   }
   
   resp = requests.get(BASE_URL, params=params)
   resp.raise_for_status()
   data = resp.json()
   
   if not data:
       break
       
   all_data.extend(data)
   print(f"Fetched {len(data)} records, total so far: {len(all_data)}")
   
   if len(data) < limit:
       break
       
   offset += limit

print(f"Total records fetched: {len(all_data)}")
bg_crime_counts = all_data

zip_total_counts = defaultdict(int)
zip_crime_counts = defaultdict(lambda: defaultdict(int))
unique_zipcodes = set()

for rec in bg_crime_counts:
   raw = rec.get("census_block_group")
   crime_type = rec.get("crime_type", "Unknown")
   
   if not raw:
       continue
       
   full_geoid = raw if len(raw) > 10 else "48" + raw
   
   try:
       c = int(rec.get("crime_count", 0))
   except ValueError:
       c = 0
       
   z = geoid_to_zip.get(full_geoid)
   if z:
       zip_total_counts[z] += c
       zip_crime_counts[z][crime_type] += c
       unique_zipcodes.add(z)

print(f"Found crimes in {len(unique_zipcodes)} unique zipcodes")

json_output = []

for zipcode, total_crimes in zip_total_counts.items():
   if total_crimes == 0 or zipcode == "nan" or str(zipcode).lower() == "nan":
       continue
       
   zipcode = str(zipcode)
   
   crime_types = zip_crime_counts.get(zipcode, {})
   sorted_crimes = sorted(crime_types.items(), key=lambda x: x[1], reverse=True)
   
   if sorted_crimes:
       crime_breakdown = ", ".join([f"{ctype}:{count}" for ctype, count in sorted_crimes])
   else:
       crime_breakdown = ""
   
   json_output.append({
       "zipcode": zipcode,
       "crime_count": str(total_crimes),
       "crime_breakdown": crime_breakdown
   })

json_output.sort(key=lambda x: str(x["zipcode"]))

with open("crime_summary.json", "w") as f:
   json.dump(json_output, f, indent=2)

print("Wrote crime_summary.json")