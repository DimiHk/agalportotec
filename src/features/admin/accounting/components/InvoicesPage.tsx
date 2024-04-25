import { Grid } from "@/components/components";
import React from "react";
import { invoicesColumn } from "../columns";
import { Button, Flex, useDisclosure, Text } from "@chakra-ui/react";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { adminAccountingService } from "@/services/admin-accounting";
import { CreateInvoiceModal } from "./CreateInvoiceModal";

export const AccountingInvoicesPage = () => {
  const { invoices } = adminAccountingService.handleGetInvoices();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
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
              CRIAR FATURA
            </Text>
          </Flex>
        </Button>
      </Flex>
      <Grid gridData={invoices} columnDefs={invoicesColumn} />
      <CreateInvoiceModal isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  );
};
