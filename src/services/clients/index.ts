import { removeWhiteSpaces } from "@/helpers";
import { postRequest, putRequest } from "@/lib";
import {
  ClientsListResponse,
  CreateEnterpriseClientRequest,
  CreateInvoiceRequest,
  CreatePrivateClientRequest,
  EnterpriseClientModel,
  EnterpriseInvoiceResponse,
  InvoicesResponse,
  OrderPrivateClients,
  PrivateClientModel,
  PrivateInvoiceResponse,
  UpdateEnterpriseClientRequest,
  UpdateEnterpriseInvoiceRequest,
  UpdatePrivateClientRequest,
  UpdatePrivateInvoiceRequest,
} from "@/models";
import useSWR from "swr";

export const useClients = () => {
  const { data: clients, mutate } = useSWR<ClientsListResponse>("clients");
  return { ...clients, mutate };
};

export const useOrderPrivateClients = () => {
  const { data: clients, mutate } =
    useSWR<OrderPrivateClients[]>("clients/private");
  return { clients, mutate };
};

export const useOrderEnterpriseClients = () => {
  const { data: clients, mutate } =
    useSWR<OrderPrivateClients[]>("clients/enterprise");
  return { clients, mutate };
};

export const handleCreateEnterpriseClient = async (
  requestdata: CreateEnterpriseClientRequest
) => {
  const {
    name,
    email,
    taxNumber,
    address,
    notes,
    directPhoneNumber,
    employeeName,
    sendEmails,
    generalPhoneNumber,
    supplementaryEmail,
  } = requestdata;

  const newAddress =
    address +
    (requestdata.postalCode ? " " + requestdata.postalCode : "") +
    (requestdata.additionalAddress ? " " + requestdata.additionalAddress : "");

  await postRequest<CreateEnterpriseClientRequest, any>(
    "clients/enterprise/create",
    {
      name: name,
      email: email,
      employeeName: employeeName,
      taxNumber: removeWhiteSpaces(taxNumber),
      address: newAddress,
      directPhoneNumber: removeWhiteSpaces(directPhoneNumber),
      generalPhoneNumber: removeWhiteSpaces(generalPhoneNumber),
      notes: notes,
      sendEmails: sendEmails,
      supplementaryEmail: supplementaryEmail,
    }
  );
};

export const handleCreatePrivateClient = async (
  requestdata: CreatePrivateClientRequest
) => {
  const {
    name,
    email,
    taxNumber,
    address,
    notes,
    directPhoneNumber,
    sendEmails,
  } = requestdata;

  const newAddress =
    address +
    (requestdata.postalCode ? " " + requestdata.postalCode : "") +
    (requestdata.additionalAddress ? " " + requestdata.additionalAddress : "");

  await postRequest<CreatePrivateClientRequest, any>("clients/private/create", {
    name: name,
    email: email,
    taxNumber: removeWhiteSpaces(taxNumber),
    address: newAddress,
    directPhoneNumber: removeWhiteSpaces(directPhoneNumber),
    notes: notes,
    sendEmails: sendEmails,
  });
};

export const useGetEnterpriseClientById = (id: string) => {
  const { data: client, mutate } = useSWR<EnterpriseClientModel>(
    `clients/${id}/enterprise`
  );
  return { client, mutate };
};

export const useGetPrivateClientById = (id: string) => {
  const { data: client, mutate } = useSWR<PrivateClientModel>(
    `clients/${id}/private`
  );
  return { client, mutate };
};

export const handleUpdatePrivateClient = async (
  id: string,
  client: UpdatePrivateClientRequest
) => {
  const {
    name,
    email,
    taxNumber,
    address,
    notes,
    directPhoneNumber,
    sendEmails,
  } = client;
  await putRequest<UpdatePrivateClientRequest, any>(
    `clients/${id}/private/update`,
    {
      name: name,
      email: email,
      taxNumber: removeWhiteSpaces(taxNumber),
      address: address,
      directPhoneNumber: removeWhiteSpaces(directPhoneNumber),
      notes: notes,
      sendEmails: sendEmails,
    }
  );
};

export const handleUpdateEnterpriseClient = async (
  id: string,
  client: UpdateEnterpriseClientRequest
) => {
  const {
    name,
    email,
    taxNumber,
    address,
    notes,
    directPhoneNumber,
    employeeName,
    sendEmails,
    supplementaryEmail,
  } = client;
  await putRequest<UpdateEnterpriseClientRequest, any>(
    `clients/${id}/enterprise/update`,
    {
      name: name,
      email: email,
      employeeName: employeeName,
      taxNumber: removeWhiteSpaces(taxNumber),
      address: address,
      directPhoneNumber: removeWhiteSpaces(directPhoneNumber),
      generalPhoneNumber: removeWhiteSpaces(directPhoneNumber),
      notes: notes,
      sendEmails: sendEmails,
      supplementaryEmail: supplementaryEmail,
    }
  );
};

