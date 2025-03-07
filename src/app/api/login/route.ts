import { cookies } from "next/headers";
import { verifyPasswordFn } from "../utility/hashPassword";
import { tokenGenerator } from "../utility/tokenGenerators";
import dbConnect from "../utility/connectMongo";
import { IUser, User } from "@/schema/user";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const cookieStore = await cookies();
  const { password } = body;
  try {
    const email = body.email.trim().toLowerCase();
    const user: IUser | null = await User.findOne({ email });
    if (!user) return new Response(JSON.stringify({ msg: "No User Found" }), { status: 400 });
    const verifyPassword = await verifyPasswordFn(password, user.password);
    if (verifyPassword) {
      const accessToken = await tokenGenerator({ email, userName: user.userName }, "1d");
      const refreshToken = await tokenGenerator({ email, userName: user.userName }, "50d");
      if (!accessToken && !refreshToken) return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
      if (accessToken && refreshToken) {
        cookieStore.set("accessToken", accessToken);
        cookieStore.set("refreshToken", refreshToken);
      }
      return new Response(JSON.stringify({ msg: "welcome" }), { status: 200 });
    }
    return new Response(JSON.stringify({ msg: "UnAuthorized" }), { status: 401 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
