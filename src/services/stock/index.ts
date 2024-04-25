import { deleteRequest, postRequest, putRequest } from "@/lib";
import {
  CreateStockRequest,
  StockModel,
  StockModelResponse,
  UpdateStockRequest,
} from "@/models";
import useSWR from "swr";

export const useStock = () => {
  const { data: stock, mutate } = useSWR<StockModelResponse>("stocks");
  return { stock, mutate };
};

export const useStockDetails = (stockId: string) => {
  const { data: stockDetails, mutate } = useSWR<StockModel>(
    `stocks/${stockId}`
  );
  return { stockDetails, mutate };
};

export const handleCreateStock = async (requestData: CreateStockRequest) => {
  const formData = new FormData();

  formData.append("name", requestData.name);
  formData.append("reference", requestData.reference);
  formData.append("wareHouseLocation", requestData.wareHouseLocation);
  formData.append("sellingPrice", requestData.sellingPrice.toString());
  formData.append("boughtPrice", requestData.boughtPrice.toString());
  formData.append("quantity", requestData.quantity.toString());

  requestData.attachments.forEach((attachment: any) => {
    formData.append("attachments", attachment);
  });

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  await postRequest(`stocks/create`, formData, config);
};

export const handleUpdateStock = async (
  stockId: string,
  requestData: UpdateStockRequest
) => {
  const formData = new FormData();

  formData.append("name", requestData.name);
  formData.append("reference", requestData.reference);
  formData.append("wareHouseLocation", requestData.wareHouseLocation);
  formData.append("sellingPrice", requestData.sellingPrice.toString());
  formData.append("boughtPrice", requestData.boughtPrice.toString());
  formData.append("quantity", requestData.quantity.toString());

  requestData.newAttachments?.map((attachment: any) => {
    if (attachment.isNew) {
      delete attachment.isNew;
      return formData.append("newAttachments", attachment);
    }
  });

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  await putRequest(`stocks/${stockId}/update`, formData, config);
};

export const handleRemoveAttachment = async (
  stockId: string,
  attachmentId: string
) => {
  await deleteRequest(`stocks/${stockId}/attachments/${attachmentId}/delete`);
};

export const stockService = {
  handleGetStock: useStock,
  handleGetStockDetails: useStockDetails,
  handleCreateStock,
  handleUpdateStock,
  handleRemoveAttachment,
};
