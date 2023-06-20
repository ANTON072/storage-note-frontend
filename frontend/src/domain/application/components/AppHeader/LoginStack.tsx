import { Link as RouterLink } from "react-router-dom";

import { Button } from "@chakra-ui/react";

export const LoginStack = () => {
  return (
    <>
      <Button
        as={RouterLink}
        fontSize={"sm"}
        fontWeight={400}
        variant={"link"}
        to={"/auth/login"}
      >
        ログイン
      </Button>
      <Button
        as={RouterLink}
        display={{ base: "none", md: "inline-flex" }}
        fontSize={"sm"}
        fontWeight={600}
        color={"white"}
        bg={"pink.400"}
        to={"/auth/register"}
        _hover={{
          bg: "pink.300",
        }}
      >
        新規登録
      </Button>
    </>
  );
};
