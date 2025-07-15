/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import NotFoundComponent from "@/components/NotFoundComponent";
import { useDispatch, useSelector } from "react-redux";
import { setFileType, StoreState } from "@/redux/Silce";
import useMediaAccess from "@/hooks/useMediaAccess";
import useBundlerAccess from "@/hooks/useBundlerAccess";
import { ArrowLeft } from "lucide-react";

export default function BundleNavBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [key, setKey] = useState<string | null>(null);
  const [bundlerId, setBundlerId] = useState<string | null>(null);
  const [page, setPage] = useState<"view" | "upload">("view");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (searchParams) {
      const key = searchParams.get("key");
      const bundlerId = searchParams.get("bundlerId");
      setKey(key);
      setBundlerId(bundlerId);
      setMounted(true);
    }
  }, [searchParams]);

  const fileType = useSelector((state: StoreState) => state.fileType);
  const [dropDownOpen, setDropDown] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!key && !bundlerId) return;
    if (key) {
      if (page === "upload") router.replace(`/bundle/upload?key=${key}`);
      if (page === "view") router.replace(`/bundle?key=${key}`);
    }

    if (bundlerId) {
      if (page === "view") router.replace(`/bundle?bundlerId=${bundlerId}`);
      if (page === "upload") router.replace(`/bundle/upload?bundlerId=${bundlerId}`);
    }
  }, [page, router, key, bundlerId]);
  const permissions = useBundlerAccess(setPage, key);
  const mediaPermission = useMediaAccess(key, bundlerId);

  if (!key && !bundlerId && mounted)
    return (
      <div className="absolute top-0 left-0 z-100">
        <NotFoundComponent />
      </div>
    );
  return (
    <div>
      <nav className="bg-white border-gray-200 w-screen absolute top-0">
        <div className="max-w-screen-xl flex flex-wrap items-start justify-between mx-auto p-4">
          {key ? (
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={"/images/icon.ico"} className="md:h-8 h-5" alt="Flowbite Logo" />
              <span className="self-center text-base md:text-2xl font-semibold whitespace-nowrap">D Cloud</span>
            </Link>
          ) : (
            <Link href="/bundlers" className="flex items-center space-x-3 rtl:space-x-reverse">
              <ArrowLeft />
            </Link>
          )}

          {permissions.read && permissions.write && (
            <div className=" block w-auto" id="navbar-multi-level">
              <ul className="flex  font-medium p-0  border-gray-100 rounded-lg  space-x-8 rtl:space-x-reverse flex-row mt-0 border-0 bg-white items-center">
                <li>
                  <button style={page === "upload" ? { color: "blue" } : {}} onClick={() => setPage("upload")} className="block   bg-transparent text-gray-900 rounded-sm hover:text-gray-700 p-0 ">
                    Upload
                  </button>
                </li>

                <li>
                  <button style={page === "view" ? { color: "blue" } : {}} onClick={() => setPage("view")} className="block bg-transparent text-gray-900 rounded-sm hover:text-gray-700 p-0 ">
                    View
                  </button>
                </li>
              </ul>
            </div>
          )}
          <div>
            <button
              onClick={() => {
                if (mediaPermission) setDropDown((pre) => !pre);
              }}
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              className="flex items-center justify-between  hover:bg-transparent border-0 text-blue-700 p-0 w-auto"
            >
              <span className="font-bold mx-2 hover:text-blue-700 text-gray-900 ">Media: {""}</span>
              {fileType?.toLocaleUpperCase()}
              <svg className={!dropDownOpen ? "w-2.5 h-2.5 ms-2.5" : "w-2.5 h-2.5 ms-2.5 rotate-[-90deg]"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div style={dropDownOpen ? { display: "block" } : { display: "none" }} id="dropdownNavbar" className="z-10  font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-24 ml-10 absolute">
              <ul className="py-2 text-sm text-gray-700">
                <li className={fileType === "image" ? "text-blue-700" : ""}>
                  <button disabled={!mediaPermission || !mediaPermission.image} onClick={() => dispatch(setFileType("image"))} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white mx-auto">
                    Image
                  </button>
                </li>
                <li className={fileType === "video" ? "text-blue-700" : ""}>
                  <button disabled={!mediaPermission || !mediaPermission.video} onClick={() => dispatch(setFileType("video"))} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white mx-auto">
                    Video
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
