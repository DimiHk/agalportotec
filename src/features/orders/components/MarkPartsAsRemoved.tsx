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
  ModalFooter,
  Textarea,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "@/components/components/Modal/Modal";
import { faFilePen, faTrash, faXmark } from "@fortawesome/pro-light-svg-icons";
import { useSubmitForm } from "@/hooks";
import {
  createSupplierOrderPartsSchema,
  removeSupplierOrderPartsAndArticlesSchema,
} from "@/schemas";
import { ordersService } from "@/services";
import { useRouter } from "next/router";
import { useSupplierParts } from "../providers/supplierPartsProvider";

export const MarkPartsAsRemoved = ({ supplierDetails }: any) => {
  const router = useRouter();

  const { id, supplierId } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, errors } = useSubmitForm(
    removeSupplierOrderPartsAndArticlesSchema
  );

  const { rowIndex } = supplierDetails;

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    errors: editErrors,
  } = useSubmitForm(createSupplierOrderPartsSchema);

  const { handleRemoveOrderPart, handleUpdatePart } = useSupplierParts();

  const handleRemovePart = (data: any) => {
    ordersService.handleRemoveItemsFromSupplierOrder(
      supplierId as string,
      id as string,
      {
        parts: [
          {
            id: supplierDetails.data.id,
            removedReason: data.notes,
          },
        ],
        articles: [],
      }
    );
  };

  return (
    <Flex
      width={"full"}
      height={"full"}
      align={"center"}
      justify={"center"}
      gap={4}
    >
      {!supplierDetails.data.isNew ? (
        <Tooltip
          label={
            <Text fontSize={"xs"} fontWeight={"semibold"}>
              REMOVER
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
            <FontAwesomeIcon icon={faXmark} />
          </Box>
        </Tooltip>
      ) : (
        <>
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
              onClick={onEditOpen}
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
              onClick={() => handleRemoveOrderPart(supplierDetails.data.name)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Box>
          </Tooltip>
        </>
      )}
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalHeader>
          <Text fontWeight={"bold"}>REMOVER PEÇA DA ENCOMENDA</Text>
          <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
            DIGA A RAZÃO PELA QUAL ESTÁ A REMOVER ESTA PEÇA!
          </Text>
        </ModalHeader>
        <form onSubmit={handleSubmit(handleRemovePart)}>
          <ModalBody>
            <Flex direction={"column"} width={"full"} gap={2}>
              <Flex
                width={"full"}
                gap={4}
                align={"flex-end"}
                justify={"center"}
              >
                <FormControl isInvalid={!!errors.notes?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    NOTAS
                    <FormErrorMessage>
                      <Text fontWeight={"semibold"} fontSize={"xs"}>
                        {errors.notes?.message?.toString().toLocaleUpperCase()}
                      </Text>
                    </FormErrorMessage>
                  </FormLabel>
                  <Textarea {...register("notes")} />
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
                  REMOVER
                </Text>
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </Modal>
      <Modal size={"2xl"} isOpen={isEditOpen} onClose={onEditClose}>
        <ModalHeader>
          <Text fontWeight={"bold"}>EDITAR DETALHE DO ARTIGO</Text>
          <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
            DADOS DO DETALHE DO ARTIGO
          </Text>
        </ModalHeader>
        <form
          onSubmit={handleEditSubmit((orderPart) =>
            handleUpdatePart(
              {
                name: orderPart.name,
                referenceNumber: orderPart.referenceNumber,
                reference: orderPart.referenceNumber,
                price: orderPart.price,
                quantity: orderPart.quantity,
                notes: orderPart.notes,
                isNew: true,
                isRemoved: false,
              },
              rowIndex
            )
          )}
        >
          <ModalBody>
            <Flex direction={"column"} width={"full"} gap={2}>
              <FormControl isInvalid={!!editErrors.name?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOME DA PEÇA
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {editErrors.name?.message?.toString().toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Input
                  defaultValue={supplierDetails.data.name}
                  {...registerEdit("name")}
                />
              </FormControl>

              <Flex
                width={"full"}
                gap={4}
                align={"flex-end"}
                justify={"center"}
              >
                <FormControl isInvalid={!!editErrors.reference?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    REFERENÇIA
                    <FormErrorMessage>
                      <Text fontWeight={"semibold"} fontSize={"xs"}>
                        {editErrors.reference?.message
                          ?.toString()
                          .toLocaleUpperCase()}
                      </Text>
                    </FormErrorMessage>
                  </FormLabel>
                  <Input
                    defaultValue={supplierDetails.data.referenceNumber}
                    {...registerEdit("referenceNumber")}
                  />
                </FormControl>
                <FormControl isInvalid={!!editErrors.price?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    PREÇO
                    <FormErrorMessage>
                      <Text fontWeight={"semibold"} fontSize={"xs"}>
                        {editErrors.price?.message
                          ?.toString()
                          .toLocaleUpperCase()}
                      </Text>
                    </FormErrorMessage>
                  </FormLabel>
                  <Input
                    defaultValue={supplierDetails.data.price}
                    {...registerEdit("price", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormControl isInvalid={!!editErrors.quantity?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    QUANTIDADE
                    <FormErrorMessage>
                      <Text fontWeight={"semibold"} fontSize={"xs"}>
                        {editErrors.quantity?.message
                          ?.toString()
                          .toLocaleUpperCase()}
                      </Text>
                    </FormErrorMessage>
                  </FormLabel>
                  <Input
                    defaultValue={supplierDetails.data.quantity}
                    {...registerEdit("quantity", { valueAsNumber: true })}
                  />
                </FormControl>
              </Flex>
              <FormControl isInvalid={!!editErrors.notes?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOTAS
                  <FormErrorMessage>
                    <Text fontWeight={"semibold"} fontSize={"xs"}>
                      {editErrors.notes?.message
                        ?.toString()
                        .toLocaleUpperCase()}
                    </Text>
                  </FormErrorMessage>
                </FormLabel>
                <Textarea
                  defaultValue={supplierDetails.data.notes}
                  {...registerEdit("notes")}
                />
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
