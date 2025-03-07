import React from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { toast } from "sonner";

export const convertUrlId = (url: string) => {
  const { pathname } = new URL(url);
  const fileId = pathname.split("/")[1];
  return fileId;
};
export default function DeletePromt({ children, urls, setLoading, fileType }: { children: React.ReactElement; urls: string[]; setLoading: React.Dispatch<React.SetStateAction<boolean>>; fileType: string }) {
  const deleteFiles = async () => {
    setLoading(true);
    const files: string[] = [];
    urls.forEach((url) => {
      const id = convertUrlId(url);
      files.push(id);
    });
    try {
      const res = await fetch("/api/deleteFiles", { method: "PUT", body: JSON.stringify({ files, type: fileType }) });
      if (res.status === 200) toast("Success!!", { description: `${urls.length} Files were Successfully Deleted` });
      else {
        const { msg }: { msg: string } = await res.json();
        throw Error(msg);
      }
    } catch (err) {
      toast("Error!!", { description: `${(err as Error).message}` });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
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
