import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { Tooltip } from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";

const CustomerListingColumns = ({
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
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "Federal_Tax_ID",
            label: "Fed Tax ID",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "DOT_Number",
            label: "DOT#",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "SCAC",
            label: "SCAC#",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        
        {
            name: "Entity_Type_Id",
            label: "Type",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value === 91 ? 'Vendor' : 'Carrier' : 'Carrier'}</div>;
                },
            },
        },
        {
            name: "Address_Id",
            label: "City",
            options: {
                filter: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value && value.length > 0 && value[0].City ? value[0].City : ''}</div>;
                },
            },
        },
        {
            name: "Address_Id",
            label: "Zipcode",
            options: {
                filter: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value && value.length > 0 && value[0].Zipcode ? value[0].Zipcode : ''}</div>;
                },
            },
        },
        {
            name: "Address_Id",
            label: "Phone Number",
            options: {
                filter: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value && value.length > 0 && value[0].Phone  ? parseInt(value[0].Phone) != 0 ? value[0].Phone : '' : ''}</div>;
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

export default CustomerListingColumns;
