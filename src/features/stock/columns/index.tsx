import { Price } from "@/components/components/Columns/Price";
import { Files, Stock } from "@/models";
import { EditColumn } from "../components/EditColumn";
import { EditColumnList } from "../components/EditColumnList";
import { Flex } from "@chakra-ui/react";
import { EditColumnDetails } from "../components/EditColumnDetails";
import React from "react";

export const stocksColumns = [
  {
    field: Stock.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    cellRenderer: "agGroupCellRenderer",
    sortable: true,
  },
  {
    field: Stock.reference,
    headerName: "REFERENCIA",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: Stock.warehouseLocation,
    headerName: "LOCALIZAÇÃO NO ARMAZÉM",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: Stock.boughtPrice,
    headerName: "PREÇO DE COMPRA",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: price } = value;
      return <Price price={price} />;
    },
  },
  {
    field: Stock.sellingPrice,
    headerName: "PREÇO DE VENDA",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: price } = value;
      return <Price price={price} />;
    },
  },
  {
    field: Stock.quantity,
    headerName: "QUANTIDADE",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: price } = value;
      return <Flex justifyContent={"center"}>{price}</Flex>;
    },
  },
  {
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: false,
    maxWidth: 120,
    cellRenderer: (data: any) => {
      return <EditColumnList data={data} />;
    },
  },
];

export const createStockFilesColumns = [
  {
    field: Files.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: Files.type,
    headerName: "TIPO",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: false,
    maxWidth: 120,
    cellRenderer: (data: any) => {
      return <EditColumn data={data} />;
    },
  },
];

export const stockDetailsFilesColumns = [
  {
    field: Files.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: Files.type,
    headerName: "TIPO",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: ({ data }: any) => {
      return (
        <React.Fragment>
          {data.type ? data.type : data.contentType}
        </React.Fragment>
      );
    },
  },
  {
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: false,
    maxWidth: 120,
    cellRenderer: (data: any) => {
      return <EditColumnDetails data={data} />;
    },
  },
];
