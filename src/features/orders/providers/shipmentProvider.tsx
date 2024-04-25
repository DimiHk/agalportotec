import React, { useState, createContext, useContext } from "react";

type ShipmentContextType = {
  shipmentDetails: any;
  handleSetShipmentDetails: (shipmentDetails: any) => void;
  handleResetShipment: () => void;
};

export const ShipmentContext = createContext<ShipmentContextType | undefined>(
  undefined
);

export default function ShipmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shipmentDetails, setShipmentDetails] = useState<undefined | any>();

  const handleResetShipment = () => {
    setShipmentDetails(undefined);
  };

  return (
    <ShipmentContext.Provider
      value={{
        shipmentDetails,
        handleSetShipmentDetails: setShipmentDetails,
        handleResetShipment,
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
}

export const useShipment = () => {
  const context = useContext(ShipmentContext);

  if (context === undefined) {
    throw new Error("useFormSteps must be used within a StepsProvider");
  }

  return context;
};
