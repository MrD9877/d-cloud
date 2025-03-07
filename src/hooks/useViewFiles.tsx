import { fetchFiles } from "@/utility/fetchFiles";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useViewFiles() {
  const pathname = usePathname();
  const type = pathname.split("/");
  const fileType = type[type.length - 1];
  const [fileUrls, setUrls] = useState<string[] | null>();
  const [page, setPage] = useState(1);
  const [isLastPage, setLastPage] = useState(false);
  const max = 22;
  const fileQuery = useQuery({
    queryKey: ["files", fileType],
    queryFn: async () => await fetchFiles(fileType),
    retry: 1,
  });
  const nextPage = useCallback(() => {
    setPage((pre) => pre + 1);
  }, []);
  useEffect(() => {
    if (fileQuery.data) {
      console.log("loop");
      const temp = fileQuery.data.map((file) => {
        return `${process.env.NEXT_PUBLIC_AWS_URL}/${file.fileId}`;
      });
      const limit = Math.min(page * max, temp.length);
      if (page * max > temp.length) setLastPage(true);
      console.log({ limit });
      console.log(temp.slice(0, limit));
      setUrls(temp.slice(0, limit));
      console.log(temp);
    }
  }, [fileQuery.data, page]);

  return { fileType, fileUrls, fileQuery, nextPage, isLastPage };
}
