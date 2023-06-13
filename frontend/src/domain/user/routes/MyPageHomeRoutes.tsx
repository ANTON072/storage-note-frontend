import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const MyPageHomeRoutes = () => {
  return (
    <Box>
      <h1>MyPage Home</h1>
      <Link to={`/app`}>ダッシュボード</Link>
    </Box>
  );
};
