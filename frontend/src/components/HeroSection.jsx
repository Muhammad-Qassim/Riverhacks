"use client";
import React, { useState } from "react";
import axios from "axios";

import "@fontsource/pacifico";

// KeywordButton component remains unchanged
function KeywordButton({ icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center rounded-full bg-white shadow-md px-6 py-3 cursor-pointer"
    >
      <div className="flex items-center justify-center w-6 h-6 mr-3">
        <img
          src={icon}
          alt={`${text} icon`}
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <span className="text-base">{text}</span>
    </button>
  );
}

function HeroSection() {
  // Existing state
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [freeText, setFreeText] = useState("");

  // Add new state for API response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // New state for message history
  const [messageHistory, setMessageHistory] = useState([]);

  // Existing handler functions
  const handleKeywordClick = (keyword) => {
    if (!selectedKeywords.includes(keyword)) {
      setSelectedKeywords((prev) => [...prev, keyword]);
    }
  };

  const removeKeyword = (index) => {
    setSelectedKeywords((prev) => prev.filter((_, i) => i !== index));
  };

  const Message = ({ isUser, content }) => (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`rounded-lg p-4 max-w-[80%] ${
          isUser
            ? "bg-white text-black rounded-br-none"
            : "bg-gray-200 text-black rounded-bl-none"
        }`}
      >
        <div
          className="whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );

  // Add new handler for search with message history
  const handleSearch = async () => {
    // Build the query by combining free text and selected keywords
    const queryText = `${freeText} ${selectedKeywords.join(" ")}`.trim();

    if (!queryText) {
      setError("Please enter a search query or select keywords");
      return;
    }

    // Add user's message to history
    setMessageHistory((prev) => [
      ...prev,
      {
        isUser: true,
        content: queryText,
      },
    ]);

    setLoading(true);
    setError(null);

    try {
      // Use the updated port from your Flask server
      const response = await axios.post(
        "http://127.0.0.1:5001/api/search",
        {
          query: queryText,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Extract the original result
      const originalResult = response.data.result;

      // Find neighborhoods using zip codes as anchors
      const neighborhoods = [];

      // Look for zip code pattern (5 digits in parentheses)
      const zipCodeMatches = originalResult.matchAll(/\((\d{5})\)/g);

      for (const match of zipCodeMatches) {
        const zipCode = match[1]; // The zip code inside the parentheses
        const zipCodeIndex = match.index;

        // Look backwards from the zip code to find the neighborhood name
        // Get a chunk of text (up to 100 chars) before the zip code
        const startIndex = Math.max(0, zipCodeIndex - 100);
        const textChunk = originalResult.substring(startIndex, zipCodeIndex);

        // Find the last sentence fragment or neighborhood name before the zip code
        // This regex looks for capitalized words/phrases that would be neighborhood names
        const neighborhoodMatches = textChunk.match(
          /([A-Z][a-z]+(?:[\s-][A-Z][a-z]+)*)\s*$/
        );

        if (neighborhoodMatches && neighborhoodMatches[1]) {
          const neighborhood = neighborhoodMatches[1].trim();

          // Filter out common non-neighborhood words
          if (
            ![
              "The",
              "And",
              "In",
              "On",
              "At",
              "By",
              "To",
              "For",
              "With",
              "From",
            ].includes(neighborhood)
          ) {
            neighborhoods.push({
              name: neighborhood,
              zipCode: zipCode,
            });
          }
        }
      }

      // Create Zillow links for each neighborhood
      const neighborhoodLinks = neighborhoods.map((item) => {
        const formattedName = item.name
          .replace(/\s+/g, "-")
          .replace(/[^a-zA-Z0-9-]/g, "");
        return {
          name: item.name,
          zipCode: item.zipCode,
          link: `https://www.zillow.com/homes/${formattedName}_rb/`,
        };
      });

      // Append Zillow links to the result if neighborhoods were found
      let enhancedResult = originalResult;

      if (neighborhoodLinks.length > 0) {
        enhancedResult += "\n\n🏠 Explore these neighborhoods on Zillow:\n";
        neighborhoodLinks.forEach((item) => {
          enhancedResult += `\n- ${item.name} (${item.zipCode}): <a href="${item.link}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">${item.name} on Zillow</a>`;
        });
      }

      // Add AI response to message history
      setMessageHistory((prev) => [
        ...prev,
        {
          isUser: false,
          content: enhancedResult,
        },
      ]);

      // Clear input field after successful search
      setFreeText("");
      setSelectedKeywords([]);

      console.log("Search result:", enhancedResult);
      console.log("Extracted neighborhoods:", neighborhoods);
    } catch (err) {
      console.error("Error searching:", err);

      // More descriptive error message
      let errorMessage = "";
      if (
        err.message?.includes("Network Error") ||
        err.message?.includes("CORS")
      ) {
        errorMessage =
          "CORS error: Backend server not allowing requests from this origin. Please check server configuration.";
      } else {
        errorMessage = `Failed to get search results: ${
          err.message || "Unknown error"
        }`;
      }

      setError(errorMessage);

      // Add error message to chat history
      setMessageHistory((prev) => [
        ...prev,
        {
          isUser: false,
          content: `Error: ${errorMessage}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex relative flex-col mt-36 max-w-full w-[868px] max-md:mt-10">
      <div className="self-center max-w-full w-[705px]">
        <div className="w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-2.5 items-center w-full text-7xl text-black max-md:max-w-full max-md:text-4xl max-sm:flex max-sm:flex-row max-sm:m-5 max-sm:w-full max-sm:max-w-full">
            <h2 className="self-stretch my-auto text-6xl font-medium leading-none text-center max-md:text-4xl">
              Move with
            </h2>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/4c9ddac3872708876bf869ffdf182b11a9896e69?placeholderIfAbsent=true"
              className="object-contain shrink-0 self-stretch my-auto w-20 aspect-square min-h-20"
              alt="Safe Move Icon"
            />
            <h2 className="self-stretch my-auto max-md:text-4xl">Safe</h2>
            <h2
              style={{ fontFamily: "'Pacifico', cursive" }}
              className="font-pacificoself-stretch my-auto max-md:text-4xl"
            >
              Move
            </h2>
          </div>
          <p className="flex-1 shrink gap-2.5 self-stretch w-full text-xl leading-loose text-center basis-0 text-zinc-900 max-md:max-w-full max-sm:p-5">
            The Best Neighborhoods based on your preferences
          </p>
        </div>
      </div>

      <div className="bg-stone-100 rounded-2xl">
        {/* Chat history container */}
        {messageHistory.length > 0 && (
          <div className="w-full mt-8 p-6 rounded-2xl overflow-y-scroll max-h-80 drop-shadow-lg">
            {messageHistory.map((message, index) => (
              <Message
                key={index}
                isUser={message.isUser}
                content={message.content}
              />
            ))}
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="rounded-lg p-4 bg-gray-400 text-black rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* This is the search bar */}
        <div className="flex flex-col mt-4 w-full max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-wrap items-end px-3 py-2.5 w-full rounded-2xl border border-solid bg-white border-zinc-900 border-opacity-20 shadow-[0px_18px_29px_rgba(0,0,0,0.04)] max-md:max-w-full max-sm:mx-auto max-sm:w-4/5 max-sm:max-w-[80%] min-h-30">
            {selectedKeywords.map((kw, idx) => (
              <span
                key={idx}
                className="border border-gray-300 rounded-full px-3 py-1 mr-2 mb-2 text-base flex items-center"
              >
                {kw}
                <button
                  onClick={() => removeKeyword(idx)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                  aria-label="Remove keyword"
                >
                  &times;
                </button>
              </span>
            ))}

            <input
              type="text"
              placeholder="Enter your budget and what you want nearby…"
              className="grow shrink self-stretch px-2 text-2xl text-black rounded-lg min-h-[26px] min-w-60 w-[821px] max-md:max-w-full bg-white focus:outline-none"
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            {error &&
              !messageHistory.some((msg) => msg.content.includes(error)) && (
                <div className="mt-2 text-center text-red-500 w-full">
                  <p>{error}</p>
                </div>
              )}

            <div className="flex gap-1.5 items-center text-base font-medium leading-loose text-neutral-500">
              <p className="self-stretch my-auto">Powered by</p>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/ac86f5c6d8d4ad49f3f691546d43f65da6b134d8?placeholderIfAbsent=true"
                className="object-contain shrink-0 self-stretch my-auto aspect-[3.38] w-[54px]"
                alt="AI Provider 1"
              />
              <p className="self-stretch my-auto">&</p>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/896292f620f2a7304d9196db62d8173268891c4e?placeholderIfAbsent=true"
                className="object-contain shrink-0 self-stretch my-auto aspect-[5.24] w-[68px]"
                alt="AI Provider 2"
              />
            </div>
            <div className="flex flex-col grow shrink justify-center py-0.5 rounded-lg w-[76px]">
              <div className="flex w-full min-h-6" />
            </div>

            <button
              className="flex gap-1.5 items-center p-1 text-base font-medium leading-loose text-center whitespace-nowrap rounded-lg text-zinc-900 cursor-pointer"
              onClick={() => {
                console.log("Public button clicked!");
                // Add your functionality for the Public button here
              }}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/3d443f4b4bf46b04e6932117a9c8a4f4d7315d90?placeholderIfAbsent=true"
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[19px]"
                alt="Public Icon"
              />
              <span className="self-stretch my-auto w-[46px]">Public</span>
            </button>

            {/* Updated search button with API call */}
            <button
              className="items-center p-1 w-[40px] cursor-pointer"
              onClick={handleSearch}
              disabled={loading}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/fd0928e5915c6143c59e72672002eb07aaa5f005?placeholderIfAbsent=true"
                className="object-contain self-stretch my-auto aspect-square w-[100px]"
                alt="Search Icon"
              />
            </button>
          </div>
        </div>

        {/* Updated keyword buttons section */}
        {/* <div className="flex flex-nowrap justify-center items-center mt-10 gap-4 text-sm leading-loose text-zinc-900 overflow-x-auto">
          <KeywordButton
            icon="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/fa353910ea10b411098ae8a1d3ea3cb129f176be?placeholderIfAbsent=true"
            text="Coffee Shops"
            onClick={() => {
              handleKeywordClick("Coffee Shops");
            }}
          />
          <KeywordButton
            icon="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/501535e6985b053837e25eb9391685b33b5b6598?placeholderIfAbsent=true"
            text="Hiking Trails"
            onClick={() => {
              handleKeywordClick("Hiking Trails");
            }}
          />
          <KeywordButton
            icon="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/53c88975b44755049af9a820a0d40f60d473aff7?placeholderIfAbsent=true"
            text="Shopping"
            onClick={() => {
              handleKeywordClick("Shopping");
            }}
          />
          <KeywordButton
            icon="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/8c9530948ee36c8208dc1baa5fd4b779676c9907?placeholderIfAbsent=true"
            text="Beauty Salons"
            onClick={() => {
              handleKeywordClick("Beauty Salons");
            }}
          />
        </div> */}
      </div>
    </section>
  );
}

export default HeroSection;
