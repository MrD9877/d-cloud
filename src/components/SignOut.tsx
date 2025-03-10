import { signOutFn } from "@/utility/signOut";
import Link from "next/link";
import React from "react";

export default function SignOut() {
  return (
    <div className=" absolute bottom-20 w-screen">
      <div className="mx-auto flex justify-center">
        <button type="button" onClick={signOutFn} className="border border-input bg-white text-black shadow-xs hover:bg-black hover:text-white w-[327px] h-[56px] rounded-3xl text-nowrap">
          SiginOut
        </button>
      </div>
      <div className="mx-auto flex justify-center my-2 text-blue-700 underline">
        <Link href={"/"}>Home</Link>
      </div>
    </div>
  );
}
