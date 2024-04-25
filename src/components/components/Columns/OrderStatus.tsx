import React from "react";
import { Flex, Tag } from "@chakra-ui/react";

type Props = {
  type: string;
};

export const OrderStatus = ({ type }: Props) => {
  const getBackgroundColor = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "created":
        return "green.100";
      case "withheld":
        return "red.100";
      case "readytoship":
        return "blue.100";
      case "shipped":
        return "cyan.100";
      default:
        return "gray.100";
    }
  };

  const getTextColor = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "created":
        return "green.800";
      case "withheld":
        return "red.800";
      case "readytoship":
        return "blue.800";
      case "shipped":
        return "cyan.800";
      default:
        return "gray.800";
    }
  };

  const getTextTranslated = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "created":
        return "CRIADA";
      case "withheld":
        return "PENDENTE";
      case "readytoship":
        return "PRONTA PARA ENVIO";
      case "shipped":
        return "ENVIADA";
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
