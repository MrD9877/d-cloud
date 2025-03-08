import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import { PlayIcon } from "lucide-react";
import { createContext } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useLongPress } from "react-use";
import { useRouter } from "next/navigation";

interface FileContextType {
  fileType: "image" | "video";
  download: boolean;
  setFilesUrls: React.Dispatch<React.SetStateAction<string[]>>;
  fileUrls: string[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Gallery {
  fileUrls: string[];
  fileType: "image" | "video";
  download?: boolean;
  setFilesUrls: React.Dispatch<React.SetStateAction<string[]>>;
  view?: number;
  page?: number;
}

export const FileContext = createContext<FileContextType | undefined>(undefined);

function VideoPlayer({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div className="relative w-[150px] h-[150px] mx-auto flex justify-center items-center bg-black rounded-lg">
      <div className="absolute flex justify-center items-center bg-black/45 w-full h-full z-10 rounded-lg">
        <PlayIcon fill="white" stroke="white" />
      </div>
      <video ref={videoRef} width={150} height={150} src={url} className="z-0 select-none w-full h-full object-cover rounded-lg bg-gray-600 pointer-events-none" onContextMenu={(e) => e.preventDefault()} preload="metadata" />
    </div>
  );
}

export default function Gallery({ fileUrls, fileType, download = false, setFilesUrls, view = 50, page = 1 }: Gallery) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({});
  const [viewSelectBox, setViewSelect] = useState(false);
  const router = useRouter();
  const longPressHandlers = useLongPress(() => {
    setViewSelect(true);
  });
  const handeleCheck = (index: number, url: string) => {
    if (checked[index]) {
      setChecked((pre) => ({ ...pre, [index]: false }));
      setSelected((pre) => pre.filter((item) => item !== url));
    } else {
      setSelected((pre) => [...pre, url]);
      setChecked((pre) => ({ ...pre, [index]: true }));
    }
  };
  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        // Will run when leaving the current page; on back/forward actions
        // Add your logic here, like toggling the modal state
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);
  return (
    <>
      <div className="flex flex-wrap px-4 my-2 gap-2 justify-center items-center">
        {loading && <LoadingSpinner className="w-screen h-full absolute z-[100] bg-white/50 text-black" />}
        <FileContext.Provider value={{ fileType, download, setFilesUrls, fileUrls, setLoading }}>
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
                  <div {...longPressHandlers}>{fileType === "video" ? <VideoPlayer url={url} /> : <div className="relative w-[150px] h-[150px] mx-auto">{<Image width={150} height={150} src={url} alt="img" loading="lazy" onContextMenu={(e) => e.preventDefault()} className="absolute  inset-0 w-full h-full object-cover rounded-lg bg-gray-600 " />}</div>}</div>
                </ImageCarousel>
              </div>
            );
          })}
        </FileContext.Provider>
      </div>
    </>
  );
}
