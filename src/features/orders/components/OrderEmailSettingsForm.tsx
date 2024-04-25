import React, { use } from "react";
import { useSubmitForm } from "@/hooks";
import { useFormData, useFormSteps } from "@/providers";
import { createPrivateClientEmailSchema } from "@/schemas";
import { ordersService } from "@/services";
import { useEmailSettings } from "../providers/emailSettingsProvider";
import { usePayment } from "../providers/paymentProvider";
import { useShipment } from "../providers/shipmentProvider";
import { useOrderParts } from "../providers/orderPartsProvider";
import { useSelectedUser } from "../providers/userInfoProvider";
import {
  useToast,
  ModalHeader,
  Flex,
  Badge,
  ModalBody,
  FormControl,
  Checkbox,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";

export const OrderEmailSettingsForm = ({
  handleCloseModal,
  userType,
}: {
  handleCloseModal: () => void;
  userType: "private" | "enterprise";
}) => {
  const { mutate } = ordersService.handleGetOrders();
  const { shipmentMethod, handleResetPayment } = usePayment();
  const { shipmentDetails, handleResetShipment } = useShipment();
  const { handleResetEmailSettings } = useEmailSettings();
  const { handleResetOrderParts } = useOrderParts();
  const { handlePreviousForm, handleResetFormSteps } = useFormSteps();
  const { handleResetUserInfo } = useSelectedUser();
  const toast = useToast();

  const {
    emailDate,
    isGoingToSend,
    handleSetEmailDate,
    handleSetIsGoingToSend,
  } = useEmailSettings();

  const {
    data: createOrderData,
    setFormValues,
    handleResetFormValues,
  } = useFormData();

  const previousIndex = shipmentMethod === "0" ? 1 : 2;

  const { register, handleSubmit, errors } = useSubmitForm(
    createPrivateClientEmailSchema
  );

  const handleNextFormSubmit = async (values: any) => {
    setFormValues(values);

    const sendEmailDate = values.sendEmails ? values.sendEmailDate : undefined;

    const shipmentDetailsIncluded =
      shipmentMethod === "0"
        ? { shipmentDetails: { ...shipmentDetails } }
        : undefined;

    const finalOrderRequestData = {
      ...createOrderData,
      ...shipmentDetailsIncluded,
      ...values,
      sendEmailDate,
    };

    userType === "private"
      ? await ordersService
          .handleCreatePrivateClientOrder(
            finalOrderRequestData,
            finalOrderRequestData.clientId
          )
          .then(() => handleResetValues())
          .catch((error) => {
            toast({
              title: "ERRO",
              description: error.message,
              status: "error",
            });
          })
      : await ordersService
          .handleCreateEnterpriseClientOrder(
            finalOrderRequestData,
            finalOrderRequestData.clientId
          )
          .then(() => handleResetValues())
          .catch((error) => {
            toast({
              title: "ERRO",
              description: error.message,
              status: "error",
            });
          });
  };

  const handleResetValues = () => {
    toast({
      title: "SUCESSO",
      description: "ENCOMENDA DO CLIENTE ADICIONADA COM SUCESSO!",
      status: "success",
    });
    handleResetFormValues();
    handleResetUserInfo();
    handleResetOrderParts();
    handleResetPayment();
    handleResetShipment();
    handleResetEmailSettings();
    setTimeout(() => {
      mutate();
      handleCloseModal();
      setTimeout(() => {
        handleResetFormSteps();
      }, 1000);
    }, 1500);
  };

  return (
    <React.Fragment>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>CRIAR ENCOMENDA</Text>
          <Badge shadow={"base"} colorScheme="blue">
            <Text padding={1} fontSize={"xs"} fontWeight={"semibold"}>
              {(shipmentMethod === "0" ? 5 : 4) +
                " / " +
                (shipmentMethod === "0" ? 5 : 4)}
            </Text>
          </Badge>
        </Flex>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          DEFINIÇÕES DE EMAILS
        </Text>
      </ModalHeader>
      <form onSubmit={handleSubmit(handleNextFormSubmit)}>
        <ModalBody>
          <Flex direction={"column"} width={"full"} gap={2}>
            <FormControl isInvalid={!!errors.sendEmails?.message}>
              <Checkbox
                defaultChecked={isGoingToSend}
                {...register("sendEmails")}
                onChange={(e) => handleSetIsGoingToSend(e.target.checked)}
              >
                <Text fontWeight={"semibold"} fontSize={"small"}>
                  DESEJA ENVIAR EMAILS?
                </Text>
              </Checkbox>
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.sendEmails?.message?.toString().toLocaleUpperCase()}
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
                defaultValue={isGoingToSend ? emailDate : ""}
                value={isGoingToSend ? emailDate : undefined}
                {...register("sendEmailDate")}
                type={"datetime-local"}
                onChange={(e) => handleSetEmailDate(e.target.value)}
              />
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex
            width={"full"}
            rounded={"full"}
            justify={"center"}
            align={"center"}
            gap={4}
          >
            <Button
              onClick={() => handlePreviousForm(previousIndex)}
              width={"full"}
              colorScheme="cyan"
              rounded={"full"}
            >
              <Text color={"white"} fontSize={"small"}>
                VOLTAR
              </Text>
            </Button>
            <Button
              rounded={"full"}
              type="submit"
              width={"full"}
              colorScheme="blue"
            >
              <Text color={"white"} fontSize={"small"}>
                FINALIZAR
              </Text>
            </Button>
          </Flex>
        </ModalFooter>
      </form>
    </React.Fragment>
  );
};
