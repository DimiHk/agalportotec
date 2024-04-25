import { EditColumn } from "../components/EditColumn";
import { ActionsColumn } from "../components/ActionsColumn";
import { ClientType } from "@/components/components/Columns/ClientType";
import { gridDateFormater } from "@/helpers";
import { OrderShipmentMethod } from "@/components/components/Columns/OrderShipmentMethod";
import { OrderPaymentMethod } from "@/components/components/Columns/OrderPaymentMethod";
import { OrderStatus } from "@/components/components/Columns/OrderStatus";
import { UpdateActionsColumn } from "../components/UpdateActionsColumn";
import { Price } from "@/components/components/Columns/Price";
import { UpdateSupplierPartsActionsColumn } from "../components/UpdateSupplierPartsActionsColumn";
import { UpdateSupplierArticlesActionsColumn } from "../components/UpdateSupplierArticlesActionsColumn";
import {
  CreateSupplierOrdersParts,
  History,
  Order,
  OrderProducts,
  SupplierNotesHistory,
  SupplierRemovedPartsHistory,
  SupplierStatusHistory,
  SuppliersOrdersList,
  SuppliersOrdersListParts,
  SuppliersRemovedArticlesHistory,
} from "@/models";
import { EditSupplierColumn } from "../components/EditSupplierColumn";
import { MarkArticlesAsRemoved } from "../components/MarkArticlesAsRemoved";
import { MarkPartsAsRemoved } from "../components/MarkPartsAsRemoved";
import { SuppliersOrderStatus } from "@/components/components/Columns/SuppliersOrderStatus";
import { ArticleStatus } from "@/components/components/Columns/ArticlesStatus";

export const orderColumns = [
  {
    field: Order.number,
    headerName: "REFERENCIA",
    filter: "agTextColumnFilter",
    cellRenderer: "agGroupCellRenderer",
    sortable: true,
  },
  {
    field: Order.clientName,
    headerName: "CLIENTE",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: Order.clientType,
    headerName: "TIPO",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: type } = value;
      return <ClientType type={type} />;
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
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: false,
    maxWidth: 120,
    cellRenderer: ({ data }: { data: any }) => {
      return (
        <EditColumn
          id={data?.id}
          type={data?.clientType}
          clientId={data?.clientId}
        />
      );
    },
  },
];

export const orderProductsColumns = [
  {
    field: OrderProducts.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
  },
  {
    field: OrderProducts.reference,
    headerName: "REFERENCIA",
    filter: "agTextColumnFilter",
  },
  {
    field: OrderProducts.price,
    headerName: "PREÇO",
    filter: "agTextColumnFilter",
    cellRenderer: (value: any) => {
      const { value: price } = value;
      return <Price price={price} />;
    },
  },
  {
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: false,
    maxWidth: 120,
    cellRenderer: (data: any) => {
      return <ActionsColumn orderPart={data} />;
    },
  },
];

export const updateProductColumns = [
  {
    field: OrderProducts.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
  },
  {
    field: OrderProducts.reference,
    headerName: "REFERENCIA",
    filter: "agTextColumnFilter",
  },
  {
    field: OrderProducts.price,
    headerName: "PREÇO",
    filter: "agTextColumnFilter",
    cellRenderer: (value: any) => {
      const { value: price } = value;
      return <Price price={price} />;
    },
  },
  {
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: false,
    maxWidth: 120,
    cellRenderer: (data: any) => {
      return <UpdateActionsColumn orderPart={data} />;
    },
  },
];

export const historyColumns = [
  {
    field: History.user,
    headerName: "USUÁRIO",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: History.oldNotes,
    headerName: "NOTAS ANTIGAS",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: History.updatedNotes,
    headerName: "NOTAS ATUALIZADAS",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: History.dateOccurred,
    headerName: "DATA OCORRIDA",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (data: any) => gridDateFormater(data.value),
  },
  {
    field: History.oldStatus,
    headerName: "STATUS ANTIGO",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: type } = value;
      const getStatus = (type: string) => {
        switch (type) {
          case "0":
            return "created";
          case "1":
            return "withheld";
          case "2":
            return "readytoship";
          case "3":
            return "shipped";
          default:
            return "created";
        }
      };
      return <OrderStatus type={getStatus(type)} />;
    },
  },
  {
    field: History.updatedStatus,
    headerName: "STATUS ATUALIZADO",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: type } = value;
      const getStatus = (type: string) => {
        switch (type) {
          case "0":
            return "created";
          case "1":
            return "withheld";
          case "2":
            return "readytoship";
          case "3":
            return "shipped";
          default:
            return "created";
        }
      };
      return <OrderStatus type={getStatus(type)} />;
    },
  },
];

