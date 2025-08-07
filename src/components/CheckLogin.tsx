"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { LogIn, UserPen } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { checkToken } from "@/app/actions/checkToken";

const openIn = ["uploadFiles", "files", ""];

export default function CheckLogin() {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isSignedIn = await checkToken();
      const dialogState = triggerRef.current && triggerRef.current.dataset["state"];
      if (!isSignedIn && dialogState === "closed") {
        triggerRef.current?.click();
      }
    };
    checkAuth();
  }, [pathname]);
  if (!openIn.includes(pathname.split("/")[1])) return <></>;
  return (
    <>
      {/* if production no annoying login popup */}
      <Dialog>
        <DialogTrigger ref={triggerRef}></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login To Continue</DialogTitle>
            <DialogDescription>Please Login To your Accout OR Register if its your first time using the app to continue.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center w-full gap-4 py-4">
            <div className="flex items-center gap-4 w-fit">
              <Button className="flex" onClick={() => router.push("/login")}>
                Login
                <LogIn />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button className="flex" onClick={() => router.push("/register")}>
                Register
                <UserPen />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
