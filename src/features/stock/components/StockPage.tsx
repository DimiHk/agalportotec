import { Grid } from "@/components/components";
import { stockService } from "@/services";
import React, { useMemo } from "react";
import { stocksColumns } from "../columns";
import { Box, Tag } from "@chakra-ui/react";
import { HeaderWithCreateModals } from "./HeaderWithCreateModals";

export const StockPage = () => {
  const { stock } = stockService.handleGetStock();

  const detailCellRenderer = useMemo(() => {
    return Clients;
  }, []);

  return (
    <React.Fragment>
      <HeaderWithCreateModals />
      <Grid
        gridData={stock}
        columnDefs={stocksColumns}
        detailCellRenderer={detailCellRenderer}
      />
    </React.Fragment>
  );
};

const Clients = ({ data }: any) => {
  const { clientNames } = data;

  return (
    <React.Fragment>
      <Box width={"small"} height={"small"} padding={"2"}>
        {clientNames?.map((client: string) => {
          return (
            <Tag fontSize={"xs"} key={client}>
              {client}
            </Tag>
          );
        })}
      </Box>
    </React.Fragment>
  );
};
