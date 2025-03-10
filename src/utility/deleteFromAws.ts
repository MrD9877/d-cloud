import { deleteImages } from "@/app/api/utility/awsBucket";

export async function deleteFromAws(files: string[]) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    await deleteImages(file);
  }
}
