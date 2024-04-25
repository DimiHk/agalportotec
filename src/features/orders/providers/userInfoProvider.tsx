import { EnterpriseClientModel, OrderPrivateClients } from "@/models";
import React, { useState, createContext, useContext } from "react";

type SelectedUserContextType = {
  selectedUserInfo: OrderPrivateClients | EnterpriseClientModel | undefined;
  handleSetUserInfo: (
    user: OrderPrivateClients | EnterpriseClientModel
  ) => void;
  handleResetUserInfo: () => void;
};

export const SelectedUserContext = createContext<
  SelectedUserContextType | undefined
>(undefined);

export default function SelectedUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedUserInfo, setSelectedUserInfo] = useState<
    OrderPrivateClients | EnterpriseClientModel | undefined
  >();

  const handleSetUserInfo = (
    user: OrderPrivateClients | EnterpriseClientModel
  ) => {
    setSelectedUserInfo((oldUser) => {
      const newUser = { ...oldUser, ...user };
      return newUser;
    });
  };

  const handleResetUserInfo = () => {
    setSelectedUserInfo(undefined);
  };

  return (
    <SelectedUserContext.Provider
      value={{
        selectedUserInfo,
        handleSetUserInfo,
        handleResetUserInfo,
      }}
    >
      {children}
    </SelectedUserContext.Provider>
  );
}

export const useSelectedUser = () => {
  const context = useContext(SelectedUserContext);

  if (context === undefined) {
    throw new Error("useFormSteps must be used within a StepsProvider");
  }

  return context;
};
