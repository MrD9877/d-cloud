import { getBundlerUploadURL } from "@/app/actions/bundlers/basic";
import { getUploadDataBundler } from "@/utility/fetchSignUrls";
import { setFilesUploadSelected, setFilesUrlsFn, setLoading } from "@/utility/reduxFn";
import React, { useState } from "react";
import { toast } from "sonner";

export default function useFilesBundlers() {
  const [files, setFile] = useState<FileList>();

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

  const uploadFiles = async ({ key, bundlerId }: { key: string | null; bundlerId: string | null }) => {
    if (!files || files.length === 0) {
      toast("Please add files to Upload");
      return;
    }
    setLoading(true);

    const uploadData = await getUploadDataBundler(files);

    try {
      for (let i = 0; i < uploadData.length; i++) {
        const data = uploadData[i];
        const url = await getBundlerUploadURL({ key, bundlerId, media: "image" });
        if (url.error) {
          console.log(url.error);
          if (typeof url.error === "string") throw Error(url.error);
        }
        if (url.body) {
          const res = await fetch(url.body, {
            method: "PUT",
            body: data.buffer,
            headers: {
              "Content-Type": data.fileType,
            },
            mode: "cors",
          });
          if (res.ok) {
            toast("Files Saved ✓");
          }
        }
      }

      setFilesUploadSelected([]);
      setFilesUrlsFn([]);
    } catch (error) {
      console.log(error);
      toast("Failed to upload files", { description: `Error:${(error as Error).message}` });
    } finally {
      setLoading(false);
    }
  };

  return { fileSelected, uploadFiles };
}
