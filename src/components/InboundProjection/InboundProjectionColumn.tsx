import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";

const InboundProjectionColumn = ({
                                     onUploadData
                                 }: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "CarrierID",
            label: "Carrier ID",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value): any => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "ConsigneeID",
            label: "Consignee ID",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "PoolProviderID",
            label: "Pool Provider ID",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "ShipperID",
            label: "Shipper ID",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "ShipperNumber",
            label: "Shipper#",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "PlannedPoolDeliveryStartDatetime",
            label: "Pool Delivery startDatetime",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "PlannedPoolDeliveryEndDatetime",
            label: "Pool Delivery EndDatetime",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "PlannedShipStartDatetime",
            label: "Ship StartDatetime",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "PlannedShipEndDatetime",
            label: "Ship EndDatetime",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "PlannedStoreDeliveryStartDatetime",
            label: "Store Delivery StartDatetime",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "PlannedStoreDeliveryEndDatetime",
            label: "Store Delivery EndDatetime",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
    ];
};

export default InboundProjectionColumn;
