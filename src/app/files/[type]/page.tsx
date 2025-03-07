"use client";
import Gallery from "@/components/Gallery";
import LoadingSpinner from "@/components/LoadingSpinner";
import useViewFiles from "@/hooks/useViewFiles";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";

export default function FileTypePage() {
  const { fileType, fileUrls, fileQuery, nextPage, isLastPage } = useViewFiles();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!isLastPage) {
      nextPage();
    }
  }, [inView, nextPage, isLastPage]);

  if (fileType !== "video" && fileType !== "image") return <>wrong</>;
  if (fileQuery.error) return <>{fileQuery.error.message}</>;
  return (
    <div>
      {fileQuery.isLoading && <LoadingSpinner className="w-screen h-screen absolute z-50 bg-white/25" />}
      {fileQuery.data && fileUrls && <Gallery fileType={fileType} fileUrls={fileUrls} dowload={true} />}
      <div ref={ref}></div>
      {/* <DownloadButton /> */}
    </div>
  );
}
