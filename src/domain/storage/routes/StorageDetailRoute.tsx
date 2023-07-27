import { useParams } from "react-router-dom";

import { Box, Container, Flex, Stack } from "@chakra-ui/react";

import { PageHead, PageNotFound } from "@/domain/application";
import { StockListItem, useStockForm } from "@/domain/stock";
import { useUser } from "@/domain/users";

import { FooterNav } from "../components/FooterNav";
import { Loading } from "../components/Loading";
import { QueryPanel } from "../components/QueryPanel";
import { StorageHeading } from "../components/StorageHeading";
import { StorageMembers } from "../components/StorageMembers";
import { useStorageForm } from "../hooks/useStorageForm";
import { useStorageQuery } from "../hooks/useStorageQuery";

export const StorageDetailRoute = () => {
  const { storageId } = useParams<{ storageId: string }>();

  const { storageQuery } = useStorageQuery(storageId);

  const { StockFormDrawer, onDrawerOpen } = useStockForm();

  const { StorageFormDrawer, onDrawerOpen: onStorageDrawerOpen } =
    useStorageForm();

  const { isOwner } = useUser();

  const storage = storageQuery.data;

  if (!storageId || storageQuery.isError) return <PageNotFound />;

  if (!storage) return null;

  return (
    <>
      <PageHead title={`ストレージ`} />
      <Flex direction={`column`} h={`100%`}>
        <Container maxW="container.md" flex={1} mt={5} pb={5}>
          {storageQuery.isLoading ? (
            <Loading />
          ) : (
            <>
              <Stack spacing={3}>
                <Box>
                  <StorageHeading
                    storage={storage}
                    isOwner={isOwner(storage.members)}
                    onOpenDrawer={() => {
                      onStorageDrawerOpen(storage);
                    }}
                  />
                </Box>
                <Box>
                  <StorageMembers
                    storage={storage}
                    isOwner={isOwner(storage.members)}
                    onOpenDrawer={() => {
                      onStorageDrawerOpen(storage);
                    }}
                  />
                </Box>
                <Box>
                  <QueryPanel />
                </Box>
                <Stack spacing={3}>
                  <StockListItem />
                  <StockListItem />
                  <StockListItem />
                  <StockListItem />
                  <StockListItem />
                  <StockListItem />
                </Stack>
              </Stack>
            </>
          )}
        </Container>
        <FooterNav onClick={onDrawerOpen} />
      </Flex>
      <StockFormDrawer storageId={storageId} />
      <StorageFormDrawer />
    </>
  );
};
