import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import { PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/Silce";
import { setSelected, setViewSelect } from "@/utility/reduxFn";

function VideoPlayer({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div className="relative w-[150px] h-[150px] mx-auto flex justify-center items-center bg-black rounded-lg">
      <div className="absolute flex justify-center items-center bg-black/45 w-full h-full z-2 rounded-lg">
        <PlayIcon fill="white" stroke="white" />
      </div>
      <video ref={videoRef} width={150} height={150} src={url} className="z-0 select-none w-full h-full object-cover rounded-lg bg-gray-600 pointer-events-none" onContextMenu={(e) => e.preventDefault()} preload="metadata" />
    </div>
  );
}

export default function Gallery() {
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({});
  const { fileType, fileUrls, viewSelectBox, view, page, selected } = useSelector((state: StoreState) => state);

  const router = useRouter();

  const handeleCheck = (index: number, url: string) => {
    if (checked[index]) {
      setChecked((pre) => ({ ...pre, [index]: false }));
      setSelected(selected.filter((item) => item !== url));
    } else {
      setSelected([...selected, url]);
      setChecked((pre) => ({ ...pre, [index]: true }));
    }
  };

  const handlePopState = useCallback(
    (e: PopStateEvent) => {
      if (viewSelectBox) {
        e.preventDefault();
        window.history.pushState(null, "", window.location.pathname);
        router.replace("/files/image");
        setViewSelect(false);
      }
    },
    [router, viewSelectBox]
  );
  useEffect(() => {
    if (!viewSelectBox) setChecked({});
  }, [viewSelectBox]);
  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router, handlePopState]);

  return (
    <>
      <div className="flex flex-wrap px-4 my-2 gap-2 justify-center items-center">
        {fileUrls.map((url, index) => {
          if (index > view * page + 11) return;
          return (
            <div key={index}>
              {viewSelectBox && (
                <div className="w-[150px] h-[150px] mx-auto absolute z-5 bg-white/40 p-3" onClick={() => handeleCheck(index, url)}>
                  <input type="checkbox" checked={checked[index] || false} readOnly className="h-6 w-6 rounded-lg" />
                </div>
              )}
              <ImageCarousel index={index}>
                <div>{fileType === "video" ? <VideoPlayer url={url} /> : <div className="relative w-[150px] h-[150px] mx-auto">{<Image width={150} height={150} src={url} alt="img" loading="lazy" className="inset-0 w-full h-full object-cover rounded-lg bg-gray-600 " />}</div>}</div>
              </ImageCarousel>
            </div>
          );
        })}
      </div>
    </>
  );
}
