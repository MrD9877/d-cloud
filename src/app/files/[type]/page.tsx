"use client";
import Gallery from "@/components/Gallery";
import LoadingSpinner from "@/components/LoadingSpinner";
import useViewFiles from "@/hooks/useViewFiles";
import { Loader } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import SelectDropDown from "@/components/SelectDropDown";
import { AlignJustify } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

function TriggerNav({ setView, view }: { view: number; setView: React.Dispatch<React.SetStateAction<number>> }) {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-screen p-4 h-12 flex items-center ">
      <div className="w-screen p-4 flex justify-between fixed z-10 bg-white">
        <button onClick={() => toggleSidebar()}>
          <AlignJustify className="h-[30px] w-[30px]" />
        </button>
        <SelectDropDown setView={setView} view={view} />
      </div>
    </div>
  );
}
export default function FileTypePage() {
  const { fileType, fileUrls, fileQuery, setFilesUrls } = useViewFiles();
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const [view, setView] = useState(6);
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
      <TriggerNav view={view} setView={setView} />
      {fileQuery.isLoading && <LoadingSpinner className="w-screen h-screen absolute z-50 bg-white/25" />}
      {fileQuery.data && fileUrls && <Gallery fileType={fileType} fileUrls={fileUrls} download={true} setFilesUrls={setFilesUrls} page={page} view={view} />}
      {fileQuery.data && <div ref={ref}></div>}
      {fileQuery.data && page * view < fileUrls.length && (
        <div className="h-24 flex justify-center items-center">
          <Loader className="animate-spin" stroke="black" fill="black" />
        </div>
      )}
    </div>
  );
}
