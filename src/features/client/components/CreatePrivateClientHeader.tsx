import { ClientType } from "@/components/components/Columns/ClientType";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export const CreatePrivateClientHeader = () => {
  return (
    <React.Fragment>
      <Text fontWeight={"bold"}>ADICIONAR CLIENTE</Text>
      <Flex justify={"flex-start"} align={"center"} gap={2}>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          DETALHE DO CLIENTE
        </Text>
        <ClientType type="Private" />
      </Flex>
    </React.Fragment>
  );
};
