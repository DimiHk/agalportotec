import { Grid } from "@/components/components";
import { ordersService } from "@/services";
import {
  orderListArticlesColumns,
  orderListPartsColumns,
  orderSupplierColumns,
} from "../columns";
import React, { useMemo } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { Notes } from "@/components/components/Columns/Notes";

export const GridWithSuppliersOrders = () => {
  const { orders } = ordersService.handleGetSuppliersOrders();

  const detailCellRenderer = useMemo(() => {
    return Orders;
  }, []);

  return (
    <Grid
      gridData={orders}
      columnDefs={orderSupplierColumns}
      detailCellRenderer={detailCellRenderer}
    />
  );
};

export const Orders = ({ data }: any) => {
  const { parts, articles } = data;

  const detailCellRenderer = useMemo(() => {
    return Notes;
  }, []);

  return (
    <React.Fragment>
      <Tabs mt={2} size={"sm"} variant="enclosed" height={"md"}>
        <TabList>
          <Tab>PARTES DA ENCOMENDA</Tab>
          <Tab>ARTIGOS DA ENCOMENDA</Tab>
        </TabList>
        <TabPanels height={"full"}>
          <TabPanel height={"full"}>
            <Grid
              gridData={parts}
              columnDefs={orderListPartsColumns}
              detailCellRenderer={detailCellRenderer}
            />
          </TabPanel>
          <TabPanel height={"full"}>
            <Grid
              gridData={articles}
              columnDefs={orderListArticlesColumns}
              detailCellRenderer={detailCellRenderer}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </React.Fragment>
  );
};
