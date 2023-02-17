import { Ref } from "vue";
import { get, post, del, patch, upload } from "./axios";

// 上传相关接口
export async function uploadPicture(formData: FormData) {
  return post("/upload/uploadPicture", formData);
}

export async function uploadPackage(formData: FormData, progress: Ref) {
  return upload("/upload/uploadPackage", formData, progress);
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

export async function getAllStation() {
  return get("/station/getAllStation");
}

// manage相关接口
export async function checkConfig(jsonData: { folderName: string }) {
  return post("/manage/checkConfig", jsonData);
}

// device相关接口
export async function initDevice(jsonData: {
  folderName: string;
  name: string;
  lon: number;
  lat: number;
  stationId: string;
  description: string;
  avatar: string;
}) {
  return post(`/device/initDevice`, jsonData);
}
