import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export type TokenData = { userName: string; email: string };

type VerifyReturn = TokenData | false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function tokenGenerator(data: any, time: "1d" | "50d"): Promise<string | false> {
  try {
    const token = await jwt.sign({ ...data }, process.env.LOCAL_SECRET, { expiresIn: time });
    return token;
  } catch {
    return false;
  }
}

export async function verifyToken(token: string): Promise<VerifyReturn> {
  try {
    const data = await jwt.verify(token, process.env.LOCAL_SECRET);
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
}
