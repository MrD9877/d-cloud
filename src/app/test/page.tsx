"use client";

import useMediaAccess from "@/hooks/useMediaAccess";
import { getMediaAccess } from "../actions/bundlers/basic";

export default function TestPage() {
  const key = "d00a935a51f3bd530090";
  const mediaPermission = useMediaAccess(null, "e30b9e5ad88c32b8");
  const data = async () => {
    const media = await getMediaAccess({ key, bundlerId: null });
    console.log(media);
  };
  return (
    <>
      <div>image: {`${mediaPermission?.image}`}</div>
      <div>video: {`${mediaPermission?.video}`}</div>
      <button onClick={data}>test</button>
    </>
  );
}
