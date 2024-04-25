import { ClientTypeEnum } from "../enums";

export type PrivateClientModel = {
  id: string;
  name: string;
  email: string;
  taxNumber: string;
  directPhoneNumber: string;
  address: string;
  dateCreated: Date;
  notes: string;
  type: ClientTypeEnum.privateClient;
  orders: OrdersModel[];
  invoices: InvoicesModel[];
  history: HistoryModel[];
};

export type InvoicesModel = {
  clientId: string;
  clientType: string;
  id: string;
  date: Date;
  status: "PendingPayment" | "Paid";
  lastEmailSent: Date;
  total: number;
  dateItWasPayed: Date;
  fileUrl: string;
  filename: string;
};

export type EnterpriseClientModel = {
  id: string;
  name: string;
  employeeName: string;
  email: string;
  taxNumber: string;
  directPhoneNumber: string;
  generalPhoneNumber: string;
  address: string;
  dateCreated: Date;
  notes: string;
  type: ClientTypeEnum.enterpriseClient;
  orders: OrdersModel[];
  invoices: InvoicesModel[];
  supplementaryEmail: string;
  history: HistoryModel[];
};

export type OrdersModel = {
  id: string;
  clientName: string;
  clientType: ClientTypeEnum;
  number: string;
  date: Date;
  parts: PartsModel[];
  paymeneMethod: string;
  deliveryMethod: string;
  status: string;
  paymentStatus: string;
};

export type PartsModel = {
  id?: string;
  name: string;
  reference: string;
  price: number;
};

export type StockModel = {
  name: string;
  reference: string;
  warehouseLocation: string;
  sellingPrice: number;
  boughtPrice: number;
  clientNames: string[];
  attachments: any[];
  quantity: number;
};

export type HistoryModel = {
  id: string;
  oldNotes: string;
  updatedNotes: string;
  oldStatus: string;
  updatedStatus: string;
  dateOccurred: Date;
  user: string;
};

export type ShipmentDetailsModel = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  taxNumber: string;
};

export type SupplierModel = {
  id: string;
  image: string;
  companyName: string;
  name: string;
  email: string;
  generalPhoneNumber: string;
  directPhoneNumber: string;
  taxNumber: string;
  address: string;
  notes: string;
};
