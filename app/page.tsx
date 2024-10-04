import Image from "next/image";
import React, { useState, useEffect } from "react";
import TDDKataCalculator from "@/components/TDDKataCalculator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white py-[5vh]">
      <div className=" flex flex-col items-center w-full">
        <div className=" w-[20vh] h-[10vh] relative">
          <Image
            src="/incubytelogo.svg"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <h1 className=" text-xl lg:text-3xl text-black font-bold text-center px-4">
          Incubyte TDD Assessment - Frontend - Anirudh Joshi
        </h1>

        <a
          href="https://github.com/anirudhj2000/incubyte_assignment"
          target="_blank"
          className="flex flex-row justify-center items-center mt-4 gap-x-2 bg-gray-200 px-2 py-1 rounded-lg "
        >
          <div className=" w-4 h-4 relative">
            <Image
              src="/github-mark.png"
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <p className=" text-black">GitHub Repo</p>
        </a>

        <div className=" flex flex-col items-center w-11/12 lg:w-1/2 mt-[7.5vh] ">
          <TDDKataCalculator />
        </div>

        <div className=" flex flex-col items-start mt-[5vh] w-11/12 lg:w-1/2">
          <p className=" text-black text-2xl">Note:</p>
          <ul className=" list-disc list-inside text-black text-base mt-2">
            <li>Tech Stack used - Next.js, TailwindCSS, TypeScript</li>
            <li>
              The Assignment also includes additional points
              <span className=" underline text-blue-500 ml-2">
                <a href="https://osherove.com/tdd-kata-1/" target="_blank">
                  https://osherove.com/tdd-kata-1/
                </a>
              </span>
            </li>
            <li>
              The Project is Hosted on Vercel. You can check the link on GitHub
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
