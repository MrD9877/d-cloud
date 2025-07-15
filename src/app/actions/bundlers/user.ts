"use server";
import { authUser } from "@/app/api/utility/authUser";
import dbConnect from "@/app/api/utility/connectMongo";
import { Bundler } from "@/schema/bundler";
import { cookies } from "next/headers";
import crypto from "crypto";

async function authBundlerUser() {
  const cookieStore = await cookies();
  const userData = await authUser(cookieStore);
  if (!userData || typeof userData === "string" || !userData.email) throw Error("Signed In to use this service");
  return userData;
}

export async function getBundlers() {
  try {
    await dbConnect();
    const userData = await authBundlerUser();
    const bundlers = await Bundler.find({ email: userData.email }).lean().select({
      _id: 0,
      image: 0,
      video: 0,
    });
    return bundlers;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function deleteBundler(bundlerId: string) {
  try {
    await dbConnect();
    const userData = await authBundlerUser();
    const bundlers = await Bundler.deleteOne({ email: userData.email, bundlerId });
    return bundlers;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function addBundler(name: string, videoPermission: boolean, imagePermission: boolean) {
  try {
    await dbConnect();
    const userData = await authBundlerUser();
    const n = crypto.randomBytes(8).toString("hex");
    console.log(n);
    const newBundler = new Bundler({
      name,
      email: userData.email,
      bundlerId: n,
      mediaPermissions: {
        video: videoPermission,
        image: imagePermission,
      },
    });
    const save = await newBundler.save();
    console.log(save);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getBundlerUser(bundlerId: string) {
  try {
    await dbConnect();
    const userData = await authBundlerUser();
    const bundler = await Bundler.findOne({ bundlerId, email: userData.email }).lean().select({
      "image._id": 0, // Exclude _id from items in the 'image' array
      "video._id": 0,
      _id: 0,
    });
    if (!bundler) throw Error("Bundler id do not match with credentials!!");
    return bundler;
  } catch (err) {
    return err;
  }
}
