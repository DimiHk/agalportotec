import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useSubmitForm = <RequestModel extends FieldValues>(
  schema: any
) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, defaultValues },
    reset,
    setValue,
    control,
    watch,
  } = useForm<RequestModel>({
    resolver: yupResolver(schema),
  });

  return {
    register,
    handleSubmit,
    errors,
    getValues,
    setValue,
    defaultValues,
    reset,
    control,
    watch,
  };
};
