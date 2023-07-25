import { Link } from "react-router-dom";

import {
  Card,
  CardBody,
  Image,
  Heading,
  Box,
  Badge,
  IconButton,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { BiStar } from "react-icons/bi";

import { Counter } from "./Counter";

export const StockListItem = () => {
  return (
    <Card variant={`outline`}>
      <CardBody p={2}>
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
            <Image
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              objectFit="cover"
              w={`100px`}
              h={`100px`}
              rounded={`md`}
            />
          </GridItem>
          <GridItem area={`main`}>
            <HStack>
              <Heading
                as={Link}
                to={`/`}
                textDecoration={`underline`}
                fontSize={14}
                flex={1}
              >
                ワイドハイター詰め替え
              </Heading>
              <IconButton
                size={`xs`}
                color="gray.500"
                aria-label="お気に入りに追加"
                rounded={`full`}
                icon={<BiStar />}
              />
            </HStack>
            <Box>
              <Badge>キッチン</Badge>
            </Box>
          </GridItem>
          <GridItem area={`footer`}>
            <Counter />
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};
