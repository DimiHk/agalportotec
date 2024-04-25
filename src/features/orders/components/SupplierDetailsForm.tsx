import { useSubmitForm } from "@/hooks";
import { useFormData, useFormSteps } from "@/providers";
import { supplierDetailSchema } from "@/schemas";
import { supplierService } from "@/services";
import React, { useEffect } from "react";
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
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import { Search } from "@/components/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { CreateSupplierModal } from "@/features/suppliers/components/CreateSupplierModal";

type Props = {
  handleCloseModal: () => void;
};

const SupplierDetailsForm = ({ handleCloseModal }: Props) => {
  const { suppliers, mutate } = supplierService.handleGetSuppliers();

  const {
    isOpen: isSuppliersModalOpen,
    onOpen: onOpenSuppliersModal,
    onClose: onCloseSuppliersModal,
  } = useDisclosure();

  const { data: selectedUserInfo, setFormValues } = useFormData();

  const { handleNextForm } = useFormSteps();

  const { handleSubmit, errors, setValue } =
    useSubmitForm(supplierDetailSchema);

  const handleChangeUser = (id: string) => {
    const user = suppliers?.find((client) => client.id === id);
    if (!user) return;
    setFormValues(user);
  };

  const handleSubmitForm = (values: any) => {
    setFormValues(values);
    handleNextForm();
  };

  useEffect(() => {
    if (selectedUserInfo) setValue("supplierId", selectedUserInfo!.id);
  }, [selectedUserInfo, setValue]);

  return (
    <React.Fragment>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>CRIAR ENCOMENDA</Text>
          <Badge shadow={"base"} colorScheme="blue">
            <Text padding={1} fontSize={"xs"} fontWeight={"semibold"}>
              {1 + " / " + 3}
            </Text>
          </Badge>
        </Flex>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          DADOS DO FORNECEDOR
        </Text>
      </ModalHeader>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalBody>
          <Flex direction={"column"} width={"full"} gap={2}>
            <FormControl isInvalid={!!errors.supplierId?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                FORNECEDOR
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.supplierId?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              {suppliers && (
                <Search
                  defaultValue={selectedUserInfo?.name}
                  placeholder={""}
                  options={suppliers}
                  onSelect={({ id }) => {
                    handleChangeUser(id);
                    setValue("supplierId", id);
                  }}
                  filterProperty={"name"}
                >
                  <Button
                    onClick={() => onOpenSuppliersModal()}
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
                        CRIAR FORNECEDOR
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
                    NOME DA EMPRESA
                  </FormLabel>
                  <Input
                    type={"text"}
                    defaultValue={selectedUserInfo?.companyName}
                    disabled
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    NOME DO FORNECEDOR
                  </FormLabel>
                  <Input
                    type={"text"}
                    defaultValue={selectedUserInfo?.name}
                    disabled
                  />
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  EMAIL
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    type="email"
                    defaultValue={selectedUserInfo?.email}
                    disabled
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  MORADA
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    type="text"
                    defaultValue={selectedUserInfo?.address}
                    disabled
                  />
                </InputGroup>
              </FormControl>
              <Flex justify={"center"} align={"end"} gap={4}>
                <FormControl>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    TELEFONE GERAL
                  </FormLabel>
                  <Input
                    type={"text"}
                    defaultValue={selectedUserInfo?.generalPhoneNumber}
                    disabled
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    TELEFONE DIRETO
                  </FormLabel>
                  <Input
                    type={"text"}
                    disabled
                    defaultValue={selectedUserInfo?.directPhoneNumber}
                  />
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  CONTRIBUINTE
                </FormLabel>
                <Input
                  type={"text"}
                  defaultValue={selectedUserInfo?.taxNumber}
                  disabled
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOTAS
                </FormLabel>
                <Textarea
                  textColor={"black"}
                  defaultValue={selectedUserInfo?.notes}
                  disabled
                />
              </FormControl>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex width={"full"} justify={"center"} align={"center"} gap={4}>
            <Button
              onClick={() => handleCloseModal()}
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
      <CreateSupplierModal
        isOpen={isSuppliersModalOpen}
        onClose={onCloseSuppliersModal}
        mutate={mutate}
      />
    </React.Fragment>
  );
};

export default SupplierDetailsForm;
