import { useSubmitForm } from "@/hooks";
import { useFormSteps } from "@/providers";
import { createPrivateClientShipmentSchema } from "@/schemas";
import {
  ModalHeader,
  Flex,
  Badge,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { useShipment } from "../providers/shipmentProvider";

export const OrderShipmentForm = () => {
  const { shipmentDetails, handleSetShipmentDetails } = useShipment();

  const { register, handleSubmit, errors } = useSubmitForm(
    createPrivateClientShipmentSchema
  );

  const { handleNextForm, handlePreviousForm } = useFormSteps();

  const handleNextFormSubmit = (values: any) => {
    handleSetShipmentDetails(values);
    handleNextForm();
  };

  return (
    <React.Fragment>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>CRIAR ENCOMENDA</Text>
          <Badge shadow={"base"} colorScheme="blue">
            <Text padding={1} fontSize={"xs"} fontWeight={"semibold"}>
              {4 + " / " + 5}
            </Text>
          </Badge>
        </Flex>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          DADOS DE ENTREGA
        </Text>
      </ModalHeader>
      <form onSubmit={handleSubmit(handleNextFormSubmit)}>
        <ModalBody>
          <Flex direction={"column"} width={"full"} gap={2}>
            <Flex width={"full"} gap={4}>
              <FormControl isInvalid={!!errors.name?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOME
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.name?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input
                  defaultValue={shipmentDetails?.name}
                  {...register("name")}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.surname?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  APELIDO
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.surname?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input
                  defaultValue={shipmentDetails?.surname}
                  {...register("surname")}
                />
              </FormControl>
            </Flex>
            <FormControl isInvalid={!!errors.address?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                MORADA
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.address?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input
                defaultValue={shipmentDetails?.address}
                {...register("address")}
              />
            </FormControl>
            <Flex width={"full"} gap={4}>
              <FormControl isInvalid={!!errors.postalCode?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  CODIGO-POSTAL
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.postalCode?.message
                        ?.toString()
                        .toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input
                  defaultValue={shipmentDetails?.postalCode}
                  {...register("postalCode")}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.city?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  CIDADE
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.city?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input
                  defaultValue={shipmentDetails?.city}
                  {...register("city")}
                />
              </FormControl>
            </Flex>
            <FormControl isInvalid={!!errors.phoneNumber?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                NÚMERO DE TELEFONE
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.phoneNumber?.message
                      ?.toString()
                      .toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input
                type="number"
                defaultValue={shipmentDetails?.phoneNumber}
                {...register("phoneNumber")}
              />
            </FormControl>
            <FormControl isInvalid={!!errors.taxNumber?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                CONTRIBUINTE
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.taxNumber?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input
                type="number"
                defaultValue={shipmentDetails?.taxNumber}
                {...register("taxNumber")}
              />
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex width={"full"} justify={"center"} align={"center"} gap={4}>
            <Button
              rounded={"full"}
              onClick={() => handlePreviousForm()}
              width={"full"}
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
