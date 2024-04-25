import { useSubmitForm } from "@/hooks";
import { useFormData, useFormSteps } from "@/providers";
import { clientDetailsSchema } from "@/schemas";
import { clientService } from "@/services";
import React, { useEffect, useMemo, useState } from "react";
import { useSelectedUser } from "../providers/userInfoProvider";
import {
  ModalHeader,
  Flex,
  Badge,
  ModalBody,
  FormControl,
  FormLabel,
  Divider,
  Input,
  ModalFooter,
  Button,
  Text,
  FormErrorMessage,
  useDisclosure,
} from "@chakra-ui/react";
import { formatString } from "@/helpers";
import { Search } from "@/components/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { CreateEnterpriseClientModal } from "@/features/client/components/CreateEnterpriseClientModal";

type Props = {
  handleCloseModal: () => void;
};

const EnterpriseClientDetailsForm = ({ handleCloseModal }: Props) => {
  const { clients: enterpriseClients, mutate } =
    clientService.handleGetOrderEnterpriseClients();

  const {
    isOpen: isEntepriseModalOpen,
    onOpen: onOpenEnterpriseModal,
    onClose: onCloseEnterpriseModal,
  } = useDisclosure();

  const { selectedUserInfo, handleSetUserInfo } = useSelectedUser();

  const { setFormValues } = useFormData();

  const { handleNextForm } = useFormSteps();

  const { handleSubmit, errors, setValue } = useSubmitForm(clientDetailsSchema);

  const handleChangeUser = (id: string) => {
    const user = enterpriseClients?.find((client) => client.id === id);
    if (!user) return;
    handleSetUserInfo(user);
  };

  const handleSubmitForm = (values: any) => {
    setFormValues(values);
    handleNextForm();
  };

  useEffect(() => {
    if (selectedUserInfo) setValue("clientId", selectedUserInfo!.id);
  }, [selectedUserInfo, setValue]);

  return (
    <React.Fragment>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>CRIAR ENCOMENDA</Text>
          <Badge shadow={"base"} colorScheme="blue">
            <Text padding={1} fontSize={"xs"} fontWeight={"semibold"}>
              {1 + " / " + 5}
            </Text>
          </Badge>
        </Flex>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          DADOS DO CLIENTE
        </Text>
      </ModalHeader>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalBody>
          <Flex direction={"column"} width={"full"} gap={2}>
            <FormControl isInvalid={!!errors.clientId?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                CLIENTE
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.clientId?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              {enterpriseClients && (
                <Search
                  defaultValue={selectedUserInfo?.name}
                  placeholder={""}
                  options={enterpriseClients}
                  onSelect={({ id }) => {
                    handleChangeUser(id);
                    setValue("clientId", id);
                  }}
                  filterProperty={"name"}
                >
                  <Button
                    onClick={() => onOpenEnterpriseModal()}
                    marginBottom={2}
                    width={"full"}
                    shadow={"base"}
                    rounded={"full"}
                    backgroundColor={"blue.400"}
                    _hover={{ backgroundColor: "blue.500" }}
                    variant={"solid"}
                    size={"sm"}
                  >
                    <Flex gap={2} align={"center"}>
                      <FontAwesomeIcon color={"white"} icon={faPlus} />
                      <Text
                        fontSize={"xs"}
                        textColor={"white"}
                        fontWeight={"semibold"}
                      >
                        CRIAR CLIENTE
                      </Text>
                    </Flex>
                  </Button>
                </Search>
              )}
            </FormControl>
            <Divider marginTop={2} marginBottom={2} color={"black"} />
            <Flex
              direction={"column"}
              width={"full"}
              gap={2}
              padding={4}
              borderRadius={"base"}
              shadow={"base"}
              _hover={{ shadow: "md", cursor: "pointer" }}
            >
              <Flex justify={"center"} align={"center"} gap={4}>
                <FormControl>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    NOME DO CLIENTE
                  </FormLabel>
                  <Input value={selectedUserInfo?.name} disabled />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    NOME DO FUNCIONÁRIO
                  </FormLabel>
                  <Input value={selectedUserInfo?.employeeName} disabled />
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  EMAIL
                </FormLabel>
                <Input value={selectedUserInfo?.email} disabled />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  MORADA
                </FormLabel>
                <Input value={selectedUserInfo?.address} disabled />
              </FormControl>
              <Flex justify={"center"} align={"center"} gap={4}>
                <FormControl>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    TELEFONE GERAL
                  </FormLabel>
                  <Input
                    value={formatString(selectedUserInfo?.generalPhoneNumber)}
                    disabled
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    TELEFONE DIRETO
                  </FormLabel>
                  <Input
                    value={formatString(selectedUserInfo?.directPhoneNumber)}
                    disabled
                  />
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  CONTRIBUINTE
                </FormLabel>
                <Input
                  value={formatString(selectedUserInfo?.taxNumber)}
                  disabled
                />
              </FormControl>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex width={"full"} justify={"center"} align={"center"} gap={4}>
            <Button
              onClick={handleCloseModal}
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
      <CreateEnterpriseClientModal
        isOpen={isEntepriseModalOpen}
        onClose={onCloseEnterpriseModal}
        mutate={mutate}
      />
    </React.Fragment>
  );
};

export default EnterpriseClientDetailsForm;
