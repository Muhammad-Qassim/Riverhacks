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
      link: "https://developers.google.com/maps",
    },
    {
      id: 2,
      image:
        "https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/c67f0e2c0fb1a52980cc985b13796ff6de1d735a?placeholderIfAbsent=true",
      logo: "https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/36ab419d167bf1332ecedf638a36d67019596203?placeholderIfAbsent=true",
      title: "City Of Austin Open Data Portal",
      remixes: "3 Remixes",
      link: "https://data.austintexas.gov/",
    },
    {
      id: 3,
      image:
        "https://diplo-media.s3.eu-central-1.amazonaws.com/2025/04/Google-gemini-AI-for-kids-safety.png",
      logo: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/7cf51e188450701.65b6d6991d38d.png",
      title: "Google Gemini",
      remixes: "932 Remixes",
      link: "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiI-67Pm_iMAxUJJUQIHWduALwYABABGgJkeg&co=1&gclid=CjwKCAjwq7fABhB2EiwAwk-YbGqYi2Wvy1vWq30LJu8SwEbuScoo4BYijfogDcx8yV6Z8ADnNz8puxoCDOUQAvD_BwE&ohost=www.google.com&cid=CAESeuD2VC6eVYxKV7NXSVXMQ6ZcQLHiFv15Zg7ZlCcmKe3Zle349mkJ9oDYppIcqTP5S31vQkAHl-hn7im3tWmWGrezDmqqdf4HRxGU2FIHoZo1ZP9JOXMu5NRqF-glPDxGF4t1BUuBede_9nwGn-wttDBWdHiRWvaI16rL&sig=AOD64_0OXsFxi8rNQtusozsWd4B5dWvR0g&q&adurl&ved=2ahUKEwijj6vPm_iMAxVwKkQIHb1XGu4Q0Qx6BAgJEAE",
    },
    {
      id: 4,
      image:
        "https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/eb126e4685b6d51b06d3168bfaa8d1c09c9916db?placeholderIfAbsent=true",
      logo: "https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/1d2d3d54294de1172d156aff92cb5d15f5e4548e?placeholderIfAbsent=true",
      title: "Zillow",
      remixes: "152 Remixes",
      link: "https://www.zillow.com/research/data/",
    },
  ];

  return (
    <section className="flex relative flex-col justify-center p-10 mt-12 w-full rounded-3xl bg-stone-50 max-w-[1660px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="w-full max-md:max-w-full">

      { /* Full List Label */ }        
      <div className="flex flex-wrap gap-10 justify-between items-center w-full text-zinc-900 max-md:max-w-full">
          <h2 className="self-stretch my-auto text-3xl font-medium leading-loose w-[268px]">
            Our Resources
          </h2>
          
          <a
            href="#"
            className="self-stretch px-0.5 pt-px pb-3.5 my-auto w-24 text-base leading-loose"
          >
            Full List
          </a>
        </div>



        <div className="mt-6 w-full max-md:max-w-full">
+          <div className="flex flex-wrap gap-7 w-full max-md:max-w-full"> {/* Changed: Removed items-center */}
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                image={resource.image}
                logo={resource.logo}
                title={resource.title}
                remixes={resource.remixes}
                link={resource.link}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResourcesSection;
