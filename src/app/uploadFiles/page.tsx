"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoveRight, Image, Video, File } from "lucide-react";
import { useRouter } from "next/navigation";
import TriggerNav from "@/components/TriggerNav";
const items = [
  {
    title: "UpLoad Image",
    url: "/uploadFiles/image",
    icon: Image,
  },
  {
    title: "UpLoad Video",
    url: "/uploadFiles/video",
    icon: Video,
  },
  {
    title: "UpLoad PDF",
    url: "/uploadFiles/pdf",
    icon: File,
  },
];

export default function UpLoadFilesPage() {
  const router = useRouter();
  const openTab = (url: string) => {
    router.push(url);
  };
  return (
    <>
      <TriggerNav />
      <div className="w-screen h-screen p-4 flex flex-col gap-4">
        {items.map((item) => {
          return (
            <Card key={item.title}>
              <CardContent onClick={() => openTab(item.url)}>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <p>{item.title}</p>
                    <item.icon />
                  </div>
                  <MoveRight />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
