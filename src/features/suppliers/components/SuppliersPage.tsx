import { Grid } from "@/components/components";
import React, { useMemo } from "react";
import { suppliersListColumn } from "../columns";
import { Notes } from "../../../components/components/Columns/Notes";
import { Button, Flex, useDisclosure, Text } from "@chakra-ui/react";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreateSupplierModal } from "./CreateSupplierModal";
import { supplierService } from "@/services";

export const SuppliersPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { suppliers } = supplierService.handleGetSuppliers();

  const detailCellRenderer = useMemo(() => {
    return Notes;
  }, []);

  return (
    <React.Fragment>
      <Flex>
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
              ADICIONAR FORNECEDOR
            </Text>
          </Flex>
        </Button>
      </Flex>
      <Grid
        gridData={suppliers}
        columnDefs={suppliersListColumn}
        detailCellRenderer={detailCellRenderer}
      />
      <CreateSupplierModal isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  );
};
