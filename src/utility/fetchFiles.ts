import { FileType } from "@/schema/user";

export const fetchFiles = async (type: string) => {
  const res = await fetch(`/api/getFiles?type=${type}`);
  const data = await res.json();
  if (res.status === 200) {
    console.log(data);
    return data.files as FileType;
  } else {
    throw Error(data.msg);
  }
};
