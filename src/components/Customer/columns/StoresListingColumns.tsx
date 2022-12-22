import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { Tooltip } from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";

const StoresListingColumns = ({
                                    showData
                                }: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "LegalName",
            label: "Legal Name",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value): any => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "MC_Number",
            label: "MC#",
            options:{
                display: false,
                filter: false,
                viewColumns: false,
                download: false
            }
        },
        {
            name: "Federal_Tax_ID",
            label: "Fed Tax ID",
            options:{
                display: false,
                filter: false,
                viewColumns: false,
                download: false
            }
        },
        {
            name: "DOT_Number",
            label: "DOT#",
            options:{
                display: false,
                filter: false,
                viewColumns: false,
                download: false
            }
        },
        {
            name: "SCAC",
            label: "SCAC#",
            options:{
                display: false,
                filter: false,
                viewColumns: false,
                download: false
            }
        },
        {
            name: "StoreNumber",
            label: "Store Number",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "Zipcode",
            label: "Zipcode",
            options: {
                filter: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "Zone",
            label: "Zone",
            options: {
                filter: true,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "IsActive",
            label: "Status",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "id",
            label: "Actions",
            options: {
                print: false,
                download: false,
                filter: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return (
                        <div>
                            <i className="iconMargin" title="Edit">
                                <Tooltip title="Edit Contact">
                                    <FontAwesomeIcon
                                        icon={faPencilAlt}
                                        className='mx-2 color-highlight'
                                        onClick={() => {
                                            if (showData) {
                                                showData(value, false)
                                            }
                                        }}
                                    />
                                </Tooltip>
                            </i>

                            <i className="iconMargin" title="Delete">
                                <Tooltip title="Delete Contact">
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            if (showData) {
                                                showData(value, true)
                                            }
                                        }}
                                        icon={faTrash}
                                        className='mx-2 color-red'
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

export default StoresListingColumns;
