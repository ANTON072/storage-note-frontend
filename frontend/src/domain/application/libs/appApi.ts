import axios from "axios";

import { camelcaseKeys, snakecaseKeys } from "../utils/convertKeys";
import { getCookie } from "../utils/cookie";
import { APP_API_TOKEN_COOKIE_KEY } from "..";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const appApi = axios.create({
  baseURL: BASE_URL,
});

appApi.defaults.headers.common["Content-Type"] = "application/json";

// 共通リクエスト処理
appApi.interceptors.request.use(
  (config) => {
    const token = getCookie(APP_API_TOKEN_COOKIE_KEY);
    if (!token) {
      throw new Error("トークンがありません");
    }
    config.headers.common["Authorization"] = `bearer ${token}`;

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
  (error) => {
    return Promise.reject(error);
  }
);

// export const signUpUserFn = async (user: RegisterInput) => {
//   const response = await authApi.post<GenericResponse>('auth/register', user);
//   return response.data;
// };
