import {
  Heading,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { ProfileFormContainer } from "../containers/ProfileFormContainer";
import { ChangeLoginFormContainer } from "../containers/ChangeLoginFormContainer";

export const SettingsHomeRoutes = () => {
  return (
    <Container>
      <Heading as={`h2`} my={10} textAlign={`center`}>
        ユーザー設定
      </Heading>
      <Tabs align={`center`}>
        <TabList mb={5}>
          <Tab>プロフィール</Tab>
          <Tab>ログイン情報</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProfileFormContainer />
          </TabPanel>
          <TabPanel>
            <ChangeLoginFormContainer />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
