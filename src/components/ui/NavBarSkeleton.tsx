import React from "react";
import { Skeleton } from "./skeleton";

export default function NavBarSkeleton() {
  return (
    <div className="w-full justify-center flex h-[50px]">
      <Skeleton className="w-4/5 h-full" />
    </div>
  );
}
