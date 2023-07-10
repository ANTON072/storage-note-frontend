import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Stack,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";

import { PageHead, AppHeading } from "@/domain/application";
import {
  StockListItem,
  StorageListItem,
  useStorageForm,
} from "@/domain/storage";

export const DashboardRoute = () => {
  const { StorageFormDrawer, onOpen } = useStorageForm();

  return (
    <>
      <PageHead title={`ダッシュボード`} />
      <Container maxW="container.xl">
        <Stack spacing={10}>
          <Box>
            <AppHeading
              button={
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="blue"
                  onClick={() => onOpen()}
                >
                  新規ストレージ作成
                </Button>
              }
            >
              参加中のストレージ
            </AppHeading>
            <SimpleGrid spacing={5} minChildWidth={`400px`}>
              <StorageListItem />
              <StorageListItem />
            </SimpleGrid>
          </Box>
          <Box>
            <AppHeading>在庫が少ないストック</AppHeading>
            <SimpleGrid spacing={5} minChildWidth={`500px`}>
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
