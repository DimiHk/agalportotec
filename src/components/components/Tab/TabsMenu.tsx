import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

type Props = {
  tabs: Tab[];
  currentTab: string;
  handleChangeTab: (tab: string) => void;
};

type Tab = {
  name: string;
  iconIsRight?: boolean;
  iconIsLeft?: boolean;
  props?: FontAwesomeIconProps;
};

export const TabsMenu = ({ tabs, currentTab, handleChangeTab }: Props) => {
  return (
    <React.Fragment>
      {tabs.map((tab) => {
        return (
          <React.Fragment key={tab.name}>
            {tab.props && tab.props.icon ? (
              <Button
                key={tab.name}
                onClick={() => handleChangeTab(tab.name)}
                size={"sm"}
                rounded={"full"}
                colorScheme={currentTab === tab.name ? "blue" : "gray"}
              >
                <Flex align={"center"} gap={2}>
                  {tab.iconIsLeft && <FontAwesomeIcon {...tab.props} />}
                  {tab.name}
                  {tab.iconIsRight && <FontAwesomeIcon {...tab.props} />}
                </Flex>
              </Button>
            ) : (
              <Button
                key={tab.name}
                onClick={() => handleChangeTab(tab.name)}
                size={"sm"}
                rounded={"base"}
                colorScheme={currentTab === tab.name ? "blue" : "gray"}
              >
                {tab.name}
              </Button>
            )}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};