export const useInvoices = () => {
  const { data: invoices, mutate } =
    useSWR<InvoicesResponse>(`clients/invoices`);
  return { invoices, mutate };
};

export const handleCreateEnterpriseInvoice = async (
  userId: string,
  requestData: CreateInvoiceRequest
) => {
  const url = `clients/${userId}/enterprise/invoice/create`;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  requestData.dayOfWeek =
    requestData.sendEmails === false
      ? undefined
      : requestData.timeFrame?.toString() === "0"
      ? undefined
      : requestData.dayOfWeek;

  requestData.timeFrame =
    requestData.sendEmails === false ? undefined : requestData.timeFrame;

  requestData.date = requestData.date
    ? requestData.date
    : new Date().toISOString();

  await postRequest(url, { ...requestData }, config);
};

export const handleCreatePrivateInvoice = async (
  userId: string,
  requestData: CreateInvoiceRequest
) => {
  const url = `clients/${userId}/private/invoice/create`;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  requestData.dayOfWeek =
    requestData.sendEmails === false
      ? undefined
      : requestData.timeFrame?.toString() === "0"
      ? undefined
      : requestData.dayOfWeek;

  requestData.timeFrame =
    requestData.sendEmails === false ? undefined : requestData.timeFrame;

  requestData.date = requestData.date
    ? requestData.date
    : new Date().toISOString();

  await postRequest(url, { ...requestData }, config);
};

export const useGetEnterpriseInvoiceById = (clientId: string, id: string) => {
  const { data: invoice, mutate } = useSWR<EnterpriseInvoiceResponse>(
    `clients/${clientId}/enterprise/invoices/${id}`
  );
  return { invoice, mutate };
};

export const useGetPrivateInvoiceById = (clientId: string, id: string) => {
  const { data: invoice, mutate } = useSWR<PrivateInvoiceResponse>(
    `clients/${clientId}/private/invoices/${id}`
  );
  return { invoice, mutate };
};

export const handleUpdateEnterpriseInvoice = async (
  clientId: string,
  id: string,
  requestData: UpdateEnterpriseInvoiceRequest
) => {
  const url = `clients/${clientId}/enterprise/invoices/${id}/update`;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  requestData.dayOfWeek =
    requestData.sendEmails === false
      ? undefined
      : requestData.timeFrame?.toString() === "0"
      ? undefined
      : requestData.dayOfWeek;

  requestData.timeFrame =
    requestData.sendEmails === false ? undefined : requestData.timeFrame;

  requestData.date = requestData.date
    ? requestData.date
    : new Date().toISOString();

  await putRequest(url, { ...requestData }, config);
};

export const handleUpdatePrivateInvoice = async (
  clientId: string,
  id: string,
  requestData: UpdatePrivateInvoiceRequest
) => {
  const url = `clients/${clientId}/private/invoices/${id}/update`;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  requestData.dayOfWeek =
    requestData.sendEmails === false
      ? undefined
      : requestData.timeFrame?.toString() === "0"
      ? undefined
      : requestData.dayOfWeek;

  requestData.timeFrame =
    requestData.sendEmails === false ? undefined : requestData.timeFrame;

  requestData.date = requestData.date
    ? requestData.date
    : new Date().toISOString();

  await putRequest(url, { ...requestData }, config);
};

export const clientService = {
  handleGetClients: useClients,
  handleCreateEnterpriseClient,
  handleCreatePrivateClient,
  handleGetEntepriseClientDetails: useGetEnterpriseClientById,
  handleGetPrivateClientDetails: useGetPrivateClientById,
  handleUpdatePrivateClient,
  handleUpdateEnterpriseClient,
  handleGetOrderPrivateClients: useOrderPrivateClients,
  handleGetOrderEnterpriseClients: useOrderEnterpriseClients,
  handleGetInvoices: useInvoices,
  handleCreateEnterpriseInvoice,
  handleCreatePrivateInvoice,
  handleGetEnterpriseInvoiceById: useGetEnterpriseInvoiceById,
  handleGetPrivateInvoiceById: useGetPrivateInvoiceById,
  handleUpdateEnterpriseInvoice,
  handleUpdatePrivateInvoice,
};
