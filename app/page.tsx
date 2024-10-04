import Image from "next/image";
import React, { useState, useEffect } from "react";
import TDDKataCalculator from "@/components/TDDKataCalculator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white py-[5vh]">
      <div className=" flex flex-col items-center w-full">
        <h1 className=" text-4xl text-black font-semibold">
          Incubyte Assignment
        </h1>
        <p className=" text-base mt-2 text-gray-700">Anirudh Joshi</p>

        <div className=" flex flex-col items-center w-11/12 lg:w-1/2 mt-[10vh] ">
          <TDDKataCalculator />
        </div>
      </div>
    </main>
  );
}
