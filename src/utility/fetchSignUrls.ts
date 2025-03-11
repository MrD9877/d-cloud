import { FilesUploadSelectedType } from "@/redux/Silce";

export async function getUploadData(files: FileList, filesUploadSelected: FilesUploadSelectedType[]) {
  const uploadData: { buffer: Buffer<ArrayBuffer>; fileType: string; name: string }[] = [];
  const arr = Array.from(files);
  for (let i = 0; i < arr.length; i++) {
    const file = arr[i];
    if (filesUploadSelected.some((fileObj) => fileObj.name === file.name)) {
      const buffer = Buffer.from(await file.arrayBuffer());
      uploadData.push({ buffer, fileType: file.type, name: file.name });
    }
  }
  return uploadData;
}
