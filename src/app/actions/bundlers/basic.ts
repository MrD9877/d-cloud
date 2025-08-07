"use server";
import { Bundler, BundlerType } from "@/schema/bundler";
import { getBundlerKey, getBundlerKeyMediaAccess } from "./key";
import { getBundlerUser } from "./user";
import { generateRandomAsync } from "@/app/api/utility/random";
import { uploadImage } from "@/app/api/utility/awsBucket";

type BundlerMedia = "image" | "video";

export async function getBundlerMedia({ key, bundlerId, media }: { key: string | null; bundlerId: string | null; media: BundlerMedia }) {
  try {
    let mediaArr: BundlerType["video"] | undefined;
    let bundler: BundlerType | undefined | Error;
    if (key) {
      bundler = await getBundlerKey(key);
    }
    if (bundlerId) {
      bundler = await getBundlerUser(bundlerId);
    }
    if (bundler instanceof Error) throw Error(bundler.message);
    if (bundler) mediaArr = bundler[media];
    if (mediaArr) {
      return {
        success: true,
        error: false,
        body: mediaArr,
      };
    } else {
      throw Error("Server Error try again!");
    }
  } catch (err) {
    return {
      success: false,
      error: (err as Error).message,
      body: null,
    };
  }
}

async function saveMediaInBundler(bundler: BundlerType, media: BundlerMedia) {
  const mediaId = await generateRandomAsync(10);
  let contentType: "image/*" | "video/*";
  if (media === "image" && bundler.mediaPermissions.image) {
    contentType = "image/*";
  } else if (media === "video" && bundler.mediaPermissions.video) {
    contentType = "video/*";
  } else {
    throw Error(`"${media}" Media type is not Allowed In bundler!`);
  }

  const url = await uploadImage(mediaId, contentType);
  if (!url) throw Error("Server Error try again!");
  const saveFiedId = await Bundler.updateOne(
    { bundlerId: bundler.bundlerId },
    {
      $push: {
        [media]: {
          fileId: mediaId,
          createdAt: new Date(),
        },
      },
    }
  );
  if (saveFiedId.acknowledged) return url;
  else throw Error("Server Error try again!");
}

export async function getBundlerUploadURL({ key, bundlerId, media }: { key: string | null; bundlerId: string | null; media: "image" | "video" }) {
  try {
    let url: string | undefined;
    let bundler: BundlerType | undefined | Error;
    if (key) {
      bundler = await getBundlerKey(key);
    }
    if (bundlerId) {
      bundler = await getBundlerUser(bundlerId);
    }
    if (bundler instanceof Error) throw Error(bundler.message);
    if (bundler) url = await saveMediaInBundler(bundler, media);
    if (url) {
      return {
        success: true,
        error: null,
        body: url,
      };
    } else {
      throw Error("Server Error try again!");
    }
  } catch (err) {
    return {
      success: false,
      error: (err as Error).message,
      body: null,
    };
  }
}

export async function getMediaAccess({ key, bundlerId }: { key: string | null; bundlerId: string | null }) {
  try {
    let access: BundlerType["mediaPermissions"] | undefined;
    let bundler: BundlerType | undefined | Error;
    if (key) {
      bundler = await getBundlerKeyMediaAccess(key);
    }
    if (bundlerId) {
      bundler = await getBundlerUser(bundlerId);
    }
    if (bundler instanceof Error) throw Error(bundler.message);
    if (bundler) access = bundler["mediaPermissions"];
    if (access) {
      return {
        success: true,
        error: null,
        body: access,
      };
    } else {
      throw Error("Server Error try again!");
    }
  } catch (err) {
    return {
      success: false,
      error: (err as Error).message,
      body: null,
    };
  }
}
