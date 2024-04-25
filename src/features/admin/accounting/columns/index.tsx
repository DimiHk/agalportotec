import { gridDateFormater } from "@/helpers";
import { AccountingInvoices } from "@/models";
import { EditColumn } from "../components/EditColumn";
import { InvoicesPaymentStatus } from "@/components/components/Columns/InvoicesPaymentStatus";
import { Price } from "@/components/components/Columns/Price";

export const invoicesColumn = [
  {
    field: AccountingInvoices.documentNumber,
    headerName: "NUMERO DO DOCUMENTO",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: AccountingInvoices.name,
    headerName: "NOME DO FORNECEDOR",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: AccountingInvoices.status,
    headerName: "STATUS",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: status } = value;
      const getStatus = () => {
        if (status.toString() === "0") return "paid";
        return "pendingpayment";
      };
      return <InvoicesPaymentStatus type={getStatus()} />;
    },
  },

  {
    field: AccountingInvoices.total,
    headerName: "TOTAL",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: ({ data }: { data: any }) => {
      return <Price price={data?.total} />;
    },
  },
  {
    field: AccountingInvoices.paymentDate,
    headerName: "DATA PAGAMENTO",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (data: any) => gridDateFormater(data.value),
  },
  {
    field: AccountingInvoices.expiryDate,
    headerName: "DATA VENCIMENTO",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (data: any) => gridDateFormater(data.value),
  },
  {
    field: AccountingInvoices.paymentNumber,
    headerName: "NUMERO DE PAGAMENTO",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: false,
    maxWidth: 120,
    cellRenderer: ({ data }: { data: any }) => {
      return <EditColumn id={data?.id} />;
    },
  },
];
