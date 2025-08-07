"use server";
import { authUser } from "@/app/api/utility/authUser";
import dbConnect from "@/app/api/utility/connectMongo";
import { generateRandomAsync } from "@/app/api/utility/random";
import { Bundler } from "@/schema/bundler";
import { Session } from "@/schema/session";
import { cookies } from "next/headers";

async function authKey(key: string) {
  await dbConnect();
  const info = await Session.findOne({ key }).lean().select({
    "readWritePermissions._id": 0,
    _id: 0,
  });
  if (!info) throw Error("Invalid Key");
  if (info.expiresAt < Date.now()) throw Error("Access Expired");
  return info;
}

export async function createBundlerAuthKey({ bundlerId, expiresIn, read, write }: { bundlerId: string; expiresIn: number; read: boolean; write: boolean }) {
  const key = await generateRandomAsync(10);
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const userData = await authUser(cookieStore);
    if (!userData || typeof userData === "string" || !userData.email) throw Error("Signed In to use this service");
    const bundlerInfo = await Bundler.findOne({ bundlerId });
    if (!bundlerInfo || bundlerInfo.email !== userData.email) throw Error("Not Authorized");
    const session = new Session({ name: bundlerInfo.name, key, expiresAt: Date.now() + expiresIn, readWritePermissions: { read, write }, bundlerId, ttlDate: new Date(Date.now() + expiresIn) });
    const res = await session.save();
    if (res.errors) throw Error(res.errors.message);
    return {
      success: true,
      error: false,
      body: {
        key,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: (err as Error).message,
      body: null,
    };
  }
}

export async function getReadWriteAccess(key: string) {
  try {
    const info = await authKey(key);
    if (!info.readWritePermissions) throw Error("Invalid session request a new access key");
    return {
      success: true,
      error: null,
      body: info.readWritePermissions,
    };
  } catch (err) {
    return {
      success: false,
      error: (err as Error).message,
      body: null,
    };
  }
}

export async function getBundlerKey(key: string) {
  await dbConnect();
  const session = await authKey(key);
  if (!session.readWritePermissions.read) throw Error("You Do not have Access to Read this bundler!");
  const bundler = await Bundler.findOne({ bundlerId: session.bundlerId }).lean().select({
    "image._id": 0,
    "video._id": 0,
    _id: 0,
  });
  if (!bundler) throw Error("Bundler id do not match with credentials!!");
  return bundler;
}

export async function getBundlerKeyMediaAccess(key: string) {
  try {
    await dbConnect();
    const session = await authKey(key);
    const bundler = await Bundler.findOne({ bundlerId: session.bundlerId }).lean().select({
      mediaPermissions: 1,
      _id: 0,
    });
    if (!bundler) throw Error("Bundler id do not match with credentials!!");
    return bundler;
  } catch (err) {
    return err as Error;
  }
}
