import { NextResponse } from "next/server";
import { uploadImage } from "../utility/awsBucket";
import { generateRandom } from "../utility/random";
import dbConnect from "../utility/connectMongo";
import { authUser } from "../utility/authUser";
import { cookies } from "next/headers";
import { User } from "@/schema/user";
import { uploadVideoMultipart } from "../utility/awsVideo";
export async function POST(request: Request) {
  await dbConnect();
  const cookieStore = await cookies();
  console.log("upload");
  try {
    const userData = await authUser(cookieStore);
    if (!userData || !userData.email) return new Response(JSON.stringify({ msg: "unAuth" }), { status: 401 });
    const email = userData.email;
    const formData = await request.formData();
    const files = formData.getAll("files");
    const type = formData.get("type");
    if (!files || files.length === 0) return NextResponse.json({ message: "No files uploaded" }, { status: 400 });

    if (type !== "image" && type !== "video") return NextResponse.json({ message: "No such Type" }, { status: 400 });
    const filesUploadedOnaws = [];
    // Process each file
    for (const file of files) {
      if (file instanceof File) {
        const fileId = generateRandom(32);
        const buffer = Buffer.from(await file.arrayBuffer());
        const upload = type === "image" ? await uploadImage(buffer, fileId, "png") : await uploadVideoMultipart(file, fileId);
        void upload;
        filesUploadedOnaws.push({ fileId });
      }
    }
    const user = await User.updateOne({ email }, { $push: { [type]: { $each: filesUploadedOnaws } } });
    if (!user.acknowledged) throw Error("error");
    return NextResponse.json({ message: "Files uploaded successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json({ message: "Failed to upload files" }, { status: 500 });
  }
}
