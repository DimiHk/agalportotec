import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { AG_GRID_LOCALE_PT } from "../../../languages/locale.pt";
import { GridOptions } from "ag-grid-community";

export const Grid = ({
  gridData,
  columnDefs,
  ...props
}: {
  gridData: any;
  columnDefs: any;
} & GridOptions) => {
  const localeText = useMemo(() => AG_GRID_LOCALE_PT, []);

  const gridOptions: GridOptions = {
    enableRangeSelection: false,
    defaultColDef: {
      editable: false,
      filter: true,
      flex: 1,
      floatingFilter: true,
      resizable: true,
      sortable: true,
      suppressMenu: true,
      enableRowGroup: false,
      autoHeight: true,
    },
  };

  return (
    <AgGridReact
      className="ag-theme-balham"
      masterDetail={true}
      sideBar={true}
      rowData={gridData}
      columnDefs={columnDefs}
      animateRows={true}
      pagination={true}
      rowGroupPanelShow={"always"}
      localeText={localeText}
      paginationPageSize={25}
      gridOptions={gridOptions}
      rowSelection="single"
      detailRowAutoHeight={true}
      enableCharts={false}
      suppressRowClickSelection={true}
      {...props}
    />
  );
};
