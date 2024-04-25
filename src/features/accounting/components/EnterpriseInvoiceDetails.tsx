import { TabsMenu } from "@/components/components/Tab/TabsMenu";
import { formatString } from "@/helpers";
import { clientService } from "@/services";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  Textarea,
  useDisclosure,
  useRadio,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import { faCircleEuro } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  EnterpriseInvoiceResponse,
  UpdateEnterpriseInvoiceRequest,
} from "@/models";
import { updateEnterpriseInvoiceSchema } from "@/schemas";
import { useSubmitForm } from "@/hooks";
import {
  faArrowLeft,
  faFileCirclePlus,
} from "@fortawesome/pro-light-svg-icons";
import { PreviewFile } from "./PreviewFile";
import { useUpdateInvoiceDetails } from "../providers/updateInvoicesProvider";
import { useFiles } from "@/features/stock/providers/fileProvider";
import { FileUploadVariant } from "@/components/components/Inputs/FileUploadVariant";

const tabs = [
  {
    name: "CLIENTE",
  },
  {
    name: "DEFINIÇÕES",
  },
];

const weekDays = [
  { name: "SEGUNDA-FEIRA", value: "0" },
  { name: "TERÇA-FEIRA", value: "1" },
  { name: "QUARTA-FEIRA", value: "2" },
  { name: "QUINTA-FEIRA", value: "3" },
  { name: "SEXTA-FEIRA", value: "4" },
];

