import React, { useState, createContext, useContext } from "react";

type EmailSettingsContextType = {
  emailDate: string;
  isGoingToSend: boolean;
  handleSetEmailDate: (emailDate: string) => void;
  handleSetIsGoingToSend: (isGoingToSend: boolean) => void;
  handleResetEmailSettings: () => void;
};

export const EmailSettingsContext = createContext<
  EmailSettingsContextType | undefined
>(undefined);

export default function EmailSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [emailDate, setemailDate] = useState<string>("");
  const [isGoingToSend, setisGoingToSend] = useState<boolean>(false);

  const handleSetEmailDate = (emailDate: string) => {
    setemailDate(emailDate);
  };

  const handleSetIsGoingToSend = (isGoingToSend: boolean) => {
    setisGoingToSend(isGoingToSend);
  };

  const handleResetEmailSettings = () => {
    setemailDate("");
    setisGoingToSend(false);
  };

  return (
    <EmailSettingsContext.Provider
      value={{
        emailDate,
        isGoingToSend,
        handleSetEmailDate,
        handleSetIsGoingToSend,
        handleResetEmailSettings,
      }}
    >
      {children}
    </EmailSettingsContext.Provider>
  );
}

export const useEmailSettings = () => {
  const context = useContext(EmailSettingsContext);

  if (context === undefined) {
    throw new Error("useFormSteps must be used within a StepsProvider");
  }

  return context;
};
