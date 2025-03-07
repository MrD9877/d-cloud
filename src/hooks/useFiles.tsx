import React, { useState } from "react";
import { toast } from "sonner";

export default function useFiles(type: string) {
  const [files, setFile] = useState<FileList | null>();
  const [isLoading, setLoading] = useState(false);

  const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const temp = event.target.files;
    setFile(temp);
  };
  const fileUrls = files ? Array.from(files).map((file) => URL.createObjectURL(file)) : [];

  const uploadFiles = async () => {
    if (!files || files.length === 0) {
      toast("Please add files to Upload");
      return;
    }
    const formData = new FormData();
    formData.append("type", type);

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
      setFile(null);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast("Failed to upload files", { description: `Error:${(error as Error).message}` });
    } finally {
      setLoading(false);
    }
  };

  return { fileSelected, fileUrls, uploadFiles, files, isLoading };
}
