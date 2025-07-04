"use client";
import React, { useEffect, useState } from "react";
import StatisticsSpeedometers from "./StatisticsSpeedometers";
import Link from "next/link";
import { HeroData } from "../../utils/interfaces/heroDataInterface";
import SERVER_URL from "../../utils/environmentVariables/serverUrl";
import TOKEN from "../../utils/environmentVariables/token";

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData>({
    threads: 0,
    comments: 0,
    users: 0,
  });
  useEffect(() => {
    console.log(SERVER_URL);
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/get-hero-data`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const { threads, comments, users } = heroData;

  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div
        className="hero-map absolute inset-0 bg-cover bg-center z-0 opacity-70 mr-10 h-[600px]"
        style={{
          backgroundImage: 'url("../static/background_img.png")',
          clipPath: "polygon(0% 0%, 15% 0%, 15% 100%, 0% 100%)",
        }}
      />

      <div
        className="hero-map absolute inset-0 bg-cover bg-center z-0 opacity-70 h-[600px]"
        style={{
          backgroundImage: 'url("../static/background_img.png")',
          clipPath: "polygon(55% 0, 100% 0, 100% 100%, 55% 100%)",
        }}
      />

      <div className="relative z-20 flex flex-1 flex-col lg:w-1/2 xl:w-1/2 xl:mr-auto xl:max-w-[25%] ml-[20%] mr-[50%] object-contain ">
        <h1 className="font-extrabold text-4xl lg:text-6xl mb-4">
          Welcome to ThePlace
        </h1>
        <p className="regular-18 mt-2 text-gray-40">
          The place where you can share your voice, virtually.
          <br />
          The place where you can listen to others.
        </p>
        <StatisticsSpeedometers
          totalThreads={threads}
          totalComments={comments}
          totalUsers={users}
        />
        <Link href="/new-post">
          <button className="bg-gray-800 text-white font-semibold py-3 px-8 rounded-md mt-4 hover:bg-gray-700 text-lg sm:h-16 shadow-md">
            Post your thread
          </button>
        </Link>
      </div>
      <div className="gradient-border"></div>
    </section>
  );
};

export default Hero;
