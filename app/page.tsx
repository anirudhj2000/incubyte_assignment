"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

function add(numbers: string): number {
  if (numbers === "") return 0;

  let delimiter = /,|\n/;
  let numberString = numbers;

  if (numbers.startsWith("//")) {
    const delimiterEndIndex = numbers.split("//")[1].indexOf("\\");
    delimiter = new RegExp(numbers.substring(2, delimiterEndIndex + 2));
    delimiter = new RegExp(delimiter.source + "|\n");
    numberString = numbers.substring(delimiterEndIndex + 4);

    console.log("delimiter", delimiter, delimiterEndIndex);
  }

  const numArray = numberString.split(delimiter);
  console.log("numberString", numberString, numArray);

  const negativeNumbers: number[] = [];
  const result = numArray.reduce((sum, current) => {
    const num = parseInt(current.trim(), 10);

    if (isNaN(num)) return sum;

    if (num < 0) negativeNumbers.push(num);

    return sum + num;
  }, 0);

  if (negativeNumbers.length > 0) {
    throw new Error(
      `negative numbers not allowed: ${negativeNumbers.join(", ")}`
    );
  }

  return result;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const sum = add(input);
      setResult(sum);
      setError(null); // Reset error if input is correct
    } catch (err: any) {
      setError(err.message);
      setResult(null); // Reset result if there is an error
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white py-[5vh]">
      <div className=" flex flex-col items-center w-full">
        <h1 className=" text-4xl text-black font-semibold">
          Incubyte Assignment
        </h1>
        <p className=" text-base mt-2 text-gray-700">Anirudh Joshi</p>

        <div className=" flex flex-col w-11/12 lg:w-6/12 bg-gray-100 p-4 border-[0.5px] border-[#c7c7c7] mt-[10vh] rounded-xl">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter comma-separated numbers"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 border-[0.5px] border-[#c7c7c7] rounded-lg mb-4 text-black"
            />
            <div className=" flex flex-row justify-center gap-x-4">
              <button
                type="button"
                onClick={() => {
                  setInput("");
                  setResult(null);
                }}
                className="border-[1px] border-red-500 text-red-500 px-4 py-1 rounded-md"
              >
                Clear
              </button>
              <button type="submit" className="bg-black px-4 py-1 rounded-md">
                Calculate
              </button>
            </div>
          </form>
          {result !== null && (
            <h2 className=" text-black text-base">Result: {result}</h2>
          )}
          {error && <p className=" text-base text-red-400">Error: {error}</p>}
        </div>
      </div>
    </main>
  );
}
