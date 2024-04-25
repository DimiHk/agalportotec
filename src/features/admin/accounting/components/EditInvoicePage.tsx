import { Search } from "@/components/components";
import { TabsMenu } from "@/components/components/Tab/TabsMenu";
import { useSubmitForm } from "@/hooks";
import {
  AccountingInvoicesResponse,
  CreateAccountingInvoiceRequest,
} from "@/models";
import { createAccountingInvoiceSchema } from "@/schemas";
import { supplierService } from "@/services";
import { adminAccountingService } from "@/services/admin-accounting";
import {
  Flex,
  Divider,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  Select,
  Button,
} from "@chakra-ui/react";
import {
  faArrowLeft,
  faCircleEuro,
  faFileCirclePlus,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const tabs = [
  {
    name: "INFORMAÇÕES GERAIS",
  },
];

export const EditInvoicePage = () => {
  const [currentTab, setCurrentTab] = useState("INFORMAÇÕES GERAIS");

  const router = useRouter();

  const { id: invoiceId } = router.query;

  const { invoiceDetails, mutate } =
    adminAccountingService.handleGetInvoiceDetails(invoiceId as string);

  return (
    <React.Fragment>
      <React.Fragment>
        <Flex justify={"flex-start"} align={"center"} gap={2.5}>
          <Text fontSize={"xl"} textColor={"gray.700"} fontWeight={"semibold"}>
            DETALHE DA FATURA
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
      {invoiceDetails && (
        <MainContainer
          currentTab={currentTab}
          invoiceDetails={invoiceDetails}
          mutate={mutate}
        />
      )}
    </React.Fragment>
  );
};

const MainContainer = ({
  currentTab,
  invoiceDetails,
  mutate,
}: {
  currentTab: string;
  invoiceDetails: AccountingInvoicesResponse;
  mutate: () => void;
}) => {
  const [name, setName] = useState("");

  const toast = useToast();

  const router = useRouter();

  const { id: invoiceId } = router.query;

  const { suppliers } = supplierService.handleGetSuppliers();

  const { register, handleSubmit, errors, setValue, getValues } =
    useSubmitForm<CreateAccountingInvoiceRequest>(
      createAccountingInvoiceSchema
    );

  const submitForm = async (requestData: CreateAccountingInvoiceRequest) => {
    adminAccountingService
      .handleUpdateInvoice(invoiceId as string, requestData)
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "FATURA ATUALIZADA COM SUCESSO",
          status: "success",
        });
        mutate();
      })

      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO ATUALIZAR A FATURA! POR FAVOR TENTE NOVAMENTE!, SE O ERRO PERSISTIR CONTACTE O ADMINISTRADOR DO SISTEMA!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    if (invoiceDetails) {
      setName(invoiceDetails.name);
    }
  }, [invoiceDetails]);

  return (
    <React.Fragment>
      {currentTab === "INFORMAÇÕES GERAIS" && (
        <form style={{ height: "100%" }} onSubmit={handleSubmit(submitForm)}>
          <Flex
            direction={"column"}
            width={"full"}
            height={"full"}
            gap={4}
            padding={2}
          >
            <FormControl isInvalid={!!errors.documentNumber?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                NUMERO DO DOCUMENTO
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.documentNumber?.message
                      ?.toString()
                      .toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input
                defaultValue={invoiceDetails.documentNumber}
                {...register("documentNumber")}
                type="text"
              />
            </FormControl>
            <FormControl isInvalid={!!errors.name?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                NOME DO FORNECEDOR
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.documentNumber?.message
                      ?.toString()
                      .toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Search
                placeholder={name}
                defaultValue={name}
                options={suppliers ? suppliers : []}
                onSelect={({ name }) => {
                  setValue("name", name);
                  setName(name);
                }}
                onChange={(value) => {
                  setValue("name", value);
                  setName(value);
                }}
                filterProperty={"name"}
                showNotFound={false}
              />
            </FormControl>
            <FormControl isInvalid={!!errors.expiryDate?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                DATA VENCIMENTO
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.expiryDate?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input
                defaultValue={invoiceDetails.expiryDate.toString()}
                {...register("expiryDate")}
                type="datetime-local"
              />
            </FormControl>
            <FormControl isInvalid={!!errors.paymentNumber?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                NUMERO DE PAGAMENTO
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.paymentNumber?.message
                      ?.toString()
                      .toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input
                defaultValue={invoiceDetails.paymentNumber}
                {...register("paymentNumber")}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                DATA PAGAMENTO
              </FormLabel>
              <Input
                value={
                  invoiceDetails.paymentDate !== null
                    ? new Date(invoiceDetails.paymentDate)
                        .toISOString()
                        .slice(0, 16)
                    : undefined
                }
                type="datetime-local"
                disabled
              />
            </FormControl>
            <FormControl isInvalid={!!errors.status?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                ESTADO DA FATURA
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.status?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Select
                defaultValue={invoiceDetails.status}
                {...register("status")}
              >
                <option value="0">PAGO</option>
                <option value="1">PAGAMENTO EM FALTA</option>
              </Select>
            </FormControl>
            <FormControl isInvalid={!!errors.total?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                TOTAL DA FATURA
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.total?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <InputGroup>
                <Input
                  defaultValue={invoiceDetails.total}
                  {...register("total")}
                  type="text"
                />
                <InputRightElement>
                  <FontAwesomeIcon
                    size="lg"
                    style={{ color: "#68D391", cursor: "pointer" }}
                    icon={faCircleEuro}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Flex>
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
                    ATUALIZAR FATURA
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
                    VOLTAR PARA FATURAS
                  </Text>
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </form>
      )}
    </React.Fragment>
  );
};
