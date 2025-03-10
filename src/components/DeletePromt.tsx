import React from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { deleteFilesRedux, setFilesUrls, store, StoreState } from "@/redux/Silce";
import { setLoading } from "@/utility/reduxFn";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const convertUrlId = (url: string) => {
  const { pathname } = new URL(url);
  const fileId = pathname.split("/")[1];
  return fileId;
};
export default function DeletePromt({ children, urls }: { children: React.ReactElement; urls: string[] }) {
  const { fileType, fileUrls } = useSelector((state: StoreState) => state);
  const queryClient = useQueryClient();
  const deleteFiles = async () => {
    setLoading(true);
    const files: string[] = [];
    urls.forEach((url) => {
      const id = convertUrlId(url);
      files.push(id);
    });
    try {
      const res = await fetch("/api/deleteFiles", { method: "PUT", body: JSON.stringify({ files, type: fileType }) });
      if (res.status === 200) {
        toast("Success!!", { description: `${urls.length} Files were Successfully Deleted` });
        setFilesUrls(fileUrls.filter((url) => !urls.includes(url) || !files.includes(`${process.env.NEXT_PUBLIC_AWS_URL}/${url}`)));
        store.dispatch(deleteFilesRedux(urls));
        mutateFiles.mutate();
      } else {
        const { msg }: { msg: string } = await res.json();
        throw Error(msg);
      }
    } catch (err) {
      toast("Error!!", { description: `${(err as Error).message}` });
    } finally {
      setLoading(false);
    }
  };

  const mutateFiles = useMutation({
    mutationFn: async () => {
      queryClient.invalidateQueries({ queryKey: ["files", fileType] });
    },
  });

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild className="flex justify-center items-center">
          <button>{children}</button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Delete {urls.length} Files?</DrawerTitle>
              <DrawerDescription>Are you sure you want to permanetly delete {urls.length} files?</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button className="bg-red-500" onClick={deleteFiles}>
                  Delete
                </Button>
              </DrawerClose>

              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
