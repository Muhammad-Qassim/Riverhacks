import json
import time
import random
import undetected_chromedriver as uc

from bs4 import BeautifulSoup

def scrape_homes_com_neighborhoods(zipcode, driver):
    """Scrape neighborhoods + average home values using Selenium driver."""
    url = f"https://www.homes.com/neighborhood-search/austin-tx/{zipcode}/"
    
    try:
        driver.get(url)
        time.sleep(3)  # Let page load fully
        
        soup = BeautifulSoup(driver.page_source, "html.parser")
        neighborhoods_data = []

        placards = soup.find_all("li", class_="neighborhood-search-placards=comtainer")
        for placard in placards:
            name_tag = placard.find("p", class_="neighborhood-name")
            name = name_tag.get_text(strip=True) if name_tag else None

            average_value = None    
            for li in placard.find_all("li"):
                label_tag = li.find("p", class_="label")
                value_tag = li.find("p", class_="detail-value")
                if label_tag and value_tag:
                    if "Average Value" in label_tag.get_text(strip=True):
                        average_value = value_tag.get_text(strip=True)
                        break

            if name:
                neighborhoods_data.append({
                    "neighborhood": name,
                    "average_value": average_value
                })

        return neighborhoods_data
    
    except Exception as e:
        print(f"[ERROR] Failed to scrape {zipcode}: {e}")
        return []


def load_zipcodes_from_crime_data(file_path):
    """Load and extract unique zipcodes from crime dataset."""
    with open(file_path, 'r') as f:
        crime_data = json.load(f)
    
    zipcodes = []
    for entry in crime_data:
        if "zipcode" in entry:
            zipcodes.append(entry["zipcode"])
    
    return list(set(zipcodes))


def scrape_all_zipcodes(crime_json_path, output_file="scraped_neighborhoods_data.json", sleep_between=5):
    """Main scraper logic."""
    options = uc.ChromeOptions()
    options.add_argument("--headless")  
    driver = uc.Chrome(options=options)

    zipcodes = load_zipcodes_from_crime_data(crime_json_path)
    print(f"[INFO] Found {len(zipcodes)} zipcodes: {zipcodes}")

    all_data = []

    for idx, zipcode in enumerate(zipcodes):
        print(f"[{idx+1}/{len(zipcodes)}] Scraping {zipcode}...")
        neighborhoods = scrape_homes_com_neighborhoods(zipcode, driver)

        entry = {
            "zipcode": zipcode,
            "neighborhoods_info": neighborhoods
        }
        all_data.append(entry)

        sleep_time = sleep_between + random.uniform(0, 2)
        print(f"[INFO] Sleeping for {sleep_time:.1f} seconds...\n")
        time.sleep(sleep_time)

    driver.quit()

    with open(output_file, "w") as f:
        json.dump(all_data, f, indent=2)
    
    print(f"[SUCCESS] Scraped data saved to {output_file}")


if __name__ == "__main__":
    crime_json_path = "crime_summary.json"
    scrape_all_zipcodes(crime_json_path)
