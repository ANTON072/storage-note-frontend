import { Heading, Stack, Text } from "@chakra-ui/react";

export const FormTitle = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <Stack align={"center"}>
      <Heading fontSize={"3xl"} textAlign={"center"}>
        {title}
      </Heading>
      {description && (
        <Text fontSize={"lg"} color={"gray.600"}>
          {description}
        </Text>
      )}
    </Stack>
  );
};
