import { Link } from "react-router-dom";

import { SettingsIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Stack,
  Avatar,
  CardFooter,
  Heading,
  AvatarGroup,
  Text,
  Box,
  IconButton,
  HStack,
} from "@chakra-ui/react";

import { StorageItemImage } from "./StorageItemImage";

import type { StorageResponse } from "../types";

type Props = StorageResponse & {
  isOwner: boolean;
};

export const StorageListItem = ({
  id,
  name,
  description,
  imageUrl,
  members,
  isOwner,
}: Props) => {
  return (
    <Card
      as={Link}
      to={`/storages/${id}`}
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      _hover={{
        bg: "gray.50",
        cursor: "pointer",
      }}
    >
      <Box
        w={`100%`}
        minH={{ sm: "150px", md: "200px" }}
        maxW={{ sm: "150px", md: "200px" }}
      >
        <StorageItemImage imageUrl={imageUrl} />
      </Box>
      <Stack w={`100%`}>
        <CardBody>
          <Stack>
            <HStack alignItems={`flex-start`}>
              <Heading flex={1} size="md">
                {name}
              </Heading>
              {isOwner && (
                <IconButton
                  isRound
                  size={`sm`}
                  aria-label="設定"
                  icon={<SettingsIcon />}
                  position={`relative`}
                  top={`-5px`}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("click");
                  }}
                />
              )}
            </HStack>
            {description && <Text fontSize={14}>{description}</Text>}
          </Stack>
        </CardBody>
        <CardFooter>
          {members.length > 0 && (
            <AvatarGroup size="sm" max={5}>
              {members.map((member) => (
                <Avatar key={member.name} src={member.photoUrl} />
              ))}
            </AvatarGroup>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
};
