import { NextResponse } from "next/server";
import dbConnect from "../utility/connectMongo";
import { authUser } from "../utility/authUser";
import { cookies } from "next/headers";
import { User } from "@/schema/user";
import { deleteImages } from "../utility/awsBucket";

async function deleteFromAws(files: string[]) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    await deleteImages(file);
  }
}

export async function PUT(request: Request) {
  await dbConnect();
  const cookieStore = await cookies();
  const body = await request.json();
  const { type, files }: { type: string; files: string[] | null } = body;
  if ((type !== "image" && type !== "video") || !files || !Array.isArray(files)) return NextResponse.json({ message: "Wrong or missing params" }, { status: 400 });
  try {
    const userData = await authUser(cookieStore);
    if (!userData || !userData.email) return new Response(JSON.stringify({ msg: "unAuth" }), { status: 401 });
    const email = userData.email;
    await deleteFromAws(files);
    const deletefiles = await User.updateOne({ email }, { $pull: { [type]: { fileId: { $in: files } } } });
    if (deletefiles.acknowledged) return NextResponse.json({ msg: "Files Deleted" }, { status: 200 });
    return NextResponse.json({ message: "No file found" }, { status: 404 });
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json({ message: "Failed to upload files" }, { status: 500 });
  }
}
