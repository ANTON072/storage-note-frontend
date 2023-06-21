import { MOCK_API_BASE_URL, appApi } from "@/domain/application";

import type { AppUser } from "./types";

export const getAppUser = async () => {
  const response = await appApi.get<AppUser>(`${MOCK_API_BASE_URL}/v1/user`);

  return response.data;
};
