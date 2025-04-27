"use client";
import React, { useState } from "react"; // 1. Import useState


// Updated KeywordButton component
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
   // 2. Add state for the search input value
   const [searchValue, setSearchValue] = useState("");


   // 4. Create handler function to update the search value state
   const handleKeywordClick = (keyword) => {
    setSearchValue(prev =>
      // if there's already text, put a space between keyword and existing
      `${keyword}${prev ? " " + prev : ""}`
    );
  };

  



  return (
    <section className="flex relative flex-col mt-36 max-w-full w-[868px] max-md:mt-10">
      <div className="self-center max-w-full w-[705px]">
        <div className="w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-3.5 items-center w-full text-7xl text-black max-md:max-w-full max-md:text-4xl max-sm:flex max-sm:flex-row max-sm:m-5 max-sm:w-full max-sm:max-w-full">
            <h2 className="self-stretch my-auto text-6xl font-medium leading-none text-center max-md:text-4xl">
              Move with
            </h2>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/4c9ddac3872708876bf869ffdf182b11a9896e69?placeholderIfAbsent=true"
              className="object-contain shrink-0 self-stretch my-auto w-20 aspect-square min-h-20"
              alt="Safe Move Icon"
            />
            <h2 className="self-stretch my-auto max-md:text-4xl">Safe</h2>
            <h2 className="self-stretch my-auto max-md:text-4xl">Move</h2>
          </div>
          <p className="flex-1 shrink gap-2.5 self-stretch w-full text-xl leading-loose text-center basis-0 text-zinc-900 max-md:max-w-full max-sm:p-5">
            The Best Neighborhoods based on your preferences
          </p>
        </div>
      </div>

      {/* This is the search bar */}
      <div className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full">
      <div className="flex overflow-hidden flex-wrap items-end px-3 py-2.5 w-full rounded-2xl border border-solid bg-stone-100 border-zinc-900 border-opacity-20 shadow-[0px_18px_29px_rgba(0,0,0,0.04)] max-md:max-w-full max-sm:mx-auto max-sm:w-4/5 max-sm:max-w-[80%] min-h-40">
      
      
          <input
            type="text"
            placeholder="Enter your budget and what you want nearby…"
            className="overflow-hidden grow shrink self-stretch px-2.5 text-2xl text-black rounded-lg min-h-[26px] min-w-60 w-[821px] max-md:max-w-full bg-stone-100 focus:outline-none"
            
             // 3. Control the Input 
             
            value={searchValue} // Bind value to state
            onChange={(e) => setSearchValue(e.target.value)} // Update state on typing
          />


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
              className="p-<number>object-contain shrink-0 self-stretch my-auto aspect-[5.24] w-[68px]"
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

               { /* Updated search button */}
          <button
            className="items-center p-1 w-[40px] cursor-pointer"
            onClick={() => {
              console.log("Search button clicked!");
              // Add your search functionality here
            }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/fd0928e5915c6143c59e72672002eb07aaa5f005?placeholderIfAbsent=true"
              className="object-contain self-stretch my-auto aspect-square w-[100px]"
              alt="Search Icon"
            />
          </button>


        </div>

        {/* Updated keyword buttons section */}
        <div className="flex flex-nowrap justify-center items-center mt-10 gap-4 text-sm leading-loose text-zinc-900 overflow-x-auto">
          <KeywordButton
            icon="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/fa353910ea10b411098ae8a1d3ea3cb129f176be?placeholderIfAbsent=true"
            text="Coffee Shops"
            onClick={() => {
              handleKeywordClick ("Coffee Shops"); // Pass the handler
            }}
            
          />
          <KeywordButton
            icon="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/501535e6985b053837e25eb9391685b33b5b6598?placeholderIfAbsent=true"
            text="Hiking Trails"
            onClick={() => {
              handleKeywordClick ("Hiking Trails"); // Pass the handler
            }}
            
          />
          <KeywordButton
            icon="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/53c88975b44755049af9a820a0d40f60d473aff7?placeholderIfAbsent=true"
            text="Shopping"
            onClick={() => {
              handleKeywordClick ("Shopping"); // Pass the handler
            }}
           
          />
          <KeywordButton
            icon="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/8c9530948ee36c8208dc1baa5fd4b779676c9907?placeholderIfAbsent=true"
            text="Beauty Salons"
            onClick={() => {
              handleKeywordClick ("Beauty Salons"); // Pass the handler
            }}
           
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;