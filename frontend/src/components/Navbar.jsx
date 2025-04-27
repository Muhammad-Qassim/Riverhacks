import React from "react";

function Navbar() {
  return (
    <nav className="relative self-stretch w-full font-medium bg-stone-50 bg-opacity-80 max-md:max-w-full">
      <div className="flex flex-wrap items-center px-8 py-2 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-2 items-center self-stretch my-auto text-4xl text-black whitespace-nowrap">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/2cacb14435653bf312f1cb554f564af67092f402?placeholderIfAbsent=true"
            className="object-contain shrink-0 self-stretch my-auto aspect-[0.98] min-h-[41px] w-[41px]"
            alt="Safe Move Logo"
          />
          <h1 className="self-stretch my-auto">Safe</h1>
          <h1 className="self-stretch my-auto">Move</h1>
        </div>
        <button className="gap-2.5 self-stretch px-5 py-2 my-auto ml-auto text-base leading-relaxed text-center rounded-lg bg-zinc-900 text-stone-50">
          Sign up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
