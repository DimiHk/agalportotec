import { useSubmitForm } from "@/hooks";
import { useFormData, useFormSteps } from "@/providers";
import { createStockDetailsSchema } from "@/schemas";
import {
  ModalHeader,
  Flex,
  Badge,
  ModalBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  ModalFooter,
  Text,
  Input,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  handleCloseModal: () => void;
};

export const CreateStockModal = ({ handleCloseModal }: Props) => {
  const { handleNextForm } = useFormSteps();

  const { data, setFormValues } = useFormData();

  const { register, handleSubmit, errors } = useSubmitForm(
    createStockDetailsSchema
  );

  const onSubmit = handleSubmit((data) => {
    setFormValues(data);
    handleNextForm();
  });

  return (
    <React.Fragment>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>CRIAR PEÇA DE STOCK</Text>
          <Badge shadow={"base"} colorScheme="blue">
            <Text padding={1} fontSize={"xs"} fontWeight={"semibold"}>
              {1 + " / " + 2}
            </Text>
          </Badge>
        </Flex>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          DADOS DA PEÇA DE STOCK
        </Text>
      </ModalHeader>
      <form onSubmit={onSubmit}>
        <ModalBody>
          <Flex direction={"column"} width={"full"} gap={2}>
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
                <Input defaultValue={data.name} {...register("name")} />
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
                  defaultValue={data.reference}
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
                defaultValue={data.wareHouseLocation}
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
                  defaultValue={data.boughtPrice}
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
                  defaultValue={data.sellingPrice}
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
                defaultValue={data.quantity}
                {...register("quantity", { valueAsNumber: true })}
              />
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex width={"full"} justify={"center"} align={"center"} gap={4}>
            <Button
              onClick={() => handleCloseModal()}
              width={"full"}
              colorScheme="cyan"
              rounded={"full"}
            >
              <Text color={"white"} fontSize={"small"}>
                CANCELAR
              </Text>
            </Button>
            <Button
              rounded={"full"}
              type={"submit"}
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
