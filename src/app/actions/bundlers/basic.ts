"use server";
import { Bundler, BundlerType, IBundler } from "@/schema/bundler";
import { getBundlerKey, getBundlerKeyMediaAccess } from "./key";
import { getBundlerUser } from "./user";
import { generateRandomAsync } from "@/app/api/utility/random";
import { uploadImage } from "@/app/api/utility/awsBucket";

type BundlerMedia = "image" | "video";

export async function getBundlerMedia({ key, bundlerId, media }: { key: string | null; bundlerId: string | null; media: BundlerMedia }) {
  try {
    let mediaArr: BundlerType["video"] | undefined;
    if (key) {
      const bundler = await getBundlerKey(key);
      mediaArr = bundler[media];
    }
    if (bundlerId) {
      const bundler = await getBundlerUser(bundlerId);
      mediaArr = bundler[media];
    }
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

async function saveMediaInBundler(bundler: IBundler, media: BundlerMedia) {
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
    if (key) {
      const bundler = await getBundlerKey(key);
      url = await saveMediaInBundler(bundler, media);
    }
    if (bundlerId) {
      const bundler = await getBundlerUser(bundlerId);
      url = await saveMediaInBundler(bundler, media);
    }
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
  console.log("here");
  try {
    let access: BundlerType["mediaPermissions"] | undefined;
    if (key) {
      const bundler = await getBundlerKeyMediaAccess(key);
      access = bundler["mediaPermissions"];
    }
    if (bundlerId) {
      const bundler = await getBundlerUser(bundlerId);
      access = bundler["mediaPermissions"];
    }
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
    console.log(err);
    return {
      success: false,
      error: (err as Error).message,
      body: null,
    };
  }
}
