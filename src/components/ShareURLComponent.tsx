import React from "react";
import CopyURL from "./ui/CopyURL";

export default function ShareURLComponent({
  shareData,
}: {
  shareData: {
    key: string | undefined;
  };
}) {
  const url = `${process.env.NEXT_PUBLIC_LOCAL_URL}/bundle?key=${shareData.key}`;
  const shareKey = async () => {
    await navigator.share({
      title: "D cloud",
      text: "Use this link to share or view Media.",
      url,
    });
  };
  return (
    <div>
      <div className="my-2 font-bold">Anyone with this link can access the bundler:</div>
      <CopyURL url={url} shareKey={shareKey} />
    </div>
  );
}
