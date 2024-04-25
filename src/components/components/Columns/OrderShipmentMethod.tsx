import React from "react";
import { Flex, Tag } from "@chakra-ui/react";

type Props = {
  type: string;
};

export const OrderShipmentMethod = ({ type }: Props) => {
  const getBackgroundColor = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "shippingcompany":
        return "blue.100";
      case "storepickup":
        return "green.100";
      default:
        return "gray.100";
    }
  };

  const getTextColor = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "shippingcompany":
        return "blue.800";
      case "storepickup":
        return "green.800";
      default:
        return "gray.800";
    }
  };

  const getTextTranslated = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "shippingcompany":
        return "TRANSPORTADORA";
      case "storepickup":
        return "LOJA";
      default:
        return "N/A";
    }
  };

  return (
    <Flex justify={"center"} align={"center"} textAlign={"center"}>
      <Tag
        backgroundColor={getBackgroundColor(type)}
        fontSize={"2xs"}
        fontWeight={"bold"}
        color={getTextColor(type)}
        borderRadius={"full"}
      >
        {getTextTranslated(type)}
      </Tag>
    </Flex>
  );
};
