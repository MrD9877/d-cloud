import React from "react";
import TriggerNav from "@/components/TriggerNav";

export default function FilesLayout({ children }: { children: React.ReactElement }) {
  return (
    <div>
      <TriggerNav />
      {children}
    </div>
  );
}
