import { patchRequest, postRequest, putRequest } from "@/lib";
import {
  CreateEnterpriseClientOrderRequest,
  CreatePrivateClientOrderRequest,
  CreateSupplierOrderRequest,
  EnterpriseOrderDetailsResponse,
  OrdersListResponse,
  PrivateOrderDetailsResponse,
  RemoveItemsFromSupplierOrderRequest,
  SupplierOrderDetailsResponse,
  SuppliersListResponse,
  UpdateEnterpriseClientOrderRequest,
  UpdatePrivateClientOrderRequest,
  UpdateSupplierOrderRequest,
} from "@/models";
import useSWR from "swr";

export const useOrders = () => {
  const { data, mutate } = useSWR<OrdersListResponse>("clients/orders");
  const { orders, nextOrderNumber } = data || {};
  return { orders, nextOrderNumber, mutate };
};

export const handleCreatePrivateClientOrder = async (
  requestData: CreatePrivateClientOrderRequest,
  clientId: string
) => {
  await postRequest<CreatePrivateClientOrderRequest, any>(
    `clients/${clientId}/private/order/create`,
    {
      ...requestData,
    }
  );
};

export const handleCreateEnterpriseClientOrder = async (
  requestData: CreateEnterpriseClientOrderRequest,
  clientId: string
) => {
  await postRequest<CreateEnterpriseClientOrderRequest, any>(
    `clients/${clientId}/enterprise/order/create`,
    {
      ...requestData,
    }
  );
};

export const useEntepriseClientOrderDetails = (
  clientId: string,
  orderId: string
) => {
  const { data: orderDetails, mutate } = useSWR<EnterpriseOrderDetailsResponse>(
    `clients/${clientId}/enterprise/orders/${orderId}`
  );
  return { orderDetails, mutate };
};

export const usePrivateClientOrderDetails = (
  clientId: string,
  orderId: string
) => {
  const { data: orderDetails, mutate } = useSWR<PrivateOrderDetailsResponse>(
    `clients/${clientId}/private/orders/${orderId}`
  );
  return { orderDetails, mutate };
};

export const handleChangeEnterpriseOrderStatus = async (
  clientId: string,
  orderId: string,
  status: number
) => {
  await patchRequest<any, any>(
    `clients/${clientId}/enterprise/orders/${orderId}/status`,
    {
      status: status,
    }
  );
};

export const handleChangePrivateOrderStatus = async (
  clientId: string,
  orderId: string,
  status: number
) => {
  await patchRequest<any, any>(
    `clients/${clientId}/private/orders/${orderId}/status`,
    {
      status: status,
    }
  );
};

export const handleUpdatePrivateOrder = async (
  requestData: UpdatePrivateClientOrderRequest,
  clientId: string,
  orderId: string
) => {
  const parts = requestData.parts
    ? requestData.parts.filter((part) => part.id)
    : [];

  const newParts = requestData.parts
    ? requestData.parts.filter((part) => !part.id)
    : [];

  await putRequest<UpdatePrivateClientOrderRequest, any>(
    `clients/${clientId}/private/orders/${orderId}/update`,
    {
      purchaseOrderNumber: requestData.purchaseOrderNumber,
      paymentMethod: Number(requestData.paymentMethod),
      shipmentMethod: Number(requestData.shipmentMethod),
      shipmentName: requestData.shipmentName ? requestData.shipmentName : "",
      shipmentSurname: requestData.shipmentSurname
        ? requestData.shipmentSurname
        : "",
      shipmentAddress: requestData.shipmentAddress
        ? requestData.shipmentAddress
        : "",
      shipmentPostalCode: requestData.shipmentPostalCode
        ? requestData.shipmentPostalCode
        : "",
      shipmentCity: requestData.shipmentCity ? requestData.shipmentCity : "",
      shipmentPhoneNumber: requestData.shipmentPhoneNumber
        ? requestData.shipmentPhoneNumber
        : "",
      shipmentTaxNumber: requestData.shipmentTaxNumber
        ? requestData.shipmentTaxNumber
        : "",
      sendEmailDate: requestData.sendEmailDate
        ? requestData.sendEmailDate
        : new Date(),
      notes: requestData.notes,
      parts: parts,
      newParts: newParts,
      sendEmails: requestData.sendEmails,
    }
  );
};

