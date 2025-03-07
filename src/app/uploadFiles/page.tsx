"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoveRight, Image, Video, File } from "lucide-react";
import { useRouter } from "next/navigation";
const items = [
  {
    title: "UpLoad Image",
    url: "image",
    icon: Image,
  },
  {
    title: "UpLoad Video",
    url: "video",
    icon: Video,
  },
  {
    title: "UpLoad PDF",
    url: "pdf",
    icon: File,
  },
];

export default function UpLoadFilesPage() {
  const router = useRouter();
  const openTab = (type: string) => {
    router.push(`/uploadFiles/${type}`);
  };
  return (
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
  );
}
