import { Grid } from "@/components/components";
import { TabsMenu } from "@/components/components/Tab/TabsMenu";
import { Notes } from "@/components/components/Columns/Notes";
import {
  orderSupplierArticlesColumns,
  orderSupplierPartsColumns,
  orderSuppliersNotesHistoryColumns,
  orderSuppliersRemovedArticlesHistoryColumns,
  orderSuppliersRemovedPartsHistoryColumns,
  orderSuppliersStatusHistoryColumns,
} from "@/features/orders/columns";
import SupplierPartsProvider, {
  useSupplierParts,
} from "@/features/orders/providers/supplierPartsProvider";
import { useSubmitForm } from "@/hooks";
import {
  SupplierDetailsResponse,
  SupplierOrderDetailsResponse,
} from "@/models";
import {
  createSupplierDetailsSchema,
  createSupplierOrderArticlesSchema,
  createSupplierOrderPartsSchema,
} from "@/schemas";
import { ordersService, supplierService } from "@/services";
import {
  Flex,
  Divider,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  useToast,
  Box,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  faFileCirclePlus,
  faArrowLeft,
  faCheckCircle,
  faBoxCheck,
  faHand,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { SuppliersOrderStatus } from "@/components/components/Columns/SuppliersOrderStatus";
import { KeyedMutator } from "swr";
import FormProvider, { useFormData } from "@/providers/multiFormProvider";

const tabs = [
  {
    name: "FORNECEDOR",
  },
  {
    name: "PEÇAS",
  },
  {
    name: "ARTIGOS",
  },
  {
    name: "DEFINIÇÕES",
  },
  {
    name: "HISTÓRICO",
  },
];

export const SupplierOrderDetails = () => {
  const [currentTab, setCurrentTab] = useState("FORNECEDOR");

  const router = useRouter();

  const { id: orderId, supplierId } = router.query;

  const { supplierDetails } = supplierService.handleGetSupplier(
    supplierId as string
  );

  const { orderDetails, mutate } = ordersService.handleGetSupplierOrderDetails(
    orderId as string,
    supplierId as string
  );

  return (
    <SupplierPartsProvider>
      <FormProvider>
        <React.Fragment>
          <React.Fragment>
            <Flex justify={"flex-start"} align={"center"} gap={2.5}>
              <Text
                fontSize={"xl"}
                textColor={"gray.700"}
                fontWeight={"semibold"}
              >
                DETALHE DA ENCOMENDA
              </Text>
              <SuppliersOrderStatus
                type={orderDetails?.status.toString() || ""}
              />
            </Flex>
            <Flex align={"center"} gap={2}>
              <TabsMenu
                tabs={tabs}
                currentTab={currentTab}
                handleChangeTab={setCurrentTab}
              />
            </Flex>
          </React.Fragment>
          <Divider marginTop={2} marginBottom={2} opacity={"75%"} />
          {supplierDetails && orderDetails && (
            <MainContainer
              currentTab={currentTab}
              supplierDetails={supplierDetails}
              orderDetails={orderDetails}
              mutate={mutate}
            />
          )}
        </React.Fragment>
      </FormProvider>
    </SupplierPartsProvider>
  );
};

const MainContainer = ({
  currentTab,
  orderDetails,
  supplierDetails,
  mutate,
}: {
  currentTab: string;
  orderDetails: SupplierOrderDetailsResponse;
  supplierDetails: SupplierDetailsResponse;
  mutate: KeyedMutator<SupplierOrderDetailsResponse>;
}) => {
  const { articles, parts, handleAddArticles, handleAddOrderParts } =
    useSupplierParts();

  const detailCellRenderer = useMemo(() => {
    return Notes;
  }, []);

  useEffect(() => {
    handleAddArticles(orderDetails.articles);
    handleAddOrderParts(orderDetails.parts);
  }, []);

  return (
    <React.Fragment>
      {currentTab === "FORNECEDOR" && (
        <form style={{ height: "100%" }}>
          <Flex direction={"column"} gap={4} height={"full"}>
            <Flex justify={"center"} align={"center"} gap={4}>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOME DA EMPRESA
                </FormLabel>
                <Input
                  type={"text"}
                  defaultValue={supplierDetails?.companyName}
                  disabled
                  cursor={"text!important"}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  NOME DO FORNECEDOR
                </FormLabel>
                <Input
                  type={"text"}
                  defaultValue={supplierDetails?.name}
                  disabled
                  cursor={"text!important"}
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
                  defaultValue={supplierDetails?.email}
                  disabled
                  cursor={"text!important"}
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
                  defaultValue={supplierDetails?.address}
                  disabled
                  cursor={"text!important"}
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
                  defaultValue={supplierDetails?.generalPhoneNumber}
                  disabled
                  cursor={"text!important"}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                  TELEFONE DIRETO
                </FormLabel>
                <Input
                  type={"text"}
                  disabled
                  defaultValue={supplierDetails?.directPhoneNumber}
                  cursor={"text!important"}
                />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                CONTRIBUINTE
              </FormLabel>
              <Input
                type={"text"}
                defaultValue={supplierDetails?.taxNumber}
                disabled
                cursor={"text!important"}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                NOTAS
              </FormLabel>
              <Textarea
                textColor={"black"}
                defaultValue={supplierDetails?.notes}
                disabled
                cursor={"text!important"}
              />
            </FormControl>
          </Flex>
          <Footer mutate={mutate} isInvisible />
        </form>
      )}
      {currentTab === "PEÇAS" && (
        <Box height={"full"}>
          <Flex direction={"column"} gap={4} height={"full"}>
            <Tabs size={"sm"} variant="enclosed" height={"full"}>
              <TabList>
                <Tab>PEÇAS</Tab>
                <Tab>ADICIONAR PEÇA</Tab>
              </TabList>
              <TabPanels height={"full"}>
                <TabPanel height={"full"}>
                  <Grid
                    gridData={parts}
                    columnDefs={orderSupplierPartsColumns}
                    detailCellRenderer={detailCellRenderer}
                  />
                  <Footer mutate={mutate} />
                </TabPanel>
                <TabPanel height={"full"}>
                  <PartsForm />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Box>
      )}
      {currentTab === "ARTIGOS" && (
        <Box height={"full"}>
          <Flex direction={"column"} gap={4} height={"full"}>
            <Tabs size={"sm"} variant="enclosed" height={"full"}>
              <TabList>
                <Tab>ARTIGOS</Tab>
                <Tab>ADICIONAR ARTIGO</Tab>
              </TabList>
              <TabPanels height={"full"}>
                <TabPanel height={"full"}>
                  <Grid
                    gridData={articles}
                    columnDefs={orderSupplierArticlesColumns}
                    detailCellRenderer={detailCellRenderer}
                  />
                  <Footer mutate={mutate} />
                </TabPanel>
                <TabPanel height={"full"}>
                  <ArticlesForm />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Box>
      )}
      {currentTab === "DEFINIÇÕES" && <Settings mutate={mutate} />}
      {currentTab === "HISTÓRICO" && (
        <Tabs size={"sm"} variant="enclosed" height={"100%"} mb={4}>
          <TabList>
            <Tab>HISTÓRICO DE NOTAS</Tab>
            <Tab>HISTÓRICO DE STATUS</Tab>
            <Tab>HISTÓRICO DE PARTES REMOVIDAS</Tab>
            <Tab>HISTÓRICO DE ARTIGOS REMOVIDOS</Tab>
          </TabList>
          <TabPanels height={"full"}>
            <TabPanel height={"full"}>
              <Grid
                gridData={orderDetails?.histories.notesHistory}
                columnDefs={orderSuppliersNotesHistoryColumns}
              />
            </TabPanel>
            <TabPanel height={"full"}>
              <Grid
                gridData={orderDetails?.histories.statusHistory}
                columnDefs={orderSuppliersStatusHistoryColumns}
              />
            </TabPanel>
            <TabPanel height={"full"}>
              <Grid
                gridData={orderDetails?.histories.removedPartsHistory}
                columnDefs={orderSuppliersRemovedPartsHistoryColumns}
              />
            </TabPanel>
            <TabPanel height={"full"}>
              <Grid
                gridData={orderDetails?.histories.removedArticlesHistory}
                columnDefs={orderSuppliersRemovedArticlesHistoryColumns}
              />
            </TabPanel>
          </TabPanels>
          <Footer mutate={mutate} isInvisible />
        </Tabs>
      )}
    </React.Fragment>
  );
};

const Settings = ({
  mutate,
}: {
  mutate: KeyedMutator<SupplierOrderDetailsResponse>;
}) => {
  const router = useRouter();

  const { id: orderId, supplierId } = router.query;

  const { orderDetails } = ordersService.handleGetSupplierOrderDetails(
    orderId as string,
    supplierId as string
  );

  const { register, handleSubmit, errors } = useSubmitForm(
    createSupplierDetailsSchema
  );

  const { articles, parts } = useSupplierParts();

  const { setFormValues } = useFormData();

  const toast = useToast();

  const handleUpdateOrder = async (requestData: any) => {
    setFormValues(requestData);
    await ordersService
      .handleUpdateSupplierOrder(supplierId as string, orderId as string, {
        deliveryNumber: requestData.deliveryNumber,
        notes: requestData.notes,
        newArticles: articles && articles.filter((article) => article.isNew),
        newParts: parts && parts.filter((part) => part.isNew),
      })
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "ENCOMENDA FOI ATUALIZADO COM SUCESSO",
          status: "success",
        });
        mutate();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO ATUALIZAR A ENCOMENDA, POR FAVOR VALIDA OS DADOS E TENTA NOVAMENTE!, SE O ERRO PERSISTIR CONTACTA O ADMINISTRADOR DO SISTEMA!",
          status: "error",
        });
      });
  };

  return (
    <form style={{ height: "100%" }} onSubmit={handleSubmit(handleUpdateOrder)}>
      <Flex direction={"column"} gap={4} height={"full"}>
        <FormControl isInvalid={!!errors.deliveryNumber?.message}>
          <FormLabel fontWeight={"semibold"} fontSize={"small"}>
            NUMERO DE ENTREGA
            <FormErrorMessage>
              <Text fontWeight={"semibold"} fontSize={"xs"}>
                {errors.deliveryNumber?.message?.toString().toLocaleUpperCase()}
              </Text>
            </FormErrorMessage>
          </FormLabel>
          <Input
            defaultValue={orderDetails?.deliveryNumber}
            {...register("deliveryNumber")}
            type={"text"}
            onChange={(e) => setFormValues({ deliveryNumber: e.target.value })}
          />
        </FormControl>
        <FormControl isInvalid={!!errors.date?.message}>
          <FormLabel fontWeight={"semibold"} fontSize={"small"}>
            DATA
            <FormErrorMessage>
              <Text fontWeight={"semibold"} fontSize={"xs"}>
                {errors.date?.message?.toString().toLocaleUpperCase()}
              </Text>
            </FormErrorMessage>
          </FormLabel>
          <Input
            disabled
            defaultValue={orderDetails?.date}
            {...register("date")}
            type={"datetime-local"}
          />
        </FormControl>
        <FormControl isInvalid={!!errors.notes?.message}>
          <FormLabel fontWeight={"semibold"} fontSize={"small"}>
            NOTAS
            <FormErrorMessage>
              <Text fontWeight={"semibold"} fontSize={"xs"}>
                {errors.notes?.message?.toString().toLocaleUpperCase()}
              </Text>
            </FormErrorMessage>
          </FormLabel>
          <Textarea
            defaultValue={orderDetails?.notes}
            {...register("notes")}
            onChange={(e) => setFormValues({ notes: e.target.value })}
          />
        </FormControl>
      </Flex>
      <Footer useHandleUpdateOrder={false} mutate={mutate} />
    </form>
  );
};

