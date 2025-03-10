import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export type TokenData = { userName: string; email: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function tokenGenerator(data: any, time: "1d" | "50d"): Promise<string | false> {
  try {
    if (!process.env.LOCAL_SECRET) return false;
    const token = await jwt.sign({ ...data }, process.env.LOCAL_SECRET, { expiresIn: time });
    return token;
  } catch {
    return false;
  }
}

export async function verifyToken(token: string) {
  try {
    if (!process.env.LOCAL_SECRET) return false;
    const data = await jwt.verify(token, process.env.LOCAL_SECRET);
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
}
