import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { IType } from "../interfaces/types";
import { Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const InvoicePickUpStopColumn = ({
    showPickUpStop,
}: any): MUIDataTableColumnDef[] => {
    return [
        {
            name: "Address",
            label: "Address",
            options: {
                filter: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue): any => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "City",
            label: "City",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "State",
            label: "State",
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
            name: "ZipCode",
            label: "Zip Code",
            options: {
                filter: true,
                setCellProps: () => ({ style: { whiteSpace: "wrap", width: "60px", "textAlign": "right" } }),
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{value}</div>;
                },
            },
        },
        // {
        //     name: "pickStop",
        //     label: "Pickup / Stop",
        //     options: {
        //         filter: true,
        //         setCellProps: () => ({ style: { whiteSpace: "wrap", width: "60px" } }),
        //         // eslint-disable-next-line react/display-name
        //         customBodyRender: (value, tableMeta, updateValue) => {
        //             return <div>{value}</div>;
        //         },
        //     },
        // },
        {
            name: "ReferenceNumber",
            label: "Reference #",
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
            name: "ExtraSequence",
            label: "Extra Sequence",
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
                        (tableMeta.rowData[6] === "Pending" && tableMeta.rowData[7] === false) ?
                            <div>
                                <i className="iconMargin" title="Edit">
                                    <Tooltip title="Edit PickUp Stops">
                                        <FontAwesomeIcon
                                            icon={faPencilAlt}
                                            className="mx-2 color-highlight"
                                            onClick={() => {
                                                showPickUpStop(value, false);
                                            }}
                                        />
                                    </Tooltip>
                                </i>
                                <i className="iconMargin" title="Delete">
                                    <Tooltip title="Delete PickUp Stops">
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="mx-2 color-red"
                                            onClick={() => {
                                                showPickUpStop(value, true);
                                            }}
                                        />
                                    </Tooltip>
                                </i>
                            </div>
                            : ""
                    );
                },
            },
        },
    ];
};

export default InvoicePickUpStopColumn;
