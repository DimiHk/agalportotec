import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";

export const postRequest = async <B, R>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<R> => {
  return await axiosInstance
    .post(url, body, config)
    .then((res) => res.data as R);
};

export const getRequest = async <R>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> => {
  return await axiosInstance.get(url, config).then((res) => res.data as R);
};

export const putRequest = async <B, R>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<R> => {
  return await axiosInstance
    .put(url, body, config)
    .then((res) => res.data as R);
};

export const patchRequest = async <B, R>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<R> => {
  return await axiosInstance
    .patch(url, body, config)
    .then((res) => res.data as R);
};

export const deleteRequest = async <R>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> => {
  return await axiosInstance.delete(url, config).then((res) => res.data as R);
};
