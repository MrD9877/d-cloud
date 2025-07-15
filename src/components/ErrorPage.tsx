"use client";
import React, { useEffect } from "react";
import ErrorPage from "./ui/ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { setError, StoreState } from "@/redux/Silce";
import { usePathname } from "next/navigation";

export default function ErrorPageMain() {
  const error = useSelector((state: StoreState) => state.error);
  const pathname = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setError(null));
  }, [pathname, dispatch]);
  return (
    <>
      {error && (
        <div className="absolute top-0 left-0 z-[2000]">
          <ErrorPage error={error} />
        </div>
      )}
    </>
  );
}