export const cellRenderOrderProducts = [
  {
    field: OrderProducts.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
  },
  {
    field: OrderProducts.reference,
    headerName: "REFERENCIA",
    filter: "agTextColumnFilter",
  },
  {
    field: OrderProducts.price,
    headerName: "PREÇO",
    filter: "agTextColumnFilter",
    cellRenderer: (value: any) => {
      const { value: price } = value;
      return <Price price={price} />;
    },
  },
];

export const orderSupplierColumns = [
  {
    field: SuppliersOrdersList.supplierName,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    cellRenderer: "agGroupCellRenderer",
    sortable: true,
  },
  {
    field: SuppliersOrdersList.supplierEmail,
    headerName: "EMAIL",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersOrdersList.date,
    headerName: "DATA",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (data: any) => gridDateFormater(data.value),
  },
  {
    field: SuppliersOrdersList.status,
    headerName: "STATUS",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: type } = value;
      return <SuppliersOrderStatus type={type.toString()} />;
    },
  },
  {
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: false,
    maxWidth: 60,
    cellRenderer: ({ data }: any) => {
      return <EditSupplierColumn id={data?.id} supplierId={data.supplierId} />;
    },
  },
];

export const orderSupplierPartsColumns = [
  {
    field: SuppliersOrdersListParts.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    cellRenderer: "agGroupCellRenderer",
    sortable: true,
  },
  {
    field: SuppliersOrdersListParts.reference,
    headerName: "REFERENCIA",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersOrdersListParts.quantity,
    headerName: "QUANTIDADE",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersOrdersListParts.price,
    headerName: "PREÇO",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: ({ data }: any) => {
      return <Price price={data.price} />;
    },
  },
  {
    field: SuppliersOrdersListParts.isReturned,
    headerName: "STATUS",
    sortable: true,
    cellRenderer: ({ data }: any) => {
      return <ArticleStatus status={data.isRemoved} />;
    },
  },
  {
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: true,
    maxWidth: 120,
    cellRenderer: (data: any) => {
      return <MarkPartsAsRemoved supplierDetails={data} />;
    },
  },
];

export const orderSupplierArticlesColumns = [
  {
    field: SuppliersOrdersListParts.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    cellRenderer: "agGroupCellRenderer",
    sortable: true,
  },
  {
    field: SuppliersOrdersListParts.quantity,
    headerName: "QUANTIDADE",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersOrdersListParts.price,
    headerName: "PREÇO",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: ({ data }: any) => {
      return <Price price={data.price} />;
    },
  },
  {
    field: SuppliersOrdersListParts.isReturned,
    headerName: "STATUS",
    sortable: true,
    cellRenderer: ({ data }: any) => {
      return <ArticleStatus status={data.isRemoved} />;
    },
  },
  {
    headerName: "AÇÕES",
    filter: false,
    enableRowGroup: false,
    sortable: true,
    maxWidth: 120,
    cellRenderer: (data: any) => {
      return <MarkArticlesAsRemoved supplierDetails={data} />;
    },
  },
];

export const createSupplierOrderPartsColumns = [
  {
    field: CreateSupplierOrdersParts.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    cellRenderer: "agGroupCellRenderer",
    sortable: true,
  },
  {
    field: CreateSupplierOrdersParts.referenceNumber,
    headerName: "REFERENCIA",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersOrdersListParts.price,
    headerName: "PREÇO",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: ({ data }: any) => {
      return <Price price={data.price} />;
    },
  },
  {
    field: SuppliersOrdersListParts.quantity,
    headerName: "QUANTIDADE",
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
      return <UpdateSupplierPartsActionsColumn orderPart={data} />;
    },
  },
];

