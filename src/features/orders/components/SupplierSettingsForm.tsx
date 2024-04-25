import React from "react";
import { useSubmitForm } from "@/hooks";
import { useFormData, useFormSteps } from "@/providers";
import { createSupplierDetailsSchema } from "@/schemas";
import {
  ModalHeader,
  Flex,
  Badge,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { ordersService } from "@/services";
import { useSupplierParts } from "../providers/supplierPartsProvider";

type Props = {
  handleCloseModal: () => void;
};

export const SupplierSettingsForm = ({ handleCloseModal }: Props) => {
  const toast = useToast();

  const { data, setFormValues, handleResetFormValues } = useFormData();

  const { handlePreviousForm, handleResetFormSteps } = useFormSteps();

  const { register, handleSubmit, errors } = useSubmitForm(
    createSupplierDetailsSchema
  );

  const { mutate } = ordersService.handleGetSuppliersOrders();

  const { parts, articles, handleResetOrderParts } = useSupplierParts();

  const handleSubmitForm = async (requestData: any) => {
    await ordersService
      .handleCreateSupplierOrder(data.supplierId, {
        deliveryNumber: requestData.deliveryNumber
          ? requestData.deliveryNumber
          : undefined,
        date: requestData.date,
        notes: requestData.notes,
        parts: parts ? parts : [],
        articles: articles ? articles : [],
      })
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "ENCOMENDA DO FORNECEDOR CRIADA COM SUCESSO",
          status: "success",
        });
        handleResetFormValues();
        handleResetOrderParts();
        setTimeout(() => {
          mutate();
          handleCloseModal();
          setTimeout(() => {
            handleResetFormSteps();
          }, 1000);
        }, 1500);
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
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalHeader>
          <Flex gap={4} align={"center"}>
            <Text fontWeight={"bold"}>CRIAR ENCOMENDA</Text>
            <Badge shadow={"base"} colorScheme="blue">
              <Text padding={1} fontSize={"xs"} fontWeight={"semibold"}>
                {3 + " / " + 3}
              </Text>
            </Badge>
          </Flex>
          <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
            DETALHE DA ENCOMENDA
          </Text>
        </ModalHeader>
        <ModalBody>
          <Flex direction={"column"} width={"full"} gap={2}>
            <FormControl isInvalid={!!errors.deliveryNumber?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                NUMERO DE ENTREGA
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.deliveryNumber?.message
                      ?.toString()
                      .toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input
                defaultValue={data?.deliveryNumber}
                {...register("deliveryNumber")}
                type={"text"}
                onChange={(e) =>
                  setFormValues({ deliveryNumber: e.target.value })
                }
              />
            </FormControl>
            <FormControl isInvalid={!!errors.date?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                DATA
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.date?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input
                defaultValue={data?.date}
                {...register("date")}
                type={"datetime-local"}
                onChange={(e) => setFormValues({ date: e.target.value })}
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
                defaultValue={data?.notes}
                {...register("notes")}
                onChange={(e) => setFormValues({ notes: e.target.value })}
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
              type={"submit"}
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
