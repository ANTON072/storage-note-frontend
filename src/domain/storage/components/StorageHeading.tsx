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

type Props = {
  children: string;
};

export const StorageHeading = ({ children }: Props) => {
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
      <Flex mt={2} gap={3} alignItems={`center`}>
        <Box flex={1}>
          <Heading fontSize={20}>{children}</Heading>
          <Text fontSize={14} mt={1} color={`blackAlpha.600`}>
            おうちの在庫品の一覧です
          </Text>
        </Box>
        <Image
          boxSize="60px"
          rounded={10}
          objectFit="cover"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
        />
      </Flex>
    </Box>
  );
};
