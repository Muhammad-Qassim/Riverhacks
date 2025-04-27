import React from "react";

function Footer() {
  return (
    <footer className="flex relative flex-col justify-center p-10 mt-16 w-full rounded-3xl border-2 border-solid bg-stone-50 border-stone-100 max-w-[1660px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <nav className="px-11 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-50 items-start max-md:max-w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/7e0f023005b2cb5278b02b6f530025d81ec86251?placeholderIfAbsent=true"
            className="object-contain shrink-0 aspect-[0.98] min-h-[41px] w-[41px]"
            alt="Safe Move Logo"
          />

          <div className="text-lg w-[216px]">
            <h3 className="font-medium leading-loose text-zinc-900">Company</h3>
            <ul className="flex flex-col items-start py-2 pr-11 mt-3.5 w-full leading-relaxed text-zinc-600 max-md:pr-5">
              <li className="text-lg leading-loose">
                <a href="#">About Us</a>
              </li>
              <li className="mt-7">
                <a href="#">Blog</a>
              </li>
              <li className="mt-6">
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>

          <div className="w-[216px]">
            <h3 className="text-lg font-medium leading-loose text-zinc-900">
              Resources
            </h3>
            <ul className="flex flex-col items-start py-2 pr-11 mt-3.5 w-full text-lg leading-loose text-zinc-600 max-md:pr-5">
              <li>
                <a href="#">Launched</a>
              </li>
              <li className="mt-7 text-lg leading-loose">
                <a href="#">Enterprise</a>
              </li>
              <li className="flex gap-2 mt-6 whitespace-nowrap">
                <a href="#" className="my-auto">
                  Learn
                </a>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/d4dbef711a02983c7bd42dbc1c90c0f87f834dfa?placeholderIfAbsent=true"
                  className="object-contain shrink-0 aspect-square w-[19px]"
                  alt="External link"
                />
              </li>
            </ul>
          </div>

          <div className="w-[216px]">
            <h3 className="text-lg font-medium leading-loose text-zinc-900">
              Legal
            </h3>
            <ul className="flex flex-col items-start py-2 pr-11 mt-3.5 w-full text-lg text-zinc-600 max-md:pr-5">
              <li className="leading-loose">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="mt-7 text-lg leading-relaxed">
                <a href="#">Terms & Conditions</a>
              </li>
              <li className="mt-8 leading-loose">
                <a href="#">Report Abuse</a>
              </li>
            </ul>
          </div>

          <div className="text-lg w-[216px]" />
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
