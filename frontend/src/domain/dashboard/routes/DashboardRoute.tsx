import { Box } from "@chakra-ui/react";

import { PageHead } from "@/domain/application";
// import { useUser } from "@/domain/users";

export const DashboardRoute = () => {
  // const { user } = useUser();

  return (
    <>
      <PageHead title={`ダッシュボード`} />
      <Box>
        <h1>ダッシュボード</h1>
      </Box>
    </>
  );
};
