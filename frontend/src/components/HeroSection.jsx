"use client";
import React from "react";
import KeywordButton from "./KeywordButton";

function HeroSection() {
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



{ /* This is the search bar */ }



      <div className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex overflow-hidden flex-wrap gap-16 items-end px-3 py-2.5 w-full rounded-2xl border border-solid bg-stone-100 border-zinc-900 border-opacity-20 shadow-[0px_18px_29px_rgba(0,0,0,0.04)] max-md:max-w-full max-sm:mx-auto max-sm:w-4/5 max-sm:max-w-[80%]">
        <input
            type="text"
            placeholder="Enter your budget and what you want nearby…"
            className="overflow-hidden grow shrink self-stretch px-2.5 text-2xl text-black rounded-lg min-h-[26px] min-w-60 w-[821px] max-md:max-w-full bg-stone-100 focus:outline-none"
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
              className="object-contain shrink-0 self-stretch my-auto aspect-[5.24] w-[68px]"
              alt="AI Provider 2"
            />
          </div>
          <div className="flex flex-col grow shrink justify-center py-0.5 rounded-lg w-[76px]">
            <div className="flex w-full min-h-6" />
          </div>
          <button className="flex gap-1.5 items-center p-1 text-base font-medium leading-loose text-center whitespace-nowrap rounded-lg text-zinc-900">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/3d443f4b4bf46b04e6932117a9c8a4f4d7315d90?placeholderIfAbsent=true"
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[19px]"
              alt="Public Icon"
            />
            <span className="self-stretch my-auto w-[46px]">Public</span>
          </button>
          
          <button className="flex grow shrink gap-2.5 items-center p-1 w-[30px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/fd0928e5915c6143c59e72672002eb07aaa5f005?placeholderIfAbsent=true"
              className="object-contain self-stretch my-auto aspect-square w-[30px]"
              alt="Search Icon"
            />
          </button>

  





        
          </div>
        <div className="flex flex-nowrap justify-center items-center mt-10 gap-4 text-sm leading-loose text-zinc-900 overflow-x-auto">
          <KeywordButton
            icon="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/fa353910ea10b411098ae8a1d3ea3cb129f176be?placeholderIfAbsent=true"
            text="Coffee Shops"
            extraClasses="flex flex-col items-center justify-center gap-2 p-4 rounded-md bg-white shadow-md w-[100px] h-[100px]"
          />
          <KeywordButton
            icon="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/501535e6985b053837e25eb9391685b33b5b6598?placeholderIfAbsent=true"
            text="Hiking Trails"
            extraClasses="flex flex-col items-center justify-center gap-2 p-4 rounded-md bg-white shadow-md w-[100px] h-[100px]"
          />
          <KeywordButton
            icon="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/53c88975b44755049af9a820a0d40f60d473aff7?placeholderIfAbsent=true"
            text="Shopping"
            extraClasses="flex flex-col items-center justify-center gap-2 p-4 rounded-md bg-white shadow-md w-[100px] h-[100px]"
          />
          <KeywordButton
            icon="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/8c9530948ee36c8208dc1baa5fd4b779676c9907?placeholderIfAbsent=true"
            text="Beauty Salons"
            extraClasses="flex flex-col items-center justify-center gap-2 p-4 rounded-md bg-white shadow-md w-[100px] h-[100px]"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
