import { Client, ClientsHistory, Invoice, InvoiceList, Order } from "@/models";
import { formatString, gridDateFormater } from "@/helpers";
import { ClientType } from "@/components/components/Columns/ClientType";
import { OrderPaymentMethod } from "@/components/components/Columns/OrderPaymentMethod";
import { OrderShipmentMethod } from "@/components/components/Columns/OrderShipmentMethod";
import { OrderStatus } from "@/components/components/Columns/OrderStatus";
import { EditColumn } from "../components/EditColumn";
import { InvoicesPaymentStatus } from "@/components/components/Columns/InvoicesPaymentStatus";
import { Price } from "@/components/components/Columns/Price";
import { EditInvoicesColumn } from "../components/EditInvoicesColumn";
import { OrderEditColumn } from "../components/OrderEditColumn";

export const columnDefs = [
  {
    field: Client.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    cellRenderer: "agGroupCellRenderer",
    sortable: true,
  },
  {
    field: Client.email,
    headerName: "EMAIL",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: Client.taxNumber,
    headerName: "CONTRIBUINTE",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (params: any) => {
      return formatString(params.value);
    },
  },
  {
    field: Client.directPhoneNumber,
    headerName: "TELEFONE",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (params: any) => {
      return formatString(params.value);
    },
  },
  {
    field: Client.employeeName,
    headerName: "FUNCIONÁRIO",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: Client.type,
    headerName: "TIPO",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: type } = value;
      return <ClientType type={type} />;
    },
  },
  {
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: false,
    maxWidth: 60,
    cellRenderer: ({ data }: any) => {
      return <EditColumn id={data?.id} type={data?.type} />;
    },
  },
];

export const invoicesColumns = [
  {
    field: Invoice.number,
    headerName: "NUMERO DA ENCOMENDA",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: Invoice.clientName,
    headerName: "NOME DO CLIENTE",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: Invoice.clientType,
    headerName: "TIPO DO CLIENTE",
    sortable: true,
  },
  {
    field: Invoice.deliveryMethod,
    headerName: "MODO DE ENVIO",
    sortable: true,
  },
  {
    field: Invoice.status,
    headerName: "STATUS",
    sortable: true,
  },
  {
    field: Invoice.date,
    headerName: "DATA DE CRIAÇÃO",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (params: any) => {
      return formatString(params.value);
    },
  },
];

export const ordersColumn = [
  {
    field: Order.orderNumber,
    headerName: "NUMERO DA ENCOMENDA",
    filter: "agTextColumnFilter",
    cellRenderer: "agGroupCellRenderer",
    sortable: true,
  },
  {
    field: Order.paymeneMethod,
    headerName: "METODO PAGAMENTO",
    sortable: true,
    cellRenderer: ({ value, data }: any) => {
      return (
        <OrderPaymentMethod type={value} deliveryMethod={data.deliveryMethod} />
      );
    },
  },
  {
    field: Order.deliveryMethod,
    headerName: "METODO ENTREGA",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: type } = value;
      return <OrderShipmentMethod type={type} />;
    },
  },
  {
    field: Order.status,
    headerName: "STATUS",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: type } = value;
      return <OrderStatus type={type} />;
    },
  },
  {
    field: Order.date,
    headerName: "DATA",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (data: any) => gridDateFormater(data.value),
  },
  {
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: false,
    maxWidth: 120,
    cellRenderer: ({ data }: { data: any }) => {
      return <OrderEditColumn id={data?.id} />;
    },
  },
];

export const historyColumn = [
  {
    field: ClientsHistory.user,
    headerName: "UTILIZADOR",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: ClientsHistory.dateOccurred,
    headerName: "DATA",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (data: any) => gridDateFormater(data.value),
  },
  {
    field: ClientsHistory.oldNotes,
    headerName: "NOTA ANTIGA",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: ClientsHistory.updatedNotes,
    headerName: "NOVA NOTA",
    filter: "agTextColumnFilter",
    sortable: true,
  },
];

export const invoicesColumn = [
  {
    field: InvoiceList.fileName,
    headerName: "NOME DO FICHEIRO",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: InvoiceList.status,
    headerName: "STATUS DE PAGAMENTO",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: staus } = value;
      return <InvoicesPaymentStatus type={staus} />;
    },
  },
  {
    field: InvoiceList.clientType,
    headerName: "TIPO DE CLIENTE",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: clientType } = value;
      return <ClientType type={clientType} />;
    },
  },
  {
    field: InvoiceList.total,
    headerName: "TOTAL DA FATURA",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: total } = value;
      return <Price price={total} />;
    },
  },
  {
    field: InvoiceList.date,
    headerName: "DATA CRIAÇÃO",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (data: any) => gridDateFormater(data.value),
  },
  {
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: false,
    maxWidth: 120,
    cellRenderer: ({ data }: { data: any }) => {
      return (
        <EditInvoicesColumn
          id={data?.id}
          contentType={data?.contentType}
          type={data?.clientType}
          clientId={data?.clientId}
          fileUrl={data?.fileUrl}
        />
      );
    },
  },
];
