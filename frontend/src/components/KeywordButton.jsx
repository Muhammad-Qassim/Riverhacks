import React from "react";

function KeywordButton({ icon, text, extraClasses = "px-5" }) {
  return (
    <button className="flex flex-col justify-center self-stretch py-3 my-auto border border-solid bg-stone-100 border-stone-200 rounded-[11791px] w-[183px] max-sm:mx-auto ${extraClasses}">
      <div className="flex gap-1.5 items-center">
        <img
          src={icon}
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
          alt={`${text} icon`}
        />
        <span className="self-stretch my-auto w-[120px]">{text}</span>
      </div>
    </button>
  );
}

export default KeywordButton;