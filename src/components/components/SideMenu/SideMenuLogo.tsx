import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

type Props = {
  logoName: string;
};

export const SideMenuLogo = ({ logoName }: Props) => {
  const router = useRouter();
  return (
    <Flex direction={"column"} gap={4}>
      <Text
        onClick={() => router.push("/dashboard/clients")}
        fontSize={"2xl"}
        fontWeight={"bold"}
        color={"white"}
        cursor={"pointer"}
        textAlign={"center"}
      >
        {logoName}
      </Text>
    </Flex>
  );
};
