import { Box } from "@chakra-ui/react";

type Props = {
  noResultText?: string;
};

export const NoResult = ({ noResultText = "検索結果がありません" }: Props) => {
  return (
    <Box p={2} textAlign={`center`} fontSize={13}>
      {noResultText}
    </Box>
  );
};
