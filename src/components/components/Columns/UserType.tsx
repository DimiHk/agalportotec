import React from "react";
import { Flex, Tag } from "@chakra-ui/react";

type Props = {
  type: string;
};

export const UserType = ({ type }: Props) => {
  return (
    <Flex justify={"center"} align={"center"}>
      <Tag
        backgroundColor={type.toString() === "0" ? "blue.100" : "green.100"}
        borderRadius={"full"}
        paddingStart={2}
        paddingEnd={2}
        fontSize={"2xs"}
        fontWeight={"bold"}
        color={type.toString() === "0" ? "blue.800" : "green.800"}
      >
        {type.toString() === "0" ? "ADMINISTRADOR" : "CLIENTE"}
      </Tag>
    </Flex>
  );
};
