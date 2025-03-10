import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCookie } from "@/utility/getCookies";
import { usePathname } from "next/navigation";

export default function useToken() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const token = getCookie("refreshToken");
    setToken(token);
  }, [session, pathname]);

  return token;
}
