"use client";
import { Card, CardContent } from "@/components/ui/card";
import useToken from "@/hooks/useToken";
import { signOutFn } from "@/utility/signOut";
import { Download, File, LogIn, LogOut, MoveRight, UserPen, Boxes } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const token = useToken();

  function routerPush(url: string) {
    router.push(url);
  }

  const items = [
    {
      title: "UpLoad Files",
      onClickFn: () => routerPush("/uploadFiles"),
      icon: File,
    },
    {
      title: "View Files",
      onClickFn: () => routerPush("/files"),
      icon: Download,
    },
    {
      title: "Login",
      onClickFn: () => routerPush("/login"),
      icon: LogIn,
    },
    {
      title: "Register",
      onClickFn: () => routerPush("/register"),
      icon: UserPen,
    },
    {
      title: "Bundlers",
      onClickFn: () => routerPush("/bundlers"),
      icon: Boxes,
    },
    {
      title: "Sign Out",
      onClickFn: () => signOutFn(),
      icon: LogOut,
      style: "text-red-700",
    },
  ];
  return (
    <div className="w-screen h-screen p-4 flex flex-col gap-4 md:w-full">
      {items.map((item) => {
        if ((token && item.title === "Register") || (token && item.title === "Login")) return;
        if (!token && item.title === "Sign Out") return;
        return (
          <Card key={item.title} onClick={item.onClickFn}>
            <CardContent>
              <div className={`flex justify-between w-full ${item.style ? item.style : ""}`}>
                <div className="grid grid-cols-2 gap-2 w-2/3">
                  <div className="w-fit mx-auto">
                    <p>{item.title}</p>
                  </div>
                  <div>
                    <item.icon />
                  </div>
                </div>
                <MoveRight />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
