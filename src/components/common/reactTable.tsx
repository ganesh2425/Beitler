/* eslint-disable react/jsx-key */
import React from "react";
import MUIDataTable from "mui-datatables";
import {
  checkboxEnableGrid,
  optionsDisableGrid,
  optionsOtherGrid,
} from "../../styles/responsive/MuiTable";

const CustomTableComponent = ({
  title,
  columns,
  data,
  options,
  downloadFileName,
  checkbox,
  selectedDeliveryIndex,
  customOptions = {isCustom:false, options:{}}
}: any) => {
 options = options ? optionsOtherGrid(downloadFileName) : checkbox ? checkboxEnableGrid(downloadFileName, selectedDeliveryIndex) : optionsDisableGrid
    if(customOptions.isCustom === true){
      Object.assign(options, {serverSide: customOptions.options.serverSide})
      Object.assign(options, {count: customOptions.options.count})
      Object.assign(options, {onTableChange: customOptions.options.onTableChange})
      Object.assign(options, {rowsPerPage: customOptions.options.rowsPerPage})
      Object.assign(options, {onChangeRowsPerPage: customOptions.options.onChangeRowsPerPage})
      if(customOptions.options.footerOnly){
          Object.assign(options, {viewColumns: false})
          Object.assign(options, {tableBodyMaxHeight: '0'})
          Object.assign(options, {selectToolbarPlacement: 'none'})
          Object.assign(options, {search:false})
          Object.assign(options, {print:false})
          Object.assign(options, {filter:false})
          Object.assign(options, {download:false})
      }
  }

  return (
    <div className="muitable-overview">
    <MUIDataTable
      data={data}
      columns={columns}
      options={
        options 
      }
      title={title}
    />
    </div>
  );
};

export default CustomTableComponent;
