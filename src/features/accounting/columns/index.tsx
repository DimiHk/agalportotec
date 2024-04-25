import { ClientType } from "@/components/components/Columns/ClientType";
import { InvoicesPaymentStatus } from "@/components/components/Columns/InvoicesPaymentStatus";
import { Price } from "@/components/components/Columns/Price";
import { gridDateFormater } from "@/helpers";
import { InvoiceList } from "@/models";
import { EditColumn } from "../components/EditColumn";

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
        <EditColumn
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
