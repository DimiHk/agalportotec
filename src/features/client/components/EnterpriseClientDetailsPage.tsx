import { Grid } from "@/components/components";
import { formatString } from "@/helpers";
import { useSubmitForm } from "@/hooks";
import { UpdateEnterpriseClientRequest } from "@/models";
import { enterpriseClientSchema } from "@/schemas";
import { clientService } from "@/services";
import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  Textarea,
  Text,
  Button,
  Divider,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import {
  faArrowLeft,
  faFileCirclePlus,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { ClientType } from "@/components/components/Columns/ClientType";
import { TabsMenu } from "@/components/components/Tab/TabsMenu";
import { Orders } from "../../orders/components/GridWithClientsOrders";
import { historyColumn, invoicesColumn, ordersColumn } from "../columns";

const tabs = [
  {
    name: "CLIENTE",
  },
  {
    name: "HISTÓRICO",
  },
  {
    name: "ENCOMENDAS",
  },
  {
    name: "FATURAS",
  },
];

export const EnterpriseClientDetailsPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const toast = useToast();

  const [currentTab, setCurrentTab] = useState("CLIENTE");

  const { client, mutate } = clientService.handleGetEntepriseClientDetails(
    id as string
  );

  const { register, handleSubmit, errors, reset } =
    useSubmitForm<UpdateEnterpriseClientRequest>(enterpriseClientSchema);

  useEffect(() => {
    if (!client) return;
    reset({
      ...client,
      directPhoneNumber: client.directPhoneNumber,
      generalPhoneNumber: client.generalPhoneNumber,
      taxNumber: client.taxNumber,
    });
  }, [client, reset]);

  const handleUpdate = (data: UpdateEnterpriseClientRequest) => {
    clientService
      .handleUpdateEnterpriseClient(id as string, data)
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "CLIENTE ATUALIZADO COM SUCESSO!",
          status: "success",
        });
        mutate();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO TENTAR ATUALIZAR O CLIENTE POR FAVOR VALIDE QUE ESTA TUDO CORRETO!",
          status: "error",
        });
      });
  };

  const detailCellRenderer = useMemo(() => {
    return Orders;
  }, []);

  return (
    <React.Fragment>
      <Flex justify={"space-between"} align={"flex-start"} gap={2}>
        <Flex justify={"flex-start"} align={"center"} gap={2.5}>
          <Text fontSize={"xl"} textColor={"gray.700"} fontWeight={"semibold"}>
            DETALHE DO CLIENTE
          </Text>
          {client && <ClientType type={"EnterpriseClient"} />}
        </Flex>
      </Flex>
      <Flex
        gap={2}
        position={"sticky"}
        top={-1}
        backgroundColor={"white"}
        zIndex={1}
        padding={2}
        shadow={"sm"}
        borderRadius={"base"}
      >
        <TabsMenu
          tabs={tabs}
          currentTab={currentTab}
          handleChangeTab={setCurrentTab}
        />
      </Flex>
      <Divider marginTop={2} marginBottom={2} opacity={"75%"} />
      <React.Fragment>
        {currentTab === "CLIENTE" && (
          <React.Fragment>
            {client && (
              <form
                style={{ height: "100%" }}
                onSubmit={handleSubmit(handleUpdate)}
              >
                <Flex
                  direction={"column"}
                  gap={4}
                  justify={"center"}
                  marginBottom={4}
                >
                  <Flex justify={"center"} align={"center"} gap={4}>
                    <FormControl isInvalid={!!errors.name?.message}>
                      <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                        NOME DA EMPRESA
                        <FormErrorMessage>
                          <Text fontWeight={"semibold"} fontSize={"xs"}>
                            {errors.name?.message
                              ?.toString()
                              .toLocaleUpperCase()}
                          </Text>
                        </FormErrorMessage>
                      </FormLabel>
                      <Input type={"text"} {...register("name")} />
                    </FormControl>
                    <FormControl isInvalid={!!errors.employeeName?.message}>
                      <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                        NOME DO FUNCIONÁRIO
                        <FormErrorMessage>
                          <Text fontWeight={"semibold"} fontSize={"xs"}>
                            {errors.employeeName?.message
                              ?.toString()
                              .toLocaleUpperCase()}
                          </Text>
                        </FormErrorMessage>
                      </FormLabel>
                      <Input type={"text"} {...register("employeeName")} />
                    </FormControl>
                  </Flex>
                  <FormControl isInvalid={!!errors.email?.message}>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      EMAIL
                      <FormErrorMessage>
                        <Text fontWeight={"semibold"} fontSize={"xs"}>
                          {errors.email?.message
                            ?.toString()
                            .toLocaleUpperCase()}
                        </Text>
                      </FormErrorMessage>
                    </FormLabel>
                    <InputGroup size="md">
                      <Input type="email" {...register("email")} />
                    </InputGroup>
                  </FormControl>
                  <FormControl isInvalid={!!errors.address?.message}>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      MORADA
                      <FormErrorMessage>
                        <Text fontWeight={"semibold"} fontSize={"xs"}>
                          {errors.address?.message
                            ?.toString()
                            .toLocaleUpperCase()}
                        </Text>
                      </FormErrorMessage>
                    </FormLabel>
                    <InputGroup size="md">
                      <Input type="text" {...register("address")} />
                    </InputGroup>
                  </FormControl>
                  <Flex justify={"center"} align={"end"} gap={4}>
                    <FormControl
                      isInvalid={!!errors.generalPhoneNumber?.message}
                    >
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
                        {...register("generalPhoneNumber")}
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.directPhoneNumber?.message}
                    >
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
                      <Input type={"text"} {...register("directPhoneNumber")} />
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
                    <Input type={"text"} {...register("taxNumber")} />
                  </FormControl>
                  <FormControl isInvalid={!!errors.notes?.message}>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      NOTAS
                      <FormErrorMessage>
                        <Text fontWeight={"semibold"} fontSize={"xs"}>
                          {errors.notes?.message
                            ?.toString()
                            .toLocaleUpperCase()}
                        </Text>
                      </FormErrorMessage>
                    </FormLabel>
                    <Textarea
                      defaultValue={client?.notes}
                      height={"3xs"}
                      textColor={"black"}
                      {...register("notes")}
                    />
                  </FormControl>
                  <FormControl isInvalid={!!errors.supplementaryEmail?.message}>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      EMAIL SUPLEMENTAR
                      <FormErrorMessage>
                        <Text fontWeight={"semibold"} fontSize={"xs"}>
                          {errors.supplementaryEmail?.message
                            ?.toString()
                            .toLocaleUpperCase()}
                        </Text>
                      </FormErrorMessage>
                    </FormLabel>
                    <Input
                      type={"email"}
                      defaultValue={client?.supplementaryEmail}
                      {...register("supplementaryEmail")}
                    />
                  </FormControl>
                  <Checkbox {...register("sendEmails")}>
                    <Text fontWeight={"semibold"} fontSize={"small"}>
                      DESEJA ENVIAR EMAILS?
                    </Text>
                  </Checkbox>
                  <Flex
                    borderTop={"1px solid"}
                    borderColor={"gray.200"}
                    backgroundColor={"white"}
                    width={"full"}
                    position={"sticky"}
                    bottom={0}
                    gap={2}
                    paddingTop={2.5}
                  >
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
                          ATUALIZAR CLIENTE
                        </Text>
                        <FontAwesomeIcon
                          color={"white"}
                          icon={faFileCirclePlus}
                        />
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
                          VOLTAR PARA CLIENTES
                        </Text>
                      </Flex>
                    </Button>
                  </Flex>
                </Flex>
              </form>
            )}
          </React.Fragment>
        )}
        {currentTab === "HISTÓRICO" && client && (
          <Grid gridData={client.history} columnDefs={historyColumn} />
        )}
        {currentTab === "ENCOMENDAS" && client && (
          <Grid
            gridData={client.orders}
            columnDefs={ordersColumn}
            detailCellRenderer={detailCellRenderer}
          />
        )}
        {currentTab === "FATURAS" && client && (
          <Grid gridData={client.invoices} columnDefs={invoicesColumn} />
        )}
      </React.Fragment>
    </React.Fragment>
  );
};
