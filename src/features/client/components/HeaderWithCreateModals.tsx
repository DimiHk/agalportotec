import { Flex, Button, Text, useDisclosure } from "@chakra-ui/react";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreateEnterpriseClientModal } from "./CreateEnterpriseClientModal";
import { CreatePrivateClientModal } from "./CreatePrivateClientModal";
import React from "react";

export const HeaderWithCreateModals = () => {
  const {
    isOpen: isPrivateModalOpen,
    onOpen: onOpenPrivateModal,
    onClose: onClosePrivateModal,
  } = useDisclosure();

  const {
    isOpen: isEntepriseModalOpen,
    onOpen: onOpenEnterpriseModal,
    onClose: onCloseEnterpriseModal,
  } = useDisclosure();

  return (
    <React.Fragment>
      <Flex gap={2}>
        <Button
          onClick={onOpenEnterpriseModal}
          shadow={"base"}
          rounded={"full"}
          backgroundColor={"blue.400"}
          _hover={{ backgroundColor: "blue.500" }}
          size={"sm"}
        >
          <Flex gap={2} align={"center"}>
            <FontAwesomeIcon color={"white"} icon={faPlus} />
            <Text fontSize={"xs"} fontWeight={"semibold"} textColor={"white"}>
              ADICIONAR CLIENTE EMPRESARIAL
            </Text>
          </Flex>
        </Button>
        <Button
          onClick={onOpenPrivateModal}
          shadow={"base"}
          rounded={"full"}
          backgroundColor={"blue.400"}
          _hover={{ backgroundColor: "blue.500" }}
          variant={"solid"}
          size={"sm"}
        >
          <Flex gap={2} align={"center"}>
            <FontAwesomeIcon color={"white"} icon={faPlus} />
            <Text fontSize={"xs"} textColor={"white"} fontWeight={"semibold"}>
              ADICIONAR CONSUMIDOR FINAL
            </Text>
          </Flex>
        </Button>
      </Flex>
      <CreateEnterpriseClientModal
        isOpen={isEntepriseModalOpen}
        onClose={onCloseEnterpriseModal}
      />
      <CreatePrivateClientModal
        isOpen={isPrivateModalOpen}
        onClose={onClosePrivateModal}
      />
    </React.Fragment>
  );
};
