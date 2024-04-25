import { User } from "@/models";
import { EditColumn } from "../components/EditColumn";
import { UserType } from "@/components/components/Columns/UserType";

export const usersColumn = [
  {
    field: User.name,
    headerName: "NOME",
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: User.email,
    headerName: "EMAIL",
    filter: "agTextColumnFilter",
    sortable: true,
  },

  {
    field: User.userType,
    headerName: "TIPO DE UTILIZADOR",
    sortable: true,
    cellRenderer: ({ data }: { data: any }) => {
      return <UserType type={data?.type} />;
    },
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
