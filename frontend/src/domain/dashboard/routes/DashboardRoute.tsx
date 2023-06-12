import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const DashboardRoute = () => {
  return (
    <Box>
      <h1>ダッシュボード</h1>
      <Link to={`/app/mypage`}>マイページ</Link>
    </Box>
  );
};
