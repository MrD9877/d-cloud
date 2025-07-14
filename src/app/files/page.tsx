"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoveRight, Image, Video, File } from "lucide-react";
import { useRouter } from "next/navigation";
import TriggerNav from "@/components/TriggerNav";

const items = [
  {
    title: "View Image",
    url: "image",
    icon: Image,
  },
  {
    title: "View Video",
    url: "video",
    icon: Video,
  },
  {
    title: "View PDF",
    url: "pdf",
    icon: File,
  },
];

export default function FilesPage() {
  const router = useRouter();
  const openTab = (type: string) => {
    router.push(`/files/${type}`);
  };
  return (
    <>
      <div className="w-screen h-screen p-4 flex flex-col gap-4 md:w-full">
        <TriggerNav />
        {items.map((item) => {
          return (
            <Card key={item.title} onClick={() => openTab(item.url)}>
              <CardContent>
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
