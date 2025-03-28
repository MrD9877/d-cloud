"use client";
import { Card, CardContent } from "@/components/ui/card";
import useToken from "@/hooks/useToken";
import { signOutFn } from "@/utility/signOut";
import { Download, File, LogIn, LogOut, MoveRight, UserPen } from "lucide-react";
import { useRouter } from "next/navigation";

const items = [
  {
    title: "UpLoad Files",
    url: "/uploadFiles",
    icon: File,
  },
  {
    title: "View Files",
    url: "/files",
    icon: Download,
  },
  {
    title: "Login",
    url: "/login",
    icon: LogIn,
  },
  {
    title: "Register",
    url: "/register",
    icon: UserPen,
  },
  // {
  //   title: "Profile",
  //   url: "/profile",
  //   icon: UserRound,
  // },
];

export default function Home() {
  const router = useRouter();
  const token = useToken();
  return (
    <div className="w-screen h-screen p-4 flex flex-col gap-4 md:w-full">
      {items.map((item) => {
        return (
          <Card key={item.title} onClick={() => router.push(item.url)}>
            <CardContent>
              <div className="flex justify-between w-full">
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
      {token && (
        <Card onClick={signOutFn}>
          <CardContent>
            <div className="flex justify-between w-full">
              <div className="grid grid-cols-2 gap-2 w-2/3">
                <div className="w-fit mx-auto text-red-700">
                  <p>Sign Out</p>
                </div>
                <div>
                  <LogOut />
                </div>
              </div>
              <MoveRight />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
