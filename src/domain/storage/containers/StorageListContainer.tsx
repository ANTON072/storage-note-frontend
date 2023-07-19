import {
  Box,
  Button,
  Container,
  Stack,
  SimpleGrid,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useQuery } from "react-query";

import { API_BASE_URL, appApi } from "@/domain/application";
import { useUser } from "@/domain/users";

import { StorageListItem } from "..";

import type { Storage, StorageResponse } from "../types";

type Props = {
  noStorageAlert: React.ReactNode;
};

export const StorageListContainer = ({ noStorageAlert }: Props) => {
  const { appUser } = useUser();

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
    return <div>Loading...</div>;
  }

  if (query.isSuccess && storages.length < 1) {
    return <>{noStorageAlert}</>;
  }

  return (
    <SimpleGrid spacing={5} minChildWidth={[`200px`, `500px`]}>
      {storages.map((storage) => (
        <StorageListItem key={storage.id} {...storage} />
      ))}
    </SimpleGrid>
  );
};
