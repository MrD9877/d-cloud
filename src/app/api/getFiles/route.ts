import { NextResponse } from "next/server";
import dbConnect from "../utility/connectMongo";
import { authUser } from "../utility/authUser";
import { cookies } from "next/headers";
import { User } from "@/schema/user";

export async function GET(request: Request) {
  await dbConnect();
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  if (type !== "image" && type !== "video") return NextResponse.json({ message: "Wrong or missing params" }, { status: 400 });
  try {
    const userData = await authUser(cookieStore);
    if (!userData || typeof userData === "string" || !userData.email) return new Response(JSON.stringify({ msg: "unAuth" }), { status: 401 });
    const email = userData.email;
    console.log({ email });
    const files = await User.findOne({ email }).select(type).exec();
    if (files && files[type]) return NextResponse.json({ files: [...files[type]] }, { status: 200 });
    return NextResponse.json({ message: "No file found" }, { status: 404 });
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json({ message: "Failed to upload files" }, { status: 500 });
  }
}
