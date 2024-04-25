import { PartsModel } from "@/models";
import { useToast } from "@chakra-ui/react";
import React, { useState, createContext, useContext, useEffect } from "react";

type UpdateOrdersContextType = {
  orderParts: PartsModel[] | undefined;
  setOrderParts: (value: React.SetStateAction<PartsModel[]>) => void;
  setPaymentMethod: (value: React.SetStateAction<string>) => void;
  setShipmentMethod: (value: React.SetStateAction<string>) => void;
  paymentMethod: string | undefined;
  shipmentMethod: string | undefined;
  handleAddOrderPart: (orderPart: PartsModel) => void;
  handleUpdatePart: (orderPart: PartsModel, orderPartIndex: number) => void;
  handleRemoveOrderPart: (orderPartReference: string) => void;
};

export const UpdateOrderDetailsContext = createContext<
  UpdateOrdersContextType | undefined
>(undefined);

export default function UpdateOrderDetailsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orderParts, setOrderParts] = useState<PartsModel[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [shipmentMethod, setShipmentMethod] = useState<string>("");
  const toast = useToast();

  const isOrderPartAlreadyAdded = (orderPart: PartsModel) => {
    const reference = orderPart.reference;
    const containsOrder = orderParts.find((o) => o.reference === reference);
    return containsOrder;
  };

  const handleAddOrderPart = (orderPart: PartsModel) => {
    setOrderParts((oldOrders) => {
      if (!isOrderPartAlreadyAdded(orderPart)) {
        oldOrders = [...oldOrders, orderPart];
        return oldOrders;
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

  return (
    <UpdateOrderDetailsContext.Provider
      value={{
        orderParts,
        setOrderParts,
        paymentMethod,
        setPaymentMethod,
        shipmentMethod,
        setShipmentMethod,
        handleAddOrderPart,
        handleRemoveOrderPart,
        handleUpdatePart,
      }}
    >
      {children}
    </UpdateOrderDetailsContext.Provider>
  );
}

export const useUpdateOrderDetails = () => {
  const context = useContext(UpdateOrderDetailsContext);

  if (context === undefined) {
    throw new Error(
      "you need to use UpdateOrderDetailsProvider arround this component"
    );
  }

  return context;
};
