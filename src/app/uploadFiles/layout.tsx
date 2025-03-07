import React from "react";
import TriggerNav from "@/components/TriggerNav";

export default function UploadFilesLayout({ children }: { children: React.ReactElement }) {
  return (
    <div>
      <TriggerNav />
      {children}
    </div>
  );
}
