import { Link } from "react-router-dom";

import { SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { MdHome } from "react-icons/md";

import type { StorageResponse } from "../types";

type Props = {
  storage: StorageResponse;
};

export const StorageHeading = ({ storage }: Props) => {
  return (
    <Box>
      <Flex justifyContent={`space-between`}>
        <Button
          color="gray.500"
          leftIcon={<MdHome />}
          size="xs"
          as={Link}
          to={"/"}
        >
          Home
        </Button>
        <IconButton
          rounded={`full`}
          size={`xs`}
          color={`gray.500`}
          aria-label="ストレージの設定"
          icon={<SettingsIcon />}
        />
      </Flex>
      <Flex mt={3} gap={3} alignItems={`center`}>
        <Box flex={1}>
          <Heading fontSize={22}>{storage.name}</Heading>
          {storage.description && (
            <Text fontSize={14} mt={1} color={`blackAlpha.600`}>
              {storage.description}
            </Text>
          )}
        </Box>
        {storage.imageUrl && (
          <Image
            boxSize="60px"
            rounded={10}
            objectFit="cover"
            src={storage.imageUrl}
            alt=""
          />
        )}
      </Flex>
    </Box>
  );
};
