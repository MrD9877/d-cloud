"use client";
import Gallery from "@/components/Gallery";
import ErrorPage from "@/components/ui/ErrorPage";
import { setDownLoadState, setFilesUrls, StoreState } from "@/redux/Silce";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBundlerMedia } from "../actions/bundlers/basic";

export default function BundlerPage() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const bundlerId = searchParams.get("bundlerId");
  const fileType = useSelector((state: StoreState) => state.fileType);
  const [error, setError] = useState<string | boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDownLoadState(true));
    dispatch(setFilesUrls([]));
  }, [dispatch]);

  useEffect(() => {
    async function getMedia(fileType: "image" | "video", bundlerId: string | null, key: string | null) {
      const media = await getBundlerMedia({ bundlerId, key, media: fileType });
      console.log(media);
      if (media.error) {
        setError(media.error);
      } else if (media.body) {
        const temp = media.body.map((file) => {
          return `${process.env.NEXT_PUBLIC_AWS_URL}/${file.fileId}`;
        });
        dispatch(setFilesUrls(temp));
      }
    }
    if (fileType) {
      getMedia(fileType, bundlerId, key);
    }
  }, [bundlerId, fileType, key]);

  if (error && typeof error === "string") {
    return <ErrorPage error={error} />;
  }

  return (
    <div className="w-full">
      <Gallery />
    </div>
  );
}
