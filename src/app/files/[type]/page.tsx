"use client";
import Gallery from "@/components/Gallery";
import LoadingSpinner from "@/components/LoadingSpinner";
import useViewFiles from "@/hooks/useViewFiles";
import { Loader } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { TopFilesNav } from "@/components/TopFilesNav";
import { setDownLoad, setPage } from "@/utility/reduxFn";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/Silce";

export default function FileTypePage() {
  const { fileQuery } = useViewFiles();
  const { ref, inView } = useInView();
  const { fileType, fileUrls, view, page, loading } = useSelector((state: StoreState) => state);

  useEffect(() => {
    const max = fileUrls.length;
    if (inView && page * view < max) {
      setPage(page + 1);
    }
  }, [inView, fileUrls, view]);

  useEffect(() => {
    setDownLoad(true);
  }, []);
  if (fileType !== "video" && fileType !== "image") return <>wrong</>;
  if (fileQuery.error) return <>{fileQuery.error.message}</>;
  return (
    <div>
      {loading && <LoadingSpinner className="w-screen h-full absolute z-[100] bg-white/50 text-black md:w-full" />}
      <TopFilesNav />
      {/* {fileQuery.isLoading && <LoadingSpinner className="w-screen h-screen absolute z-50 bg-white/25" />} */}
      {fileQuery.data && fileUrls && <Gallery />}
      {fileQuery.data && <div ref={ref}></div>}
      {fileQuery.data && page * view < fileUrls.length && (
        <div className="h-24 flex justify-center items-center">
          <Loader className="animate-spin" stroke="black" fill="black" />
        </div>
      )}
    </div>
  );
}