export const EnterpriseInvoiceDetails = () => {
  const router = useRouter();

  const { id: invoiceId, clientId } = router.query;

  const [currentTab, setCurrentTab] = useState<string>("CLIENTE");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { invoice } = clientService.handleGetEnterpriseInvoiceById(
    clientId as string,
    invoiceId as string
  );

  const { handleSetDefaultValues } = useUpdateInvoiceDetails();

  useEffect(() => {
    if (invoice) handleSetDefaultValues(invoice);
  }, [invoice]);

  return (
    <React.Fragment>
      <Flex justify={"flex-start"} align={"center"} gap={2.5}>
        <Text
          backgroundColor={"gray.50"}
          padding={2}
          borderRadius={"base"}
          textColor={"gray.700"}
          fontWeight={"semibold"}
          shadow={"sm"}
          width={"full"}
          fontSize={"lg"}
        >
          DETALHE DA FATURA
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
        <Button
          onClick={() => onOpen()}
          size={"sm"}
          rounded={"full"}
          colorScheme={"blue"}
        >
          <Flex align={"center"} gap={2}>
            PRE-VISUALIZAR FATURA
          </Flex>
        </Button>
      </Flex>
      <Divider marginTop={2} marginBottom={2} opacity={"75%"} />
      {invoice && (
        <MainContainer
          isOpen={isOpen}
          onClose={onClose}
          currentTab={currentTab}
          invoice={invoice}
        />
      )}
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

const MainContainer = ({
  isOpen,
  onClose,
  currentTab,
  invoice,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
  invoice: EnterpriseInvoiceResponse;
}) => {
  const { invoiceDetails } = useUpdateInvoiceDetails();

  const { files } = useFiles();

  return (
    <React.Fragment>
      <React.Fragment>
        {currentTab === "CLIENTE" && <UserSettings />}
        {currentTab === "DEFINIÇÕES" && <InvoiceSettings />}
        <PreviewFile
          fileUrl={
            files.length > 0
              ? URL.createObjectURL(files[0])
              : invoiceDetails.fileUrl
          }
          type={files.length > 0 ? files[0].type : invoice.contentType}
          isOpen={isOpen}
          onClose={onClose}
        />
      </React.Fragment>
    </React.Fragment>
  );
};

const UserSettings = () => {
  const router = useRouter();

  const { clientId } = router.query;

  const { client } = clientService.handleGetEntepriseClientDetails(
    clientId as string
  );

  return (
    <React.Fragment>
      <Flex
        padding={2}
        height={"full"}
        direction={"column"}
        backgroundColor={"whiteAlpha.500"}
        borderRadius={"base"}
        gap={4}
      >
        <Flex
          justify={"center"}
          align={"center"}
          height={"full"}
          gap={4}
          width={"full"}
        >
          <FormControl>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              NOME DO CLIENTE
            </FormLabel>
            <Input
              cursor={"text!important"}
              defaultValue={client?.name}
              disabled
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              NOME DO FUNCIONÁRIO
            </FormLabel>
            <Input
              cursor={"text!important"}
              defaultValue={client?.employeeName}
              disabled
            />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel fontWeight={"semibold"} fontSize={"small"}>
            EMAIL
          </FormLabel>
          <Input
            cursor={"text!important"}
            defaultValue={client?.email}
            disabled
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={"semibold"} fontSize={"small"}>
            MORADA
          </FormLabel>
          <Input
            cursor={"text!important"}
            defaultValue={client?.address}
            disabled
          />
        </FormControl>
        <Flex justify={"center"} align={"center"} gap={4} width={"full"}>
          <FormControl>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              TELEFONE GERAL
            </FormLabel>
            <Input
              cursor={"text!important"}
              defaultValue={formatString(client?.generalPhoneNumber)}
              disabled
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              TELEFONE DIRETO
            </FormLabel>
            <Input
              cursor={"text!important"}
              defaultValue={formatString(client?.directPhoneNumber)}
              disabled
            />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel fontWeight={"semibold"} fontSize={"small"}>
            CONTRIBUINTE
          </FormLabel>
          <Input
            cursor={"text!important"}
            defaultValue={formatString(client?.taxNumber)}
            disabled
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={"semibold"} fontSize={"small"}>
            NOTAS
          </FormLabel>
          <Textarea
            cursor={"text!important"}
            defaultValue={client?.notes}
            disabled
          />
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
        <Button
          size={"sm"}
          shadow={"base"}
          rounded={"full"}
          backgroundColor={"blue.300"}
          _hover={{ backgroundColor: "blue.400", shadow: "md" }}
          variant={"solid"}
          onClick={() => router.push("/dashboard/accounting")}
        >
          <Flex gap={2} align={"flex-end"}>
            <FontAwesomeIcon color={"white"} icon={faArrowLeft} />
            <Text fontWeight={"semibold"} textColor={"white"}>
              VOLTAR PARA CONTABILIDADE
            </Text>
          </Flex>
        </Button>
      </Flex>
    </React.Fragment>
  );
};

const InvoiceSettings = () => {
  const toast = useToast();

  const router = useRouter();

  const { id: invoiceId, clientId } = router.query;

  const { mutate } = clientService.handleGetEnterpriseInvoiceById(
    clientId as string,
    invoiceId as string
  );

  const {
    invoiceDetails,
    setSendEmails,
    setTimeFrame,
    setDate,
    setDayOfWeek,
    setTotal,
    setStatus,
  } = useUpdateInvoiceDetails();

  const { register, handleSubmit, setValue, watch } =
    useSubmitForm<UpdateEnterpriseInvoiceRequest>(
      updateEnterpriseInvoiceSchema
    );

  const { files, setFiles } = useFiles();

  const handleSubmitForm = async () => {
    const newData = watch();

    newData.file =
      files.length > 0
        ? files[0]
        : new File([invoiceDetails.fileUrl], invoiceDetails.fileName as string);

    newData.dayOfWeek = newData.dayOfWeek || Number(invoiceDetails.dayOfWeek);

    await clientService
      .handleUpdateEnterpriseInvoice(
        clientId as string,
        invoiceId as string,
        newData
      )
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "FACTURA ATUALIZADA COM SUCESSO!",
          status: "success",
        });
        mutate();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO ATUALIZAR A FATURA! POR FAVOR TENTE NOVAMENTE!, SE O ERRO PERSISTIR, POR FAVOR CONTACTE O ADMINISTRADOR DO SISTEMA!",
          status: "error",
        });
      });
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "weekDays",
    defaultValue: invoiceDetails.dayOfWeek || "0",
    onChange: (e) => setDayOfWeek(e),
  });

  const group = getRootProps();

  return (
    <form style={{ height: "100%" }} onSubmit={handleSubmit(handleSubmitForm)}>
      <React.Fragment>
        <Flex
          height={"full"}
          direction={"column"}
          justify={"flex-start"}
          backgroundColor={"whiteAlpha.500"}
          padding={2}
          borderRadius={"base"}
          shadow={"md"}
          gap={4}
        >
          <FormControl>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              DATA
            </FormLabel>
            <Input
              {...register("date")}
              defaultValue={
                invoiceDetails?.date && invoiceDetails?.date.toString()
              }
              onChange={(e) => setDate(e.target.value)}
              type="datetime-local"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              ESTADO DA FATURA
            </FormLabel>
            <Select
              {...register("status")}
              defaultValue={invoiceDetails?.status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="0">PAGO</option>
              <option value="1">PAGAMENTO EM FALTA</option>
            </Select>
          </FormControl>
          <FormControl>
            <Checkbox
              {...register("sendEmails")}
              defaultChecked={invoiceDetails?.sendEmails}
              onChange={(e) => setSendEmails(e.target.checked)}
            >
              <Text fontWeight={"semibold"} fontSize={"small"}>
                DESEJA ENVIAR EMAILS?
              </Text>
            </Checkbox>
          </FormControl>
          {invoiceDetails?.sendEmails && (
            <React.Fragment>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  PERIODICIDADE DO ENVIO
                </FormLabel>
                <Select
                  {...register("timeFrame")}
                  defaultValue={
                    invoiceDetails?.timeFrame &&
                    invoiceDetails?.timeFrame.toString()
                  }
                  onChange={(e) => setTimeFrame(e.target.value)}
                >
                  <option value="0">DIARIAMENTE</option>
                  <option value="1">SEMANALMENTE</option>
                  <option value="2">MENSALMENTE</option>
                </Select>
              </FormControl>
              {invoiceDetails?.timeFrame &&
                invoiceDetails?.timeFrame.toString() !== "0" && (
                  <FormControl>
                    <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                      DIA DA SEMANA
                    </FormLabel>
                    <HStack {...group}>
                      {weekDays.map((weekDay) => {
                        const radio = getRadioProps({
                          value: weekDay.value,
                        });
                        return (
                          <RadioCard
                            key={weekDay.value}
                            {...radio}
                            register={{ ...register("dayOfWeek") }}
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
                {...register("total")}
                defaultValue={
                  invoiceDetails?.total && invoiceDetails?.total.toString()
                }
                onChange={(e) => setTotal(e.target.value)}
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
          <FormControl>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              FICHEIRO
            </FormLabel>
            <FileUploadVariant
              multiple={false}
              handleGetFiles={(files) => {
                setValue("file", files[0]);
                setFiles([files[0]]);
              }}
            />
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
          <Button
            type={"submit"}
            size={"sm"}
            rounded={"full"}
            shadow={"base"}
            backgroundColor={"green.300"}
            _hover={{ backgroundColor: "green.400", shadow: "md" }}
          >
            <Flex gap={2} align={"center"}>
              <Text fontWeight={"semibold"} textColor={"white"}>
                ATUALIZAR FATURA
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
            onClick={() => router.push("/dashboard/accounting")}
          >
            <Flex gap={2} align={"flex-end"}>
              <FontAwesomeIcon color={"white"} icon={faArrowLeft} />
              <Text fontWeight={"semibold"} textColor={"white"}>
                VOLTAR PARA CONTABILIDADE
              </Text>
            </Flex>
          </Button>
        </Flex>
      </React.Fragment>
    </form>
  );
};
