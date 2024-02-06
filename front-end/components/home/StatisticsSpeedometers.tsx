"use client";
import React from "react";
import Number from "./Number";

interface StatisticsSpeedometersProps {
  totalThreads: number;
  totalComments: number;
  totalUsers: number;
}

const StatisticsSpeedometers: React.FC<StatisticsSpeedometersProps> = ({
  totalThreads,
  totalComments,
  totalUsers,
}) => {
  return (
    <div className="flex space-x-20 mt-10 mb-10">
      <Speedometer label="Threads" value={totalThreads} />
      <Speedometer label="Comments" value={totalComments} />
      <Speedometer label="Users" value={totalUsers} />
    </div>
  );
};

interface SpeedometerProps {
  label: string;
  value: number;
}

const Speedometer: React.FC<SpeedometerProps> = ({ label, value }) => {
  return (
    <div className="text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
      <h2 className="text-lg font-bold">{label}</h2>
      <div className="bg-gray-800 opacity-70 h-20 w-20 rounded-full flex items-center justify-center mx-auto shadow-md">
        <span className="text-white text-xl">
          <Number n={value} />
        </span>
      </div>
    </div>
  );
};

export default StatisticsSpeedometers;
