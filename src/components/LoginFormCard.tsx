import React from "react";
import TopHeader from "./TopHeader";
import WeButton from "./WeButton";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import SignOut from "@/components/SignOut";

interface LoginCard {
  token: string | null;
  submitAction: (payload: FormData) => void;
  isPending: boolean;
  headerDescription: string;
  headerTopic: string;
  linkDescription: string;
  linkHref: string;
  collectInputs: string[];
}

export default function LoginFormCard({ token, submitAction, isPending, headerDescription, linkDescription, linkHref, collectInputs, headerTopic }: LoginCard) {
  const capitalise = (str: string) => {
    const result = str.split("")[0].toLocaleUpperCase() + str.split("").splice(1).join("");
    return result;
  };
  return (
    <div className="w-screen grid grid-cols-2 h-screen">
      <div className="col-span-2 md:col-span-1 ">
        <TopHeader topic={capitalise(headerTopic)} description={token ? "Already Loged In" : headerDescription} />
        {token ? (
          <SignOut />
        ) : (
          <>
            <form action={submitAction}>
              <div className="flex flex-col justify-center items-center gap-6 mt-4 px-8">
                {collectInputs.map((item) => {
                  return (
                    <div className="weInputContainer" key={item}>
                      <div className="weLabelDiv ">
                        <label className="weLabel dark:bg-[rgb(0,0,0)]" htmlFor={item}>
                          {capitalise(item)}
                        </label>
                      </div>
                      <div className="weinputdiv w-fit">
                        <input className="weinput" name={item} type={item} placeholder={`Enter your ${item}`} />
                      </div>
                    </div>
                  );
                })}
                <WeButton btnDisable={isPending} type="submit" btnText={"Submit"} />
                <div className="mx-auto flex justify-center">
                  <button type="button" onClick={() => signIn("google")} className="flex justify-center gap-4 items-center border border-input bg-white text-black shadow-xs hover:bg-black hover:text-white w-[327px] h-[56px] rounded-3xl text-nowrap">
                    Login with Google <Image src="/googlesvg.svg" alt="googleSvg" width={20} height={20} />
                  </button>
                </div>
              </div>
            </form>

            <div
              className="mt-20 bottom-20
      flex justify-center  items-center  active:text-blue-600 "
            >
              {linkDescription}
              <Link href={`/${linkHref}`} className="text-weblue ml-1">
                {capitalise(linkHref)}
              </Link>
            </div>
          </>
        )}
      </div>
      <Image src="/images/placeholder.avif" alt="placeholderImage" className="object-cover w-[50vw] col-span-0 hidden md:col-span-1 md:block h-screen" width={500} height={500} />
    </div>
  );
}
