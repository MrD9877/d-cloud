import { setFileType, store, StoreState } from "@/redux/Silce";
import { getUploadData } from "@/utility/fetchSignUrls";
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
    if (!files || files.length === 0 || filesUploadSelected.length === 0) {
      toast("Please add files to Upload");
      return;
    }
    setLoading(true);

    const uploadData = await getUploadData(files, filesUploadSelected);

    try {
      const response = await fetch(`/api/uploadFiles?type=${fileType}&files=${filesUploadSelected.length}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.msg || ` ${response.status}`);
      }
      const { urls }: { urls: { fileId: string; url: string }[] } = await response.json();
      const failName = [];
      const failIds = [];

      for (let i = 0; i < urls.length; i++) {
        try {
          await fetch(urls[i].url, {
            method: "PUT",
            body: uploadData[i].buffer,
            headers: {
              "Content-Type": uploadData[i].fileType,
            },
            mode: "cors",
          });
        } catch {
          failName.push(uploadData[i].name);
          failIds.push(urls[i].fileId);
        }
      }

      toast(`${filesUploadSelected.length - failName.length} Files uploaded successfully!`, {
        description: failName.length
          ? `Fail to upload ${failName.length}! files

            Files With Name ${failName.join(",")}
            `
          : "",
      });

      setFilesUploadSelected([]);
      setFilesUrlsFn([]);
      await fetch("/api/deleteFiles", {
        method: "POST",
        body: JSON.stringify({ type: fileType, files: failIds }),
      });
    } catch (error) {
      toast("Failed to upload files", { description: `Error:${(error as Error).message}` });
    } finally {
      setLoading(false);
    }
  };

  return { fileSelected, uploadFiles, filesUploadSelected, fileType, loading };
}
