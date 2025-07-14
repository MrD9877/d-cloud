import React from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { deleteBundler } from "@/app/actions/bundlers/user";

export default function DeletePromtCard({ children, bundlerId, initData, setSelect }: { children: React.ReactElement; bundlerId: string | string[]; initData: () => Promise<void>; setSelect?: React.Dispatch<React.SetStateAction<string[]>> }) {
  const deleteFn = async () => {
    try {
      if (typeof bundlerId === "string") {
        await deleteBundler(bundlerId);
      } else {
        for (let i = 0; i < bundlerId.length; i++) {
          await deleteBundler(bundlerId[i]);
        }
      }
      if (setSelect) {
        setSelect([]);
      }
      await initData();
    } catch {}
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild className="flex justify-center items-center">
          <button>{children}</button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Delete Files?</DrawerTitle>
              <DrawerDescription>Are you sure you want to permanetly delete files?</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button className="bg-red-500" onClick={deleteFn}>
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
