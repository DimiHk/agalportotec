import Modal from "@/components/components/Modal/Modal";
import {
  ModalHeader,
  ModalBody,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { useUpdateOrderDetails } from "../providers/updateOrderDetailsProvider";
import { useSubmitForm } from "@/hooks";
import { createPrivateClientOrderOrderPartsSchema } from "@/schemas";
import { PartsModel } from "@/models";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateOrderProduct = ({ isOpen, onClose }: Props) => {
  const { register, handleSubmit, errors, reset } = useSubmitForm<PartsModel>(
    createPrivateClientOrderOrderPartsSchema
  );

  const { handleAddOrderPart } = useUpdateOrderDetails();

  const handleSubmited = (data: PartsModel) => {
    handleAddOrderPart(data);
    reset();
    onClose();
  };

  return (
    <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        <Text fontWeight={"bold"}>ADICIONAR PEÇA AO STOCK</Text>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          DADOS DO DETALHE DA PEÇA
        </Text>
      </ModalHeader>
      <form onSubmit={handleSubmit(handleSubmited)}>
        <ModalBody>
          <Flex direction={"column"} width={"full"} gap={2}>
            <Flex width={"full"} gap={4} align={"flex-end"} justify={"center"}>
              <FormControl isInvalid={!!errors.name?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOME DA PEÇA
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.name?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input {...register("name")} />
              </FormControl>
            </Flex>
            <Flex width={"full"} gap={4} align={"flex-end"} justify={"center"}>
              <FormControl isInvalid={!!errors.reference?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  REFERENÇIA
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.reference?.message
                        ?.toString()
                        .toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input {...register("reference")} />
              </FormControl>
              <FormControl isInvalid={!!errors.price?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  PREÇO
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.price?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input
                  defaultValue={"0.00"}
                  {...register("price", { valueAsNumber: true })}
                />
              </FormControl>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex width={"full"} justify={"center"} align={"center"} gap={4}>
            <Button
              rounded={"full"}
              onClick={onClose}
              width={"full"}
              colorScheme="cyan"
            >
              <Text color={"white"} fontSize={"small"}>
                CANCELAR
              </Text>
            </Button>
            <Button
              rounded={"full"}
              type="submit"
              width={"full"}
              colorScheme="blue"
            >
              <Text color={"white"} fontSize={"small"}>
                ADICIONAR
              </Text>
            </Button>
          </Flex>
        </ModalFooter>
      </form>
    </Modal>
  );
};
