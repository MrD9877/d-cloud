"use clinet";
import { setFilesUrls, setFileType, store } from "@/redux/Silce";
import { fetchFiles } from "@/utility/fetchFiles";
import { useQuery } from "@tanstack/react-query";
import { usePathname, notFound } from "next/navigation";
import { useEffect } from "react";

export default function useViewFiles() {
  const pathname = usePathname();
  const type = pathname.split("/");
  const fileType = type[type.length - 1];

  const fileQuery = useQuery({
    queryKey: ["files", fileType],
    queryFn: async () => await fetchFiles(fileType),
    retry: 1,
  });
  useEffect(() => {
    if (fileQuery.data) {
      const temp = fileQuery.data.map((file) => {
        return `${process.env.NEXT_PUBLIC_AWS_URL}/${file.fileId}`;
      });
      store.dispatch(setFilesUrls(temp));
    }
  }, [fileQuery.data]);
  useEffect(() => {
    if (fileType === "image" || fileType === "video") store.dispatch(setFileType(fileType));
    else notFound();
  }, [fileType]);
  return { fileQuery };
}
