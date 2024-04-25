import React from "react";
import { HeaderWithCreateModals } from "./HeaderWithCreateModals";
import { GridWithClients } from "./GridWithClients";

export const ClientsPage = () => {
  return (
    <React.Fragment>
      <HeaderWithCreateModals />
      <GridWithClients />
    </React.Fragment>
  );
};
