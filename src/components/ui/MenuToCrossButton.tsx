import React, { useState } from "react";
import { cn } from "@/lib/utils";
export default function MenuToCrossButton({ className, ...props }: React.ComponentProps<"label">) {
  const [checked, setChecked] = useState(false);

  const spanStyle: React.CSSProperties = {
    display: "block",
    position: "absolute",
    height: "4px",
    width: "100%",
    background: "black",
    borderRadius: "9px",
    opacity: 1,
    left: 0,
    transform: "rotate(0deg)",
    transition: "0.25s ease-in-out",
  };

  const span1Style: React.CSSProperties = {
    top: "0px",
    transformOrigin: "left center",
  };
  const span2Style: React.CSSProperties = {
    top: "50%",
    transform: "translateY(-50%)",
    transformOrigin: "left center",
  };
  const span3Style: React.CSSProperties = {
    top: "100%",
    transformOrigin: "left center",
    transform: "translateY(-100%)",
  };

  const span1CheckedStyle: React.CSSProperties = {
    transform: "rotate(45deg)",
    top: "0px",
    left: "5px",
  };

  const span2CheckedStyle: React.CSSProperties = {
    width: "0%",
    opacity: 0,
  };

  const span3CheckedStyle: React.CSSProperties = {
    transform: "rotate(-45deg)",
    top: "28px",
    left: "5px",
  };

  return (
    <div>
      <label className={cn("burger relative w-[40px] h-[30px] bg-transparent cursor-pointer block", className)} htmlFor="burger" {...props}>
        <input onChange={(e) => setChecked(e.target.checked)} type="checkbox" id="burger" className="hidden" />
        <span style={!checked ? { ...spanStyle, ...span1Style } : { ...spanStyle, ...span1Style, ...span1CheckedStyle }}></span>
        <span style={!checked ? { ...spanStyle, ...span2Style } : { ...spanStyle, ...span2Style, ...span2CheckedStyle }}></span>
        <span style={!checked ? { ...spanStyle, ...span3Style } : { ...spanStyle, ...span3Style, ...span3CheckedStyle }}></span>
      </label>
    </div>
  );
}
