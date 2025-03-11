import { uploadImage } from "../utility/awsBucket";
import { generateRandom } from "../utility/random";
import dbConnect from "../utility/connectMongo";
import { authUser } from "../utility/authUser";
import { cookies } from "next/headers";
import { User } from "@/schema/user";

export type signUrlsType = {
  url: string;
  fileId: string;
};

export async function GET(request: Request) {
  await dbConnect();
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url);
  try {
    const userData = await authUser(cookieStore);
    if (!userData || typeof userData === "string" || !userData.email) return new Response(JSON.stringify({ msg: "unAuth" }), { status: 401 });
    const type = searchParams.get("type");
    if (type !== "image" && type !== "video") return new Response(JSON.stringify({ msg: "No such type Allowed" }), { status: 400 });
    const email = userData.email;
    const files = searchParams.get("files");
    const filesUploadedOnaws: { fileId: string }[] = [];
    const urls: signUrlsType[] = [];
    for (let i = 0; i < Number(files); i++) {
      const fileId = generateRandom(32);
      const signedURL = await uploadImage(fileId);
      filesUploadedOnaws.push({ fileId });
      urls.push({ fileId, url: signedURL });
    }
    const user = await User.updateOne({ email }, { $push: { [type]: { $each: filesUploadedOnaws } } });
    if (!user.acknowledged) throw Error("error");
    return new Response(JSON.stringify({ urls }), { status: 200 });
  } catch (error) {
    console.error("Error uploading files:", error);
    return new Response(JSON.stringify({ msg: "Internal server Error" }), { status: 500 });
  }
}
