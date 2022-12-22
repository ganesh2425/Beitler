/* eslint-disable react/jsx-key */
import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import CustomTableComponent from "../components/common/reactTable";
import { themeOtherGrid } from "../styles/responsive/MuiTable";

const CustomTableContainer = ({
  title,
  columns,
  data,
  options,
  downloadFileName,
  checkbox,
  selectedDeliveryIndex,
  customOptions
}: any) => {
  return (
    <MuiThemeProvider theme={themeOtherGrid}>
      <CustomTableComponent
        title={title}
        columns={columns}
        data={data}
        options={options}
        downloadFileName={downloadFileName}
        checkbox={checkbox}
        selectedDeliveryIndex={selectedDeliveryIndex}
        customOptions={customOptions}
      />
    </MuiThemeProvider>
  );
};

export default CustomTableContainer;
