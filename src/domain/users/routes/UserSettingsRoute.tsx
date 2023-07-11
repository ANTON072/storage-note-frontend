import { useMemo } from "react";

import {
  Heading,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

import type { AppState } from "@/domain/application";

import { ChangeLoginFormContainer } from "../containers/ChangeLoginFormContainer";
import { UserSettingsContainer } from "../containers/UserSettingsContainer";

export const UserSettingsRoute = () => {
  const provider = useSelector(
    (state: AppState) => state.user.firebase?.providerData
  );

  const isGoogleAccount = useMemo(() => {
    if (!provider) return false;
    return !!provider.find((p) => p.providerId.includes("google"));
  }, [provider]);

  return (
    <Container>
      <Heading as={`h2`} my={10} textAlign={`center`}>
        ユーザー設定
      </Heading>
      <Tabs align={`center`}>
        <TabList mb={5}>
          <Tab>プロフィール</Tab>
          <Tab isDisabled={isGoogleAccount}>ログイン情報</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserSettingsContainer />
          </TabPanel>
          <TabPanel>
            <ChangeLoginFormContainer />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
