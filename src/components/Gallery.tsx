import Image from "next/image";
import React, { useRef } from "react";
import ImageCarousel from "./ImageCarousel";
import { PlayIcon } from "lucide-react";

function VideoPlayer({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div className="relative w-[150] h-[150] mx-auto flex justify-center items-center bg-black">
      <div className="absolute flex justify-center items-center bg-black/45 w-full h-full z-10">
        <PlayIcon fill="white" stroke="white" />
      </div>
      <video ref={videoRef} width={150} height={150} src={url} className="z-0" />
    </div>
  );
}

export default function Gallery({ fileUrls, fileType, dowload = false }: { fileUrls: string[]; fileType: "image" | "video"; dowload?: boolean }) {
  return (
    <>
      <div className="flex flex-wrap px-4 my-2 gap-2 justify-center items-center">
        {fileUrls.map((url, index) => {
          return (
            <ImageCarousel key={index} fileUrls={fileUrls} index={index} fileType={fileType} dowload={dowload}>
              {fileType === "video" ? (
                <VideoPlayer url={url} />
              ) : (
                <div className="relative w-[100] h-[100] mx-auto">
                  <Image width={1000} height={1000} src={url} alt="img" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                </div>
              )}
            </ImageCarousel>
          );
        })}
      </div>
    </>
  );
}
