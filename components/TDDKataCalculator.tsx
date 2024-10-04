"use client";
import React, { useState, useEffect } from "react";

// Logic for add function
// This function caters to all the 9 points mentioned in the https://osherove.com/tdd-kata-1/ specification
function add(numbers: string): number {
  if (numbers === "") return 0;

  let delimiter = /,|\n/;
  let numberString = numbers;

  if (numbers.startsWith("//")) {
    const delimiterEndIndex = numbers.split("//")[1].indexOf("\\");

    let customDelimiter = numbers.substring(2, delimiterEndIndex + 2);
    if (customDelimiter.startsWith("[")) {
      const delimiters = customDelimiter
        .match(/\[([^\]]+)\]/g)!
        .map((d) => d.slice(1, -1));

      const escapedDelimiters = delimiters.map((delim) =>
        delim.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
      );
      delimiter = new RegExp(escapedDelimiters.join("|"));
    } else {
      delimiter = new RegExp(
        customDelimiter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
      );
    }

    delimiter = new RegExp(delimiter.source + "|\n");
    numberString = numbers.substring(delimiterEndIndex + 4);
  }

  numberString = numberString.replace(/\\n/g, "\n");
  const numArray = numberString.split(delimiter);

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

const TDDKataCalculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const sum = add(input);
      setResult(sum);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className=" flex flex-col items-start w-full bg-gray-100 border-[1px] border-[#c7c7c7] p-4 rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className=" flex flex-row items-center rounded-lg justify-start overflow-hidden w-full h-[5vh] border-[1px] border-[#c7c7c7] ">
          <div className=" w-2/6 lg:w-1/6 flex flex-col justify-center items-center h-full  bg-black ">
            <h2 className=" text-white text-base">Input</h2>
          </div>
          <div className=" w-4/6 lg:w-5/6 flex h-full">
            <input
              type="text"
              placeholder="Enter comma-separated numbers"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-full px-4 text-lg text-black"
            />
          </div>
        </div>
        <div className=" flex flex-row items-center rounded-lg justify-start overflow-hidden w-full  mt-4 h-[5vh] border-[1px] border-[#c7c7c7] ">
          <div className=" w-2/6 lg:w-1/6 flex flex-col justify-center items-center h-full  bg-black ">
            <h2 className=" text-white text-base">Output</h2>
          </div>
          <div className=" w-4/6 lg:w-5/6 flex h-full">
            <input
              type="text"
              placeholder="Output"
              value={result || ""}
              disabled
              className="w-full h-full px-4 text-lg text-black"
            />
          </div>
        </div>
        {error && (
          <p className=" text-base text-red-400 mt-2">Error: {error}</p>
        )}

        <div className=" flex flex-row w-full justify-end gap-x-4 mt-4">
          <button
            type="button"
            onClick={() => {
              setInput("");
              setResult(null);
              setError(null);
            }}
            className="border-[1px] border-red-500 text-red-500 w-1/4 py-1 rounded-md"
          >
            Clear
          </button>
          <button type="submit" className="bg-black w-1/4 py-1 rounded-md">
            Calculate
          </button>
        </div>
      </form>
    </div>
  );
};

export default TDDKataCalculator;
