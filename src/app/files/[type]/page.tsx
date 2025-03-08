"use client";
import Gallery from "@/components/Gallery";
import LoadingSpinner from "@/components/LoadingSpinner";
import useViewFiles from "@/hooks/useViewFiles";
import { Loader } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { TopFilesNav } from "@/components/TopFilesNav";

export type ViewFilesBTNPropsType = {
  view: number;
  setView: React.Dispatch<React.SetStateAction<number>>;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function FileTypePage() {
  const { fileType, fileUrls, fileQuery, setFilesUrls } = useViewFiles();
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const [view, setView] = useState(6);
  const [viewSelectBox, setViewSelect] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const max = fileUrls.length;
    console.log(inView);
    if (inView && page * view < max) {
      setPage((pre) => pre + 1);
    }
  }, [inView, fileUrls, view]);

  if (fileType !== "video" && fileType !== "image") return <>wrong</>;
  if (fileQuery.error) return <>{fileQuery.error.message}</>;
  return (
    <div>
      <TopFilesNav ViewFilesBTNProps={{ view, setView, selected, setSelected }} loadImage={true} viewSelectBox={viewSelectBox} setViewSelect={setViewSelect} />
      {fileQuery.isLoading && <LoadingSpinner className="w-screen h-screen absolute z-50 bg-white/25" />}
      {fileQuery.data && fileUrls && <Gallery fileType={fileType} fileUrls={fileUrls} download={true} setFilesUrls={setFilesUrls} page={page} view={view} setViewSelect={setViewSelect} viewSelectBox={viewSelectBox} selected={selected} setSelected={setSelected} />}
      {fileQuery.data && <div ref={ref}></div>}
      {fileQuery.data && page * view < fileUrls.length && (
        <div className="h-24 flex justify-center items-center">
          <Loader className="animate-spin" stroke="black" fill="black" />
        </div>
      )}
    </div>
  );
}
