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
} from "@chakra-ui/react";
import { faFilePen, faTrash } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrderParts } from "../providers/orderPartsProvider";
import Modal from "@/components/components/Modal/Modal";
import { useSubmitForm } from "@/hooks";
import { createPrivateClientOrderOrderPartsSchema } from "@/schemas";

export const ActionsColumn = ({ orderPart }: any) => {
  const { reference, name, price } = orderPart.data;

  const { rowIndex } = orderPart;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleRemoveOrderPart, handleUpdatePart } = useOrderParts();

  const { register, handleSubmit, errors } = useSubmitForm(
    createPrivateClientOrderOrderPartsSchema
  );

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
          onClick={() => handleRemoveOrderPart(reference)}
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
          onSubmit={handleSubmit(({ name, reference, price }) =>
            handleUpdatePart({ name, reference, price }, rowIndex)
          )}
        >
          <ModalBody>
            <Flex direction={"column"} width={"full"} gap={2}>
              <Flex
                width={"full"}
                gap={4}
                align={"flex-end"}
                justify={"center"}
              >
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
              </Flex>
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
                  <Input defaultValue={reference} {...register("reference")} />
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
                  <Input defaultValue={price} {...register("price")} />
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
