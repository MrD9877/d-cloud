"use client";
import { getReadWriteAccess } from "@/app/actions/bundlers/key";
import { setError } from "@/redux/Silce";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
type Access = { read: boolean; write: boolean };

export default function useBundlerAccess(setPage: React.Dispatch<React.SetStateAction<"view" | "upload">>, key: string | null) {
  const [permissions, setPermissions] = useState<Access>({ read: true, write: true });
  const dispatch = useDispatch();

  useEffect(() => {
    async function setAccess(key: string) {
      const access = await getReadWriteAccess(key);
      console.log(access);
      if (access.body) {
        setPermissions(access.body);
        if (!access.body.read || !access.body.write) {
          if (access.body.read) setPage("view");
          if (access.body.write) setPage("upload");
        }
      } else {
        if (access.error) dispatch(setError(access.error));
        setPermissions({ read: false, write: false });
      }
    }
    if (key) {
      setAccess(key);
    }
  }, [key, dispatch, setPage]);

  return permissions;
}
