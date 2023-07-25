import { Link } from "react-router-dom";

import { SettingsIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Stack,
  Avatar,
  Heading,
  AvatarGroup,
  Text,
  IconButton,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { StorageItemImage } from "../StorageItemImage";

import type { StorageResponse } from "../../types";

type Props = StorageResponse & {
  isOwner: boolean;
  onClickSettings: () => void;
};

export const StorageListItem = ({
  id,
  name,
  description,
  imageUrl,
  members,
  isOwner,
  onClickSettings,
}: Props) => {
  return (
    <Card
      as={Link}
      to={`/storages/${id}`}
      _hover={{
        bg: "gray.50",
        cursor: "pointer",
      }}
      variant={`outline`}
    >
      <CardBody p={2}>
        <Grid
          templateAreas={`"img main"`}
          gridTemplateRows={"1fr"}
          gridTemplateColumns={"100px 1fr"}
          h="100px"
          gap={2}
        >
          <GridItem area={`img`}>
            <StorageItemImage imageUrl={imageUrl} />
          </GridItem>
          <GridItem area={`main`}>
            <Stack spacing={1}>
              <HStack>
                <Heading size={`sm`} flex={1}>
                  {name}
                </Heading>
                {isOwner && (
                  <IconButton
                    isRound
                    size={`xs`}
                    aria-label="設定"
                    icon={<SettingsIcon />}
                    onClick={(e) => {
                      e.preventDefault();
                      onClickSettings();
                    }}
                  />
                )}
              </HStack>
              {description && <Text fontSize={`sm`}>{description}</Text>}
              {members.length > 0 && (
                <AvatarGroup size="sm" max={5}>
                  {members.map((member) => (
                    <Avatar key={member.name} src={member.photoUrl} />
                  ))}
                </AvatarGroup>
              )}
            </Stack>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};
