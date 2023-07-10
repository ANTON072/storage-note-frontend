import { Flex, Heading } from "@chakra-ui/react";

type Props = {
  children: string;
  button?: React.ReactNode;
};

export const AppHeading = ({ children, button }: Props) => {
  return (
    <Flex
      direction={["column", "column", "row"]}
      justifyContent={`space-between`}
      alignItems={`center`}
      my={10}
      gap={[5, 5, 0]}
    >
      <Heading>{children}</Heading>
      {button}
    </Flex>
  );
};
