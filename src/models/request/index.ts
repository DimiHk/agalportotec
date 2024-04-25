import { PartsModel } from "../models";
import { SupplierParts, SupplierArticles } from "../response";

export type AuthenticationRequest = {
  email: string;
  password: string;
};

export type CreatePrivateClientRequest = {
  name: string;
  email: string;
  taxNumber: string;
  address: string;
  directPhoneNumber: string;
  notes: string;
  additionalAddress?: string;
  postalCode?: string;
  sendEmails: boolean;
};

export type CreateEnterpriseClientRequest = {
  name: string;
  email: string;
  employeeName: string;
  taxNumber: string;
  address: string;
  directPhoneNumber: string;
  generalPhoneNumber: string;
  notes: string;
  sendEmails: boolean;
  additionalAddress?: string;
  postalCode?: string;
  supplementaryEmail: string;
};

export type UpdatePrivateClientRequest = {
  name: string;
  email: string;
  taxNumber: string;
  address: string;
  directPhoneNumber: string;
  notes: string;
  sendEmails: boolean;
};

export type UpdateEnterpriseClientRequest = {
  name: string;
  email: string;
  employeeName: string;
  taxNumber: string;
  address: string;
  directPhoneNumber: string;
  generalPhoneNumber: string;
  notes: string;
  sendEmails: boolean;
  supplementaryEmail: string;
};

export type CreateInvoiceRequest = {
  date: string;
  status: string;
  total: number;
  file: any;
  timeFrame: number | undefined;
  dayOfWeek: number | undefined;
  sendEmails: boolean;
};

export type UpdateEnterpriseInvoiceRequest = {
  date: string;
  status: string;
  total: number;
  file: any;
  timeFrame: number | undefined;
  dayOfWeek: number | undefined;
  sendEmails: boolean;
};

export type UpdatePrivateInvoiceRequest = {
  date: string;
  status: string;
  total: number;
  file: any;
  timeFrame: number | undefined;
  dayOfWeek: number | undefined;
  sendEmails: boolean;
};

export type CreatePrivateInvoiceRequest = {
  date: string;
  status: string;
  total: number;
  file: any;
  timeFrame: number | undefined;
  dayOfWeek: number | undefined;
  sendEmails: boolean;
};

export type CreateSupplierRequest = {
  companyName: string;
  name: string;
  email: string;
  generalPhoneNumber: string;
  directPhoneNumber: string;
  taxNumber: string;
  address: string;
  notes: string;
  sendEmails: boolean;
  image: any;
  file: any;
};

export type UpdateSupplierRequest = {
  companyName: string;
  name: string;
  email: string;
  generalPhoneNumber: string;
  directPhoneNumber: string;
  taxNumber: string;
  address: string;
  notes: string;
  sendEmails: boolean;
  image: any;
  file: any;
};

export type CreateStockRequest = {
  name: string;
  reference: string;
  wareHouseLocation: string;
  sellingPrice: number;
  boughtPrice: number;
  quantity: number;
  attachments: any;
};

export type UpdateStockRequest = {
  name: string;
  reference: string;
  wareHouseLocation: string;
  sellingPrice: number;
  boughtPrice: number;
  quantity: number;
  newAttachments: any;
};

export type CreateAccountingInvoiceRequest = {
  documentNumber: string;
  expiryDate: string;
  total: number;
  paymentNumber: string;
  status: string;
  name: string;
};

export type CreateUserRequest = {
  name: string;
  email: string;
  userType: string;
  password: string;
};

export type UpdateUserRequest = {
  name: string;
  email: string;
  type: string;
  newPassword: string | undefined;
  newPasswordConfirmation: string | undefined;
};

export type UpdateProfileRequest = {
  name: string;
  email: string;
  newPassword: string | undefined;
  newPasswordConfirmation: string | undefined;
};

export type ResetPasswordEmailRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
  newPasswordConfirmation: string;
};

export type CreatePrivateClientOrderRequest = {
  paymentMethod: number;
  shipmentMethod: number;
  shipmentName: string;
  shipmentSurname: string;
  shipmentAddress: string;
  shipmentCity: string;
  shipmentPostalCode: string;
  shipmentPhoneNumber: string;
  shipmentTaxNumber: string;
  sendEmailDate: Date;
  orderParts: PartsModel[];
  notes: string;
  sendEmail: boolean;
};

export type UpdatePrivateClientOrderRequest = {
  purchaseOrderNumber: string | undefined;
  paymentMethod: number | undefined;
  shipmentMethod: number | undefined;
  shipmentName: string | undefined;
  shipmentSurname: string | undefined;
  shipmentAddress: string | undefined;
  shipmentCity: string | undefined;
  shipmentPostalCode: string | undefined;
  shipmentPhoneNumber: string | undefined;
  shipmentTaxNumber: string | undefined;
  sendEmailDate: Date | undefined;
  parts: PartsModel[] | undefined;
  newParts: PartsModel[] | undefined;
  notes: string | undefined;
  sendEmails: boolean | undefined;
};

export type CreateEnterpriseClientOrderRequest = {
  paymentMethod: number;
  shipmentMethod: number;
  shipmentName: string;
  shipmentSurname: string;
  shipmentAddress: string;
  shipmentCity: string;
  shipmentPostalCode: string;
  shipmentPhoneNumber: string;
  shipmentTaxNumber: string;
  sendEmailDate: Date;
  orderParts: PartsModel[];
  notes: string;
  sendEmail: boolean;
};

export type UpdateEnterpriseClientOrderRequest = {
  purchaseOrderNumber: string | undefined;
  paymentMethod: number | undefined;
  shipmentMethod: number | undefined;
  shipmentName: string | undefined;
  shipmentSurname: string | undefined;
  shipmentAddress: string | undefined;
  shipmentCity: string | undefined;
  shipmentPostalCode: string | undefined;
  shipmentPhoneNumber: string | undefined;
  shipmentTaxNumber: string | undefined;
  sendEmailDate: Date | undefined;
  parts: PartsModel[] | undefined;
  newParts: PartsModel[] | undefined;
  notes: string | undefined;
  sendEmails: boolean | undefined;
};

export type RemoveItemsFromSupplierOrderRequest = {
  parts?: [{ id: string; removedReason: string }] | [];
  articles?: [{ id: string; removedReason: string }] | [];
};

export type UpdateSupplierOrderRequest = {
  deliveryNumber?: string;
  notes?: string;
  newParts?: SupplierParts[];
  newArticles?: SupplierArticles[];
};

export type CreateSupplierOrderRequest = {
  deliveryNumber?: string;
  notes?: string;
  date: string;
  parts: SupplierParts[];
  articles: SupplierArticles[];
};
