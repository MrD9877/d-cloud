import { setFileType, store, StoreState } from "@/redux/Silce";
import { setFilesUploadSelected, setFilesUrlsFn, setLoading } from "@/utility/reduxFn";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  const [files, setFile] = useState<FileList>();
  const { loading, filesUploadSelected } = useSelector((state: StoreState) => ({ loading: state.loading, filesUploadSelected: state.filesUploadSelected }));
  useEffect(() => {
    if (filesUploadSelected.length === 0) {
      setFile(undefined);
    }
  }, [filesUploadSelected]);

  const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const temp = event.target.files;
    const urls: string[] = [];
    if (temp) {
      setFile(temp);
      const newFiles = Array.from(temp).map((file) => {
        const url = URL.createObjectURL(file);
        urls.push(url);
        return {
          name: file.name,
          url,
        };
      });
      setFilesUploadSelected(newFiles);
    }
    if (temp) setFilesUrlsFn(urls);
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
      console.log(filesUploadSelected.some((fileObj) => fileObj.name === file.name));
      if (filesUploadSelected.some((fileObj) => fileObj.name === file.name)) formData.append("files", file);
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
      setFilesUploadSelected([]);
      setFilesUrlsFn([]);
    } catch (error) {
      toast("Failed to upload files", { description: `Error:${(error as Error).message}` });
    } finally {
      setLoading(false);
    }
  };

  return { fileSelected, uploadFiles, filesUploadSelected, fileType, loading };
}
