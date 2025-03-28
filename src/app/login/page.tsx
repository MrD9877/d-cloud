"use client";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ErrorPage from "@/components/ErrorPage";
import useToken from "@/hooks/useToken";
import LoginFormCard from "@/components/LoginFormCard";

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

  return <LoginFormCard headerTopic="login" token={token} submitAction={submitAction} isPending={isPending} headerDescription="Enter your email to continue." linkDescription="Don't have an account" linkHref={"register"} collectInputs={["email", "password"]} />;
}
