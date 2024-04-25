import { Search } from "@/components/components";
import { CreatePrivateClientModal } from "@/features/client/components/CreatePrivateClientModal";
import { useSelectedUser } from "@/features/orders/providers/userInfoProvider";
import { formatString } from "@/helpers";
import { useSubmitForm } from "@/hooks";
import { useFormSteps } from "@/providers";
import { clientDetailsSchema } from "@/schemas";
import { clientService } from "@/services";
import {
  ModalHeader,
  Flex,
  Text,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  ModalFooter,
  Button,
  Badge,
  Input,
  FormErrorMessage,
  useDisclosure,
} from "@chakra-ui/react";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

type Props = {
  onClose: () => void;
};

export const PrivateClientDetails = ({ onClose }: Props) => {
  const { clients: privateClients, mutate } =
    clientService.handleGetOrderPrivateClients();

  const {
    isOpen: isPrivateModalOpen,
    onOpen: onOpenPrivateModal,
    onClose: onClosePrivateModal,
  } = useDisclosure();

  const { setValue, handleSubmit, errors } = useSubmitForm(clientDetailsSchema);

  const { handleNextForm } = useFormSteps();

  const { selectedUserInfo, handleSetUserInfo } = useSelectedUser();

  const handleChangeUser = (id: string) => {
    const user = privateClients?.find((client) => client.id === id);
    if (!user) return;
    handleSetUserInfo(user);
  };

  const handleSubmitForm = () => {
    handleNextForm();
  };

  useEffect(() => {
    if (selectedUserInfo) setValue("clientId", selectedUserInfo!.id);
  }, [selectedUserInfo, setValue]);

  return (
    <React.Fragment>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>CRIAR FATURA</Text>
          <Badge shadow={"base"} colorScheme="blue">
            <Text padding={1} fontSize={"xs"} fontWeight={"semibold"}>
              {1 + " / " + 2}
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
              {privateClients && (
                <Search
                  defaultValue={selectedUserInfo?.name}
                  placeholder={""}
                  options={privateClients}
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
            <Flex
              direction={"column"}
              width={"full"}
              gap={2}
              padding={4}
              borderRadius={"base"}
              shadow={"base"}
            >
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOME DO CLIENTE
                </FormLabel>
                <Input
                  cursor={"text!important"}
                  defaultValue={selectedUserInfo?.name}
                  disabled
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  EMAIL
                </FormLabel>
                <Input
                  cursor={"text!important"}
                  defaultValue={selectedUserInfo?.email}
                  disabled
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  MORADA
                </FormLabel>
                <Input
                  cursor={"text!important"}
                  defaultValue={selectedUserInfo?.address}
                  disabled
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  TELEFONE DIRETO
                </FormLabel>
                <Input
                  cursor={"text!important"}
                  defaultValue={formatString(
                    selectedUserInfo?.directPhoneNumber
                  )}
                  disabled
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  CONTRIBUINTE
                </FormLabel>
                <Input
                  cursor={"text!important"}
                  defaultValue={formatString(selectedUserInfo?.taxNumber)}
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
      />
    </React.Fragment>
  );
};
