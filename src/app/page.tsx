"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Download, File, LogIn, MoveRight, UserPen, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

const items = [
  {
    title: "UpLoad Files",
    url: "/upload",
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
  {
    title: "Profile",
    url: "/profile",
    icon: UserRound,
  },
];

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen p-4 flex flex-col gap-4">
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
    </div>
  );
}
