import {
  Flex,
  Tooltip,
  Text,
  Box,
  useDisclosure,
  ModalHeader,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { faFilePen, faTrash } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "@/components/components/Modal/Modal";
import { useSubmitForm } from "@/hooks";
import { createSupplierOrderPartsSchema } from "@/schemas";
import { useSupplierParts } from "../providers/supplierPartsProvider";

export const UpdateSupplierPartsActionsColumn = ({ orderPart }: any) => {
  const { referenceNumber, name, price, notes, quantity } = orderPart.data;

  const { rowIndex } = orderPart;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, errors } = useSubmitForm(
    createSupplierOrderPartsSchema
  );

  const { handleRemoveOrderPart, handleUpdatePart } = useSupplierParts();

  return (
    <Flex
      width={"full"}
      height={"full"}
      align={"center"}
      justify={"center"}
      gap={4}
    >
      <Tooltip
        label={
          <Text fontSize={"xs"} fontWeight={"semibold"}>
            EDITAR
          </Text>
        }
        placement="auto"
      >
        <Box
          cursor={"pointer"}
          color={"gray.900"}
          _hover={{ color: "blue.600" }}
          onClick={onOpen}
        >
          <FontAwesomeIcon icon={faFilePen} />
        </Box>
      </Tooltip>
      <Tooltip
        label={
          <Text fontSize={"xs"} fontWeight={"semibold"}>
            APAGAR
          </Text>
        }
        placement="auto"
      >
        <Box
          cursor={"pointer"}
          color={"gray.900"}
          _hover={{ color: "red.600" }}
          onClick={() => handleRemoveOrderPart(referenceNumber)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Box>
      </Tooltip>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalHeader>
          <Text fontWeight={"bold"}>EDITAR DETALHE DA PEÇA</Text>
          <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
            DADOS DO DETALHE DA PEÇA
          </Text>
        </ModalHeader>
        <form
          onSubmit={handleSubmit((orderPart) =>
            handleUpdatePart(
              {
                name: orderPart.name,
                referenceNumber: orderPart.referenceNumber,
                price: orderPart.price,
                quantity: orderPart.quantity,
                notes: orderPart.notes,
              },
              rowIndex
            )
          )}
        >
          <ModalBody>
            <Flex direction={"column"} width={"full"} gap={2}>
              <FormControl isInvalid={!!errors.name?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOME DA PEÇA
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.name?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input defaultValue={name} {...register("name")} />
              </FormControl>

              <Flex
                width={"full"}
                gap={4}
                align={"flex-end"}
                justify={"center"}
              >
                <FormControl isInvalid={!!errors.reference?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    REFERENÇIA
                    <FormErrorMessage>
                      <Text fontWeight={"semibold"} fontSize={"xs"}>
                        {errors.reference?.message
                          ?.toString()
                          .toLocaleUpperCase()}
                      </Text>
                    </FormErrorMessage>
                  </FormLabel>
                  <Input
                    defaultValue={referenceNumber}
                    {...register("referenceNumber")}
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.price?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    PREÇO
                    <FormErrorMessage>
                      <Text fontWeight={"semibold"} fontSize={"xs"}>
                        {errors.price?.message?.toString().toLocaleUpperCase()}
                      </Text>
                    </FormErrorMessage>
                  </FormLabel>
                  <Input
                    defaultValue={price}
                    {...register("price", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.quantity?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    QUANTIDADE
                    <FormErrorMessage>
                      <Text fontWeight={"semibold"} fontSize={"xs"}>
                        {errors.quantity?.message
                          ?.toString()
                          .toLocaleUpperCase()}
                      </Text>
                    </FormErrorMessage>
                  </FormLabel>
                  <Input
                    defaultValue={quantity}
                    {...register("quantity", { valueAsNumber: true })}
                  />
                </FormControl>
              </Flex>
              <FormControl isInvalid={!!errors.notes?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOTAS
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {errors.notes?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Textarea defaultValue={notes} {...register("notes")} />
              </FormControl>
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
                  GUARDAR
                </Text>
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </Modal>
    </Flex>
  );
};
