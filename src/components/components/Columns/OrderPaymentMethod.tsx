import React from "react";
import { Flex, Tag } from "@chakra-ui/react";

type Props = {
  type: string;
  deliveryMethod: "ShippingCompany" | "StorePickup";
};

export const OrderPaymentMethod = ({ type, deliveryMethod }: Props) => {
  const getBackgroundColor = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "chargeshipping":
        return "yellow.100";
      case "banktransfer":
        return "blue.100";
      case "payatcounter":
        return "green.100";
      case "customdates":
        return "green.100";
      default:
        return "gray.100";
    }
  };

  const getTextColor = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "chargeshipping":
        return "yellow.800";
      case "banktransfer":
        return "blue.800";
      case "payatcounter":
        return "green.800";
      case "customdates":
        return "green.800";
      default:
        return "gray.100";
    }
  };

  const getTextTranslated = (
    type: string,
    deliveryMethod: Props["deliveryMethod"]
  ) => {
    switch (type.toLocaleLowerCase()) {
      case "chargeshipping":
        return "COBRANÇA";
      case "banktransfer":
        return "ANTECIPADO";
      case "payatcounter":
        return "BALCÃO";
      case "customdates":
        return deliveryMethod === "ShippingCompany"
          ? "5/10/30 DIAS"
          : "30 DIAS";
      default:
        return "N/A";
    }
  };

  return (
    <Flex justify={"center"} align={"center"} textAlign={"center"}>
      <Tag
        backgroundColor={getBackgroundColor(type)}
        borderRadius={"full"}
        paddingStart={2}
        paddingEnd={2}
        fontSize={"2xs"}
        fontWeight={"bold"}
        color={getTextColor(type)}
      >
        {getTextTranslated(type, deliveryMethod)}
      </Tag>
    </Flex>
  );
};
