import { Link } from "react-router-dom";

import {
  Card,
  CardBody,
  Heading,
  Box,
  IconButton,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";

import type { CategoryResponse } from "@/domain/category";
import type { StorageResponse } from "@/domain/storage";

import { CategoryBadge } from "../CategoryBadge";

import { Thumbnail } from "./Thumbnail";

import type { StockResponse } from "../../types";

type Props = {
  storage: StorageResponse;
  stock: StockResponse;
  category?: CategoryResponse;
  counterComponent: React.ReactNode;
  favoriteComponent: React.ReactNode;
  onEdit: () => void;
};

export const StockListItem = ({
  stock,
  storage,
  category,
  counterComponent,
  favoriteComponent,
  onEdit,
}: Props) => {
  const detailLink = `/storage/${storage.id}/stocks/${stock.id}`;

  const isAlert = stock.itemCount <= stock.alertThreshold;

  return (
    <Card variant={`outline`}>
      <CardBody p={2} bg={isAlert ? `red.100` : `white`}>
        <Grid
          templateAreas={`
                  "img main"
                  "img footer"`}
          gridTemplateRows={"1fr"}
          gridTemplateColumns={"100px 1fr"}
          h="100px"
          gap={2}
        >
          <GridItem area={`img`}>
            <Link to={detailLink}>
              <Thumbnail imageUrl={stock.imageUrl} />
            </Link>
          </GridItem>
          <GridItem area={`main`}>
            <HStack>
              <Heading
                as={Link}
                to={detailLink}
                textDecoration={`underline`}
                fontSize={14}
                flex={1}
              >
                {stock.name}
              </Heading>
              {favoriteComponent}
            </HStack>
            <Box>
              <CategoryBadge category={category} />
            </Box>
          </GridItem>
          <GridItem area={`footer`}>
            <HStack justifyContent={`flex-end`}>
              {counterComponent}
              <IconButton
                size={`xs`}
                rounded={`100%`}
                aria-label="編集"
                color={`gray.500`}
                icon={<BiEdit />}
                onClick={onEdit}
              />
            </HStack>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};
