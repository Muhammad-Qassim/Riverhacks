def build_context_for_gemini(qdrant_matches: list, businesses_lookup: dict) -> str:
    """Build human-readable context for Gemini input."""
    context = "Neighborhoods matching user's preferences:\n\n"

    for idx, match in enumerate(qdrant_matches, 1):
        payload = match.payload

        zipcode = payload.get("zipcode", "Unknown")
        crime_count = payload.get("crime_count", "Unknown")
        crimes = list(payload.get("crime_breakdown", {}).keys())[:3]

        neighborhoods_info = payload.get("neighborhoods_info", [])
        first_neighborhood = neighborhoods_info[0] if neighborhoods_info else {}

        average_value = first_neighborhood.get("average_value", "Unknown")
        neighborhood_name = first_neighborhood.get("neighborhood", "Unknown")

        businesses = businesses_lookup.get(zipcode, [])

        businesses_text = ", ".join(businesses) if businesses else "No major businesses found"

        zillow_link = f"https://www.zillow.com/homes/{neighborhood_name.replace(' ', '-')}_rb/"

        context += (
            f"{idx}. {neighborhood_name} (Zipcode: {zipcode})\n"
            f"   - Average Home Price: {average_value}\n"
            f"   - Crime Count: {crime_count}\n"
            f"   - Common Crimes: {', '.join(crimes)}\n"
            f"   - Top Amenities Nearby: {businesses_text}\n\n"
            f"   - Zillow Link: {zillow_link}\n\n"
        )

    return context
