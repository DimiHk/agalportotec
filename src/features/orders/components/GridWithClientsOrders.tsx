import { Grid } from "@/components/components";
import { ordersService } from "@/services";
import { cellRenderOrderProducts, orderColumns } from "../columns";
import { useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

export const GridWithClientsOrders = () => {
  const { orders } = ordersService.handleGetOrders();

  const detailCellRenderer = useMemo(() => {
    return Orders;
  }, []);

  return (
    <Grid
      gridData={orders}
      columnDefs={orderColumns}
      detailCellRenderer={detailCellRenderer}
    />
  );
};

export const Orders = ({ data }: any) => {
  const { parts } = data;

  return (
    <React.Fragment>
      {parts.length > 0 ? (
        <Box width={"small"} height={"md"} padding={"2"}>
          <Grid
            rowGroupPanelShow={"never"}
            sideBar={false}
            gridData={parts}
            columnDefs={cellRenderOrderProducts}
          />
        </Box>
      ) : (
        <Box width={"small"} height={"small"} padding={"2"}>
          <Text
            backgroundColor={"gray.100"}
            padding={2}
            borderRadius={"base"}
            fontWeight={"semibold"}
            fontSize={"small"}
            textAlign={"center"}
          >
            NÃO EXISTEM PEÇAS DE STOCK!
          </Text>
        </Box>
      )}
    </React.Fragment>
  );
};
