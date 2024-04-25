import { formatString, gridDateFormater } from "@/helpers";
import {
  SuppliersHistory,
  SuppliersList,
  SuppliersReturenParts,
} from "@/models";
import { Avatar, Flex } from "@chakra-ui/react";
import { EditColumn } from "../components/EditColumn";

export const suppliersListColumn = [
  {
    field: SuppliersList.image,
    headerName: "LOGO",
    filter: false,
    maxWidth: 70,
    cellRenderer: (value: any) => {
      const { value: image } = value;
      return (
        <Flex padding={0.5} justify={"center"} align={"center"}>
          <Avatar size={"xs"} src={image} />
        </Flex>
      );
    },
  },
  {
    field: SuppliersList.companyName,
    headerName: "EMPRESA",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersList.name,
    headerName: "FORNECEDOR",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersList.email,
    headerName: "EMAIL",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersList.generalPhoneNumber,
    headerName: "TELEFONE GERAL",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (params: any) => {
      return formatString(params.value);
    },
  },
  {
    field: SuppliersList.directPhoneNumber,
    headerName: "TELEFONE DIRETO",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (params: any) => {
      return formatString(params.value);
    },
  },
  {
    field: SuppliersList.taxNumber,
    headerName: "NIF",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (params: any) => {
      return formatString(params.value);
    },
  },
  {
    field: SuppliersList.address,
    headerName: "MORADA",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: false,
    maxWidth: 60,

    cellRenderer: ({ data }: { data: any }) => {
      return <EditColumn id={data.id} />;
    },
  },
  {
    filter: false,
    maxWidth: 50,
    cellRenderer: "agGroupCellRenderer",
  },
];

export const suppliersHistoryColumn = [
  {
    field: SuppliersHistory.user,
    headerName: "UTILIZADOR",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersHistory.date,
    headerName: "DATA",
    filter: "agTextColumnFilter",
    /*  cellRenderer: "agGroupCellRenderer", */
    sortable: true,
    valueFormatter: (data: any) => gridDateFormater(data.value),
  },

  {
    field: SuppliersHistory.oldNotes,
    headerName: "NOTAS ANTIGAS",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersHistory.updatedNotes,
    headerName: "NOTAS ATUALIZADAS",
    filter: "agTextColumnFilter",
    sortable: true,
  },
];

export const suppliersHistoryReturnedPartsColumn = [
  {
    field: SuppliersReturenParts.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersReturenParts.reference,
    headerName: "REFERENCIA",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersReturenParts.price,
    headerName: "PREÇO",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersReturenParts.quantity,
    headerName: "QUANTIDADE",
    filter: "agTextColumnFilter",
    sortable: true,
  },
];
