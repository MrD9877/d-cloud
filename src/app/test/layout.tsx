"use client";
import useMediaAccess from "@/hooks/useMediaAccess";
import { useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();

  const key = searchParams.get("key");
  const bundlerId = searchParams.get("bundlerId");
  const mediaPermission = useMediaAccess(null, bundlerId);
  return (
    <div>
      <div>image: {`${mediaPermission?.image}`}</div>
      <div>video: {`${mediaPermission?.video}`}</div>
      {children}
    </div>
  );
}
