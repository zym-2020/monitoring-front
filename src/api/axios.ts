import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { notice } from "@/utils/commonUtil";
import { Ref } from "vue";

const requestList = new Set();

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/monitoring/",
  timeout: 200000,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === -4 || response.data.code === -5) {
      return response.data;
    }
    if (
      response.data.refreshToken != null &&
      response.data.refreshToken != ""
    ) {
    }
    setTimeout(() => {
      requestList.delete(response.config.url + response.config.data);
    }, 600); //请求间隔600ms
    return response.data;
  },
  (err: AxiosResponse) => {
    if (axios.isCancel(err)) {
      console.log(err);
      notice("warning", "警告", "操作过于频繁");
      return null;
    } else {
      notice("error", "错误", "请求错误");
      requestList.delete(err.config.url + err.config.data);
      return err.data;
    }
  }
);

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.cancelToken = new axios.CancelToken((e) => {
    const cancelRequest = () => {
      let url: string = (config.baseURL as string) + config.url;
      e(url);
    };
    if (JSON.stringify(config.data) != "{}") {
      requestList.has(config.url + JSON.stringify(config.data))
        ? cancelRequest()
        : requestList.add(config.url + JSON.stringify(config.data));
    }
  });
  return config;
});

export const get = (url: string, params?: any) => {
  return axiosInstance({
    url: url,
    params: params,
    method: "get",
  });
};

export const post = (url: string, data?: any) => {
  return axiosInstance({
    url: url,
    data: data,
    method: "post",
  });
};

export const del = (url: string, data?: any) => {
  return axiosInstance({
    url: url,
    data: data,
    method: "delete",
  });
};

export const patch = (url: string, data?: any) => {
  return axiosInstance({
    url: url,
    data: data,
    method: "patch",
  });
};

export const upload = (url: string, formData: FormData, progress: Ref) => {
  return axiosInstance({
    url: url,
    data: formData,
    method: "post",
    onUploadProgress: (progressEvent) => {
      progress.value = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
    },
  });
};
