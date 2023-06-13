import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PageHead } from "@/domain/application";

export const DashboardRoute = () => {
  return (
    <>
      <PageHead title={`ダッシュボード`} />
      <Box>
        <h1>ダッシュボード</h1>
        <Link to={`/app/mypage`}>マイページ</Link>
      </Box>
    </>
  );
};
