import { Flex, Heading } from "@chakra-ui/react";

type Props = {
  children: string;
  button?: React.ReactNode;
  my?: number;
};

export const AppHeading = ({ children, button, my = 10 }: Props) => {
  return (
    <Flex
      direction={["column", "column", "row"]}
      justifyContent={`space-between`}
      alignItems={`center`}
      my={my}
      gap={[5, 5, 0]}
    >
      <Heading>{children}</Heading>
      {button}
    </Flex>
  );
};
