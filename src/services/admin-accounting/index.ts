import { postRequest, putRequest } from "@/lib";
import {
  AccountingInvoicesResponse,
  CreateAccountingInvoiceRequest,
} from "@/models";
import useSWR from "swr";

export const useAdminInvoices = () => {
  const { data: invoices, mutate } =
    useSWR<AccountingInvoicesResponse[]>("accountingInvoices");
  return { invoices, mutate };
};

export const handleCreateInvoice = async (
  requestData: CreateAccountingInvoiceRequest
) => {
  await postRequest(`accountingInvoices/create`, requestData);
};

export const useAdminInvoicesDetails = (invoiceId: string) => {
  const { data: invoiceDetails, mutate } = useSWR<AccountingInvoicesResponse>(
    `accountingInvoices/${invoiceId}`
  );
  return { invoiceDetails, mutate };
};

export const handleUpdateInvoice = async (
  invoiceId: string,
  requestData: CreateAccountingInvoiceRequest
) => {
  await putRequest(`accountingInvoices/${invoiceId}/update`, requestData);
};

export const adminAccountingService = {
  handleGetInvoices: useAdminInvoices,
  handleCreateInvoice,
  handleGetInvoiceDetails: useAdminInvoicesDetails,
  handleUpdateInvoice,
};
