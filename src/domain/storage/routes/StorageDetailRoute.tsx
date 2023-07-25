import { Box, Container, Flex, Stack } from "@chakra-ui/react";

import { PageHead } from "@/domain/application";
import { StockListItem } from "@/domain/stock";

import { FooterNav } from "../components/FooterNav";
import { QueryPanel } from "../components/QueryPanel";
import { StorageHeading } from "../components/StorageHeading";
import { StorageMembers } from "../components/StorageMembers";

export const StorageDetailRoute = () => {
  return (
    <>
      <PageHead title={`ストレージ`} />
      <Flex direction={`column`} h={`100%`}>
        <Container maxW="container.md" flex={1} mt={5}>
          <Stack spacing={2}>
            <Box>
              <StorageHeading>扇家のストレージ</StorageHeading>
            </Box>
            <Box>
              <StorageMembers />
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
        </Container>
        <FooterNav />
      </Flex>
    </>
  );
};