const PartsForm = () => {
  const { register, handleSubmit, errors, reset } = useSubmitForm(
    createSupplierOrderPartsSchema
  );

  const { handleAddOrderPart } = useSupplierParts();

  const handleSubmitPart = (orderPart: any) => {
    handleAddOrderPart({
      name: orderPart.name,
      price: orderPart.price,
      referenceNumber: orderPart.referenceNumber,
      reference: orderPart.referenceNumber,
      quantity: orderPart.quantity,
      notes: orderPart.notes,
      isNew: true,
      isRemoved: false,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitPart)}>
      <Flex direction={"column"} width={"full"} gap={2}>
        <Flex width={"full"} gap={4} align={"flex-end"} justify={"center"}>
          <FormControl isInvalid={!!errors.name?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              NOME DA PEÇA
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.name?.message?.toString().toLocaleUpperCase()}
                </Text>
              </FormErrorMessage>
            </FormLabel>
            <Input {...register("name")} />
          </FormControl>
          <Button rounded={"full"} type="submit" colorScheme="blue">
            <Text color={"white"} fontSize={"small"}>
              ADICIONAR
            </Text>
          </Button>
        </Flex>
        <Flex width={"full"} gap={4} align={"flex-end"} justify={"center"}>
          <FormControl isInvalid={!!errors.referenceNumber?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              REFERENÇIA
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.referenceNumber?.message
                    ?.toString()
                    .toLocaleUpperCase()}
                </Text>
              </FormErrorMessage>
            </FormLabel>
            <Input {...register("referenceNumber")} />
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
            <Input {...register("price", { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.quantity?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              QUANTIDADE
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.quantity?.message?.toString().toLocaleUpperCase()}
                </Text>
              </FormErrorMessage>
            </FormLabel>
            <Input {...register("quantity", { valueAsNumber: true })} />
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
          <Textarea {...register("notes")} />
        </FormControl>
      </Flex>
    </form>
  );
};

const ArticlesForm = () => {
  const { register, handleSubmit, errors, reset } = useSubmitForm(
    createSupplierOrderArticlesSchema
  );

  const { handleAddArticle } = useSupplierParts();

  const handleSubmitArticle = (orderPart: any) => {
    handleAddArticle({
      name: orderPart.name,
      price: orderPart.price,
      quantity: orderPart.quantity,
      notes: orderPart.notes,
      isNew: true,
      isRemoved: false,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitArticle)}>
      <Flex direction={"column"} width={"full"} gap={2}>
        <Flex width={"full"} gap={4} align={"flex-end"} justify={"center"}>
          <FormControl isInvalid={!!errors.name?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              NOME DO ARTIGO
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.name?.message?.toString().toLocaleUpperCase()}
                </Text>
              </FormErrorMessage>
            </FormLabel>
            <Input {...register("name")} />
          </FormControl>
          <Button rounded={"full"} type="submit" colorScheme="blue">
            <Text color={"white"} fontSize={"small"}>
              ADICIONAR
            </Text>
          </Button>
        </Flex>
        <Flex width={"full"} gap={4} align={"flex-end"} justify={"center"}>
          <FormControl isInvalid={!!errors.price?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              PREÇO
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.price?.message?.toString().toLocaleUpperCase()}
                </Text>
              </FormErrorMessage>
            </FormLabel>
            <Input {...register("price", { valueAsNumber: true })} />
          </FormControl>
          <FormControl isInvalid={!!errors.quantity?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              QUANTIDADE
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.quantity?.message?.toString().toLocaleUpperCase()}
                </Text>
              </FormErrorMessage>
            </FormLabel>
            <Input {...register("quantity", { valueAsNumber: true })} />
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
          <Textarea {...register("notes")} />
        </FormControl>
      </Flex>
    </form>
  );
};

const Footer = ({
  isInvisible,
  mutate,
  useHandleUpdateOrder = true,
}: {
  isInvisible?: boolean;
  mutate: KeyedMutator<SupplierOrderDetailsResponse>;
  useHandleUpdateOrder?: boolean;
}) => {
  const router = useRouter();

  const { id: orderId, supplierId } = router.query;

  const toast = useToast();

  const { data } = useFormData();

  const { orderDetails } = ordersService.handleGetSupplierOrderDetails(
    orderId as string,
    supplierId as string
  );

  const handleUpdateStatus = (statusNumber: number) => {
    ordersService
      .handleUpdateSupplierOrderStatus(
        supplierId as string,
        orderId as string,
        statusNumber
      )
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "O STATUS DA ENCOMENDA FOI ATUALIZADO COM SUCESSO",
          status: "success",
        });
        mutate();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description: error.message,
          status: "error",
        });
      });
  };

  const { articles, parts } = useSupplierParts();

  const handleUpdateOrder = async () => {
    await ordersService
      .handleUpdateSupplierOrder(supplierId as string, orderId as string, {
        deliveryNumber: /* data.deliveryNumber
          ? data.deliveryNumber
          : orderDetails?.deliveryNumber */ undefined,
        notes: data.notes ? data.notes : orderDetails?.notes,
        newArticles: articles && articles.filter((article) => article.isNew),
        newParts: parts && parts.filter((part) => part.isNew),
      })
      .then(() => {
        toast({
          title: "SUCESSO",
          description: "ENCOMENDA FOI ATUALIZADO COM SUCESSO",
          status: "success",
        });
        mutate();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO ATUALIZAR A ENCOMENDA, POR FAVOR VALIDA OS DADOS E TENTA NOVAMENTE!, SE O ERRO PERSISTIR CONTACTA O ADMINISTRADOR DO SISTEMA!",
          status: "error",
        });
      });
  };

  return (
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
      <Flex justify={"flex-start"} width={"full"} gap={2}>
        {!isInvisible && (
          <Button
            size={"sm"}
            type="submit"
            onClick={() => useHandleUpdateOrder && handleUpdateOrder()}
            rounded={"full"}
            shadow={"base"}
            backgroundColor={"green.300"}
            _hover={{ backgroundColor: "green.400", shadow: "md" }}
          >
            <Flex gap={2} align={"center"}>
              <Text fontWeight={"semibold"} textColor={"white"}>
                ATUALIZAR ENCOMENDA
              </Text>
              <FontAwesomeIcon color={"white"} icon={faFileCirclePlus} />
            </Flex>
          </Button>
        )}
        <Button
          size={"sm"}
          shadow={"base"}
          rounded={"full"}
          backgroundColor={"blue.300"}
          _hover={{ backgroundColor: "blue.400", shadow: "md" }}
          variant={"solid"}
          onClick={() => router.back()}
        >
          <Flex gap={2} align={"flex-end"}>
            <FontAwesomeIcon color={"white"} icon={faArrowLeft} />
            <Text fontWeight={"semibold"} textColor={"white"}>
              VOLTAR PARA ENCOMENDAS
            </Text>
          </Flex>
        </Button>
      </Flex>
      <Flex justify={"flex-end"} width={"full"} gap={2}>
        <Button
          size={"sm"}
          shadow={"base"}
          rounded={"full"}
          backgroundColor={"green.300"}
          _hover={{ backgroundColor: "green.400", shadow: "md" }}
          variant={"solid"}
          onClick={() => handleUpdateStatus(2)}
        >
          <Flex gap={2} align={"center"}>
            <Text fontWeight={"semibold"} textColor={"white"}>
              RECEBIDA
            </Text>
            <FontAwesomeIcon color={"white"} icon={faCheckCircle} />
          </Flex>
        </Button>
        <Button
          size={"sm"}
          shadow={"base"}
          rounded={"full"}
          backgroundColor={"teal.300"}
          _hover={{ backgroundColor: "teal.400", shadow: "md" }}
          variant={"solid"}
          onClick={() => handleUpdateStatus(0)}
        >
          <Flex gap={2} align={"center"}>
            <Text fontWeight={"semibold"} textColor={"white"}>
              ENVIADA
            </Text>
            <FontAwesomeIcon color={"white"} icon={faBoxCheck} />
          </Flex>
        </Button>
        <Button
          size={"sm"}
          shadow={"base"}
          rounded={"full"}
          backgroundColor={"red.300"}
          _hover={{ backgroundColor: "red.400", shadow: "md" }}
          variant={"solid"}
          onClick={() => handleUpdateStatus(1)}
        >
          <Flex gap={2} align={"center"}>
            <Text fontWeight={"semibold"} textColor={"white"}>
              EM TRANSITO
            </Text>
            <FontAwesomeIcon color={"white"} icon={faHand} />
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};
