"use client";
import AddNewBundler from "@/components/AddNewBundler";
import BundlerPopup, { BundlerType } from "@/components/BundlerPopup";
import TriggerNav from "@/components/TriggerNav";
import { CirclePlus, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import DeletePromtCard from "@/components/DeletePromtCard";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { getBundlers } from "../actions/bundlers/user";

export default function BundlerPage() {
  const [select, setSelect] = useState<string[]>([]);
  const [bundlers, setBundlers] = useState<BundlerType[]>();
  const triggerRef = useRef<HTMLButtonElement>(null);

  async function initData() {
    try {
      const data = (await getBundlers()) as BundlerType[];
      setBundlers(data);
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className="w-screen h-screen p-4 flex flex-col gap-4 md:w-full">
      <TriggerNav />
      <AddNewBundler triggerRef={triggerRef} initData={initData} />
      <div className="w-fit mx-auto">
        <nav className="flex justify-end gap-2 mb-4">
          {select.length > 0 ? (
            <DeletePromtCard bundlerId={select} initData={initData} setSelect={setSelect}>
              <span className="px-2 py-1 bg-red-600 flex gap-2 justify-center items-center rounded-xl text-white text-xs">
                Delete
                <Trash2 width={12} height={12} />
              </span>
            </DeletePromtCard>
          ) : (
            <button className="px-2 py-1 bg-blue-600 flex gap-2 justify-center items-center rounded-xl text-white text-xs" onClick={() => triggerRef.current?.click()}>
              New
              <CirclePlus width={12} height={12} />
            </button>
          )}
        </nav>
        <div className="w-full overflow-x-scroll h-fit style-1 ">{bundlers ? <BundlerPopup card={bundlers} select={select} setSelect={setSelect} initData={initData} /> : <TableSkeleton />}</div>
      </div>
    </div>
  );
}
