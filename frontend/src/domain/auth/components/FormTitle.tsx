import { Heading, Stack } from "@chakra-ui/react";

export const FormTitle = ({ title }: { title: string }) => {
  return (
    <Stack align={"center"}>
      <Heading fontSize={"3xl"} textAlign={"center"}>
        {title}
      </Heading>
    </Stack>
  );
};
