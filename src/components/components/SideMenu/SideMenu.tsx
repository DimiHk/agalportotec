import { Flex } from "@chakra-ui/react";
import { SideMenuLogo } from "./SideMenuLogo";
import { SideMenuTabs } from "./SideMenuTabs";
import { SideMenuOptions } from "./SideMenuOptions";
import { tabs } from "./Tabs";

export const SideMenu = () => {
  return (
    <Flex
      shadow={"base"}
      backgroundColor={"#0093E9"}
      backgroundImage={
        "linear-gradient( 109.6deg, rgba(62,161,219,1) 1.0%, rgba(93,52,236,1) 100.2% )"
      }
      width={"240px"}
      borderTopRightRadius={"32px"}
      borderBottomRightRadius={"32px"}
      paddingTop={"1.5rem"}
      paddingRight={"1.5rem"}
      paddingLeft={"1rem"}
    >
      <Flex
        width={"full"}
        direction={"column"}
        justifyContent={"space-between"}
        gap={4}
      >
        <Flex gap={6} direction={"column"}>
          <SideMenuLogo logoName={"BOOMMO"} />
          <SideMenuTabs tabs={tabs} />
        </Flex>
        <SideMenuOptions />
      </Flex>
    </Flex>
  );
};
