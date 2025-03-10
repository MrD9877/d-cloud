"use client";
import Link from "next/link";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ErrorPage from "@/components/ErrorPage";
import TopHeader from "@/components/TopHeader";
import WeButton from "@/components/WeButton";
import { signIn } from "next-auth/react";
import SignOut from "@/components/SignOut";
import useToken from "@/hooks/useToken";

export default function LoginPage() {
  const router = useRouter();
  const token = useToken();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, submitAction, isPending] = useActionState(async (previousState: any, formData: FormData) => {
    const data = Object.fromEntries(formData);
    const email = (data.email as string).trim().toLowerCase();
    const password = data.password;
    try {
      const res = await fetch("/api/login", { method: "POST", credentials: "include", body: JSON.stringify({ email, password }) });
      if (res.status === 200) {
        router.push("/");
      } else if (res.status === 400) {
        const data = await res.json();
        toast(data.msg);
      } else if (res.status === 500) {
        console.log("500");
        toast("Internal server Error");
      } else {
        toast(`Error ${res.statusText}`);
      }
    } catch {
      toast("Server not responding");
    }
    return null;
  }, null);

  if (error) return <ErrorPage message={error} />;

  return (
    <div className="w-screen">
      <TopHeader topic="Login" description={token ? "Already Loged In" : "Enter your email to continue."} />
      {token ? (
        <SignOut />
      ) : (
        <>
          <form action={submitAction}>
            <div className="flex flex-col justify-center items-center gap-6 h-[50vh]">
              <div className="weInputContainer">
                <div className="weLabelDiv ">
                  <label className="weLabel dark:bg-[rgb(0,0,0)]" htmlFor="email">
                    Email
                  </label>
                </div>
                <div className="weinputdiv w-fit">
                  <input className="weinput" name="email" type="email" placeholder="Enter your email" />
                </div>
              </div>
              <div className="weInputContainer">
                <div className="weLabelDiv">
                  <label className="weLabel dark:bg-[rgb(0,0,0)]" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="weinputdiv w-fit">
                  <input className="weinput" name="password" type="password" placeholder="Enter your password" />
                </div>
              </div>
              <WeButton btnDisable={isPending} type="submit" btnText={"Login"} />
              <div className="mx-auto flex justify-center">
                <button type="button" onClick={() => signIn("google")} className="border border-input bg-white text-black shadow-xs hover:bg-black hover:text-white w-[327px] h-[56px] rounded-3xl text-nowrap">
                  Login with Google
                </button>
              </div>
            </div>
          </form>

          <div
            className="absolute bottom-20
      flex justify-center  items-center w-screen active:text-blue-600 "
          >
            Don&apos;t have an account{" "}
            <Link href={"/register"} className="text-weblue ml-1">
              Register
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
