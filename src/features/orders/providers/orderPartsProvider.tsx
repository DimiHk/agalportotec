import { PartsModel } from "@/models";
import { useToast } from "@chakra-ui/react";
import React, { useState, createContext, useContext } from "react";

type SelectedUserContextType = {
  orderParts: PartsModel[] | undefined;
  orderDate: string;
  handleAddOrderPart: (orderPart: PartsModel) => void;
  handleUpdateOrderParts: (orderParts: PartsModel[]) => void;
  handleRemoveOrderPart: (orderPartReference: string) => void;
  handleUpdatePart: (orderPart: PartsModel, orderPartIndex: number) => void;
  handleSetOrderDate: (date: string) => void;
  handleResetOrderParts: () => void;
};

export const OrderPartsContext = createContext<
  SelectedUserContextType | undefined
>(undefined);

export default function OrderPartsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orderDate, setOrderDate] = useState<string>("");

  const [orderParts, setOrderParts] = useState<PartsModel[]>([]);

  const toast = useToast();

  const isOrderPartAlreadyAdded = (orderPart: PartsModel) => {
    const reference = orderPart.reference;
    const containsOrder = orderParts.find((o) => o.reference === reference);
    return containsOrder;
  };

  const handleAddOrderPart = (orderPart: PartsModel) => {
    setOrderParts((oldOrders) => {
      if (!isOrderPartAlreadyAdded(orderPart)) {
        return [...oldOrders, orderPart];
      }
      toast({
        title: "ERRO",
        description:
          "HOUVE UM ERRO AO ADICIONAR A PEÇA, VERIFIQUE SE ELA JÁ NÃO FOI ADICIONADA ANTERIORMENTE OU SE A REFERENCIA DA PEÇA JÁ EXISTE NA LISTA!",
        status: "error",
      });
      return oldOrders;
    });
  };

  const handleUpdateOrderParts = (orderParts: PartsModel[]) => {
    setOrderParts(orderParts);
  };

  const handleRemoveOrderPart = (orderPartReference: string) => {
    setOrderParts((oldOrders) => {
      return oldOrders.filter((o) => o.reference !== orderPartReference);
    });
  };

  const handleUpdatePart = (orderPart: PartsModel, orderPartIndex: number) => {
    const isSameReference =
      orderParts[orderPartIndex].reference === orderPart.reference;
    if (!isSameReference && isOrderPartAlreadyAdded(orderPart)) {
      toast({
        title: "ERRO",
        description:
          "HOUVE UM ERRO AO ADICIONAR A PEÇA, VERIFIQUE SE ELA JÁ NÃO FOI ADICIONADA ANTERIORMENTE OU SE A REFERENCIA DA PEÇA JÁ EXISTE NA LISTA!",
        status: "error",
      });
    } else {
      setOrderParts((oldOrders) => {
        let newArr = [...oldOrders];
        newArr[orderPartIndex] = orderPart;
        return newArr;
      });
    }
  };

  const handleSetOrderDate = (date: string) => {
    setOrderDate(date);
  };

  const handleResetOrderParts = () => {
    setOrderDate("");
    setOrderParts([]);
  };

  return (
    <OrderPartsContext.Provider
      value={{
        orderDate,
        orderParts,
        handleAddOrderPart,
        handleUpdateOrderParts,
        handleRemoveOrderPart,
        handleUpdatePart,
        handleSetOrderDate,
        handleResetOrderParts,
      }}
    >
      {children}
    </OrderPartsContext.Provider>
  );
}

export const useOrderParts = () => {
  const context = useContext(OrderPartsContext);

  if (context === undefined) {
    throw new Error("useFormSteps must be used within a StepsProvider");
  }

  return context;
};
