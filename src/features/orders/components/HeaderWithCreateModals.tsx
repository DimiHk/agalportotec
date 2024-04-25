import { Flex, Button, Text, useDisclosure } from "@chakra-ui/react";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreatePrivateClientOrder } from "./CreatePrivateClientOrder";
import { CreateEnterpriseClientOrder } from "./CreateEnterpriseClientOrder";
import React from "react";
import { CreateSupplierOrder } from "./CreateSupplierOrder";

export const HeaderWithCreateModals = () => {
  const {
    isOpen: isCreatePrivateClientOrderModalOpen,
    onOpen: onOpenPrivateModal,
    onClose: onClosePrivateModal,
  } = useDisclosure();

  const {
    isOpen: isCreateEnterpriseClientOrderModalOpen,
    onOpen: onOpenEnterpriseModal,
    onClose: onCloseEnterpriseModal,
  } = useDisclosure();

  const {
    isOpen: isCreateSupplierOrderModalOpen,
    onOpen: onOpenSupplierOrderModal,
    onClose: onCloseSupplierOrderModal,
  } = useDisclosure();

  return (
    <React.Fragment>
      <Flex gap={2}>
        <Button
          onClick={onOpenPrivateModal}
          shadow={"base"}
          rounded={"full"}
          backgroundColor={"blue.400"}
          _hover={{ backgroundColor: "blue.500" }}
          size={"sm"}
        >
          <Flex gap={2} align={"center"}>
            <FontAwesomeIcon color={"white"} icon={faPlus} />
            <Text fontSize={"xs"} fontWeight={"semibold"} textColor={"white"}>
              CRIAR ENCOMENDA DE CLIENTE CONSUMIDOR FINAL
            </Text>
          </Flex>
        </Button>
        <Button
          onClick={onOpenEnterpriseModal}
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
              CRIAR ENCOMENDA DE CLIENTE EMPRESARIAL
            </Text>
          </Flex>
        </Button>
        <Button
          onClick={onOpenSupplierOrderModal}
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
              CRIAR ENCOMENDA DE FORNECEDOR
            </Text>
          </Flex>
        </Button>
      </Flex>
      <CreatePrivateClientOrder
        isOpen={isCreatePrivateClientOrderModalOpen}
        onClose={onClosePrivateModal}
      />
      <CreateEnterpriseClientOrder
        isOpen={isCreateEnterpriseClientOrderModalOpen}
        onClose={onCloseEnterpriseModal}
      />
      <CreateSupplierOrder
        isOpen={isCreateSupplierOrderModalOpen}
        onClose={onCloseSupplierOrderModal}
      />
    </React.Fragment>
  );
};
