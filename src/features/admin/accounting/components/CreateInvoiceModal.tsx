import { Search } from "@/components/components";
import Modal from "@/components/components/Modal/Modal";
import { useSubmitForm } from "@/hooks";
import { CreateAccountingInvoiceRequest } from "@/models";
import { createAccountingInvoiceSchema } from "@/schemas";
import { supplierService } from "@/services";
import { adminAccountingService } from "@/services/admin-accounting";
import {
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { faCircleEuro } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateInvoiceModal = ({ isOpen, onClose }: Props) => {
  const toast = useToast();

  const { mutate } = adminAccountingService.handleGetInvoices();

  const { register, handleSubmit, errors, reset, setValue } =
    useSubmitForm<CreateAccountingInvoiceRequest>(
      createAccountingInvoiceSchema
    );

  const { suppliers } = supplierService.handleGetSuppliers();

  const handleSubmitForm = async (
    requestData: CreateAccountingInvoiceRequest
  ) => {
    adminAccountingService
      .handleCreateInvoice(requestData)
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "FACTURA CRIADA COM SUCESSO!",
          status: "success",
        });
        mutate();
        reset();
        onClose();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO CRIAR A FACTURA! POR FAVOR TENTE NOVAMENTE!, SE O ERRO PERSISTIR CONTACTE O ADMINISTRADOR DO SISTEMA!",
          status: "error",
        });
      });
  };

  return (
    <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>CRIAR FATURA</Text>
        </Flex>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          DETALHE DA FATURA
        </Text>
      </ModalHeader>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalBody>
          <Flex direction={"column"} width={"full"} gap={2}>
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
              <Input {...register("documentNumber")} type="text" />
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
                placeholder={""}
                options={suppliers ? suppliers : []}
                onSelect={({ name }) => setValue("name", name)}
                onChange={(value) => setValue("name", value)}
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
              <Input {...register("expiryDate")} type="datetime-local" />
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
              <Input {...register("paymentNumber")} type="text" />
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
              <Select {...register("status")}>
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
                  defaultValue={"0.00"}
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
        </ModalBody>
        <ModalFooter>
          <Flex width={"full"} justify={"center"} align={"center"} gap={4}>
            <Button
              onClick={() => onClose()}
              width={"full"}
              colorScheme="cyan"
              rounded={"full"}
            >
              <Text color={"white"} fontSize={"small"}>
                CANCELAR
              </Text>
            </Button>
            <Button
              type="submit"
              width={"full"}
              rounded={"full"}
              colorScheme="blue"
            >
              <Text color={"white"} fontSize={"small"}>
                FINALIZAR
              </Text>
            </Button>
          </Flex>
        </ModalFooter>
      </form>
    </Modal>
  );
};
