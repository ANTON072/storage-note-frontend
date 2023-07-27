import { Box, CircularProgress, Stack } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { API_BASE_URL, appApi } from "@/domain/application";
import { useUser } from "@/domain/users";

import { StorageListItem } from "..";

import type { StorageResponse } from "../types";

type Props = {
  noStorageAlert: React.ReactNode;
  onOpenForm: (values: StorageResponse) => void;
};

export const StorageListContainer = ({ noStorageAlert, onOpenForm }: Props) => {
  const { appUser, isOwner } = useUser();

  const query = useQuery({
    queryKey: ["storages", appUser?.name],
    queryFn: async () => {
      const { data } = await appApi.get<StorageResponse[]>(
        `${API_BASE_URL}/v1/storages`
      );

      return data;
    },
  });

  const storages = query.data || [];

  if (query.isFetching) {
    return (
      <Box h={`300px`}>
        <CircularProgress isIndeterminate />
      </Box>
    );
  }

  if (query.isSuccess && storages.length < 1) {
    return <>{noStorageAlert}</>;
  }

  return (
    <Stack spacing={3}>
      {storages.map((storage) => (
        <StorageListItem
          isOwner={isOwner(storage.members)}
          key={storage.id}
          onClickSettings={() => {
            onOpenForm(storage);
          }}
          {...storage}
        />
      ))}
    </Stack>
  );
};
