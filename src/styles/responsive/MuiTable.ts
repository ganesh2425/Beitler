import { createTheme } from "@material-ui/core";
import { MUIDataTableOptions } from "mui-datatables";

/// Theme Grid
export const themeOtherGrid = createTheme({
  overrides: {
    MUIDataTableBodyCell: {
      root: {
        paddingTop: "3px !important",
        paddingBottom: "3px !important",
        shadows: "1px solid #dddddd",
        fontSize: "14px !important",
        color: "#212121",
      },
    },
    MUIDataTableHeadCell: {
      root: {
        backgroundColor: "#e4e9f0",
        fontWeight: "bold",
      },
      fixedHeader: {
        backgroundColor: "#e4e9f0",
        fontWeight: "bold",
        paddingTop: "8px !important",
        paddingBottom: "8px !important",
        fontSize: "700",
      },
      data: {
        fontWeight: 700,
        fontSize: "14px !important",
        fontFamily: "Open Sans, serif !important",
      },
    },
    MUIDataTableBodyRow: {
      root: {
        padding: "6px !important",
      },
    },
    MUIDataTableToolbar: {
      root: {
        //backgroundColor: "#e4e9f0",
        //minHeight: "56px",
      },
      filterPaper: {
        maxWidth: "100%",
      },
    },
    MUIDataTableFilter: {
      root: {
        width: "294px",
      },
    },
    MUIDataTableFilterList: {
      root: {
        "margin-bottom": "10px !important;",
      },
    },
    MuiTableCell: {
      root: {
        padding: "5px 5px 5px 10px !important;",
      },
      footer: {
        backgroundColor: "#e4e9f0",
        height: "25px",
        padding: "0 !important",
      },
    },
    // MUIDataTableToolbarSelect: {
    //   root: {
    //     display: "none",
    //   },
    // },
   
    MUIDataTablePagination: {
       //root: {
         //"justify-content": "space-between"
      //   backgroundColor: "#000",
      //   color: "#fff",
       //},
       navContainer: {
        "justify-content": "space-between"
       },
    },
  },
});

// --------------------- Options other Data Grid feature----------------------------------------------------//

export const optionsOtherGrid = (fileName: any): MUIDataTableOptions => ({
  filter: true,
  search: true,
  print: true,
  filterType: "dropdown",
  selectableRowsHeader: true,
  rowsPerPage: 10,
  jumpToPage: true,
  rowsPerPageOptions: [5, 10, 15, 30, 50, 100],
  pagination: true,
  download: true,
  downloadOptions: {
    filename: fileName,
  },
  selectableRows: "none", //comment to show checkboxes
  responsive: "standard",
  textLabels: {
    body: {
      noMatch: "No records found",
      toolTip: "Sort",
    },
    pagination: {
      next: "Next >",
      previous: "< Previous",
      rowsPerPage: "Total items Per Page",
      displayRows: "of",
    },
  },
  fixedHeaderOptions: {
    xAxis: true,
    yAxis: true,
  },
  resizableColumns: true,
  fixedSelectColumn: true,
  onChangePage(currentPage: any) {
    console.log({ currentPage });
  },
  onChangeRowsPerPage(numberOfRows: any) {
    console.log({ numberOfRows });
  },
});

export const optionsDisableGrid: MUIDataTableOptions = {
  filter: true,
  search: false,
  print: false,
  filterType: "dropdown",
  selectableRowsHeader: true,
  rowsPerPage: 0,
  jumpToPage: false,
  rowsPerPageOptions: [],
  pagination: false,
  download: false,
  downloadOptions: {
    filename: "Data.csv",
  },
  selectableRows: "none", //comment to show checkboxes
  responsive: "standard",
  // tableBodyHeight: "400px",
  // tableBodyMaxHeight: "450px",
  textLabels: {
    body: {
      noMatch: "No records found",
      toolTip: "Sort",
    },
    pagination: {
      next: "Next >",
      previous: "< Previous",
      rowsPerPage: "Total items Per Page",
      displayRows: "of",
    },
  },
  fixedHeaderOptions: {
    xAxis: true,
    yAxis: true,
  },
  resizableColumns: true,
  fixedSelectColumn: true,
  onChangePage(currentPage: any) {
    console.log({ currentPage });
  },
  onChangeRowsPerPage(numberOfRows: any) {
    console.log({ numberOfRows });
  },
};

export const checkboxEnableGrid = (fileName: any, selectedDeliveryIndex:any): MUIDataTableOptions => ({
  filter: true,
  search: true,
  print: true,
  filterType: "dropdown",
  selectableRowsHeader: true,
  rowsPerPage: 10,
  jumpToPage: true,
  rowsPerPageOptions: [5, 10, 15, 30, 50, 100],
  pagination: true,
  download: true,
  downloadOptions: {
    filename: fileName,
  },
  selectableRows: "multiple", //comment to show checkboxes
  responsive: "standard",
  textLabels: {
    body: {
      noMatch: "No records found",
      toolTip: "Sort",
    },
    pagination: {
      next: "Next >",
      previous: "< Previous",
      rowsPerPage: "Total items Per Page",
      displayRows: "of",
    },
  },
  fixedHeaderOptions: {
    xAxis: true,
    yAxis: true,
  },
  resizableColumns: true,
  fixedSelectColumn: true,
  onChangePage(currentPage: any) {
    console.log({ currentPage });
  },
  onChangeRowsPerPage(numberOfRows: any) {
    console.log({ numberOfRows });
  },
  onRowSelectionChange(selectedRows: any){
    selectedDeliveryIndex(selectedRows);
  },
});
