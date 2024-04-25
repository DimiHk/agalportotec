import { TabsMenu } from "@/components/components/Tab/TabsMenu";
import { useSubmitForm } from "@/hooks";
import { UpdateUserRequest, UserResponse } from "@/models";
import { updateUserSchema } from "@/schemas";
import { adminUsersService } from "@/services/admin-users";
import {
  Flex,
  Divider,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  Select,
  Button,
} from "@chakra-ui/react";
import {
  faArrowLeft,
  faFileCirclePlus,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useState } from "react";

const tabs = [
  {
    name: "INFORMAÇÕES GERAIS",
  },
];

export const EditUsersPage = () => {
  const [currentTab, setCurrentTab] = useState("INFORMAÇÕES GERAIS");

  const router = useRouter();

  const { id: userId } = router.query;

  const { userDetails, mutate } = adminUsersService.handleGetUserDetails(
    userId as string
  );

  return (
    <React.Fragment>
      <React.Fragment>
        <Flex justify={"flex-start"} align={"center"} gap={2.5}>
          <Text fontSize={"xl"} textColor={"gray.700"} fontWeight={"semibold"}>
            DETALHE DO UTILIZADOR
          </Text>
        </Flex>
        <Flex
          gap={2}
          position={"sticky"}
          top={-1}
          backgroundColor={"white"}
          zIndex={1}
          justify={"space-between"}
          align={"center"}
          borderRadius={"base"}
          padding={1}
        >
          <Flex align={"center"} gap={2}>
            <TabsMenu
              tabs={tabs}
              currentTab={currentTab}
              handleChangeTab={setCurrentTab}
            />
          </Flex>
        </Flex>
      </React.Fragment>
      <Divider marginTop={2} marginBottom={2} opacity={"75%"} />
      {userDetails && (
        <MainContainer
          currentTab={currentTab}
          userDetails={userDetails}
          mutate={mutate}
        />
      )}
    </React.Fragment>
  );
};

const MainContainer = ({
  currentTab,
  userDetails,
  mutate,
}: {
  currentTab: string;
  userDetails: UserResponse;
  mutate: () => void;
}) => {
  const toast = useToast();

  const router = useRouter();

  const { id: userId } = router.query;

  const { register, handleSubmit, errors } =
    useSubmitForm<UpdateUserRequest>(updateUserSchema);

  const submitForm = async (requestData: UpdateUserRequest) => {
    const newPassword = requestData.newPassword
      ? requestData.newPassword
      : undefined;
    const newPasswordConfirmation = requestData.newPasswordConfirmation
      ? requestData.newPasswordConfirmation
      : undefined;
    await adminUsersService
      .handleUpdateUser(userId as string, {
        ...requestData,
        newPassword,
        newPasswordConfirmation,
      })
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "CLIENTE ATUALIZADO COM SUCESSO",
          status: "success",
        });
        mutate();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "OCORREU UM ERRO AO ATUALIZAR O CLIENTE, TENTE NOVAMENTE, EM CASO DE PERSISTÊNCIA DO ERRO, CONTACTE O ADMINISTRADOR DO SISTEMA",
          status: "error",
        });
      });
  };

  return (
    <React.Fragment>
      {currentTab === "INFORMAÇÕES GERAIS" && (
        <form style={{ height: "100%" }} onSubmit={handleSubmit(submitForm)}>
          <Flex direction={"column"} width={"full"} height={"full"} gap={4}>
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
                defaultValue={userDetails.name}
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
                defaultValue={userDetails.email}
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
            <FormControl isInvalid={!!errors.type?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                TIPO DE UTILIZADOR
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.type?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <Select
                defaultValue={userDetails.type}
                {...register("type", { valueAsNumber: true })}
              >
                <React.Fragment>
                  <option value="0">ADMINISTRADOR</option>
                  <option value="1">UTILIZADOR NORMAL</option>
                </React.Fragment>
              </Select>
            </FormControl>
          </Flex>
          <Flex
            borderTop={"1px solid"}
            borderColor={"gray.200"}
            backgroundColor={"white"}
            width={"full"}
            position={"sticky"}
            bottom={0}
            gap={4}
            paddingTop={2.5}
          >
            <Flex justify={"flex-start"} width={"full"} gap={2}>
              <Button
                size={"sm"}
                type="submit"
                rounded={"full"}
                shadow={"base"}
                backgroundColor={"green.300"}
                _hover={{ backgroundColor: "green.400", shadow: "md" }}
              >
                <Flex gap={2} align={"center"}>
                  <Text fontWeight={"semibold"} textColor={"white"}>
                    ATUALIZAR CLIENTE
                  </Text>
                  <FontAwesomeIcon color={"white"} icon={faFileCirclePlus} />
                </Flex>
              </Button>
              <Button
                size={"sm"}
                shadow={"base"}
                rounded={"full"}
                backgroundColor={"blue.300"}
                _hover={{ backgroundColor: "blue.400", shadow: "md" }}
                variant={"solid"}
                onClick={() => router.back()}
              >
                <Flex gap={2} align={"flex-end"}>
                  <FontAwesomeIcon color={"white"} icon={faArrowLeft} />
                  <Text fontWeight={"semibold"} textColor={"white"}>
                    VOLTAR PARA CLIENTES
                  </Text>
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </form>
      )}
    </React.Fragment>
  );
};
