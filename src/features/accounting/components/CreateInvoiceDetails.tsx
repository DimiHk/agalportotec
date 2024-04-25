import { FileUpload } from "@/components/components";
import { FileUploadVariant } from "@/components/components/Inputs/FileUploadVariant";
import { useSelectedUser } from "@/features/orders/providers/userInfoProvider";
import { useFiles } from "@/features/stock/providers/fileProvider";
import { useSubmitForm } from "@/hooks";
import { CreateInvoiceRequest } from "@/models";
import { useFormSteps } from "@/providers";
import { createInvoiceSchema } from "@/schemas";
import { clientService } from "@/services";
import {
  ModalHeader,
  Flex,
  Text,
  Badge,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  useRadioGroup,
  useRadio,
  Box,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { faCircleEuro } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

type Props = {
  isEnterprise: boolean;
  onClose: () => void;
};

const weekDays = [
  { name: "SEGUNDA-FEIRA", value: "0" },
  { name: "TERÇA-FEIRA", value: "1" },
  { name: "QUARTA-FEIRA", value: "2" },
  { name: "QUINTA-FEIRA", value: "3" },
  { name: "SEXTA-FEIRA", value: "4" },
];

export const CreateInvoiceDetails = ({ isEnterprise, onClose }: Props) => {
  const { files, setFiles } = useFiles();

  const { selectedUserInfo, handleResetUserInfo } = useSelectedUser();

  const toast = useToast();

  const [isSendEmails, setIsSendEmails] = useState<boolean>(false);

  const [emailPeriocity, setEmailPeriocity] = useState("0");

  const { mutate } = clientService.handleGetInvoices();

  const { handlePreviousForm, handleResetFormSteps } = useFormSteps();

  const { register, handleSubmit, errors, setValue, watch } =
    useSubmitForm<CreateInvoiceRequest>(createInvoiceSchema);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "weekDays",
    defaultValue: "0",
    onChange: (e) => setValue("dayOfWeek", Number(e)),
  });

  const group = getRootProps();

  useEffect(() => {
    setValue("dayOfWeek", 0);
  }, [setValue]);

  const handleSubmitForm = () => {
    const createInvoiceRequest = isEnterprise
      ? clientService.handleCreateEnterpriseInvoice(
          selectedUserInfo?.id as string,
          { ...watch(), file: files }
        )
      : clientService.handleCreatePrivateInvoice(
          selectedUserInfo?.id as string,
          { ...watch(), file: files }
        );

    createInvoiceRequest
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "FACTURA CRIADA COM SUCESSO!",
          status: "success",
        });
        handleResetUserInfo();
        setTimeout(() => {
          mutate();
          onClose();
          setTimeout(() => {
            handleResetFormSteps();
          }, 1000);
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO CRIAR A FACTURA! POR FAVOR TENTE NOVAMENTE!, SE O ERRO PERSISTIR CONTACTE O ADMINISTRADOR DO SISTEMA!",
          status: "error",
        });
      });
  };

  return (
    <React.Fragment>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>CRIAR FATURA</Text>
          <Badge shadow={"base"} colorScheme="blue">
            <Text padding={1} fontSize={"xs"} fontWeight={"semibold"}>
              {2 + " / " + 2}
            </Text>
          </Badge>
        </Flex>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          DETALHE DA FATURA
        </Text>
      </ModalHeader>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalBody>
          <Flex direction={"column"} width={"full"} gap={2}>
            <FormControl>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                DATA
              </FormLabel>
              <Input {...register("date")} type="datetime-local" />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                ESTADO DA FATURA
              </FormLabel>
              <Select {...register("status")}>
                <option value="0">PAGO</option>
                <option value="1">PAGAMENTO EM FALTA</option>
              </Select>
            </FormControl>
            <FormControl>
              <Checkbox
                {...register("sendEmails")}
                onChange={(e) => setIsSendEmails(e.target.checked)}
              >
                <Text fontWeight={"semibold"} fontSize={"small"}>
                  DESEJA ENVIAR EMAILS?
                </Text>
              </Checkbox>
            </FormControl>
            {isSendEmails && (
              <React.Fragment>
                <FormControl>
                  <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                    PERIODICIDADE DO ENVIO
                  </FormLabel>
                  <Select
                    defaultValue={"0"}
                    {...register("timeFrame")}
                    onChange={(e) => setEmailPeriocity(e.target.value)}
                  >
                    <option value="0">DIARIAMENTE</option>
                    <option value="1">SEMANALMENTE</option>
                    <option value="2">MENSALMENTE</option>
                  </Select>
                </FormControl>
                {emailPeriocity !== "0" && (
                  <FormControl>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      DIA DA SEMANA
                    </FormLabel>
                    <HStack {...group}>
                      {weekDays.map((weekDay) => {
                        const radio = getRadioProps({ value: weekDay.value });
                        return (
                          <RadioCard
                            key={weekDay.value}
                            register={{ ...register("dayOfWeek") }}
                            {...radio}
                          >
                            {weekDay}
                          </RadioCard>
                        );
                      })}
                    </HStack>
                  </FormControl>
                )}
              </React.Fragment>
            )}
            <FormControl>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                TOTAL DA FATURA
              </FormLabel>
              <InputGroup>
                <Input
                  defaultValue={"0.00"}
                  {...register("total")}
                  type="text"
                />
                <InputRightElement>
                  <FontAwesomeIcon
                    size="lg"
                    style={{ color: "#68D391", cursor: "pointer" }}
                    icon={faCircleEuro}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isInvalid={!!errors.file?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                FICHEIRO
                <FormErrorMessage>
                  <Text fontWeight={"semibold"} fontSize={"xs"}>
                    {errors.file?.message?.toString().toLocaleUpperCase()}
                  </Text>
                </FormErrorMessage>
              </FormLabel>
              <FileUploadVariant
                multiple={false}
                handleGetFiles={(files) => {
                  setValue("file", files[0]);
                  setFiles(files[0]);
                }}
              />
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex width={"full"} justify={"center"} align={"center"} gap={4}>
            <Button
              onClick={() => handlePreviousForm()}
              width={"full"}
              colorScheme="cyan"
              rounded={"full"}
            >
              <Text color={"white"} fontSize={"small"}>
                VOLTAR
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
    </React.Fragment>
  );
};

const RadioCard = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor={"pointer"}
        padding={2}
        borderRadius={"base"}
        backgroundColor={"gray.100"}
        _checked={{
          backgroundColor: "blue.500",
          color: "white",
          shadow: "lg",
        }}
      >
        <Text fontSize={"sm"} fontWeight={"medium"}>
          {props.children.name.toLocaleUpperCase()}
        </Text>
      </Box>
    </Box>
  );
};
