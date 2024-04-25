import { useAuthentication } from "@/providers/authenticationProvider";
import { Flex, Divider, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type Tab = {
  name: string;
  icon: JSX.Element;
  href: string;
};

type Props = {
  tabs: Tab[];
};

export const SideMenuTabs = ({ tabs }: Props) => {
  const { session } = useAuthentication();

  return (
    <Flex direction={"column"} gap={4}>
      {tabs.map(({ name, href, icon }) => {
        return (
          <React.Fragment key={name}>
            {session?.userType.toLocaleLowerCase() !== "administrator" &&
            (name === "CONTABILIDADE" ||
              name === "UTILIZADORES") ? undefined : (
              <Link href={href}>
                <Flex width={"full"} direction={"column"} gap={1} padding={0}>
                  <Flex
                    cursor={"pointer"}
                    alignItems={"center"}
                    gap={2.5}
                    padding={"0.5rem"}
                    borderRadius={"base"}
                    _hover={{
                      background: "whiteAlpha.200",
                      shadow: "base",
                      transitionTimingFunction: "fade-in",
                    }}
                  >
                    {icon}
                    <Text
                      fontSize={"xs"}
                      lineHeight={"7"}
                      fontWeight={"semibold"}
                      color={"white"}
                    >
                      {name}
                    </Text>
                  </Flex>
                  <Divider opacity={"20%"} />
                </Flex>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </Flex>
  );
};
