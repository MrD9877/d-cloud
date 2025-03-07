import { LoaderCircle } from "lucide-react";
import React from "react";

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`flex justify-center items-center w-full h-full bg-white text-black ${className}`}>
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