export const createSupplierArticlesColumns = [
  {
    field: SuppliersOrdersListParts.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    cellRenderer: "agGroupCellRenderer",
    sortable: true,
  },
  {
    field: SuppliersOrdersListParts.price,
    headerName: "PREÇO",
    filter: "agTextColumnFilter",

    sortable: true,
    cellRenderer: ({ data }: any) => {
      return <Price price={data.price} />;
    },
  },
  {
    field: SuppliersOrdersListParts.quantity,
    headerName: "QUANTIDADE",
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
      return <UpdateSupplierArticlesActionsColumn orderPart={data} />;
    },
  },
];

export const orderSuppliersNotesHistoryColumns = [
  {
    field: SupplierNotesHistory.user,
    headerName: "UTILIZADOR",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SupplierNotesHistory.dateOccured,
    headerName: "DATA",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (data: any) => gridDateFormater(data.value),
  },
  {
    field: SupplierNotesHistory.oldNotes,
    headerName: "NOTA ANTIGA",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SupplierNotesHistory.updatedNotes,
    headerName: "NOTA ATUALIZADA",
    filter: "agTextColumnFilter",
    sortable: true,
  },
];

export const orderSuppliersStatusHistoryColumns = [
  {
    field: SupplierStatusHistory.user,
    headerName: "UTILIZADOR",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SupplierStatusHistory.dateOccured,
    headerName: "DATA",
    filter: "agTextColumnFilter",
    sortable: true,
    valueFormatter: (data: any) => gridDateFormater(data.value),
  },
  {
    field: SupplierStatusHistory.oldStatus,
    headerName: "STATUS ANTIGO",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: type } = value;

      return <SuppliersOrderStatus type={type.toString()} />;
    },
  },
  {
    field: SupplierStatusHistory.updatedStatus,
    headerName: "STATUS ATUALIZADO",
    sortable: true,
    cellRenderer: (value: any) => {
      const { value: type } = value;

      return <SuppliersOrderStatus type={type.toString()} />;
    },
  },
];

export const orderSuppliersRemovedPartsHistoryColumns = [
  {
    field: SupplierRemovedPartsHistory.user,
    headerName: "UTILIZADOR",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SupplierRemovedPartsHistory.dateOccured,
    headerName: "DATA",
    filter: "agTextColumnFilter",
    valueFormatter: (data: any) => gridDateFormater(data.value),
    sortable: true,
  },
  {
    field: SupplierRemovedPartsHistory.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SupplierRemovedPartsHistory.reference,
    headerName: "REFERENCIA",
    filter: "agTextColumnFilter",
    sortable: true,
  },
];

export const orderSuppliersRemovedArticlesHistoryColumns = [
  {
    field: SuppliersRemovedArticlesHistory.user,
    headerName: "UTILIZADOR",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersRemovedArticlesHistory.dateOccured,
    headerName: "DATA",
    filter: "agTextColumnFilter",
    valueFormatter: (data: any) => gridDateFormater(data.value),
    sortable: true,
  },
  {
    field: SuppliersRemovedArticlesHistory.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    sortable: true,
  },
];

export const orderListPartsColumns = [
  {
    field: CreateSupplierOrdersParts.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    cellRenderer: "agGroupCellRenderer",
    sortable: true,
  },
  {
    field: "reference",
    headerName: "REFERENCIA",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersOrdersListParts.price,
    headerName: "PREÇO",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: ({ data }: any) => {
      return <Price price={data.price} />;
    },
  },
  {
    field: SuppliersOrdersListParts.quantity,
    headerName: "QUANTIDADE",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersOrdersListParts.isReturned,
    headerName: "STATUS",
    sortable: true,
    cellRenderer: ({ data }: any) => {
      return <ArticleStatus status={data.isRemoved} />;
    },
  },
];

export const orderListArticlesColumns = [
  {
    field: CreateSupplierOrdersParts.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    cellRenderer: "agGroupCellRenderer",
    sortable: true,
  },

  {
    field: SuppliersOrdersListParts.price,
    headerName: "PREÇO",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: ({ data }: any) => {
      return <Price price={data.price} />;
    },
  },
  {
    field: SuppliersOrdersListParts.quantity,
    headerName: "QUANTIDADE",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: SuppliersOrdersListParts.isReturned,
    headerName: "STATUS",
    sortable: true,
    cellRenderer: ({ data }: any) => {
      return <ArticleStatus status={data.isRemoved} />;
    },
  },
];