export const handleUpdateEntepriseOrder = async (
  requestData: UpdateEnterpriseClientOrderRequest,
  clientId: string,
  orderId: string
) => {
  const parts = requestData.parts
    ? requestData.parts.filter((part) => part.id)
    : [];

  const newParts = requestData.parts
    ? requestData.parts.filter((part) => !part.id)
    : [];

  await putRequest<UpdateEnterpriseClientOrderRequest, any>(
    `clients/${clientId}/enterprise/orders/${orderId}/update`,
    {
      purchaseOrderNumber: requestData.purchaseOrderNumber,
      paymentMethod: Number(requestData.paymentMethod),
      shipmentMethod: Number(requestData.shipmentMethod),
      shipmentName: requestData.shipmentName ? requestData.shipmentName : "",
      shipmentSurname: requestData.shipmentSurname
        ? requestData.shipmentSurname
        : "",
      shipmentAddress: requestData.shipmentAddress
        ? requestData.shipmentAddress
        : "",
      shipmentPostalCode: requestData.shipmentPostalCode
        ? requestData.shipmentPostalCode
        : "",
      shipmentCity: requestData.shipmentCity ? requestData.shipmentCity : "",
      shipmentPhoneNumber: requestData.shipmentPhoneNumber
        ? requestData.shipmentPhoneNumber
        : "",
      shipmentTaxNumber: requestData.shipmentTaxNumber
        ? requestData.shipmentTaxNumber
        : "",
      sendEmailDate: requestData.sendEmailDate
        ? requestData.sendEmailDate
        : new Date(),
      notes: requestData.notes,
      parts: parts,
      newParts: newParts,
      sendEmails: requestData.sendEmails,
    }
  );
};

export const handleCreateSupplierOrder = async (
  supplierId: string,
  requestData: CreateSupplierOrderRequest
) => {
  await postRequest<CreateSupplierOrderRequest, any>(
    `suppliers/${supplierId}/orders/create`,
    {
      ...requestData,
    }
  );
};

export const useSuppliersOrders = () => {
  const { data: orders, mutate } =
    useSWR<SuppliersListResponse>("suppliers/orders");
  return { orders, mutate };
};

export const useSupplierOrderDetails = (
  orderId: string,
  supplierId: string
) => {
  const { data: orderDetails, mutate } = useSWR<SupplierOrderDetailsResponse>(
    `suppliers/${supplierId}/orders/${orderId}`
  );
  return { orderDetails, mutate };
};

export const handleUpdateSupplierOrderStatus = async (
  supplierId: string,
  orderId: string,
  status: number
) => {
  await patchRequest(
    `suppliers/${supplierId}/orders/${orderId}/status/update`,
    {
      status: status,
    }
  );
};

export const handleRemoveItemsFromSupplierOrder = async (
  supplierId: string,
  orderId: string,
  requestData: RemoveItemsFromSupplierOrderRequest
) => {
  await postRequest(
    `suppliers/${supplierId}/orders/${orderId}/items/remove`,
    requestData
  );
};

export const handleUpdateSupplierOrder = async (
  supplierId: string,
  orderId: string,
  requestData: UpdateSupplierOrderRequest
) => {
  await patchRequest(`suppliers/${supplierId}/orders/${orderId}/update`, {
    ...requestData,
  });
};

export const ordersService = {
  handleGetOrders: useOrders,
  handleCreatePrivateClientOrder,
  handleCreateEnterpriseClientOrder,
  handleGetEnterpriseClientOrderDetails: useEntepriseClientOrderDetails,
  handleGetPrivateClientOrderDetails: usePrivateClientOrderDetails,
  handleChangeEnterpriseOrderStatus,
  handleChangePrivateOrderStatus,
  handleUpdatePrivateOrder,
  handleUpdateEntepriseOrder,
  handleGetSuppliersOrders: useSuppliersOrders,
  handleCreateSupplierOrder,
  handleGetSupplierOrderDetails: useSupplierOrderDetails,
  handleUpdateSupplierOrderStatus,
  handleRemoveItemsFromSupplierOrder,
  handleUpdateSupplierOrder,
};
