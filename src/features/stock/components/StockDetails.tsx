import { FileUploadVariant } from "@/components/components/Inputs/FileUploadVariant";
import { TabsMenu } from "@/components/components/Tab/TabsMenu";
import { useSubmitForm } from "@/hooks";
import { createStockDetailsSchema } from "@/schemas";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { stockDetailsFilesColumns } from "../columns";
import { Grid } from "@/components/components";
import { useRouter } from "next/router";
import { stockService } from "@/services";
import FormProvider, { useFormData } from "@/providers/multiFormProvider";
import { StockModel } from "@/models";
import FileProvider, { useFiles } from "../providers/fileProvider";
import {
  faFileCirclePlus,
  faArrowLeft,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const tabs = [
  {
    name: "DETALHE DO ARTIGO",
  },
  {
    name: "FICHEIROS",
  },
];

export const StockDetails = () => {
  const [currentTab, setCurrentTab] = useState("DETALHE DO ARTIGO");

  const router = useRouter();

  const { id: stockId } = router.query;

  const { stockDetails, mutate } = stockService.handleGetStockDetails(
    stockId as string
  );

  return (
    <FormProvider>
      <FileProvider>
        <React.Fragment>
          <Flex justify={"flex-start"} align={"center"} gap={2.5}>
            <Text
              fontSize={"xl"}
              textColor={"gray.700"}
              fontWeight={"semibold"}
            >
              DETALHE DO ARTIGO DO STOCK
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
          </Flex>
        </React.Fragment>
        <Divider marginTop={2} marginBottom={2} opacity={"75%"} />
        {stockDetails && (
          <MainContainer currentTab={currentTab} stockDetails={stockDetails} />
        )}
      </FileProvider>
    </FormProvider>
  );
};

const MainContainer = ({
  currentTab,
  stockDetails,
}: {
  currentTab: string;
  stockDetails: StockModel;
}) => {
  const { register, handleSubmit, errors } = useSubmitForm(
    createStockDetailsSchema
  );

  const toast = useToast();

  const { setFormValues } = useFormData();

  const { files, setFiles } = useFiles();

  const router = useRouter();

  const { id: stockId } = router.query;

  const { mutate } = stockService.handleGetStockDetails(stockId as string);

  useEffect(() => {
    setFiles(stockDetails.attachments);
  }, []);

  useEffect(() => {
    setFormValues(stockDetails);
  }, []);

  const submitForm = async (data: any) => {
    await stockService
      .handleUpdateStock(stockId as string, {
        ...data,
        newAttachments: Array.from(files),
      })
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "STOCK ATUALIZADO COM SUCESSO",
          status: "success",
        });
        mutate().then((data) => setFiles(data?.attachments));
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description: error.message,
          status: "error",
        });
      });
  };

  return (
    <React.Fragment>
      {currentTab === "DETALHE DO ARTIGO" && (
        <form style={{ height: "100%" }} onSubmit={handleSubmit(submitForm)}>
          <Flex
            direction={"column"}
            width={"full"}
            height={"full"}
            gap={4}
            padding={2}
          >
            <Flex justify={"center"} align={"end"} gap={4}>
              <FormControl isInvalid={!!errors.name?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOME
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.name?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input defaultValue={stockDetails.name} {...register("name")} />
              </FormControl>
              <FormControl isInvalid={!!errors.reference?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  REFERENCIA
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.reference?.message
                        ?.toString()
                        .toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input
                  defaultValue={stockDetails.reference}
                  {...register("reference")}
                />
              </FormControl>
            </Flex>
            <FormControl isInvalid={!!errors.wareHouseLocation?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                LOCALIZAÇÃO
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.wareHouseLocation?.message
                      ?.toString()
                      .toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input
                defaultValue={stockDetails.warehouseLocation}
                {...register("wareHouseLocation")}
              />
            </FormControl>

            <Flex justify={"center"} align={"end"} gap={4}>
              <FormControl isInvalid={!!errors.boughtPrice?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  PREÇO DE COMPRA
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.boughtPrice?.message
                        ?.toString()
                        .toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input
                  defaultValue={stockDetails.boughtPrice}
                  {...register("boughtPrice", { valueAsNumber: true })}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.sellingPrice?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  PREÇO DE VENDA
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.sellingPrice?.message
                        ?.toString()
                        .toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input
                  defaultValue={stockDetails.sellingPrice}
                  {...register("sellingPrice", { valueAsNumber: true })}
                />
              </FormControl>
            </Flex>
            <FormControl isInvalid={!!errors.quantity?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                QUANTIDADE
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.quantity?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input
                defaultValue={stockDetails.quantity}
                {...register("quantity", { valueAsNumber: true })}
              />
            </FormControl>
          </Flex>
          <Footer />
        </form>
      )}
      {currentTab === "FICHEIROS" && (
        <form style={{ height: "100%" }} onSubmit={handleSubmit(submitForm)}>
          <Flex
            direction={"column"}
            width={"full"}
            height={"full"}
            gap={4}
            padding={2}
          >
            <FileUploadVariant
              accept={"image/*, application/pdf"}
              multiple
              handleGetFiles={(newFiles) => {
                setFiles((oldImages: any) => {
                  const newImages = Array.from(newFiles);
                  const updatedNewImages = newImages.map((file: any) => {
                    const oldFile = file;
                    oldFile.isNew = true;
                    return oldFile;
                  });
                  return [...oldImages, ...updatedNewImages];
                });
              }}
            />
            <Box
              shadow={"base"}
              borderRadius={"base"}
              width={"full"}
              height={"sm"}
              marginTop={1}
            >
              <Grid gridData={files} columnDefs={stockDetailsFilesColumns} />
            </Box>
          </Flex>
          <Footer />
        </form>
      )}
    </React.Fragment>
  );
};

const Footer = () => {
  const router = useRouter();

  return (
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
          size={"sm"}
          type="submit"
          rounded={"full"}
          shadow={"base"}
          backgroundColor={"green.300"}
          _hover={{ backgroundColor: "green.400", shadow: "md" }}
        >
          <Flex gap={2} align={"center"}>
            <Text fontWeight={"semibold"} textColor={"white"}>
              ATUALIZAR STOCK
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
              VOLTAR PARA STOCKS
            </Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};
