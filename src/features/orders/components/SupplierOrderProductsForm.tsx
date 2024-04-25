import { useSubmitForm } from "@/hooks";
import { useFormData, useFormSteps } from "@/providers";
import {
  createSupplierOrderArticlesSchema,
  createSupplierOrderPartsSchema,
} from "@/schemas";
import React, { useMemo } from "react";
import { Grid } from "@/components/components";
import {
  ModalHeader,
  Flex,
  Badge,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Button,
  ModalFooter,
  Text,
  Box,
  FormErrorMessage,
  Textarea,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useSupplierParts } from "../providers/supplierPartsProvider";
import {
  createSupplierArticlesColumns,
  createSupplierOrderPartsColumns,
} from "../columns";
import { Notes } from "@/components/components/Columns/Notes";

export const SupplierOrderProductsForm = () => {
  const { parts, articles } = useSupplierParts();

  const { handlePreviousForm, handleNextForm } = useFormSteps();

  const detailCellRenderer = useMemo(() => {
    return Notes;
  }, []);

  return (
    <React.Fragment>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>CRIAR ENCOMENDA</Text>
          <Badge shadow={"base"} colorScheme="blue">
            <Text padding={1} fontSize={"xs"} fontWeight={"semibold"}>
              {2 + " / " + 3}
            </Text>
          </Badge>
        </Flex>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          PEÇAS & ARTIGOS DA ENCOMENDA
        </Text>
      </ModalHeader>
      <ModalBody>
        <Tabs size={"sm"} variant="enclosed" height={"full"}>
          <TabList>
            <Tab>PEÇAS</Tab>
            <Tab>ARTIGOS</Tab>
          </TabList>
          <TabPanels height={"full"}>
            <TabPanel height={"full"}>
              <Flex direction={"column"} width={"full"} height={"full"} gap={2}>
                <PartsForm />
                <Box
                  shadow={"base"}
                  borderRadius={"base"}
                  width={"full"}
                  height={"sm"}
                  marginTop={1}
                >
                  <Grid
                    sideBar={false}
                    gridData={parts}
                    columnDefs={createSupplierOrderPartsColumns}
                    detailCellRenderer={detailCellRenderer}
                  />
                </Box>
                <Divider marginTop={2} marginBottom={2} color={"black"} />
              </Flex>
            </TabPanel>
            <TabPanel height={"full"}>
              <Flex direction={"column"} width={"full"} height={"full"} gap={2}>
                <ArticlesForm />
                <Box
                  shadow={"base"}
                  borderRadius={"base"}
                  width={"full"}
                  height={"sm"}
                  marginTop={1}
                >
                  <Grid
                    sideBar={false}
                    gridData={articles}
                    columnDefs={createSupplierArticlesColumns}
                    detailCellRenderer={detailCellRenderer}
                  />
                </Box>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalBody>
      <ModalFooter>
        <Flex width={"full"} justify={"center"} align={"center"} gap={4}>
          <Button
            rounded={"full"}
            onClick={() => handlePreviousForm()}
            width={"full"}
            colorScheme="cyan"
          >
            <Text color={"white"} fontSize={"small"}>
              VOLTAR
            </Text>
          </Button>
          <Button
            rounded={"full"}
            onClick={() => handleNextForm()}
            width={"full"}
            colorScheme="blue"
          >
            <Text color={"white"} fontSize={"small"}>
              SEGUINTE
            </Text>
          </Button>
        </Flex>
      </ModalFooter>
    </React.Fragment>
  );
};

const PartsForm = () => {
  const { register, handleSubmit, errors } = useSubmitForm(
    createSupplierOrderPartsSchema
  );

  const { handleAddOrderPart } = useSupplierParts();

  return (
    <form
      onSubmit={handleSubmit((orderPart) =>
        handleAddOrderPart({
          name: orderPart.name,
          price: orderPart.price,
          referenceNumber: orderPart.referenceNumber,
          quantity: orderPart.quantity,
          notes: orderPart.notes,
        })
      )}
    >
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
          <FormControl isInvalid={!!errors.reference?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              REFERENÇIA
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.reference?.message?.toString().toLocaleUpperCase()}
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
  const { register, handleSubmit, errors } = useSubmitForm(
    createSupplierOrderArticlesSchema
  );

  const { handleAddArticle } = useSupplierParts();

  return (
    <form
      onSubmit={handleSubmit((orderPart) =>
        handleAddArticle({
          name: orderPart.name,
          price: orderPart.price,
          quantity: orderPart.quantity,
          notes: orderPart.notes,
        })
      )}
    >
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
