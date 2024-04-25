import React from "react";
import { Flex, Tag } from "@chakra-ui/react";

type Props = {
  type: string;
};

export const ClientType = ({ type }: Props) => {
  return (
    <Flex justify={"center"} align={"center"}>
      <Tag
        backgroundColor={type === "EnterpriseClient" ? "blue.100" : "green.100"}
        borderRadius={"full"}
        paddingStart={2}
        paddingEnd={2}
        fontSize={"2xs"}
        fontWeight={"bold"}
        color={type === "EnterpriseClient" ? "blue.800" : "green.800"}
      >
        {type === "EnterpriseClient" ? "EMPRESARIAL" : "CONSUMIDOR FINAL"}
      </Tag>
    </Flex>
  );
};
