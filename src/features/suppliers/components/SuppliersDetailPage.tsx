import { TabsMenu } from "@/components/components/Tab/TabsMenu";
import OrderPartsProvider from "@/features/orders/providers/orderPartsProvider";
import {
  Flex,
  Button,
  Divider,
  Text,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  Textarea,
  Box,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  faFileCirclePlus,
  faArrowLeft,
} from "@fortawesome/pro-solid-svg-icons";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid as GridTable } from "@/components/components";
import {
  suppliersHistoryColumn,
  suppliersHistoryReturnedPartsColumn,
} from "@/features/suppliers/columns";
import { supplierService } from "@/services";
import { UpdateSupplierRequest } from "@/models";
import { useSubmitForm } from "@/hooks";
import { updateSupplierSchema } from "@/schemas";
import { PreviewFile } from "@/features/accounting/components/PreviewFile";
import FileProvider, {
  useFiles,
} from "@/features/stock/providers/fileProvider";
import { FileUploadVariant } from "@/components/components/Inputs/FileUploadVariant";
import { randomBytes, randomUUID } from "crypto";

const tabs = [
  {
    name: "FORNECEDOR",
  },
  {
    name: "HISTÓRICO",
  },
];

export const SuppliersDetailsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentTab, setCurrentTab] = useState("FORNECEDOR");

  return (
    <OrderPartsProvider>
      <FileProvider>
        <React.Fragment>
          <Flex justify={"flex-start"} align={"center"} gap={2.5}>
            <Text
              fontSize={"xl"}
              textColor={"gray.700"}
              fontWeight={"semibold"}
            >
              DETALHE DO FORNECEDOR
            </Text>
          </Flex>
          <Flex
            gap={2}
            position={"sticky"}
            top={-1}
            backgroundColor={"white"}
            zIndex={1}
            justify={"space-between"}
            align={"center"}
            borderRadius={"base"}
            padding={1}
          >
            <Flex align={"center"} gap={2}>
              <TabsMenu
                tabs={tabs}
                currentTab={currentTab}
                handleChangeTab={setCurrentTab}
              />
            </Flex>
            <Button
              onClick={() => onOpen()}
              size={"sm"}
              rounded={"full"}
              colorScheme={"blue"}
            >
              <Flex align={"center"} gap={2}>
                PRE-VISUALIZAR LOGO
              </Flex>
            </Button>
          </Flex>
        </React.Fragment>
        <Divider marginTop={2} marginBottom={2} opacity={"75%"} />
        <MainContainer
          currentTab={currentTab}
          isOpen={isOpen}
          onClose={onClose}
        />
      </FileProvider>
    </OrderPartsProvider>
  );
};

