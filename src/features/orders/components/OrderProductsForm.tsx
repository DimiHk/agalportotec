import { useSubmitForm } from "@/hooks";
import { useFormData, useFormSteps } from "@/providers";
import { createPrivateClientOrderOrderPartsSchema } from "@/schemas";
import React, { useMemo } from "react";
import { orderProductsColumns } from "../columns";
import { useOrderParts } from "../providers/orderPartsProvider";
import { Grid } from "@/components/components";
import { StockSearch } from "./StockSearch";
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
} from "@chakra-ui/react";
import { ordersService } from "@/services";

export const OrderProductsForm = () => {
  const { orderDate, orderParts, handleAddOrderPart, handleSetOrderDate } =
    useOrderParts();

  const { nextOrderNumber } = ordersService.handleGetOrders();

  const { data, setFormValues } = useFormData();

  const { handleNextForm, handlePreviousForm } = useFormSteps();

  const { register, handleSubmit, errors } = useSubmitForm(
    createPrivateClientOrderOrderPartsSchema
  );

  const handleNextFormSubmit = () => {
    setFormValues({ orderParts: orderParts, date: orderDate });
    handleNextForm();
  };

  const totalPriceFromProducts = useMemo(() => {
    if (!orderParts) return 0;
    return orderParts.reduce((accumulator, object) => {
      return accumulator + object.price;
    }, 0);
  }, [orderParts]);

  const priceWithIva = useMemo(() => {
    if (totalPriceFromProducts) {
      const iva = totalPriceFromProducts * 0.23;
      return totalPriceFromProducts + iva;
    }
    return 0;
  }, [totalPriceFromProducts]);

  return (
    <React.Fragment>
      <ModalHeader>
        <Flex gap={4} align={"center"}>
          <Text fontWeight={"bold"}>CRIAR ENCOMENDA</Text>
          <Badge shadow={"base"} colorScheme="blue">
            <Text padding={1} fontSize={"xs"} fontWeight={"semibold"}>
              {2 + " / " + 5}
            </Text>
          </Badge>
        </Flex>
        <Text fontSize={"md"} textColor={"gray.600"} fontWeight={"semibold"}>
          PRODUTOS DA ENCOMENDA
        </Text>
      </ModalHeader>
      <ModalBody>
        <Flex direction={"column"} width={"full"} gap={2}>
          <Flex width={"full"} gap={4}>
            <FormControl>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                NR DA ENCOMENDA
              </FormLabel>
              <Input defaultValue={nextOrderNumber} disabled />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={"semibold"} fontSize={"small"}>
                DATA E HORA
              </FormLabel>
              <Input
                defaultValue={orderDate}
                onChange={(e) => handleSetOrderDate(e.target.value)}
                type={"datetime-local"}
              />
            </FormControl>
          </Flex>
          <Divider marginTop={2} marginBottom={2} color={"black"} />
          <StockSearch />
          <form
            onSubmit={handleSubmit((orderPart) =>
              handleAddOrderPart({
                name: orderPart.name,
                reference: orderPart.reference,
                price: orderPart.price,
              })
            )}
          >
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
                  <Input {...register("name")} />
                </FormControl>
                <Button rounded={"full"} type="submit" colorScheme="blue">
                  <Text color={"white"} fontSize={"small"}>
                    ADICIONAR
                  </Text>
                </Button>
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
                  <Input {...register("reference")} />
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
              </Flex>
            </Flex>
          </form>

          <Divider marginTop={2} marginBottom={2} color={"black"} />
          <Flex width={"full"} gap={4} align={"center"} justify={"end"}>
            <Badge colorScheme="blue">
              <Text fontSize={"small"}>
                {"TOTAL LIQUIDOS = " + totalPriceFromProducts.toFixed(2) + " €"}
              </Text>
            </Badge>
            <Badge colorScheme="blue">
              <Text fontSize={"small"}>
                {"TOTAL COM IVA 23% = " + priceWithIva.toFixed(2) + " €"}
              </Text>
            </Badge>
          </Flex>
          <Box
            shadow={"base"}
            borderRadius={"base"}
            width={"full"}
            height={"sm"}
            marginTop={1}
          >
            <Grid
              sideBar={false}
              gridData={orderParts}
              columnDefs={orderProductsColumns}
            />
          </Box>
        </Flex>
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
            onClick={handleNextFormSubmit}
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
