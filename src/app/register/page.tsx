"use client";
import Link from "next/link";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ErrorPage from "@/components/ErrorPage";
import TopHeader from "@/components/TopHeader";
import WeButton from "@/components/WeButton";

export default function RegisterPage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, submitAction, isPending] = useActionState(async (previousState: any, formData: FormData) => {
    const data = Object.fromEntries(formData);
    const email = data.email;
    const password = data.password;
    const userName = data.userName;
    try {
      const res = await fetch("/api/signup", { method: "POST", credentials: "include", body: JSON.stringify({ email, password, userName }) });
      if (res.status === 201) {
        toast("You are Register Please Login to continue");
        router.push("/login");
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
      <TopHeader topic="Register" description="Please Register to Continue." />
      <form action={submitAction}>
        <div className="flex flex-col justify-center items-center gap-6 h-[50vh]">
          <div className="weInputContainer">
            <div className="weLabelDiv">
              <label className="weLabel" htmlFor="userName">
                User Name
              </label>
            </div>
            <div className="weinputdiv w-fit">
              <input className="weinput" name="userName" type="text" placeholder="Enter your username" />
            </div>
          </div>
          <div className="weInputContainer">
            <div className="weLabelDiv">
              <label className="weLabel" htmlFor="email">
                Email
              </label>
            </div>
            <div className="weinputdiv w-fit">
              <input className="weinput" name="email" type="email" placeholder="Enter your email" />
            </div>
          </div>
          <div className="weInputContainer">
            <div className="weLabelDiv">
              <label className="weLabel" htmlFor="password">
                Password
              </label>
            </div>
            <div className="weinputdiv w-fit">
              <input className="weinput" name="password" type="password" placeholder="Enter your password" />
            </div>
          </div>
          <WeButton btnDisable={isPending} type="submit" btnText={"Register"} />
        </div>
      </form>

      <div
        className="absolute bottom-20
      flex justify-center  items-center w-screen active:text-blue-600 "
      >
        Already have an account{" "}
        <Link href={"/login"} className="text-weblue ml-1">
          Login
        </Link>
      </div>
    </div>
  );
}
