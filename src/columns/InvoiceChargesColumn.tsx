import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { IType } from "../interfaces/types";
import { Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const InvoiceChargesColumn = ({
    showCharges,
    isEdit,
}: any): MUIDataTableColumnDef[] => {
    return [
        {
            name: "Charge_Id",
            label: "Charge",
            options: {
                display: "excluded",
                print: false,
                download: false,
                filter: false,
                viewColumns: false,
                setCellProps: () => ({ style: { whiteSpace: "wrap", width: "60px" } }),
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue): any => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "Charge_Name",
            label: "Charge Type",
            options: {
                filter: true,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue): any => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "Rate_Type_Id",
            label: "Rate Type",
            options: {
                display: "excluded",
                print: false,
                download: false,
                filter: false,
                viewColumns: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "Invoice_Description",
            label: "Description",
            options: {
                filter: true,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "UOM",
            label: "UOM",
            options: {
                display: "excluded",
                print: false,
                download: false,
                filter: false,
                viewColumns: false,
                setCellProps: () => ({ style: { whiteSpace: "wrap", width: "60px" } }),
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "UOM_Name",
            label: "UOM",
            options: {
                filter: true,
                setCellProps: () => ({ style: { whiteSpace: "wrap", width: "60px" } }),
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "Quantity",
            label: "Quantity",
            options: {
                filter: true,
                setCellProps: () => ({ style: { whiteSpace: "wrap", width: "60px", "textAlign": "right" } }),
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "Charged_Per_Rate",
            label: "Rate Per",
            options: {
                filter: true,
                setCellProps: () => ({ style: { whiteSpace: "wrap", width: "60px", "textAlign": "right" } }),
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{"$" + value === undefined ? '0.000' : value}</div>;
                },
            },
        },
        {
            name: "Amount",
            label: "Total Price",
            options: {
                filter: true,
                setCellProps: () => ({ style: { whiteSpace: "wrap", width: "60px", "textAlign": "right" } }),
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{"$" + value}</div>;
                },
            },
        },
        {
            name: "InvoiceStatus",
            label: "Invoice Status",
            options: {
                display: "excluded",
                print: false,
                download: false,
                filter: false,
                viewColumns: false,
                setCellProps: () => ({ style: { whiteSpace: "wrap", width: "60px" } }),
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "InvoiceViewMode",
            label: "Invoice View",
            options: {
                display: "excluded",
                print: false,
                download: false,
                filter: false,
                viewColumns: false,
                setCellProps: () => ({ style: { whiteSpace: "wrap", width: "60px" } }),
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "Id",
            label: "Actions",
            options: {
                print: false,
                download: false,
                filter: false,
                viewColumns: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {

                    return (
                        <>
                            {
                                (tableMeta.rowData[9] === "Pending" && tableMeta.rowData[10] === false) ?
                                    <div>
                                        <i className="iconMargin" title="Edit">
                                            <Tooltip title="Edit Charges">
                                                <FontAwesomeIcon
                                                    icon={faPencilAlt}
                                                    className="mx-2 color-highlight"
                                                    onClick={() => {
                                                        isEdit === false ? toast.error("You are not authorized to edit this invoice") : showCharges(value);
                                                        showCharges(value, false);
                                                    }}
                                                />
                                            </Tooltip>
                                        </i>
                                        <i className="iconMargin" title="Delete">
                                            <Tooltip title="Delete Charges">
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="mx-2 color-red"
                                                    onClick={() => {
                                                        showCharges(value, true);
                                                    }}
                                                />
                                            </Tooltip>
                                        </i>
                                    </div>
                                    :
                                    ""
                            }
                        </>
                    );
                },
            },
        },
    ];
};

export default InvoiceChargesColumn;
