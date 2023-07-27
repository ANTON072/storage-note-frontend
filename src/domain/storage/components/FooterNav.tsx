import { Box, Button, Center, Container } from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";

type Props = {
  onClick: () => void;
};

export const FooterNav = ({ onClick }: Props) => {
  return (
    <Box position={`sticky`} left={0} bottom={0}>
      <Container maxW="container.md"></Container>
      <Box
        background={`white`}
        w={`100%`}
        borderTop={1}
        borderStyle={"solid"}
        borderColor="gray.200"
        px={3}
        py={3}
      >
        <Center>
          <Button
            leftIcon={<MdAddCircle />}
            colorScheme="blue"
            w={`100%`}
            maxW={`500px`}
            size={`md`}
            onClick={onClick}
          >
            ストック追加
          </Button>
        </Center>
      </Box>
    </Box>
  );
};
