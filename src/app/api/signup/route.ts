import { User } from "@/schema/user";
import { cookies } from "next/headers";
import { hashPassword } from "../utility/hashPassword";
import dbConnect from "../utility/connectMongo";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const cookieStore = await cookies();
  const { password } = body;
  try {
    const email = body.email.trim().toLowerCase();
    const userName = body.userName.trim().toLowerCase();
    const checkUser = await User.findOne({ email });
    if (checkUser) return new Response(JSON.stringify({ msg: "Email Already in use to Register an Account." }), { status: 400 });
    const hashedPassword = await hashPassword(password);
    const user = new User({ email, password: hashedPassword, userName });
    await user.save();
    cookieStore.set("email", JSON.stringify({ email }));
    return new Response(JSON.stringify({ msg: "created" }), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Internal server error" }), { status: 500 });
  }
}
