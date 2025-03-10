import { signOut } from "next-auth/react";
import { toast } from "sonner";

export async function signOutFn() {
  try {
    await signOut();
  } catch {}
  document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  toast("SignOut Success!!", { description: "You are now loged out of session!!" });
}
