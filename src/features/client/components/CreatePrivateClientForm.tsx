import { useSubmitForm } from "@/hooks";
import { CreatePrivateClientRequest, OrderPrivateClients } from "@/models";
import { privateClientSchema } from "@/schemas";
import { clientService } from "@/services";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  Textarea,
  useToast,
  Text,
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/react";
import {
  faCircleXmark,
  faFileCirclePlus,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyedMutator } from "swr";

type Props = {
  onClose: () => void;
  mutate?: KeyedMutator<OrderPrivateClients[]>;
  setPrivateClientsStated?: React.Dispatch<any>;
};

export const CreatePrivateClientForm = ({
  onClose,
  mutate: mutatePrivateSearch,
  setPrivateClientsStated,
}: Props) => {
  const toast = useToast();
  const { mutate } = clientService.handleGetClients();
  const { register, handleSubmit, errors } =
    useSubmitForm<CreatePrivateClientRequest>(privateClientSchema);

  const handleSubmitForm = (formData: CreatePrivateClientRequest) => {
    clientService
      .handleCreatePrivateClient(formData)
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "CLIENTE ADICIONADO COM SUCESSO!",
          status: "success",
        });
        mutate();
        mutatePrivateSearch &&
          mutatePrivateSearch((data) => {
            setPrivateClientsStated && setPrivateClientsStated(data);
            return data;
          });
        onClose();
      })
      .catch(() => {
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO ADICIONAR O CLIENTE, VALIDE QUE OS DADOS ESTÃO CORRETOS, SE O ERRO PERSISTIR CONTACTE O ADMINISTRADOR DO SISTEMA!",
          status: "error",
        });
      });
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Grid gap={4}>
        <Flex gap={4} alignItems={"flex-end"} justifyContent={"center"}>
          <FormControl isInvalid={!!errors.name?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              NOME DO CLIENTE
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.name?.message?.toString().toLocaleUpperCase()}
                </Text>
              </FormErrorMessage>
            </FormLabel>
            <Input type={"text"} {...register("name")} />
          </FormControl>
        </Flex>
        <FormControl isInvalid={!!errors.email?.message}>
          <FormLabel fontWeight={"semibold"} fontSize={"small"}>
            EMAIL
            <FormErrorMessage>
              <Text fontWeight={"semibold"} fontSize={"xs"}>
                {errors.email?.message?.toString().toLocaleUpperCase()}
              </Text>
            </FormErrorMessage>
          </FormLabel>
          <InputGroup size="md">
            <Input type="email" {...register("email")} />
          </InputGroup>
        </FormControl>
        <FormControl isInvalid={!!errors.address?.message}>
          <FormLabel fontWeight={"semibold"} fontSize={"small"}>
            MORADA
            <FormErrorMessage>
              <Text fontWeight={"semibold"} fontSize={"xs"}>
                {errors.address?.message?.toString().toLocaleUpperCase()}
              </Text>
            </FormErrorMessage>
          </FormLabel>
          <InputGroup size="md">
            <Input type="text" {...register("address")} />
          </InputGroup>
        </FormControl>
        <Flex gap={4}>
          <FormControl isInvalid={!!errors.postalCode?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              CODIGO POSTAL
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.postalCode?.message?.toString().toLocaleUpperCase()}
                </Text>
              </FormErrorMessage>
            </FormLabel>
            <Input type={"text"} {...register("postalCode")} />
          </FormControl>
          <FormControl isInvalid={!!errors.additionalAddress?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              MORADA ADICIONAL
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.additionalAddress?.message
                    ?.toString()
                    .toLocaleUpperCase()}
                </Text>
              </FormErrorMessage>
            </FormLabel>
            <Input type={"text"} {...register("additionalAddress")} />
          </FormControl>
        </Flex>
        <Flex justify={"center"} align={"end"} gap={4}>
          <FormControl isInvalid={!!errors.taxNumber?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              CONTRIBUINTE
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.taxNumber?.message?.toString().toLocaleUpperCase()}
                </Text>
              </FormErrorMessage>
            </FormLabel>
            <Input type={"text"} {...register("taxNumber")} />
          </FormControl>
          <FormControl isInvalid={!!errors.directPhoneNumber?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              TELEFONE DIRETO
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.directPhoneNumber?.message
                    ?.toString()
                    .toLocaleUpperCase()}
                </Text>
              </FormErrorMessage>
            </FormLabel>
            <Input type={"text"} {...register("directPhoneNumber")} />
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
          <Textarea textColor={"black"} {...register("notes")} />
        </FormControl>
        <Checkbox {...register("sendEmails")}>
          <Text fontWeight={"semibold"} fontSize={"small"}>
            DESEJA ENVIAR EMAILS?
          </Text>
        </Checkbox>
        <Flex width={"full"} gap={2} marginBottom={2}>
          <Button
            width={"full"}
            size={"sm"}
            backgroundColor={"cyan.400"}
            borderRadius={"base"}
            rounded={"full"}
            onClick={onClose}
            _hover={{ backgroundColor: " cyan.500" }}
          >
            <Flex gap={2} align={"end"} justify={"center"}>
              <Text textColor={"white"} fontWeight={"semibold"}>
                CANCELAR
              </Text>
              <FontAwesomeIcon icon={faCircleXmark} color={"white"} />
            </Flex>
          </Button>
          <Button
            width={"full"}
            size={"sm"}
            backgroundColor={"blue.400"}
            borderRadius={"base"}
            rounded={"full"}
            type={"submit"}
            _hover={{ backgroundColor: " blue.500" }}
          >
            <Flex gap={2} align={"end"}>
              <Text textColor={"white"} fontWeight={"semibold"}>
                ADICIONAR
              </Text>
              <FontAwesomeIcon icon={faFileCirclePlus} color={"white"} />
            </Flex>
          </Button>
        </Flex>
      </Grid>
    </form>
  );
};
