import React from "react";
import ResourceCard from "./ResourceCard";

function ResourcesSection() {
  const resources = [
    {
      id: 1,
      image:
        "https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/7e9d4d114440eab2d1ee737524caa498d92eaa3f?placeholderIfAbsent=true",
      logo: "https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/6b9a4b7db470e5e2266ed019f88211f71a99d84b?placeholderIfAbsent=true",
      title: "Google Maps API",
      remixes: "303 Remixes",
    },
    {
      id: 2,
      image:
        "https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/c67f0e2c0fb1a52980cc985b13796ff6de1d735a?placeholderIfAbsent=true",
      logo: "https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/36ab419d167bf1332ecedf638a36d67019596203?placeholderIfAbsent=true",
      title: "City Of Austin Open Data Portal",
      remixes: "3 Remixes",
    },
    {
      id: 3,
      image:
        "https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/7fe9517f92d9e3f4fb204b8c0f5dab21a56a27af?placeholderIfAbsent=true",
      logo: "https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/810dd738ffb90bfaddfcb410c251ee9f926a9e31?placeholderIfAbsent=true",
      title: "Meta LlaMA",
      remixes: "0 Remixes",
    },
    {
      id: 4,
      image:
        "https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/eb126e4685b6d51b06d3168bfaa8d1c09c9916db?placeholderIfAbsent=true",
      logo: "https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/1d2d3d54294de1172d156aff92cb5d15f5e4548e?placeholderIfAbsent=true",
      title: "Zillow",
      remixes: "152 Remixes",
    },
  ];

  return (
    <section className="flex relative flex-col justify-center p-10 mt-12 w-full rounded-3xl bg-stone-50 max-w-[1660px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="w-full max-md:max-w-full">
        <div className="flex flex-wrap gap-10 justify-between items-center w-full text-zinc-900 max-md:max-w-full">
          <h2 className="self-stretch my-auto text-3xl font-medium leading-loose w-[268px]">
            Our Resources
          </h2>
          <a
            href="#"
            className="self-stretch px-0.5 pt-px pb-3.5 my-auto w-14 text-base leading-loose"
          >
            Full List
          </a>
        </div>
        <div className="mt-6 w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-7 items-center w-full max-md:max-w-full">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                image={resource.image}
                logo={resource.logo}
                title={resource.title}
                remixes={resource.remixes}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResourcesSection;
