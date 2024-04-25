import React, { useEffect, useState } from "react";
import { Grid } from "@/components/components";
import { formatString } from "@/helpers";
import { ordersService } from "@/services";
import {
  Flex,
  Text,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Select,
  Stack,
  Checkbox,
  useDisclosure,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import {
  faFileCirclePlus,
  faArrowLeft,
  faTruckPlane,
  faBoxCheck,
  faHand,
  faCheckCircle,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { historyColumns, updateProductColumns } from "../columns";
import { StockSearch } from "./StockSearch";
import OrderPartsProvider from "../providers/orderPartsProvider";
import { faPlus } from "@fortawesome/pro-light-svg-icons";
import { ClientType } from "@/components/components/Columns/ClientType";
import { OrderStatus } from "@/components/components/Columns/OrderStatus";
import { useSubmitForm } from "@/hooks";
import { updatePrivateClientOrderSchema } from "@/schemas";
import UpdateOrderDetailsProvider, {
  useUpdateOrderDetails,
} from "../providers/updateOrderDetailsProvider";
import { PrivateOrderDetailsResponse } from "@/models";
import { CreateOrderProduct } from "./CreateOrderProduct";
import { KeyedMutator } from "swr";

export const PrivateDetailOrder = () => {
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState("client");

  const { id: orderId, clientId } = router.query;

  const { orderDetails, mutate } =
    ordersService.handleGetPrivateClientOrderDetails(
      clientId as string,
      orderId as string
    );

  return (
    <UpdateOrderDetailsProvider>
      <React.Fragment>
        <OrderPartsProvider>
          <React.Fragment>
            <Flex justify={"flex-start"} align={"center"} gap={2.5}>
              <Text
                fontSize={"xl"}
                textColor={"gray.700"}
                fontWeight={"semibold"}
              >
                DETALHE DA ENCOMENDA
              </Text>
              <Flex wrap={"wrap"} gap={2}>
                <Flex
                  align={"center"}
                  gap={2}
                  paddingRight={2}
                  borderRight={"1px solid"}
                  borderRightColor={"blackAlpha.400"}
                >
                  <Text
                    textColor={"gray.700"}
                    fontSize={"sm"}
                    fontWeight={"semibold"}
                  >
                    CLIENTE
                  </Text>
                  {orderDetails && (
                    <ClientType type={orderDetails?.client.type} />
                  )}
                </Flex>
                <Flex align={"center"} gap={2}>
                  <Text
                    textColor={"gray.700"}
                    fontSize={"sm"}
                    fontWeight={"semibold"}
                  >
                    ENCOMENDA
                  </Text>

                  {orderDetails && <OrderStatus type={orderDetails?.status} />}
                </Flex>
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
              <Button
                onClick={() => setCurrentTab("client")}
                size={"sm"}
                rounded={"full"}
                colorScheme={currentTab === "client" ? "blue" : "gray"}
              >
                CLIENTE & ENTREGA & DEFINIÇÕES
              </Button>
              <Button
                onClick={() => setCurrentTab("orders")}
                size={"sm"}
                rounded={"full"}
                colorScheme={currentTab === "orders" ? "blue" : "gray"}
              >
                PRODUTOS DA ENCOMENDA
              </Button>
              <Button
                onClick={() => setCurrentTab("history")}
                size={"sm"}
                rounded={"full"}
                colorScheme={currentTab === "history" ? "blue" : "gray"}
              >
                HISTÓRICO
              </Button>
            </Flex>
          </React.Fragment>
          <Divider marginTop={2} marginBottom={2} opacity={"75%"} />
          <MainContainer
            currentTab={currentTab}
            orderDetails={orderDetails}
            mutate={mutate}
          />
        </OrderPartsProvider>
      </React.Fragment>
    </UpdateOrderDetailsProvider>
  );
};

const MainContainer = ({
  currentTab,
  orderDetails,
  mutate,
}: {
  currentTab?: string;
  orderDetails?: PrivateOrderDetailsResponse;
  mutate: KeyedMutator<PrivateOrderDetailsResponse>;
}) => {
  const router = useRouter();

  const toast = useToast();

  const { id: orderId, clientId } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, setValue, getValues, errors } = useSubmitForm(
    updatePrivateClientOrderSchema
  );

  const {
    setOrderParts,
    orderParts,
    shipmentMethod,
    paymentMethod,
    handleAddOrderPart,
    setPaymentMethod,
    setShipmentMethod,
  } = useUpdateOrderDetails();

  useEffect(() => {
    setValue("parts", orderDetails?.orderParts);
    setValue("orderNumber", orderDetails?.orderNumber);
  }, [orderDetails?.orderNumber, orderDetails?.orderParts, setValue]);

  useEffect(() => {
    setValue("parts", orderParts);
  }, [orderParts, setValue]);

  useEffect(() => {
    if (orderDetails) {
      setOrderParts(orderDetails.orderParts as any);
      setPaymentMethod(orderDetails.paymentMethod.toString());
      setShipmentMethod(orderDetails.shipmentMethod.toString());
    }
  }, [orderDetails, setOrderParts, setPaymentMethod, setShipmentMethod]);

  const handleUpdatePrivateDetailsOrder = (data?: any) => {
    ordersService
      .handleUpdatePrivateOrder(
        data ? data : getValues(),
        clientId as string,
        orderId as string
      )
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "ENCOMENDA ATUALIZADA COM SUCESSO",
          status: "success",
        });
        mutate();
        onClose();
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

  const handleUpdateStatus = (status: number) => {
    ordersService
      .handleChangePrivateOrderStatus(
        clientId as string,
        orderId as string,
        status
      )
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "STATUS DA ENCOMENDA ATUALIZADA COM SUCESSO",
          status: "success",
        });
        mutate();
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
      {currentTab === "client" &&
        shipmentMethod &&
        orderDetails &&
        paymentMethod && (
          <React.Fragment>
            <form onSubmit={handleSubmit(handleUpdatePrivateDetailsOrder)}>
              <FormControl
                isInvalid={!!errors.orderNumber?.message}
                padding={2}
              >
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NUMERO DA ENCOMENDA
                </FormLabel>
                <Input
                  {...register("orderNumber")}
                  borderColor={"gray.400"}
                  defaultValue={orderDetails?.orderNumber}
                  disabled
                  cursor={"text!important"}
                />
              </FormControl>
              <Flex gap={4} justify={"center"}>
                <Flex width={"full"} direction={"column"} padding={4} gap={4}>
                  <Text
                    backgroundColor={"gray.100"}
                    padding={2}
                    borderRadius={"base"}
                    textColor={"gray.700"}
                    fontWeight={"semibold"}
                    shadow={"sm"}
                  >
                    DETALHE DO CLIENTE
                  </Text>
                  <FormControl>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      NOME DO CLIENTE
                    </FormLabel>
                    <Input
                      borderColor={"gray.400"}
                      defaultValue={orderDetails?.client.name}
                      disabled
                      cursor={"text!important"}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      EMAIL
                    </FormLabel>
                    <Input
                      borderColor={"gray.400"}
                      defaultValue={orderDetails?.client.email}
                      disabled
                      cursor={"text!important"}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      MORADA
                    </FormLabel>
                    <Input
                      borderColor={"gray.400"}
                      defaultValue={orderDetails?.client.address}
                      disabled
                      cursor={"text!important"}
                    />
                  </FormControl>
                  <Flex justify={"center"} align={"center"} gap={4}>
                    <FormControl>
                      <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                        TELEFONE DIRETO
                      </FormLabel>
                      <Input
                        defaultValue={formatString(
                          orderDetails?.client.directPhoneNumber
                        )}
                        borderColor={"gray.400"}
                        disabled
                        cursor={"text!important"}
                      />
                    </FormControl>
                  </Flex>
                  <FormControl>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      CONTRIBUINTE
                    </FormLabel>
                    <Input
                      defaultValue={formatString(
                        orderDetails?.client.taxNumber
                      )}
                      disabled
                      borderColor={"gray.400"}
                      cursor={"text!important"}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      NOTAS
                    </FormLabel>
                    <Textarea
                      defaultValue={orderDetails?.client.notes}
                      disabled
                      borderColor={"gray.400"}
                      cursor={"text!important"}
                    />
                  </FormControl>
                  <Divider opacity={"75%"} />
                  <Text
                    backgroundColor={"gray.100"}
                    padding={2}
                    borderRadius={"base"}
                    textColor={"gray.700"}
                    fontWeight={"semibold"}
                    shadow={"sm"}
                  >
                    DEFINIÇÕES DE EMAIL
                  </Text>
                  <FormControl isInvalid={!!errors.sendEmails?.message}>
                    <Checkbox
                      defaultChecked={orderDetails?.sendEmails}
                      {...register("sendEmails")}
                    >
                      <Text fontWeight={"semibold"} fontSize={"small"}>
                        DESEJA ENVIAR EMAILS?
                      </Text>
                    </Checkbox>
                    <FormErrorMessage>
                      <Text fontWeight={"semibold"} fontSize={"xs"}>
                        {errors.sendEmails?.message
                          ?.toString()
                          .toLocaleUpperCase()}
                      </Text>
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.sendEmailDate?.message}>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      DATA E HORA DO ENVIO
                      <FormErrorMessage>
                        <Text fontWeight={"semibold"} fontSize={"xs"}>
                          {errors.sendEmailDate?.message
                            ?.toString()
                            .toLocaleUpperCase()}
                        </Text>
                      </FormErrorMessage>
                    </FormLabel>
                    <Input
                      defaultValue={
                        orderDetails.sendEmailDate
                          ? orderDetails?.sendEmailDate.toString()
                          : undefined
                      }
                      {...register("sendEmailDate")}
                      type={"datetime-local"}
                    />
                  </FormControl>
                </Flex>
                <Flex width={"full"} direction={"column"} padding={4} gap={4}>
                  <Text
                    backgroundColor={"gray.100"}
                    padding={2}
                    borderRadius={"base"}
                    textColor={"gray.700"}
                    fontWeight={"semibold"}
                    shadow={"sm"}
                  >
                    DEFINIÇÕES
                  </Text>
                  <FormControl>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      MODO DE ENVIO
                    </FormLabel>
                    <RadioGroup
                      defaultValue={shipmentMethod}
                      onChange={setShipmentMethod}
                    >
                      <Stack spacing={5} direction="row">
                        <Radio {...register("shipmentMethod")} value="0">
                          <Text
                            fontSize={"xs"}
                            textColor={"gray.600"}
                            fontWeight={"semibold"}
                          >
                            TRANSPORTADORA
                          </Text>
                        </Radio>
                        <Radio {...register("shipmentMethod")} value="1">
                          <Text
                            fontSize={"xs"}
                            textColor={"gray.600"}
                            fontWeight={"semibold"}
                          >
                            LEVANTAMENTO EM LOJA
                          </Text>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      TIPO DE PAGAMENTO
                    </FormLabel>
                    <Select
                      defaultValue={paymentMethod}
                      {...register("paymentMethod", { valueAsNumber: true })}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      {shipmentMethod === "0" && (
                        <option value="1">COBRANÇA</option>
                      )}
                      {shipmentMethod === "1" && (
                        <React.Fragment>
                          <option value="0">ANTECIPADO (TRANSFERENCIA)</option>
                          <option value="2">BALCÃO</option>
                        </React.Fragment>
                      )}
                    </Select>
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
                      defaultValue={orderDetails.notes}
                      {...register("notes")}
                    />
                  </FormControl>

                  <Divider opacity={"75%"} />
                  <Text
                    backgroundColor={"gray.100"}
                    padding={2}
                    borderRadius={"base"}
                    textColor={"gray.700"}
                    fontWeight={"semibold"}
                    shadow={"sm"}
                  >
                    DETALHE DA ENTREGA
                  </Text>
                  <Flex width={"full"} gap={4}>
                    <FormControl isInvalid={!!errors.shipmentName?.message}>
                      <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                        NOME
                        <FormErrorMessage>
                          <Text fontWeight={"semibold"} fontSize={"xs"}>
                            {errors.shipmentName?.message
                              ?.toString()
                              .toLocaleUpperCase()}
                          </Text>
                        </FormErrorMessage>
                      </FormLabel>
                      <Input
                        cursor={"text!important"}
                        {...register("shipmentName")}
                        disabled={shipmentMethod !== "0" ? true : false}
                        defaultValue={orderDetails?.shipmentDetails.firstName}
                      />
                    </FormControl>
                    <FormControl isInvalid={!!errors.shipmentSurname?.message}>
                      <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                        APELIDO
                        <FormErrorMessage>
                          <Text fontWeight={"semibold"} fontSize={"xs"}>
                            {errors.shipmentSurname?.message
                              ?.toString()
                              .toLocaleUpperCase()}
                          </Text>
                        </FormErrorMessage>
                      </FormLabel>
                      <Input
                        cursor={"text!important"}
                        {...register("shipmentSurname")}
                        disabled={shipmentMethod !== "0" ? true : false}
                        defaultValue={orderDetails?.shipmentDetails.lastName}
                      />
                    </FormControl>
                  </Flex>
                  <FormControl isInvalid={!!errors.shipmentAddress?.message}>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      MORADA
                      <FormErrorMessage>
                        <Text fontWeight={"semibold"} fontSize={"xs"}>
                          {errors.shipmentAddress?.message
                            ?.toString()
                            .toLocaleUpperCase()}
                        </Text>
                      </FormErrorMessage>
                    </FormLabel>
                    <Input
                      cursor={"text!important"}
                      disabled={shipmentMethod !== "0" ? true : false}
                      {...register("shipmentAddress")}
                      defaultValue={orderDetails?.shipmentDetails.address}
                    />
                  </FormControl>
                  <Flex width={"full"} gap={4}>
                    <FormControl
                      isInvalid={!!errors.shipmentPostalCode?.message}
                    >
                      <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                        CODIGO-POSTAL
                        <FormErrorMessage>
                          <Text fontWeight={"semibold"} fontSize={"xs"}>
                            {errors.shipmentPostalCode?.message
                              ?.toString()
                              .toLocaleUpperCase()}
                          </Text>
                        </FormErrorMessage>
                      </FormLabel>
                      <Input
                        cursor={"text!important"}
                        disabled={shipmentMethod !== "0" ? true : false}
                        {...register("shipmentPostalCode")}
                        defaultValue={orderDetails?.shipmentDetails?.postalCode}
                      />
                    </FormControl>
                    <FormControl isInvalid={!!errors.shipmentCity?.message}>
                      <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                        CIDADE
                        <FormErrorMessage>
                          <Text fontWeight={"semibold"} fontSize={"xs"}>
                            {errors.shipmentCity?.message
                              ?.toString()
                              .toLocaleUpperCase()}
                          </Text>
                        </FormErrorMessage>
                      </FormLabel>
                      <Input
                        cursor={"text!important"}
                        disabled={shipmentMethod !== "0" ? true : false}
                        {...register("shipmentCity")}
                        defaultValue={orderDetails?.shipmentDetails?.city}
                      />
                    </FormControl>
                  </Flex>
                  <FormControl
                    isInvalid={!!errors.shipmentPhoneNumber?.message}
                  >
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      NÚMERO DE TELEFONE
                      <FormErrorMessage>
                        <Text fontWeight={"semibold"} fontSize={"xs"}>
                          {errors.shipmentPhoneNumber?.message
                            ?.toString()
                            .toLocaleUpperCase()}
                        </Text>
                      </FormErrorMessage>
                    </FormLabel>
                    <Input
                      cursor={"text!important"}
                      disabled={shipmentMethod !== "0" ? true : false}
                      {...register("shipmentPhoneNumber")}
                      type="text"
                      defaultValue={formatString(
                        orderDetails?.shipmentDetails.phoneNumber
                      )}
                    />
                  </FormControl>
                  <FormControl isInvalid={!!errors.shipmentTaxNumber?.message}>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      CONTRIBUINTE
                      <FormErrorMessage>
                        <Text fontWeight={"semibold"} fontSize={"xs"}>
                          {errors.shipmentTaxNumber?.message
                            ?.toString()
                            .toLocaleUpperCase()}
                        </Text>
                      </FormErrorMessage>
                    </FormLabel>
                    <Input
                      cursor={"text!important"}
                      disabled={shipmentMethod !== "0" ? true : false}
                      {...register("shipmentTaxNumber")}
                      type="text"
                      defaultValue={formatString(
                        orderDetails?.shipmentDetails?.taxNumber
                      )}
                    />
                  </FormControl>
                </Flex>
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
                    type={"submit"}
                    size={"sm"}
                    rounded={"full"}
                    shadow={"base"}
                    backgroundColor={"green.300"}
                    _hover={{ backgroundColor: "green.400", shadow: "md" }}
                  >
                    <Flex gap={2} align={"center"}>
                      <Text fontWeight={"semibold"} textColor={"white"}>
                        ATUALIZAR ENCOMENDA
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
                        VOLTAR PARA ENCOMENDAS
                      </Text>
                    </Flex>
                  </Button>
                </Flex>
                <Flex justify={"flex-end"} width={"full"} gap={2}>
                  <Button
                    size={"sm"}
                    shadow={"base"}
                    rounded={"full"}
                    backgroundColor={"green.300"}
                    _hover={{ backgroundColor: "green.400", shadow: "md" }}
                    variant={"solid"}
                    onClick={() => handleUpdateStatus(0)}
                  >
                    <Flex gap={2} align={"center"}>
                      <Text fontWeight={"semibold"} textColor={"white"}>
                        CRIADA
                      </Text>
                      <FontAwesomeIcon color={"white"} icon={faCheckCircle} />
                    </Flex>
                  </Button>
                  <Button
                    size={"sm"}
                    shadow={"base"}
                    rounded={"full"}
                    backgroundColor={"blue.300"}
                    _hover={{ backgroundColor: "blue.400", shadow: "md" }}
                    variant={"solid"}
                    onClick={() => handleUpdateStatus(2)}
                  >
                    <Flex gap={2} align={"center"}>
                      <Text fontWeight={"semibold"} textColor={"white"}>
                        PRONTA PARA ENVIAR
                      </Text>
                      <FontAwesomeIcon color={"white"} icon={faTruckPlane} />
                    </Flex>
                  </Button>
                  <Button
                    size={"sm"}
                    shadow={"base"}
                    rounded={"full"}
                    backgroundColor={"teal.300"}
                    _hover={{ backgroundColor: "teal.400", shadow: "md" }}
                    variant={"solid"}
                    onClick={() => handleUpdateStatus(3)}
                  >
                    <Flex gap={2} align={"center"}>
                      <Text fontWeight={"semibold"} textColor={"white"}>
                        ENVIADA
                      </Text>
                      <FontAwesomeIcon color={"white"} icon={faBoxCheck} />
                    </Flex>
                  </Button>
                  <Button
                    size={"sm"}
                    shadow={"base"}
                    rounded={"full"}
                    backgroundColor={"red.300"}
                    _hover={{ backgroundColor: "red.400", shadow: "md" }}
                    variant={"solid"}
                    onClick={() => handleUpdateStatus(1)}
                  >
                    <Flex gap={2} align={"center"}>
                      <Text fontWeight={"semibold"} textColor={"white"}>
                        PENDENTE
                      </Text>
                      <FontAwesomeIcon color={"white"} icon={faHand} />
                    </Flex>
                  </Button>
                </Flex>
              </Flex>
            </form>
          </React.Fragment>
        )}
      {currentTab === "orders" && (
        <React.Fragment>
          <Flex gap={2} direction={"column"} height={"full"} width={"full"}>
            <Flex gap={4}>
              <StockSearch
                handleAddPart={handleAddOrderPart}
                showLabel={false}
              />
              <Button
                shadow={"base"}
                rounded={"full"}
                backgroundColor={"blue.400"}
                _hover={{ backgroundColor: "blue.500" }}
                width={"sm"}
              >
                <Flex gap={4} align={"center"} onClick={() => onOpen()}>
                  <FontAwesomeIcon color={"white"} icon={faPlus} />
                  <Text
                    fontSize={"xs"}
                    fontWeight={"semibold"}
                    textColor={"white"}
                  >
                    ADICIONAR PRODUTO À ENCOMENDA
                  </Text>
                </Flex>
              </Button>
            </Flex>
            <Grid
              gridData={orderParts ?? []}
              columnDefs={updateProductColumns}
            />
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
                onClick={() => handleUpdatePrivateDetailsOrder()}
                size={"sm"}
                rounded={"full"}
                shadow={"base"}
                backgroundColor={"green.300"}
                _hover={{ backgroundColor: "green.400", shadow: "md" }}
              >
                <Flex gap={2} align={"center"}>
                  <Text fontWeight={"semibold"} textColor={"white"}>
                    ATUALIZAR ENCOMENDA
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
                    VOLTAR PARA ENCOMENDAS
                  </Text>
                </Flex>
              </Button>
            </Flex>
            <Flex justify={"flex-end"} width={"full"} gap={2}>
              <Button
                size={"sm"}
                shadow={"base"}
                rounded={"full"}
                backgroundColor={"green.300"}
                _hover={{ backgroundColor: "green.400", shadow: "md" }}
                variant={"solid"}
                onClick={() => handleUpdateStatus(0)}
              >
                <Flex gap={2} align={"center"}>
                  <Text fontWeight={"semibold"} textColor={"white"}>
                    CRIADA
                  </Text>
                  <FontAwesomeIcon color={"white"} icon={faCheckCircle} />
                </Flex>
              </Button>
              <Button
                size={"sm"}
                shadow={"base"}
                rounded={"full"}
                backgroundColor={"blue.300"}
                _hover={{ backgroundColor: "blue.400", shadow: "md" }}
                variant={"solid"}
                onClick={() => handleUpdateStatus(2)}
              >
                <Flex gap={2} align={"center"}>
                  <Text fontWeight={"semibold"} textColor={"white"}>
                    PRONTA PARA ENVIAR
                  </Text>
                  <FontAwesomeIcon color={"white"} icon={faTruckPlane} />
                </Flex>
              </Button>
              <Button
                size={"sm"}
                shadow={"base"}
                rounded={"full"}
                backgroundColor={"teal.300"}
                _hover={{ backgroundColor: "teal.400", shadow: "md" }}
                variant={"solid"}
                onClick={() => handleUpdateStatus(3)}
              >
                <Flex gap={2} align={"center"}>
                  <Text fontWeight={"semibold"} textColor={"white"}>
                    ENVIADA
                  </Text>
                  <FontAwesomeIcon color={"white"} icon={faBoxCheck} />
                </Flex>
              </Button>
              <Button
                size={"sm"}
                shadow={"base"}
                rounded={"full"}
                backgroundColor={"red.300"}
                _hover={{ backgroundColor: "red.400", shadow: "md" }}
                variant={"solid"}
                onClick={() => handleUpdateStatus(1)}
              >
                <Flex gap={2} align={"center"}>
                  <Text fontWeight={"semibold"} textColor={"white"}>
                    PENDENTE
                  </Text>
                  <FontAwesomeIcon color={"white"} icon={faHand} />
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </React.Fragment>
      )}
      {currentTab === "history" && (
        <Grid gridData={orderDetails?.history} columnDefs={historyColumns} />
      )}
      <CreateOrderProduct isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  );
};
