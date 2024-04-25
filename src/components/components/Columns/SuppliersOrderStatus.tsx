import React from "react";
import { Flex, Tag } from "@chakra-ui/react";

type Props = {
  type: string;
};

export const SuppliersOrderStatus = ({ type }: Props) => {
  const getBackgroundColor = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "0":
        return "teal.100";
      case "1":
        return "red.100";
      case "2":
        return "green.100";
      default:
        return "gray.100";
    }
  };

  const getTextColor = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "0":
        return "teal.800";
      case "1":
        return "red.800";
      case "2":
        return "green.800";
      default:
        return "gray.800";
    }
  };

  const getTextTranslated = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "0":
        return "ENVIADA";
      case "1":
        return "EM TRANSITO";
      case "2":
        return "RECEBIDA";
      default:
        return "N/A";
    }
  };
  return (
    <Flex justify={"center"} align={"center"}>
      <Tag
        backgroundColor={getBackgroundColor(type)}
        fontSize={"2xs"}
        fontWeight={"bold"}
        borderRadius={"full"}
        color={getTextColor(type)}
      >
        {getTextTranslated(type)}
      </Tag>
    </Flex>
  );
};
