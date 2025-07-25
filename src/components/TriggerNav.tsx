"use client";
import React from "react";
import { useSidebar } from "./ui/sidebar";
import { AlignJustify } from "lucide-react";

export default function TriggerNav() {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-full p-4 md:hidden">
      <button onClick={() => toggleSidebar()}>
        <AlignJustify className="h-[30px] w-[30px]" />
      </button>
    </div>
  );
}
