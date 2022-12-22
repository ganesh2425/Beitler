import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const InboundColumns = ({
    onDownloadData,
    onGetData,
    onDeleteData
}: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "name",
            label: "Pool Location",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value): any => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "EffectiveFrom",
            label: "Status",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "EffectiveTo",
            label: "Receive",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "IsPPAgreed",
            label: "Shipper Ref",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? 'true' : 'false'}</div>;
                },
            },
        },
        {
            name: "Comments",
            label: "Stop",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "Comments",
            label: "Linehaul ID",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "Comments",
            label: "DC",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "Comments",
            label: "Linehaul Carrier",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        }, {
            name: "Comments",
            label: "Carrier Phone",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        }, {
            name: "Comments",
            label: "Seal#",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        }, {
            name: "Comments",
            label: "Trailer#",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        }, {
            name: "Comments",
            label: "Ex. Pallets",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        }, {
            name: "Comments",
            label: "Ex. Weight",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        }, {
            name: "Comments",
            label: "Linehaul Dept",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        }, {
            name: "Comments",
            label: "Linehaul Arrival",
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
                                <Tooltip title="Download MDS">
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        className='mx-2 color-highlight'
                                        onClick={() => {
                                            onGetData(value)
                                        }}
                                    />
                                </Tooltip>
                            </i>
                            <i className="iconMargin" title="Edit">
                                <Tooltip title="Edit MDS">
                                    <FontAwesomeIcon
                                        icon={faPencilAlt}
                                        className='mx-2 color-highlight'
                                        onClick={() => {
                                            onGetData(value)
                                        }}
                                    />
                                </Tooltip>
                            </i>

                            <i className="iconMargin" title="Edit">
                                <Tooltip title="View MDS">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className='mx-2 color-highlight'
                                        onClick={() => {
                                            onGetData(value)
                                        }}
                                    />
                                </Tooltip>
                            </i>

                            <i className="iconMargin" title="Delete">
                                <Tooltip title="Delete MDS">
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            onDeleteData(value)
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

export default InboundColumns;
