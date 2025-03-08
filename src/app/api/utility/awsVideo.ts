import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { Upload } from "@aws-sdk/lib-storage";

dotenv.config();

const bucketName = process.env.BUCKET_NAME || "";
const bucketRegion = process.env.BUCKET_REGION || "";
const bucketAccess = process.env.BUCKET_ACCESS_KEY || "";
const bucketSecret = process.env.BUCKET_SECRET_KEY || "";

const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: bucketAccess,
    secretAccessKey: bucketSecret,
  },
});

// export async function uploadVideoMultipart(file: File, fileId: string) {
//   const chunkSize = 5 * 1024 * 1024; // 5MB chunks (recommended for AWS)
//   const totalChunks = Math.ceil(file.size / chunkSize);
//   let id: string | undefined = undefined;

//   try {
//     // Step 1: Initiate Multipart Upload
//     const createCommand = new CreateMultipartUploadCommand({
//       Bucket: bucketName,
//       Key: fileId,
//       ContentType: "mp4",
//     });

//     const { UploadId } = await s3Client.send(createCommand);
//     if (!UploadId) throw new Error("Failed to initiate multipart upload");
//     id = UploadId;

//     // Step 2: Upload Parts in Parallel
//     const uploadPromises = Array.from({ length: totalChunks }, async (_, index) => {
//       const start = index * chunkSize;
//       const end = Math.min(start + chunkSize, file.size);
//       const chunk = file.slice(start, end);

//       const uploadPartCommand = new UploadPartCommand({
//         Bucket: bucketName,
//         Key: fileId,
//         UploadId,
//         PartNumber: index + 1,
//         Body: new Uint8Array(await chunk.arrayBuffer()), // Convert Blob to ArrayBuffer
//       });

//       const upload = await s3Client.send(uploadPartCommand); // ETag is required for completion
//       return { PartNumber: index + 1, ETag: upload.ETag };
//     });

//     const uploadedParts = await Promise.all(uploadPromises);

//     // Step 3: Complete the Multipart Upload
//     const completeCommand = new CompleteMultipartUploadCommand({
//       Bucket: bucketName,
//       Key: fileId,
//       UploadId,
//       MultipartUpload: { Parts: uploadedParts },
//     });

//     await s3Client.send(completeCommand);

//     console.log("✅ Video uploaded successfully!");
//     return true;
//   } catch (error) {
//     console.error("❌ Upload failed:", error);

//     // Step 4: Abort the Upload in Case of Failure
//     if (id) {
//       await s3Client.send(
//         new AbortMultipartUploadCommand({
//           Bucket: bucketName,
//           Key: fileId,
//           UploadId: id,
//         })
//       );
//       console.log("⚠️ Upload aborted due to an error.");
//       return false;
//     }
//   }
// }

export const uploadVideoMultipart = async (file: File, fileId: string) => {
  const params = {
    Bucket: bucketName,
    Key: fileId,
    Body: file,
    ContentType: "mp4",
  };

  const upload = new Upload({
    client: s3Client,
    params,
  });

  upload.on("httpUploadProgress", (progress) => {
    const loaded = progress.loaded ? progress.loaded : 0;
    const percent = ((loaded / progress.total!) * 100).toFixed(2);
    console.log(`Upload Progress: ${percent}%`);
  });

  try {
    await upload.done();
    console.log("✅ Upload completed");
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
};
