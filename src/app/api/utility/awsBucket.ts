import dotenv from "dotenv";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

type UploadImage = (data: Buffer<ArrayBufferLike>, imageId: string, ContentType: string) => Promise<void>;

dotenv.config();

const bucketName = process.env.BUCKET_NAME || "";
const bucketRegion = process.env.BUCKET_REGION || "";
const bucketAccess = process.env.BUCKET_ACCESS_KEY || "";
const bucketSecret = process.env.BUCKET_SECRET_KEY || "";

const s3 = new S3Client({
  credentials: {
    accessKeyId: bucketAccess,
    secretAccessKey: bucketSecret,
  },
  region: bucketRegion,
});

export const uploadImage: UploadImage = async (data, imageId, ContentType) => {
  const params = {
    Bucket: bucketName,
    Key: imageId,
    Body: data,
    ContentType: ContentType,
  };
  const commad = new PutObjectCommand(params);
  await s3.send(commad);
  console.log("image on s3");
};

export const testJest = () => {
  return "webnovel-d";
};

export const deleteImages = async (imageId: string) => {
  const params = {
    Bucket: bucketName,
    Key: imageId,
  };
  try {
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    return { acknowledge: true };
  } catch (err) {
    return { acknowledge: false, message: (err as Error).message };
  }
};
