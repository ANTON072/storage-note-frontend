import { Box, Container, Stack } from "@chakra-ui/react";

import { PageHead } from "@/domain/application";
import { StockListItem } from "@/domain/stock";
import {
  StorageListContainer,
  useStorageForm,
  NoStorageAlert,
} from "@/domain/storage";

import { DashboardHeading } from "../components/DashboardHeading";

export const DashboardRoute = () => {
  const { StorageFormDrawer, CreateStorageButton, onDrawerOpen } =
    useStorageForm();

  return (
    <>
      <PageHead title={`ダッシュボード`} />
      <Container maxW="container.md" pb={3}>
        <Stack spacing={2}>
          <Box>
            <DashboardHeading button={<CreateStorageButton />}>
              参加中のストレージ
            </DashboardHeading>
            <StorageListContainer
              onOpenForm={(values) => {
                onDrawerOpen(values);
              }}
              noStorageAlert={
                <NoStorageAlert createButton={<CreateStorageButton />} />
              }
            />
          </Box>
          <Box>
            <DashboardHeading>在庫が少ないストック</DashboardHeading>
            <Stack spacing={3}>
              <StockListItem />
              <StockListItem />
              <StockListItem />
              <StockListItem />
            </Stack>
          </Box>
        </Stack>
      </Container>
      <StorageFormDrawer />
    </>
  );
};
