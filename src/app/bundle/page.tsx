"use client";
import Gallery from "@/components/Gallery";
import { setDownLoadState, setError, setFilesUrls, StoreState } from "@/redux/Silce";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBundlerMedia } from "../actions/bundlers/basic";
import { FolderPlus } from "lucide-react";

export default function BundlerPage() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const bundlerId = searchParams.get("bundlerId");
  const fileType = useSelector((state: StoreState) => state.fileType);
  const fileUrls = useSelector((state: StoreState) => state.fileUrls);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDownLoadState(true));
    dispatch(setFilesUrls([]));
  }, [dispatch]);

  useEffect(() => {
    async function getMedia(fileType: "image" | "video", bundlerId: string | null, key: string | null) {
      const media = await getBundlerMedia({ bundlerId, key, media: fileType });
      if (media.error && typeof media.error === "string") {
        dispatch(setError(media.error));
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
  }, [bundlerId, fileType, key, dispatch]);

  return (
    <div className="w-full">
      {fileUrls.length === 0 ? (
        <div className="flex justify-center items-center flex-col">
          <FolderPlus width={40} height={40} stroke="oklch(70.7% .022 261.325)" strokeWidth={1.2} />
          <span>No {fileType}</span>
          <span>Get started by saving a new {fileType}.</span>
        </div>
      ) : (
        <Gallery />
      )}
    </div>
  );
}
