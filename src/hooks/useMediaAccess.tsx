"use client";
import { getMediaAccess } from "@/app/actions/bundlers/basic";
import { setError, setFileType } from "@/redux/Silce";
import { BundlerType } from "@/schema/bundler";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useMediaAccess(key: string | null, bundlerId: string | null) {
  const [mediaPermission, setMediaPermission] = useState<BundlerType["mediaPermissions"]>();
  const dispatch = useDispatch();

  useEffect(() => {
    async function handler({ key, bundlerId }: { key: string | null; bundlerId: string | null }) {
      try {
        const mediaAccess = await getMediaAccess({ key, bundlerId });
        console.log(mediaAccess);
        if (mediaAccess.body) {
          setMediaPermission(mediaAccess.body);
          if (!mediaAccess.body.image || !mediaAccess.body.video) {
            dispatch(setFileType(mediaAccess.body.image ? "image" : "video"));
          } else {
            dispatch(setFileType("image"));
          }
        } else if (mediaAccess.error) {
          dispatch(setError(mediaAccess.error));
        }
      } catch (err) {
        console.log(err);
        if (err instanceof Error) {
          dispatch(setError(err.message));
        }
      }
    }
    if (key || bundlerId) {
      console.log("go");
      handler({ key, bundlerId });
    }
  }, [key, bundlerId, dispatch]);

  return mediaPermission;
}
