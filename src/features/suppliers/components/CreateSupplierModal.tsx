import { FileUploadVariant } from "@/components/components/Inputs/FileUploadVariant";
import Modal from "@/components/components/Modal/Modal";
import { useSubmitForm } from "@/hooks";
import { CreateSupplierRequest } from "@/models";
import { createSupplierSchema } from "@/schemas";
import { supplierService } from "@/services";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  faCircleXmark,
  faFileCirclePlus,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export const CreateSupplierModal = ({
  isOpen,
  onClose,
  mutate,
}: {
  isOpen: boolean;
  onClose: () => void;
  mutate?: () => void;
}) => {
  const toast = useToast();

  const [file, setFile] = useState();

  const { register, handleSubmit, errors, reset } =
    useSubmitForm<CreateSupplierRequest>(createSupplierSchema);

  const { mutate: mutateList } = supplierService.handleGetSuppliers();

  const handleSubmitForm = (requestData: CreateSupplierRequest) => {
    const newRequestData = {
      ...requestData,
      image: file ? file : undefined,
    };

    supplierService
      .handleCreateSupplier(newRequestData)
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "FORNECEDOR CRIADO COM SUCESSO!",
          status: "success",
        });
        reset();
        setFile(undefined);
        mutateList();
        mutate && mutate();
        onClose();
      })
      .catch(() => {
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO CRIAR O FORNECEDOR, VERIFIQUE SE TODOS OS CAMPOS ESTÃO PREENCHIDOS CORRETAMENTE, E TENTE NOVAMENTE, CASO O ERRO PERSISTA, CONTATE O ADMINISTRADOR DO SISTEMA!",
          status: "error",
        });
      });
  };

  return (
    <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        <Text fontWeight={"bold"}>ADICIONAR FORNECEDOR</Text>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          DETALHE DO FORNECEDOR
        </Text>
      </ModalHeader>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalBody>
          <Grid gap={4}>
            <Flex justify={"center"} align={"center"} gap={4}>
              <FormControl isInvalid={!!errors.companyName?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOME DA EMPRESA
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.companyName?.message
                        ?.toString()
                        .toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input type={"text"} {...register("companyName")} />
              </FormControl>
              <FormControl isInvalid={!!errors.name?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOME DO FORNECEDOR
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.name?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input type={"text"} {...register("name")} />
              </FormControl>
            </Flex>
            <FormControl isInvalid={!!errors.email?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                EMAIL
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.email?.message?.toString().toLocaleUpperCase()}
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
                    {errors.address?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <InputGroup size="md">
                <Input type="text" {...register("address")} />
              </InputGroup>
            </FormControl>
            <Flex justify={"center"} align={"end"} gap={4}>
              <FormControl isInvalid={!!errors.generalPhoneNumber?.message}>
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
                <Input type={"text"} {...register("generalPhoneNumber")} />
              </FormControl>
              <FormControl isInvalid={!!errors.directPhoneNumber?.message}>
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
                    {errors.taxNumber?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input type={"text"} {...register("taxNumber")} />
            </FormControl>
            <FormControl isInvalid={!!errors.name?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                LOGO DA EMPRESA
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.image?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <FileUploadVariant
                accept="image/*"
                multiple={false}
                handleGetFiles={(file) => {
                  setFile(file[0]);
                }}
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
              <Textarea textColor={"black"} {...register("notes")} />
            </FormControl>

            <Checkbox {...register("sendEmails")}>
              <Text fontWeight={"semibold"} fontSize={"small"}>
                DESEJA ENVIAR EMAILS?
              </Text>
            </Checkbox>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Flex
            justify={"center"}
            align={"center"}
            width={"full"}
            gap={2}
            marginBottom={2}
          >
            <Button
              width={"full"}
              size={"sm"}
              backgroundColor={"cyan.400"}
              borderRadius={"full"}
              onClick={onClose}
              _hover={{ backgroundColor: " cyan.500" }}
            >
              <Flex gap={2} align={"end"} justify={"center"}>
                <Text textColor={"white"} fontWeight={"semibold"}>
                  CANCELAR
                </Text>
                <FontAwesomeIcon icon={faCircleXmark} color={"white"} />
              </Flex>
            </Button>
            <Button
              width={"full"}
              size={"sm"}
              backgroundColor={"blue.400"}
              borderRadius={"full"}
              type={"submit"}
              _hover={{ backgroundColor: " blue.500" }}
            >
              <Flex gap={2} align={"end"}>
                <Text textColor={"white"} fontWeight={"semibold"}>
                  ADICIONAR
                </Text>
                <FontAwesomeIcon icon={faFileCirclePlus} color={"white"} />
              </Flex>
            </Button>
          </Flex>
        </ModalFooter>
      </form>
    </Modal>
  );
};
