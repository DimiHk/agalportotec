import { Flex, Avatar, Container, Text } from "@chakra-ui/react";

type Props = {
  name: string;
  email: string;
};

export const SideMenuUser = ({ name, email }: Props) => {
  return (
    <Flex
      gap={0}
      align={"center"}
      justify={"center"}
      _hover={{
        transitionTimingFunction: "fade-in",
      }}
    >
      <Avatar marginLeft={"0.275rem"} size={"sm"} />
      <Container>
        <Text fontSize={"xs"} fontWeight={"semibold"} color={"white"}>
          {name}
        </Text>
        <Text fontSize={"xs"} fontWeight={"semibold"} color={"white"}>
          {email}
        </Text>
      </Container>
    </Flex>
  );
};
