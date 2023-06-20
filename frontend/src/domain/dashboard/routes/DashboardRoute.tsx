import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Box } from "@chakra-ui/react";

import { PageHead } from "@/domain/application";
import { getUsers } from "@/domain/application/libs/appApi";

export const DashboardRoute = () => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <PageHead title={`ダッシュボード`} />
      <Box>
        <h1>ダッシュボード</h1>
        <Link to={`/app/settings`}>マイページ</Link>
      </Box>
    </>
  );
};
