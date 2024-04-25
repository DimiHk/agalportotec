export enum Client {
  id = "id",
  name = "name",
  employeeName = "employeeName",
  email = "email",
  taxNumber = "taxNumber",
  directPhoneNumber = "directPhoneNumber",
  dateCreated = "dateCreated",
  type = "type",
  notes = "notes",
}

export enum Invoice {
  clientName = "clientName",
  clientType = "clientType",
  deliveryMethod = "deliveryMethod",
  number = "number",
  status = "status",
  date = "date",
  parts = "parts",
}

export enum UserTypeEnum {
  administrator = "Administrator",
  employee = "Employee",
}

export enum ClientTypeEnum {
  privateClient = "CONSUMIDOR FINAL",
  enterpriseClient = "EMPRESARIAL",
}

export enum Order {
  id = "id",
  clientName = "clientName",
  clientType = "clientType",
  number = "number",
  date = "date",
  parts = "parts",
  paymeneMethod = "paymentMethod",
  deliveryMethod = "deliveryMethod",
  status = "status",
  paymentStatus = "paymentStatus",
  orderNumber = "orderNumber",
}

export enum OrderProducts {
  id = "id",
  name = "name",
  reference = "reference",
  price = "price",
}

export enum History {
  id = "id",
  oldNotes = "oldNotes",
  updatedNotes = "updatedNotes",
  oldStatus = "oldStatus",
  updatedStatus = "updatedStatus",
  dateOccurred = "dateOccurred",
  user = "user",
}

export enum Stock {
  id = "id",
  name = "name",
  reference = "reference",
  warehouseLocation = "warehouseLocation",
  sellingPrice = "sellingPrice",
  boughtPrice = "boughtPrice",
  clientNames = "clientNames",
  quantity = "quantity",
}

export enum InvoiceList {
  fileName = "filename",
  fileUrl = "fileUrl",
  status = "status",
  total = "total",
  clientType = "clientType",
  date = "date",
  dateItWasPayed = "dateItWasPayed",
}

export enum ClientsHistory {
  id = "id",
  oldNotes = "oldNotes",
  updatedNotes = "updatedNotes",
  user = "user",
  dateOccurred = "dateOccurred",
}

export enum SuppliersList {
  id = "id",
  image = "image",
  companyName = "companyName",
  name = "name",
  email = "email",
  generalPhoneNumber = "generalPhoneNumber",
  directPhoneNumber = "directPhoneNumber",
  taxNumber = "taxNumber",
  address = "address",
  notes = "notes",
}

export enum SuppliersHistory {
  date = "dateOccurred",
  user = "user",
  oldNotes = "oldNotes",
  updatedNotes = "updatedNotes",
}

export enum SuppliersReturenParts {
  id = "id",
  name = "name",
  reference = "reference",
  quantity = "quantity",
  price = "price",
}

export enum SuppliersOrdersList {
  id = "id",
  supplierId = "supplierId",
  supplierName = "supplierName",
  supplierEmail = "supplierEmail",
  status = "status",
  date = "date",
}

export enum SuppliersOrdersListParts {
  id = "id",
  name = "name",
  reference = "reference",
  quantity = "quantity",
  price = "price",
  notes = "notes",
  isReturned = "isReturned",
  isNew = "isNew",
}

export enum SuppliersOrdersListArticles {
  id = "id",
  name = "name",
  quantity = "quantity",
  price = "price",
  notes = "notes",
  isReturned = "isReturned",
  isNew = "isNew",
}

export enum CreateSupplierOrdersParts {
  name = "name",
  referenceNumber = "referenceNumber",
  quantity = "quantity",
  price = "price",
  notes = "notes",
}

export enum SupplierNotesHistory {
  user = "user",
  dateOccured = "dateOccurred",
  oldNotes = "oldNotes",
  updatedNotes = "updatedNotes",
}

export enum SupplierStatusHistory {
  user = "user",
  dateOccured = "dateOccurred",
  oldStatus = "oldStatus",
  updatedStatus = "updatedStatus",
}

export enum SupplierRemovedPartsHistory {
  user = "user",
  dateOccured = "dateOccurred",
  name = "name",
  reference = "reference",
}

export enum SuppliersRemovedArticlesHistory {
  user = "user",
  dateOccured = "dateOccurred",
  name = "name",
}

export enum Files {
  name = "name",
  type = "type",
}

export enum AccountingInvoices {
  id = "id",
  documentNumber = "documentNumber",
  expiryDate = "expiryDate",
  paymentDate = "paymentDate",
  total = "total",
  paymentNumber = "paymentNumber",
  status = "status",
  name = "name",
}

export enum User {
  id = "id",
  name = "name",
  email = "email",
  userType = "type",
  dateCreated = "dateCreated",
}
