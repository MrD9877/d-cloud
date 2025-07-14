import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { checkToken } from "@/app/actions/checkToken";

export default function useToken() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [token, setToken] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const isSignedIn = await checkToken();
      setToken(isSignedIn);
    })();
  }, [session, pathname]);

  return token;
}
