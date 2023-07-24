import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

import type { ApiError } from "@/domain/application";
import { store, refreshIdToken } from "@/domain/application";

import type { AxiosError } from "axios";

export const appApi = axios.create();

appApi.defaults.headers.common["Content-Type"] = "application/json";
appApi.defaults.headers.common["Accept"] = "application/json";

// 共通リクエスト処理
appApi.interceptors.request.use(
  (config) => {
    const {
      auth: { idToken },
    } = store.getState();

    if (!idToken) {
      throw new Error("トークンがありません");
    }
    // config.headers["Authorization"] = `Bearer ${idToken}`;
    config.headers[
      "Authorization"
    ] = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyZGZmNzhhMGJkZDVhMDIyMTIwNjM0OTlkNzdlZjRkZWVkMWY2NWIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiS2F0c3VzaGkgT1VHSSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRkQXhiT3dJUndPUFNTTkZOWXR4YjI2ZnF1QkxMdE90UXhtazliTjlnPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3N0b3JhZ2Utbm90ZS1kZXYiLCJhdWQiOiJzdG9yYWdlLW5vdGUtZGV2IiwiYXV0aF90aW1lIjoxNjkwMTcxMTEyLCJ1c2VyX2lkIjoiNFhITXZvdlJ3dFhvZUNJbldvWmxkNnkwUE5zMSIsInN1YiI6IjRYSE12b3ZSd3RYb2VDSW5Xb1psZDZ5MFBOczEiLCJpYXQiOjE2OTAxNzYxMTcsImV4cCI6MTY5MDE3OTcxNywiZW1haWwiOiJvdWdpQHN0cm9iZS1zY29wZS5uZXQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNDcxOTg2MjIzMjA1NjMyNzM0MiJdLCJlbWFpbCI6WyJvdWdpQHN0cm9iZS1zY29wZS5uZXQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.IMFKkqToqsW302FEP5jf5jYrZExFLt4fKswAWgKAv5tK0GMXFBR0R1_U7wCgu82OBTDCWxcvd9jGs72iDL3c77_hzENOuHKGzvn0Do4qpE31Yh4JepxV6DR_e0vRmRys-1Ezz1KojGqpbMrDb2Ias3TpAR2QhJfI3no9yzMu83tRVyqNhw-yDfxiPuZbXsV2ohx4A1ZJihvL30hPcFpccrMsocj9qJIQhAw0NMAnKXQUrC1cwBokaG_JeIRNyNZ1x8MGORR0ibxuhztfp0Hugo4SGoEHJBy-kW69Z-TqFJEvKRpeBw_pxcMXcsd8ov13fvN9Y1z6rXHABQOmYANbdQ`;

    // リクエストデータをスネークケースにキー変換
    if (config.data) {
      config.data = snakecaseKeys(config.data, { deep: true });
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 共通レスポンス処理
appApi.interceptors.response.use(
  (response) => {
    // レスポンスデータをキャメルケースに変換
    response.data = camelcaseKeys(response.data, { deep: true });

    return response;
  },
  async (error: AxiosError<ApiError>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalRequest = error.config as any;
    const statusCode = error.response?.status;
    const errors = error.response?.data.errors;
    const title = errors ? errors[0].title : undefined;

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
