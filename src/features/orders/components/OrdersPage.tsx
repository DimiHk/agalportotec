import React from "react";
import { GridWithClientsOrders } from "./GridWithClientsOrders";
import { HeaderWithCreateModals } from "./HeaderWithCreateModals";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { GridWithSuppliersOrders } from "./GridWithSuppliersOrders";

export const OrdersPage = () => {
  return (
    <React.Fragment>
      <HeaderWithCreateModals />
      <Tabs mt={2} size={"sm"} variant="enclosed" height={"xl"}>
        <TabList>
          <Tab>ENCOMENDAS DE CLIENTES</Tab>
          <Tab>ENCOMENDAS DE FORNECEDORES</Tab>
        </TabList>
        <TabPanels height={"full"}>
          <TabPanel height={"full"}>
            <GridWithClientsOrders />
          </TabPanel>
          <TabPanel height={"full"}>
            <GridWithSuppliersOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </React.Fragment>
  );
};
