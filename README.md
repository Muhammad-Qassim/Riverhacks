# 🏡Move with *Safe Move*

An AI-powered chatbot that helps users find the perfect place to live in Austin, Texas — available on the web and via SMS!  
Built for **RiverHack 2025**.

---

## 🚀 Features

✅ Helps users decide between **renting** or **buying** a home  
✅ Takes **budget input** (monthly rent or total purchase price)  
✅ Filters areas by nearby services (cafes, gyms, grocery stores)  
✅ Provides **crime rate data** from the City of Austin  
✅ Links to live listings on **Zillow**  
✅ Sends results via **SMS using Loop Messaging** or through a web interface

---

## 💻 Tech Stack

- **Frontend:** React.js (user-friendly web interface)  
- **Backend:** Python (API handling + data processing)  
- **Nearby services search:** SerpApi (Google Maps, Yelp engines)  
- **Crime data:** Austin Open Data Portal  
- **Real estate listings:** Zillow (via Google Search)  
- **SMS messaging:** Loop Messaging Platform  
- **Security:** dotenv for API key management

---

## 📊 Crime Data Processing

- Loads Census Block Group → ZIP Code mapping (`with_zipcodes.csv`)  
- Queries Austin Crime API for incident reports  
- Maps crime counts to ZIP Codes  
- Aggregates data and saves to `crime_counts_by_zip.csv`  
- Provides users with actionable neighborhood safety scores

