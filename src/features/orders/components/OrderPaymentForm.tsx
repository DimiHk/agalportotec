import { useSubmitForm } from "@/hooks";
import { useFormData, useFormSteps } from "@/providers";
import { createPrivateClientPaymentDataSchema } from "@/schemas";
import {
  ModalHeader,
  Flex,
  Badge,
  ModalBody,
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  Select,
  Divider,
  Textarea,
  ModalFooter,
  Button,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { usePayment } from "../providers/paymentProvider";

export const OrderPaymentForm = () => {
  const { setFormValues } = useFormData();
  const { shipmentMethod: providerShipmentMethod } = usePayment();

  const {
    shipmentMethod,
    notes,
    paymentType,
    handleSetShipmentMethod,
    handleSetPaymentType,
    handleSetNotes,
  } = usePayment();

  const { handleNextForm, handlePreviousForm } = useFormSteps();

  const { register, handleSubmit, errors } = useSubmitForm(
    createPrivateClientPaymentDataSchema
  );

  const nextFormIndex = providerShipmentMethod === "0" ? 1 : 2;

  const handleNextFormSubmit = (values: any) => {
    setFormValues(values);
    handleNextForm(nextFormIndex);
  };

  return (
    <React.Fragment>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>CRIAR ENCOMENDA</Text>
          <Badge shadow={"base"} colorScheme="blue">
            <Text padding={1} fontSize={"xs"} fontWeight={"semibold"}>
              {3 +
                " / " +
                (providerShipmentMethod && providerShipmentMethod === "0"
                  ? 5
                  : 4)}
            </Text>
          </Badge>
        </Flex>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          MODO DE PAGAMENTO
        </Text>
      </ModalHeader>
      <form onSubmit={handleSubmit(handleNextFormSubmit)}>
        <ModalBody>
          <Flex direction={"column"} width={"full"} gap={2}>
            <FormControl isInvalid={!!errors.shipmentMethod?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                MODO DE ENVIO
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.shipmentMethod?.message
                      ?.toString()
                      .toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <RadioGroup
                onChange={handleSetShipmentMethod}
                defaultValue={shipmentMethod}
              >
                <Stack spacing={5} direction="row">
                  <Radio
                    {...register("shipmentMethod", {
                      valueAsNumber: true,
                    })}
                    value="0"
                  >
                    <Text
                      fontSize={"xs"}
                      textColor={"gray.600"}
                      fontWeight={"semibold"}
                    >
                      TRANSPORTADORA
                    </Text>
                  </Radio>
                  <Radio
                    {...register("shipmentMethod", {
                      valueAsNumber: true,
                    })}
                    value="1"
                  >
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
            <FormControl isInvalid={!!errors.paymentMethod?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                TIPO DE PAGAMENTO
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.paymentMethod?.message
                      ?.toString()
                      .toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Select
                {...register("paymentMethod", { valueAsNumber: true })}
                onChange={(e) => handleSetPaymentType(e.target.value)}
                defaultValue={paymentType}
              >
                {shipmentMethod === "0" && (
                  <React.Fragment>
                    <option value="0">ANTECIPADO (TRANSFERENCIA)</option>
                    <option value="1">COBRANÇA</option>
                    <option value="3">5/10/30 DIAS</option>
                  </React.Fragment>
                )}
                {shipmentMethod === "1" && (
                  <React.Fragment>
                    <option value="0">ANTECIPADO (TRANSFERENCIA)</option>
                    <option value="2">BALCÃO</option>
                    <option value="3">30 DIAS</option>
                  </React.Fragment>
                )}
              </Select>
            </FormControl>

            <Divider marginTop={2} marginBottom={2} color={"black"} />
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
                defaultValue={notes}
                {...register("notes")}
                onChange={(e) => handleSetNotes(e.target.value)}
              />
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex
            rounded={"full"}
            width={"full"}
            justify={"center"}
            align={"center"}
            gap={4}
          >
            <Button
              onClick={() => handlePreviousForm()}
              width={"full"}
              rounded={"full"}
              colorScheme="cyan"
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
                SEGUINTE
              </Text>
            </Button>
          </Flex>
        </ModalFooter>
      </form>
    </React.Fragment>
  );
};
