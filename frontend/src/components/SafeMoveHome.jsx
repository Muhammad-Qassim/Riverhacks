"use client";
import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ResourcesSection from "./ResourcesSection";
import Footer from "./Footer";

function SafeMoveHome() {
  return (
    <div className="flex relative flex-col items-center pb-5 min-h-[1703px]">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/5656d63d216a4da9bc3276dd44e000a5/7d4821e7593a7e72ff93a733d5fd4ff47613bce3?placeholderIfAbsent=true"
        className="object-cover absolute inset-0 size-full pointer-events-none"
        
        alt="Background"
      />
      <Navbar />
      <HeroSection />
      <ResourcesSection />
      <Footer />
    </div>
  );
}

export default SafeMoveHome;
