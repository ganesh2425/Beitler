import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";

const InterlineColumn = ({
                                     onUploadData
                                 }: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "scac",
            label: "SCAC/Carrier Name",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value): any => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "originZip",
            label: "Origin Zip",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "transitZip",
            label: "Transit Zip",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "destinationZip",
            label: "Destination Zip",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "percentage",
            label: "Percent",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "minSplit",
            label: "Minimum Split",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        }
        
    ];
};

export default InterlineColumn;
