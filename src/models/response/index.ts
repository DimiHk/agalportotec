import { UserTypeEnum } from "../enums";
import {
  EnterpriseClientModel,
  PrivateClientModel,
  OrdersModel,
  PartsModel,
  ShipmentDetailsModel,
  HistoryModel,
  SupplierModel,
  StockModel,
  InvoicesModel,
} from "../models";

export type AuthenticationResponse = {
  token: string;
  userType: UserTypeEnum.administrator | UserTypeEnum.employee;
};

export type ClientsListResponse = {
  clients: EnterpriseClientModel[] & PrivateClientModel[];
};

export type OrdersListResponse = {
  nextOrderNumber: number;
  orders: OrdersModel[];
};

export type OrderPrivateClients = {
  id: string;
  name: string;
  email: string;
  employeeName: string;
  taxNumber: string;
  directPhoneNumber: string;
  generalPhoneNumber: string;
  address: string;
};

export type EnterpriseOrderDetailsResponse = {
  id: string;
  orderNumber: number;
  status: string;
  client: EnterpriseClientModel;
  orderParts: PartsModel & { id: string }[];
  shipmentDetails: ShipmentDetailsModel;
  history: HistoryModel[];
  paymentMethod: number;
  sendEmailDate: Date;
  sendEmails: boolean;
  shipmentMethod: number;
  notes: string;
};

export type PrivateOrderDetailsResponse = {
  id: string;
  orderNumber: number;
  status: string;
  client: PrivateClientModel;
  orderParts: PartsModel & { id: string }[];
  shipmentDetails: ShipmentDetailsModel;
  history: HistoryModel[];
  paymentMethod: number;
  sendEmailDate: Date;
  sendEmails: boolean;
  shipmentMethod: number;
  notes: string;
};

export type PrivateInvoiceResponse = {
  id: string;
  clientId: string;
  clientType: string;
  contentType: string;
  status: number;
  total: number;
  date: Date;
  emailSentDate: Date;
  timeFrame: number;
  dayOfWeek: number;
  sendEmails: boolean;
  fileUrl: string;
  filename: string;
};

export type EnterpriseInvoiceResponse = {
  id: string;
  clientId: string;
  contentType: string;
  clientType: string;
  status: number;
  total: number;
  date: Date;
  emailSentDate: Date;
  timeFrame: number;
  dayOfWeek: number;
  sendEmails: boolean;
  fileUrl: string;
  filename: string;
};

export type SupplierDetailsResponse = SupplierModel & {
  sendEmails: boolean;
  notesHistory: {
    id: string;
    oldNotes: string;
    updatedNotes: string;
    dateOccurred: Date;
    user: string;
  };
};

export type SuppliersListResponse = {
  supplierId: string;
  id: string;
  supplierName: string;
  supplierEmail: string;
  status: string;
  date: string;
  parts: [
    {
      id: string;
      name: string;
      reference: string;
      price: number;
      quantity: number;
      notes: string;
      isRemoved: boolean;
    }
  ];
  articles: [
    {
      id: string;
      name: string;
      price: number;
      quantity: number;
      notes: string;
      isRemoved: boolean;
    }
  ];
};

export type SupplierParts = {
  id?: string;
  name: string;
  reference?: string;
  referenceNumber?: string;
  price: number;
  quantity: number;
  notes?: string;
  removedReason?: string;
  isRemoved?: boolean;
  isNew?: boolean;
};

export type SupplierArticles = {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  removedReason?: string;
  isRemoved?: boolean;
  isNew?: boolean;
};

export type SupplierOrderDetailsResponse = {
  id: string;
  deliveryNumber: string;
  date: string;
  notes: string;
  status: number;
  parts: SupplierParts[];
  articles: SupplierArticles[];
  histories: {
    notesHistory: {
      id: string;
      user: string;
      dateOccurred: Date;
      oldNotes: string;
      updatedNotes: string;
    };
    statusHistory: {
      id: string;
      user: string;
      dateOccurred: Date;
      oldStatus: number;
      updatedStatus: number;
    };
    removedPartsHistory: {
      id: string;
      user: string;
      dateOccurred: Date;
      partId: string;
      name: string;
      reference: string;
    };
    removedArticlesHistory: {
      id: string;
      user: string;
      dateOccurred: Date;
      articleId: string;
      name: string;
    };
  };
};

export type AccountingInvoicesResponse = {
  id: string;
  documentNumber: string;
  expiryDate: Date;
  paymentDate: Date;
  total: number;
  paymentNumber: string;
  status: string;
  name: string;
};

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  type: string;
  dateCreated: Date;
};

export type StockModelResponse = StockModel[];

export type InvoicesResponse = InvoicesModel[];

export type SuppliersResponse = SupplierModel[];
