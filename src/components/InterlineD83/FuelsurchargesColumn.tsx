import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";

const FuelsurchargesColumn = ({
                                     onUploadData
                                 }: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "doE_Fuel_From",
            label: "DOE Fuel Index From",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "doE_Fuel_To",
            label: "DOE Fuel Index To",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        // {
        //     name: "doeFuelIndex",
        //     label: "DOE Fuel Index",
        //     options: {
        //         // eslint-disable-next-line react/display-name
        //         customBodyRender: (value, tableMeta, updateValue): any => {
        //             return (
        //                 <div>{tableMeta.rowData[0]} - {tableMeta.rowData[1]}</div>
        //             );
        //         },
        //     },
        // },
        {
            name: "percentage",
            label: "FSC Percent",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        // {
        //     name: "fsC_Min",
        //     label: "Min",
        //     options: {
        //         // eslint-disable-next-line react/display-name
        //         customBodyRender: (value) => {
        //             return <div>{value}</div>;
        //         },
        //     },
        // },
        // {
        //     name: "fsC_Max",
        //     label: "Max",
        //     options: {
        //         // eslint-disable-next-line react/display-name
        //         customBodyRender: (value) => {
        //             return <div>{value }</div>;
        //         },
        //     },
        // },
        {
            name: "fas_per_mile",
            label: "FSC Per Mile",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        }
    ];
};

export default FuelsurchargesColumn;
