import React, { useState, createContext, useContext } from "react";

type PaymentContextType = {
  shipmentMethod: string;
  paymentType: string;
  notes: string;
  handleSetShipmentMethod: (paymentType: string) => void;
  handleSetPaymentType: (deliveryMethod: string) => void;
  handleSetNotes: (notes: string) => void;
  handleResetPayment: () => void;
};

export const PaymentTypeContext = createContext<PaymentContextType | undefined>(
  undefined
);

export default function PaymentTypeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shipmentMethod, setShipmentMethod] = useState<"0" | "1" | string>("0");
  const [paymentType, setPaymentType] = useState<string>("");
  const [notes, setNotes] = useState("");

  const handleSetShipmentMethod = (paymentType: string) => {
    setShipmentMethod(paymentType);
  };

  const handleSetPaymentType = (deliveryMethod: string) => {
    setPaymentType(deliveryMethod);
  };

  const handleSetNotes = (notes: string) => {
    setNotes(notes);
  };

  const handleResetPayment = () => {
    setShipmentMethod("0");
    setPaymentType("");
    setNotes("");
  };

  return (
    <PaymentTypeContext.Provider
      value={{
        shipmentMethod,
        paymentType,
        notes,
        handleSetPaymentType,
        handleSetShipmentMethod,
        handleSetNotes,
        handleResetPayment,
      }}
    >
      {children}
    </PaymentTypeContext.Provider>
  );
}

export const usePayment = () => {
  const context = useContext(PaymentTypeContext);

  if (context === undefined) {
    throw new Error("useFormSteps must be used within a StepsProvider");
  }

  return context;
};
