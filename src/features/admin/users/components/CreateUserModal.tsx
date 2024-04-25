import Modal from "@/components/components/Modal/Modal";
import { useSubmitForm } from "@/hooks";
import { CreateUserRequest } from "@/models";
import { createUserSchema } from "@/schemas";
import { adminUsersService } from "@/services/admin-users";
import {
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateUserModal = ({ isOpen, onClose }: Props) => {
  const toast = useToast();

  const { register, handleSubmit, errors, reset } =
    useSubmitForm<CreateUserRequest>(createUserSchema);

  const { mutate } = adminUsersService.handleGetUsers();

  const handleSubmitForm = async (requestData: CreateUserRequest) => {
    adminUsersService
      .handleCreateUser(requestData)
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "UTILIZADOR CRIADO COM SUCESSO!",
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
            "HOUVE UM ERRO AO CRIAR O UTILIZADOR!, POR FAVOR TENTE NOVAMENTE!, SE O ERRO PERSISTIR CONTACTE O ADMINISTRADOR DO SISTEMA",
          status: "error",
        });
      });
  };

  return (
    <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>CRIAR UTILIZADOR</Text>
        </Flex>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          DETALHE DO UTILIZADOR
        </Text>
      </ModalHeader>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalBody>
          <Flex direction={"column"} width={"full"} gap={2}>
            <FormControl isInvalid={!!errors.name?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                NOME
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.name?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input {...register("name")} type="text" />
            </FormControl>
            <FormControl isInvalid={!!errors.email?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                EMAIL
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.email?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input {...register("email")} type="email" />
            </FormControl>
            <FormControl isInvalid={!!errors.password?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                PALAVRA-PASSE
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.password?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input {...register("password")} type="password" />
            </FormControl>
            <FormControl isInvalid={!!errors.userType?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                TIPO DE UTILIZADOR
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.userType?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Select {...register("userType", { valueAsNumber: true })}>
                <React.Fragment>
                  <option value="0">ADMINISTRADOR</option>
                  <option value="1">UTILIZADOR NORMAL</option>
                </React.Fragment>
              </Select>
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