const MainContainer = ({
  isOpen,
  onClose,
  currentTab,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
}) => {
  const toast = useToast();

  const router = useRouter();

  const { id } = router.query;

  const { supplierDetails, mutate } = supplierService.handleGetSupplier(
    id as string
  );

  const detailCellRenderer = useMemo(() => {
    return ReturnedParts;
  }, []);

  const { register, handleSubmit, errors } =
    useSubmitForm<UpdateSupplierRequest>(updateSupplierSchema);

  const { files, setFiles } = useFiles();

  const handleUpdateSupplierDetails = async (
    requestData: UpdateSupplierRequest
  ) => {
    const image =
      files.length > 0
        ? files[0]
        : new File([supplierDetails!.image], randomBytes(20).toString());

    await supplierService
      .handleUpdateSupplier({ ...requestData, image }, id as string)
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "FORNECEDOR ATUALIZADO COM SUCESSO!",
          status: "success",
        });
        mutate();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO ATUALIZAR O FORNECEDOR!, VERIFIQUE SE OS DADOS ESTÃO CORRETOS!, SE O ERRO PERSISTIR, POR FAVOR CONTACTE O ADMINISTRADOR DO SISTEMA!",
          status: "error",
        });
      });
  };

  return (
    <React.Fragment>
      {currentTab === "FORNECEDOR" && supplierDetails && (
        <React.Fragment>
          <form onSubmit={handleSubmit(handleUpdateSupplierDetails)}>
            <Grid gap={4} height={"full"} marginBottom={4}>
              <Flex justify={"center"} align={"center"} gap={4}>
                <FormControl isInvalid={!!errors.companyName?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    NOME DA EMPRESA
                    <FormErrorMessage>
                      <Text fontWeight={"semibold"} fontSize={"xs"}>
                        {errors.companyName?.message
                          ?.toString()
                          .toLocaleUpperCase()}
                      </Text>
                    </FormErrorMessage>
                  </FormLabel>
                  <Input
                    type={"text"}
                    defaultValue={supplierDetails?.companyName}
                    {...register("companyName")}
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.name?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    NOME DO FORNECEDOR
                    <FormErrorMessage>
                      <Text fontWeight={"semibold"} fontSize={"xs"}>
                        {errors.name?.message?.toString().toLocaleUpperCase()}
                      </Text>
                    </FormErrorMessage>
                  </FormLabel>
                  <Input
                    type={"text"}
                    defaultValue={supplierDetails?.name}
                    {...register("name")}
                  />
                </FormControl>
              </Flex>
              <FormControl isInvalid={!!errors.email?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  EMAIL
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.email?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    type="email"
                    defaultValue={supplierDetails?.email}
                    {...register("email")}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isInvalid={!!errors.address?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  MORADA
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.address?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    type="text"
                    defaultValue={supplierDetails?.address}
                    {...register("address")}
                  />
                </InputGroup>
              </FormControl>
              <Flex justify={"center"} align={"end"} gap={4}>
                <FormControl isInvalid={!!errors.generalPhoneNumber?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    TELEFONE GERAL
                    <FormErrorMessage>
                      <Text fontWeight={"semibold"} fontSize={"xs"}>
                        {errors.generalPhoneNumber?.message
                          ?.toString()
                          .toLocaleUpperCase()}
                      </Text>
                    </FormErrorMessage>
                  </FormLabel>
                  <Input
                    type={"text"}
                    defaultValue={supplierDetails?.generalPhoneNumber}
                    {...register("generalPhoneNumber")}
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.directPhoneNumber?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    TELEFONE DIRETO
                    <FormErrorMessage>
                      <Text fontWeight={"semibold"} fontSize={"xs"}>
                        {errors.directPhoneNumber?.message
                          ?.toString()
                          .toLocaleUpperCase()}
                      </Text>
                    </FormErrorMessage>
                  </FormLabel>
                  <Input
                    type={"text"}
                    defaultValue={supplierDetails?.directPhoneNumber}
                    {...register("directPhoneNumber")}
                  />
                </FormControl>
              </Flex>
              <FormControl isInvalid={!!errors.taxNumber?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  CONTRIBUINTE
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.taxNumber?.message
                        ?.toString()
                        .toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input
                  type={"text"}
                  defaultValue={supplierDetails?.taxNumber}
                  {...register("taxNumber")}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.name?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  LOGO DA EMPRESA
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.name?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <FileUploadVariant
                  accept="image/*"
                  multiple={false}
                  handleGetFiles={(file) => {
                    setFiles(file);
                  }}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.notes?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOTAS
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.notes?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Textarea
                  textColor={"black"}
                  defaultValue={supplierDetails?.notes}
                  {...register("notes")}
                />
              </FormControl>

              <Checkbox
                defaultChecked={supplierDetails?.sendEmails}
                {...register("sendEmails")}
              >
                <Text fontWeight={"semibold"} fontSize={"small"}>
                  DESEJA ENVIAR EMAILS?
                </Text>
              </Checkbox>
            </Grid>
            <Flex
              borderTop={"1px solid"}
              borderColor={"gray.200"}
              backgroundColor={"white"}
              width={"full"}
              position={"sticky"}
              bottom={0}
              gap={4}
              paddingTop={2.5}
            >
              <Flex justify={"flex-start"} width={"full"} gap={2}>
                <Button
                  type={"submit"}
                  size={"sm"}
                  rounded={"full"}
                  shadow={"base"}
                  backgroundColor={"green.300"}
                  _hover={{ backgroundColor: "green.400", shadow: "md" }}
                >
                  <Flex gap={2} align={"center"}>
                    <Text fontWeight={"semibold"} textColor={"white"}>
                      ATUALIZAR FORNECEDOR
                    </Text>
                    <FontAwesomeIcon color={"white"} icon={faFileCirclePlus} />
                  </Flex>
                </Button>
                <Button
                  size={"sm"}
                  shadow={"base"}
                  rounded={"full"}
                  backgroundColor={"blue.300"}
                  _hover={{ backgroundColor: "blue.400", shadow: "md" }}
                  variant={"solid"}
                  onClick={() => router.back()}
                >
                  <Flex gap={2} align={"flex-end"}>
                    <FontAwesomeIcon color={"white"} icon={faArrowLeft} />
                    <Text fontWeight={"semibold"} textColor={"white"}>
                      VOLTAR PARA FORNECEDORES
                    </Text>
                  </Flex>
                </Button>
              </Flex>
            </Flex>
          </form>
        </React.Fragment>
      )}
      {currentTab === "HISTÓRICO" && (
        <GridTable
          gridData={supplierDetails?.notesHistory || []}
          columnDefs={suppliersHistoryColumn}
          detailCellRenderer={detailCellRenderer}
        />
      )}
      {supplierDetails?.image && (
        <PreviewFile
          fileUrl={
            files.length > 0
              ? URL.createObjectURL(files[0])
              : supplierDetails?.image
          }
          isOpen={isOpen}
          onClose={onClose}
          heading="PRE-VISUALIZAÇÃO DO LOGO DA EMPRESA"
        />
      )}
    </React.Fragment>
  );
};

const ReturnedParts = ({ data }: any) => {
  const { returnedParts } = data;

  return (
    <Box width={"small"} height={"md"} padding={"2"}>
      <GridTable
        rowGroupPanelShow={"never"}
        sideBar={false}
        gridData={returnedParts}
        columnDefs={suppliersHistoryReturnedPartsColumn}
      />
    </Box>
  );
};
