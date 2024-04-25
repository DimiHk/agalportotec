import { Grid } from "@/components/components";
import { clientService } from "@/services";
import React from "react";
import { invoicesColumn } from "../columns";
import { Button, Flex, useDisclosure, Text } from "@chakra-ui/react";
import { CreateEnterpriseInvoice } from "./CreateEnterpriseInvoice";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreatePrivateInvoice } from "./CreatePrivateInvoice";

export const InvoicesPage = () => {
  const { invoices } = clientService.handleGetInvoices();
  const {
    isOpen: isPrivateModalOpen,
    onOpen: onOpenPrivateModal,
    onClose: onClosePrivateModal,
  } = useDisclosure();

  const {
    isOpen: isEnterpriseModalOpen,
    onOpen: onOpenEnterpriseModal,
    onClose: onCloseEnterpriseModal,
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
              CRIAR FATURA DE CLIENTE CONSUMIDOR FINAL
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
              CRIAR FATURA DE CLIENTE EMPRESARIAL
            </Text>
          </Flex>
        </Button>
      </Flex>
      <Grid gridData={invoices} columnDefs={invoicesColumn} />
      <CreateEnterpriseInvoice
        isOpen={isEnterpriseModalOpen}
        onClose={onCloseEnterpriseModal}
      />
      <CreatePrivateInvoice
        isOpen={isPrivateModalOpen}
        onClose={onClosePrivateModal}
      />
    </React.Fragment>
  );
};
