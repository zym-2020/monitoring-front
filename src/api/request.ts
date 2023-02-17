import { get, post, del, patch } from "./axios";

// 上传相关接口
export async function uploadPicture(formData: FormData) {
  return post("/upload/uploadPicture", formData);
}

// station相关接口
export async function addStation(jsonData: {
  name: string;
  department: string;
  description: string;
  lon: number;
  lat: number;
  avatar: string;
}) {
  return post("/station/addStation", jsonData);
}
