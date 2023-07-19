import {
  Card,
  CardBody,
  Stack,
  Image,
  Avatar,
  CardFooter,
  Heading,
  AvatarGroup,
  Text,
} from "@chakra-ui/react";

import type { StorageResponse } from "../types";

export const StorageListItem = ({
  name,
  id,
  imageUrl,
  members,
}: StorageResponse) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={imageUrl}
        alt=""
      />

      <Stack>
        <CardBody>
          <Heading size="md">{name}</Heading>
        </CardBody>
        <CardFooter>
          {members.length > 0 && (
            <AvatarGroup size="md" max={2}>
              {members.map((member) => (
                <Avatar
                  key={member.name}
                  name={member.name}
                  src={member.photoUrl}
                />
              ))}
            </AvatarGroup>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
};
