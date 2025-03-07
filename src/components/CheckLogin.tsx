"use client";
import { getCookie } from "@/utility/getCookies";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { LogIn, UserPen } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function CheckLogin() {
  const [refreshToken, setRefreshToken] = useState<string | null>();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    setRefreshToken(getCookie("refreshToken"));
  }, []);
  if (pathname === "/register" || pathname === "/login" || refreshToken) return <></>;

  return (
    <Dialog open={true}>
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
  );
}
