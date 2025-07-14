"use client";
import Gallery from "@/components/Gallery";
import useFilesBundlers from "@/hooks/useFilesBundlers";
import { setFilesUrls, StoreState } from "@/redux/Silce";
import { Upload } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UploadPage() {
  const searchQuery = useSearchParams();
  const bundlerId = searchQuery.get("bundlerId");
  const key = searchQuery.get("key");
  const fileUrls = useSelector((state: StoreState) => state.fileUrls);
  const { fileSelected, uploadFiles } = useFilesBundlers();
  const fileType = useSelector((state: StoreState) => state.fileType);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilesUrls([]));
  }, []);
  return (
    <div className="w-screen">
      <div className="flex items-center justify-center w-full px-4 my-4 md:w-1/2 md:mx-auto">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">max 10 images</p>
          </div>
          <input id="dropzone-file" className="hidden" onChange={fileSelected} type="file" accept={`${fileType}/*`} multiple />
        </label>
      </div>
      <Gallery />
      {fileUrls && fileUrls.length > 0 && (
        <div className="w-screen md:w-full">
          <button className=" mx-auto flex justify-center gap-2 items-center my-5 bg-blue-700 rounded-lg py-2 px-3" onClick={() => uploadFiles({ key, bundlerId })}>
            UpLoad Files
            <Upload />
          </button>
        </div>
      )}
    </div>
  );
}
