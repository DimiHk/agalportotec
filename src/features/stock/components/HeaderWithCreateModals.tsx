import { Flex, Button, Text, useDisclosure } from "@chakra-ui/react";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CreateStock } from "./CreateStock";

export const HeaderWithCreateModals = () => {
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();

  return (
    <Flex gap={2}>
      <Button
        onClick={onOpen}
        shadow={"base"}
        rounded={"full"}
        backgroundColor={"blue.400"}
        _hover={{ backgroundColor: "blue.500" }}
        size={"sm"}
      >
        <Flex gap={2} align={"center"}>
          <FontAwesomeIcon color={"white"} icon={faPlus} />
          <Text fontSize={"xs"} fontWeight={"semibold"} textColor={"white"}>
            CRIAR ARTIGO DE STOCK
          </Text>
        </Flex>
      </Button>

      <CreateStock isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
