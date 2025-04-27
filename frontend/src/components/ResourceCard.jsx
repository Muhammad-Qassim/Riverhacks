import React from "react";

function ResourceCard({ image, logo, title, remixes, link }) {
  return (
    <article className="flex flex-col grow shrink self-stretch py-1 my-auto min-w-60 w-[300px] transform transition-transform duration-300 hover:scale-95">
      <a href={link} className="   rounded-2xl bg-stone-100">
        <img
          src={image}
          className="object-contain w-full rounded-2xl aspect-[1.78]"
          alt={title}
        />
      </a>
      <div className="flex gap-2.5 items-start self-start mt-4">
        <img
          src={logo}
          className="object-contain shrink-0 mt-1 aspect-square rounded-[11791px] w-[42px]"
          alt={`${title} logo`}
        />
        <div className="flex flex-col">
          <h3 className="text-lg leading-loose text-zinc-900">{title}</h3>
          <p className="self-start mt-2.5 text-base leading-relaxed text-zinc-600">
            {remixes}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ResourceCard;
