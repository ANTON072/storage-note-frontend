import axios from "axios";

import type { ApiError } from "@/domain/application";
import { store, refreshIdToken } from "@/domain/application";

import { camelcaseKeys, snakecaseKeys } from "../libs/convertKeys";

import type { AxiosError } from "axios";

export const appApi = axios.create();

appApi.defaults.headers.common["Content-Type"] = "application/json";

// 共通リクエスト処理
appApi.interceptors.request.use(
  (config) => {
    const {
      auth: { idToken },
    } = store.getState();

    if (!idToken) {
      throw new Error("トークンがありません");
    }
    config.headers["Authorization"] = `Bearer ${idToken}`;

    // リクエストデータをスネークケースにキー変換
    if (config.data) {
      config.data = snakecaseKeys(config.data);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 共通レスポンス処理
appApi.interceptors.response.use(
  (response) => {
    // レスポンスデータをキャメルケースに変換
    response.data = camelcaseKeys(response.data);

    return response;
  },
  async (error: AxiosError<ApiError>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalRequest = error.config as any;
    const statusCode = error.response?.status;
    const errors = error.response?.data.errors;
    const title = errors ? errors[0].title : undefined;

    console.log("--------------------------------------->");

    // トークンの期限切れ
    if (
      statusCode === 401 &&
      title?.includes("Expired") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await refreshIdToken();
      return appApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
