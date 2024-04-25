import {
  faUserGroup,
  faBoxCircleCheck,
  faPeopleSimple,
  faScrewdriverWrench,
  faBoxesStacked,
  faNotes,
  faNotebook,
  faChartSimple,
  faUserGroupSimple,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const tabs = [
  {
    name: "CLIENTES",
    icon: (
      <FontAwesomeIcon
        icon={faPeopleSimple}
        color="white"
        style={{ marginLeft: "0.5rem" }}
      />
    ),
    href: "/dashboard/clients",
  },
  {
    name: "FORNECEDORES",
    icon: (
      <FontAwesomeIcon
        icon={faUserGroup}
        color="white"
        style={{ marginLeft: "0.5rem" }}
      />
    ),
    href: "/dashboard/suppliers",
  },
  {
    name: "ENCOMENDAS",
    icon: (
      <FontAwesomeIcon
        icon={faBoxCircleCheck}
        color="white"
        style={{ marginLeft: "0.5rem" }}
      />
    ),
    href: "/dashboard/orders",
  },

  /*  {
    name: "MAQUINAS",
    icon: (
      <FontAwesomeIcon
        icon={faScrewdriverWrench}
        color="white"
        style={{ marginLeft: "0.5rem" }}
      />
    ),
    href: "/dashboard/machines",
  }, */
  {
    name: "STOCK",
    icon: (
      <FontAwesomeIcon
        icon={faBoxesStacked}
        color="white"
        style={{ marginLeft: "0.5rem" }}
      />
    ),
    href: "/dashboard/stocks",
  },
  /*  {
    name: "ANOTAÇÕES",
    icon: (
      <FontAwesomeIcon
        icon={faNotes}
        color="white"
        style={{ marginLeft: "0.5rem" }}
      />
    ),
    href: "/dashboard/notes",
  }, */
  {
    name: "FATURAS",
    icon: (
      <FontAwesomeIcon
        icon={faChartSimple}
        color="white"
        style={{ marginLeft: "0.5rem" }}
      />
    ),
    href: "/dashboard/accounting",
  },
  {
    name: "CONTABILIDADE",
    icon: (
      <FontAwesomeIcon
        icon={faNotebook}
        color="white"
        style={{ marginLeft: "0.5rem" }}
      />
    ),
    href: "/dashboard/admin/accounting",
  },
  {
    name: "UTILIZADORES",
    icon: (
      <FontAwesomeIcon
        icon={faUserGroupSimple}
        color="white"
        style={{ marginLeft: "0.5rem" }}
      />
    ),
    href: "/dashboard/admin/users",
  },
];
