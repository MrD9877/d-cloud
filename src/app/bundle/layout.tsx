"use client";

import React, { ReactNode, Suspense } from "react";
import TableSkeleton from "@/components/ui/TableSkeleton";
import BundleNavBar from "@/components/BundleNavBar";
import NavBarSkeleton from "@/components/ui/NavBarSkeleton";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-screen h-full ">
      <Suspense fallback={<NavBarSkeleton />}>
        <BundleNavBar />
      </Suspense>
      <main className="mt-[80px]">
        <Suspense fallback={<TableSkeleton />}>{children}</Suspense>
      </main>
    </div>
  );
}
