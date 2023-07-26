import { Center, CircularProgress } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Center h={`100%`}>
      <CircularProgress isIndeterminate />
    </Center>
  );
};
