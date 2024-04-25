import { useSubmitForm } from "@/hooks";
import { useFormData, useFormSteps } from "@/providers";
import { clientDetailsSchema } from "@/schemas";
import { clientService } from "@/services";
import React, { useEffect, useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { Search } from "@/components/components";
import { CreatePrivateClientModal } from "@/features/client/components/CreatePrivateClientModal";

type Props = {
  handleCloseModal: () => void;
};

const PrivateClientDetailsForm = ({ handleCloseModal }: Props) => {
  const { clients: privateClients, mutate } =
    clientService.handleGetOrderPrivateClients();

  const {
    isOpen: isPrivateModalOpen,
    onOpen: onOpenPrivateModal,
    onClose: onClosePrivateModal,
  } = useDisclosure();

  const [privateClientsStated, setPrivateClientsStated] = useState<any>();

  const { selectedUserInfo, handleSetUserInfo } = useSelectedUser();

  const { setFormValues } = useFormData();

  const { handleNextForm } = useFormSteps();

  const { setValue, handleSubmit, errors } = useSubmitForm(clientDetailsSchema);

  const handleChangeUser = (id: string) => {
    const user = privateClients?.find((client) => client.id === id);
    if (!user) return;
    handleSetUserInfo(user);
  };

  const handleSubmitForm = (values: any) => {
    setFormValues(values);
    handleNextForm();
  };

  useEffect(() => {
    if (privateClients) setPrivateClientsStated(privateClients);
  }, [privateClients]);

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
              {privateClientsStated && (
                <Search
                  defaultValue={selectedUserInfo?.name}
                  placeholder={""}
                  options={privateClientsStated}
                  onSelect={({ id }) => {
                    handleChangeUser(id);
                    setValue("clientId", id);
                  }}
                  filterProperty={"name"}
                >
                  <Button
                    onClick={() => onOpenPrivateModal()}
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
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOME DO CLIENTE
                </FormLabel>
                <Input value={selectedUserInfo?.name} disabled />
              </FormControl>
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
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  CONTRIBUINTE
                </FormLabel>
                <Input
                  value={formatString(selectedUserInfo?.taxNumber)}
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
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex width={"full"} justify={"center"} align={"center"} gap={4}>
            <Button
              rounded={"full"}
              onClick={handleCloseModal}
              width={"full"}
              colorScheme="cyan"
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
      <CreatePrivateClientModal
        isOpen={isPrivateModalOpen}
        onClose={onClosePrivateModal}
        mutate={mutate}
        setPrivateClientsStated={setPrivateClientsStated}
      />
    </React.Fragment>
  );
};

export default PrivateClientDetailsForm;
