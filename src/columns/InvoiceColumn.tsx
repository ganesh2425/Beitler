import { MUIDataTableColumnDef } from "mui-datatables";
import React, { useState } from "react";
import { IType } from "../interfaces/types";
import { Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faEye, faTrash, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import ConsigneeDetails from "../components/Claims/Forms/ConsigneeDetails";

let iType = ''
let id = ''
const InvoiceColumn = ({
    showData, pathName, addIdToPaymetList, addPJPrefill
}: any): MUIDataTableColumnDef[] => {
    // const[iType,setIType] = useState('')
    return [
        {
            name: "isCheckBox",
            label: " ",
            options: {
                filter: false,
                download: false,
                viewColumns: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue): any => {
                    id = value
                    return <div>{
                        (value != false) 
                        ? <input type="checkbox" id={value} onClick={addIdToPaymetList} /> 
                        : <input type="checkbox" id={value} onClick={addIdToPaymetList} /> 
                    }</div>;
                },
            },
        },
        {
            name: "ProNumber",
            label: "Invoice Number",
            options: {
                filter: true,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue): any => {

                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "PJNumber",
            label: pathName === 'accounts_payable' ? 'Purchase Journal Number' : 'Invoice Journal Number',
            options: {
                filter: true,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue): any => {

                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "InvoiceDate",
            label: "Invoice Date",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "CustomerName",
            label: "Customer",
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
            name: "ConsigneeName",
            label: "Consignee",
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
            name: "InvoiceStatus",
            label: "Invoice Status",
            options: {
                filter: true,
                setCellProps: () => ({ style: { whiteSpace: "wrap", width: "60px", "textAlign": "right" } }),
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{value}&nbsp;&nbsp;</div>;
                },
            },
        },
        {
            name: "InvoiceAmount",
            label: "Invoice Amount",
            options: {
                filter: true,
                setCellProps: () => ({ style: { whiteSpace: "wrap", width: "60px", "textAlign": "right" } }),
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>{value}&nbsp;&nbsp;</div>;
                },
            },
        },
        {
            name: "InvoiceType",
            label: "Type",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, tableMeta, updateValue) => {
                    iType = value
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "TrailerNumber",
            label: "Trailer Number",
            options: {
                filter: true,
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
                    const InvoicePurchaseType = tableMeta.rowData[6];
                    const theId = id
                    return (
                        <div>

                            {
                            iType != "Purchase Journal" ?
                            <i className="iconMargin" title={pathName === 'accounts_payable' ? 'Purchase Journal' : 'Invoice Journal'}>
                                
                                <Tooltip title="Edit Invoice">
                                    <FontAwesomeIcon
                                        icon={faFileInvoiceDollar}
                                        className="mx-2 color-highlight"
                                        onClick={() => {
                                            console.log("const id ",theId)
                                            addPJPrefill(false,theId)
                                        }}
                                    />
                                </Tooltip>
                            </i>
                            :
                            ''
                             }

                            <i className="iconMargin" title="Edit">
                                <Tooltip title="Edit Invoice">
                                    <FontAwesomeIcon
                                        icon={faPencilAlt}
                                        className="mx-2 color-highlight"
                                        onClick={() => {

                                            showData(value, false, false, InvoicePurchaseType);
                                        }}
                                    />
                                </Tooltip>
                            </i>
                            

                            <i className="iconMargin" title="View">
                                <Tooltip title="View Invoice">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mx-2 color-highlight"
                                        onClick={() => {
                                            showData(value, false, true, InvoicePurchaseType);
                                        }}
                                    />
                                </Tooltip>
                            </i>
                            <i className="iconMargin" title="Delete">
                                <Tooltip title="Delete Invoice">
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="mx-2 color-red"
                                        onClick={() => {
                                            showData(value, true, false, InvoicePurchaseType);
                                        }}
                                    />
                                </Tooltip>
                            </i>
                        </div>
                    );
                },
            },
        },
    ];
};

export default InvoiceColumn;
