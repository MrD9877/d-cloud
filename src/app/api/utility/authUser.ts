import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { verifyToken } from "./tokenGenerators";
import { refreshToken } from "./refreshToken";

export const authUser = async (cookieStore: ReadonlyRequestCookies) => {
  const accessToken = cookieStore.get("accessToken");
  if (accessToken) {
    const userData = await verifyToken(accessToken.value);
    if (!userData) {
      const data = await refreshToken(cookieStore);
      console.log(data);
      if (!data) return false;
      return data;
    } else {
      return userData;
    }
  }
};
