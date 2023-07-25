import { Flex, Heading } from "@chakra-ui/react";

type Props = {
  children: string;
  button?: React.ReactNode;
  my?: number;
};

export const DashboardHeading = ({ children, button, my = 5 }: Props) => {
  return (
    <Flex
      direction={["column", "column", "row"]}
      justifyContent={`space-between`}
      alignItems={`center`}
      my={my}
      gap={[3, 3, 0]}
    >
      <Heading size={`md`}>{children}</Heading>
      {button}
    </Flex>
  );
};
