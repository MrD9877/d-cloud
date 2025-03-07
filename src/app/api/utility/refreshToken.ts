import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { TokenData, tokenGenerator, verifyToken } from "./tokenGenerators";

export const refreshToken = async (cookieStore: ReadonlyRequestCookies): Promise<TokenData | false> => {
  const refreshToken = cookieStore.get("refreshToken");
  if (refreshToken && refreshToken.value) {
    const data = await verifyToken(refreshToken.value);
    if (!data) return false;
    if (data.email && data.userName) {
      const accessToken = await tokenGenerator({ email: data.email, userName: data.userName }, "1d");
      if (!accessToken) return false;
      cookieStore.set("accessToken", accessToken);
      return data;
    }
  }
  return false;
};
