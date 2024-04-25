import { postRequest, putRequest } from "@/lib";
import useSWR from "swr";
import {
  CreateSupplierRequest,
  SupplierDetailsResponse,
  SuppliersResponse,
  UpdateSupplierRequest,
} from "@/models";

export const useSuppliers = () => {
  const { data: suppliers, mutate } = useSWR<SuppliersResponse>("suppliers");
  return { suppliers, mutate };
};

export const handleCreateSupplier = async (
  requestData: CreateSupplierRequest
) => {
  const url = `suppliers/create`;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  await postRequest(url, { ...requestData }, config);
};

export const useGetSupplier = (id: string) => {
  const { data: supplierDetails, mutate } = useSWR<SupplierDetailsResponse>(
    `suppliers/${id}`
  );
  return { supplierDetails, mutate };
};

export const handleUpdateSupplier = async (
  requestData: UpdateSupplierRequest,
  id: string
) => {
  const url = `suppliers/${id}/update`;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  await putRequest(url, { ...requestData }, config);
};

export const supplierService = {
  handleCreateSupplier,
  handleGetSuppliers: useSuppliers,
  handleGetSupplier: useGetSupplier,
  handleUpdateSupplier,
};
