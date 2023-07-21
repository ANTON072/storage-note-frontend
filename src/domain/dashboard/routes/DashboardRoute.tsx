import { Box, Container, Stack, SimpleGrid } from "@chakra-ui/react";

import { PageHead, AppHeading } from "@/domain/application";
import {
  StockListItem,
  StorageListContainer,
  useStorageForm,
} from "@/domain/storage";
import { NoStorageAlert } from "@/domain/storage/components/NoStorageAlert";

export const DashboardRoute = () => {
  const { StorageFormDrawer, CreateStorageButton, onDrawerOpen } =
    useStorageForm();

  return (
    <>
      <PageHead title={`ダッシュボード`} />
      <Container maxW="container.xl">
        <Stack spacing={10}>
          <Box>
            <AppHeading button={<CreateStorageButton />}>
              参加中のストレージ
            </AppHeading>
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
            <AppHeading>在庫が少ないストック</AppHeading>
            <SimpleGrid spacing={5} minChildWidth={[`200px`, `500px`]}>
              <StockListItem />
              <StockListItem />
              <StockListItem />
              <StockListItem />
            </SimpleGrid>
          </Box>
        </Stack>
      </Container>
      <StorageFormDrawer />
    </>
  );
};
