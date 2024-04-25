import { Grid } from "@/components/components";
import { FileUploadVariant } from "@/components/components/Inputs/FileUploadVariant";
import { useFormData, useFormSteps } from "@/providers";
import {
  ModalHeader,
  Flex,
  Badge,
  ModalBody,
  Button,
  ModalFooter,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { createStockFilesColumns } from "../columns";
import { useFiles } from "../providers/fileProvider";
import { stockService } from "@/services";

export const StockFilesModal = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { handlePreviousForm, handleResetFormSteps } = useFormSteps();

  const toast = useToast();

  const { files, setFiles } = useFiles();

  const { data, handleResetFormValues } = useFormData();

  const { mutate } = stockService.handleGetStock();

  const handleSubmitStock = async () => {
    await stockService
      .handleCreateStock({
        name: data.name,
        reference: data.reference,
        wareHouseLocation: data.wareHouseLocation,
        boughtPrice: data.boughtPrice,
        attachments: files,
        sellingPrice: data.sellingPrice,
        quantity: data.quantity,
      })
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "PEÇA DE STOCK CRIADA COM SUCESSO",
          status: "success",
        });
        setFiles([]);
        handleResetFormValues();
        setTimeout(() => {
          mutate();
          handleCloseModal();
          setTimeout(() => {
            handleResetFormSteps();
          }, 1000);
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "OCORREU UM ERRO AO CRIAR A PEÇA DE STOCK, TENTE NOVAMENTE, SE O ERRO PERSISTIR CONTACTE O ADMINISTRADOR DO SISTEMA",
          status: "error",
        });
      });
  };

  return (
    <React.Fragment>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>CRIAR PEÇA DE STOCK</Text>
          <Badge shadow={"base"} colorScheme="blue">
            <Text padding={1} fontSize={"xs"} fontWeight={"semibold"}>
              {2 + " / " + 2}
            </Text>
          </Badge>
        </Flex>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          FICHEIROS ADICIONAIS
        </Text>
      </ModalHeader>
      <ModalBody>
        <Flex direction={"column"} width={"full"} gap={2}>
          <FileUploadVariant
            accept={"image/*, application/pdf"}
            multiple
            setSelectedFiles={setFiles}
          />
          <Box
            shadow={"base"}
            borderRadius={"base"}
            width={"full"}
            height={"sm"}
            marginTop={1}
          >
            <Grid
              sideBar={false}
              gridData={files}
              columnDefs={createStockFilesColumns}
            />
          </Box>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Flex width={"full"} justify={"center"} align={"center"} gap={4}>
          <Button
            onClick={() => handlePreviousForm()}
            width={"full"}
            colorScheme="cyan"
            rounded={"full"}
          >
            <Text color={"white"} fontSize={"small"}>
              VOLTAR
            </Text>
          </Button>
          <Button
            onClick={() => handleSubmitStock()}
            rounded={"full"}
            width={"full"}
            colorScheme="blue"
          >
            <Text color={"white"} fontSize={"small"}>
              FINALIZAR
            </Text>
          </Button>
        </Flex>
      </ModalFooter>
    </React.Fragment>
  );
};
