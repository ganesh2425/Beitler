import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
// import { Tooltip } from "@material-ui/core";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";

const EdiQueueColumns = ({
                                    showData
                                }: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "ShipperId",
            label: "Shipper Name",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value): any => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "CarrierId",
            label: "Carrier ID",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "IsEDIProcessed",
            label: "Is EDI Processed",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "EDIProcessedDt",
            label: "Processed Date",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "LMSDbUpdatedDt",
            label: "LMSDB Updated Date",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "IsFTPProcessed",
            label: "Is FTP Processed",
            options: {
                filter: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "Comment",
            label: "Comments",
            options: {
                filter: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "ExecutionType",
            label: "Message Type",
            options: {
                filter: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        }
    ];
};

export default EdiQueueColumns;
