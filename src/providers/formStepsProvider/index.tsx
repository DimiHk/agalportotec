import React, { useState, createContext, useContext } from "react";

type FormStepsContextType = {
  currentFormIndex: number;
  handleNextForm: (nextIndex?: number) => void;
  handlePreviousForm: (preIndex?: number) => void;
  handleResetFormSteps: () => void;
};

export const FormStepsContext = createContext<FormStepsContextType | undefined>(
  undefined
);

export default function StepsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentFormIndex, setCurrentFormIndex] = useState<number>(1);

  const handleNextForm = (nextIndex?: number) => {
    setCurrentFormIndex((prevIndex) => prevIndex + (nextIndex ?? 1));
  };

  const handlePreviousForm = (preIndex?: number) => {
    setCurrentFormIndex((prevIndex) => prevIndex - (preIndex ?? 1));
  };

  const handleResetFormSteps = () => {
    setCurrentFormIndex((prevIndex) => (prevIndex = 1));
  };

  return (
    <FormStepsContext.Provider
      value={{
        currentFormIndex,
        handleNextForm,
        handlePreviousForm,
        handleResetFormSteps,
      }}
    >
      {children}
    </FormStepsContext.Provider>
  );
}

export const useFormSteps = () => {
  const context = useContext(FormStepsContext);

  if (context === undefined) {
    throw new Error("useFormSteps must be used within a StepsProvider");
  }

  return context;
};
