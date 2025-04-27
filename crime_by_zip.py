import requests
import pandas as pd
from collections import Counter

# 1. Load your GeoID→ZIP mapping
map_df = pd.read_csv("with_zipcodes.csv", dtype=str)
geoid_to_zip = dict(zip(map_df["Geo ID"], map_df["ZIPCODE"]))

# 2. Pull crime counts PER BLOCK-GROUP
BASE_URL = "https://data.austintexas.gov/resource/fdj4-gpfu.json"
params = {
    "$select": "census_block_group, count(incident_report_number) AS crime_count",
    "$where":  "occ_date >= '2024-01-01T00:00:00'::floating_timestamp",
    "$group":  "census_block_group"
}

resp = requests.get(BASE_URL, params=params)
resp.raise_for_status()
bg_counts = resp.json()  # list of {"census_block_group":"4530310002","crime_count":"16"}, …

# 3. Roll up into ZIPs
zip_counts = Counter()
for rec in bg_counts:
    raw = rec.get("census_block_group")
    if not raw:
        continue
    # Prefix "48" to make it match your 12-digit keys
    full_geoid = raw if len(raw) > 10 else "48" + raw

    # Safely parse count
    try:
        c = int(rec.get("crime_count", 0))
    except ValueError:
        c = 0

    z = geoid_to_zip.get(full_geoid)
    if z:
        zip_counts[z] += c

# 4. Build DataFrame, sort, & save
df = (
    pd.DataFrame.from_records(
        [(z, cnt) for z, cnt in zip_counts.items()],
        columns=["ZIPCODE", "crime_count"]
    )
    .sort_values("crime_count", ascending=False)
    .reset_index(drop=True)
)

print(df)
df.to_csv("crime_counts_by_zip.csv", index=False)
print("\n✅ Wrote crime_counts_by_zip.csv")
