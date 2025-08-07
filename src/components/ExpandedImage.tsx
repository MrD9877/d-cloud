/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

export default function ExpandedImage({ url, setExpand }: { url: string; setExpand: React.Dispatch<React.SetStateAction<string | undefined>> }) {
  return (
    <div className="absolute top-0 left-0 z-[1000] bg-black w-screen h-screen flex justify-center items-center ">
      <nav className="text-white absolute top-0 w-full flex justify-end p-8 z-[1001]">
        <button
          onClick={() => {
            setExpand(undefined);
          }}
          className="px-1.5 py-1 bg-white w-fit rounded-full opacity-65 "
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8L8 16M8.00001 8L16 16" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>
      <img src={url} alt="image" className="w-full h-full object-contain pointer-events-none" />
    </div>
  );
}
