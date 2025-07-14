import React from "react";
import { Skeleton } from "./skeleton";

export default function TableSkeleton() {
  return (
    <div className="w-full justify-center flex h-fit min-w-sm">
      <Skeleton className="w-4/5 h-52" />
    </div>
  );
}
