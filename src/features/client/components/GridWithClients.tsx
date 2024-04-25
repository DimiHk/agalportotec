import { Grid } from "@/components/components";
import { clientService } from "@/services";
import { columnDefs } from "../columns";
import { useMemo } from "react";
import { Notes } from "@/components/components/Columns/Notes";

export const GridWithClients = () => {
  const { clients } = clientService.handleGetClients();

  const detailCellRenderer = useMemo(() => {
    return Notes;
  }, []);

  return (
    <Grid
      gridData={clients}
      columnDefs={columnDefs}
      detailCellRenderer={detailCellRenderer}
    />
  );
};
