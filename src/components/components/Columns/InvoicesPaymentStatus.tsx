import React from "react";
import { Flex, Tag } from "@chakra-ui/react";

type Props = {
  type: string;
};

export const InvoicesPaymentStatus = ({ type }: Props) => {
  const getBackgroundColor = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "paid":
        return "green.100";
      case "pendingpayment":
        return "yellow.100";
      default:
        return "gray.100";
    }
  };

  const getTextColor = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "paid":
        return "green.800";
      case "pendingpayment":
        return "yellow.800";
      default:
        return "gray.100";
    }
  };

  const getTextTranslated = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case "paid":
        return "PAGA";
      case "pendingpayment":
        return "PENDENTE DE PAGAMENTO";
      default:
        return "N/A";
    }
  };

  return (
    <Flex justify={"center"} align={"center"}>
      <Tag
        backgroundColor={getBackgroundColor(type)}
        borderRadius={"full"}
        paddingStart={2}
        paddingEnd={2}
        fontSize={"2xs"}
        fontWeight={"bold"}
        color={getTextColor(type)}
      >
        {getTextTranslated(type)}
      </Tag>
    </Flex>
  );
};
