import { useState, createContext, useContext } from "react";

export const FormContext = createContext<undefined | any>(undefined);

export default function FormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState({});

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  const handleResetFormValues = () => {
    setData({});
  };

  return (
    <FormContext.Provider
      value={{ data, setFormValues, handleResetFormValues }}
    >
      {children}
    </FormContext.Provider>
  );
}

export const useFormData = () => useContext(FormContext);
