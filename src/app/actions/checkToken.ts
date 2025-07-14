"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export async function checkToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");
  if (!refreshToken) return false;
  if (refreshToken) {
    const decoded = jwt.decode(refreshToken.value) as { exp: number };
    if (!decoded?.exp) {
      return false;
    }
    const isExpired = Date.now() >= decoded.exp * 1000;
    return !isExpired;
  }
  return false;
}
