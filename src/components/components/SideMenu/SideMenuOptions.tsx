import {
  Stack,
  Flex,
  Text,
  useDisclosure,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import { faGear, faRightFromBracket } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCookie } from "cookies-next";
import router from "next/router";
import Modal from "../Modal/Modal";
import { updateProfileSchema } from "@/schemas";
import { useSubmitForm } from "@/hooks";
import { UpdateProfileRequest } from "@/models";
import React from "react";
import { adminUsersService } from "@/services/admin-users";

export const SideMenuOptions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleRemoveAuthentication() {
    deleteCookie(process.env.NEXT_PUBLIC_AUTHENTICATION_COOKIE_NAME!);
    router.push("/auth");
  }

  return (
    <Stack gap={2} marginBottom={6}>
      <Flex
        gap={2}
        padding={"0.275rem"}
        paddingBottom={"0.725rem"}
        paddingTop={"0.725rem"}
        align={"center"}
        justify={"center"}
        borderRadius={"base"}
        backgroundColor={"whiteAlpha.100"}
        cursor={"pointer"}
        shadow={"sm"}
        _hover={{
          background: "whiteAlpha.200",
          shadow: "base",
          transitionTimingFunction: "fade-in",
        }}
        onClick={onOpen}
      >
        <FontAwesomeIcon icon={faGear} size="xs" color="white" />
        <Text fontSize={"xs"} fontWeight={"bold"} color={"white"}>
          DEFINIÇÕES
        </Text>
      </Flex>
      <Flex
        gap={2}
        padding={"0.275rem"}
        paddingBottom={"0.725rem"}
        paddingTop={"0.725rem"}
        align={"center"}
        justify={"center"}
        borderRadius={"base"}
        backgroundColor={"whiteAlpha.100"}
        cursor={"pointer"}
        shadow={"sm"}
        _hover={{
          background: "whiteAlpha.200",
          shadow: "base",
          transitionDuration: "0.1s",
          transitionTimingFunction: "fade-in",
        }}
        onClick={handleRemoveAuthentication}
      >
        <FontAwesomeIcon icon={faRightFromBracket} size="xs" color="white" />
        <Text fontSize={"xs"} fontWeight={"bold"} color={"white"}>
          SAIR
        </Text>
      </Flex>
      <ProfileModal isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ProfileModal = ({ isOpen, onClose }: Props) => {
  const { profile, mutate } = adminUsersService.handleGetProfile();

  const toast = useToast();

  const { register, handleSubmit, errors, reset } =
    useSubmitForm<UpdateProfileRequest>(updateProfileSchema);

  const handleSubmitForm = async (requestData: UpdateProfileRequest) => {
    const newPassword = requestData.newPassword
      ? requestData.newPassword
      : undefined;
    const newPasswordConfirmation = requestData.newPasswordConfirmation
      ? requestData.newPasswordConfirmation
      : undefined;
    await adminUsersService
      .handleUpdateProfile({
        ...requestData,
        newPassword,
        newPasswordConfirmation,
      })
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "PERFIL ATUALIZADO COM SUCESSO!",
          status: "success",
        });
        reset();
        onClose();
        mutate();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO ATUALIZAR O PERFIL!, TENTE NOVAMENTE!, SE O ERRO PERSISTIR, CONTACTE O ADMINISTRADOR DO SISTEMA!",
          status: "error",
        });
      });
  };

  return (
    <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>PERFIL</Text>
        </Flex>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          DETALHE DO PERFIL
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
              <Input
                defaultValue={profile?.name}
                {...register("name")}
                type="text"
              />
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
              <Input
                defaultValue={profile?.email}
                {...register("email")}
                type="email"
              />
            </FormControl>
            <FormControl isInvalid={!!errors.newPassword?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                NOVA PALAVRA-PASSE
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.newPassword?.message
                      ?.toString()
                      .toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input {...register("newPassword")} type="password" />
            </FormControl>
            <FormControl isInvalid={!!errors.newPasswordConfirmation?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                CONFIRMAR NOVA PALAVRA-PASSE
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.newPasswordConfirmation?.message
                      ?.toString()
                      .toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Input {...register("newPasswordConfirmation")} type="password" />
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
