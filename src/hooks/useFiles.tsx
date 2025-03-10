import { setFileType, store, StoreState } from "@/redux/Silce";
import { setFile, setFilesUrlsFn, setLoading } from "@/utility/reduxFn";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
export type NewFilesType = {
  previewUrl: string;
  lastModified: number;
  name: string;
  webkitRelativePath: string;
  size: number;
  type: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
  bytes: () => Promise<Uint8Array<ArrayBufferLike>>;
  slice: (start?: number, end?: number, contentType?: string) => Blob;
  stream: () => ReadableStream<Uint8Array<ArrayBufferLike>>;
  text: () => Promise<string>;
}[];

export default function useFiles() {
  const pathname = usePathname();
  const type = pathname.split("/");
  const fileType = type[type.length - 1];
  const { loading, files } = useSelector((state: StoreState) => state);

  const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const temp = event.target.files;
    if (temp) {
      const newFiles = Array.from(temp).map((file) => ({
        ...file,
        previewUrl: URL.createObjectURL(file),
      }));
      setFile(newFiles);
    }
    if (temp) setFilesUrlsFn(Array.from(temp).map((file) => URL.createObjectURL(file)));
  };
  useEffect(() => {
    if (fileType === "image" || fileType === "video") store.dispatch(setFileType(fileType));
  }, [fileType]);

  const uploadFiles = async () => {
    if (!files || files.length === 0) {
      toast("Please add files to Upload");
      return;
    }
    const formData = new FormData();
    formData.append("type", fileType);

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      setLoading(true);
      const response = await fetch("/api/uploadFiles", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.msg || ` ${response.status}`);
      }
      toast("Files uploaded successfully!");
      setFile(undefined);
      setFilesUrlsFn([]);
    } catch (error) {
      toast("Failed to upload files", { description: `Error:${(error as Error).message}` });
    } finally {
      setLoading(false);
    }
  };

  return { fileSelected, uploadFiles, files, fileType, loading };
}
