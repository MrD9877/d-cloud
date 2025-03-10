import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { tokenGenerator, verifyToken } from "./tokenGenerators";
import { JwtPayload } from "jsonwebtoken";

export const refreshToken = async (cookieStore: ReadonlyRequestCookies): Promise<JwtPayload | false> => {
  const refreshToken = cookieStore.get("refreshToken");
  if (refreshToken && refreshToken.value) {
    const data = await verifyToken(refreshToken.value);
    if (!data || typeof data === "string") return false;
    if (data.email && data.userName) {
      const accessToken = await tokenGenerator({ email: data.email, userName: data.userName }, "1d");
      if (!accessToken) return false;
      cookieStore.set("accessToken", accessToken);
      return data;
    }
  }
  return false;
};
