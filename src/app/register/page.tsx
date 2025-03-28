"use client";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ErrorPage from "@/components/ErrorPage";

import useToken from "@/hooks/useToken";
import LoginFormCard from "@/components/LoginFormCard";

export default function RegisterPage() {
  const router = useRouter();
  const token = useToken();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, submitAction, isPending] = useActionState(async (previousState: any, formData: FormData) => {
    const data = Object.fromEntries(formData);
    const email = data.email;
    const password = data.password;
    const userName = data.username;
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
  return <LoginFormCard headerTopic="register" token={token} submitAction={submitAction} isPending={isPending} headerDescription="Please Register to Continue." linkDescription="Already have an account" linkHref={"login"} collectInputs={["username", "email", "password"]} />;
}
