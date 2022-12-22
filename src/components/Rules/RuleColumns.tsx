import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const RuleColumns = ({
    showData,
    onGetData,
    onDeleteData
}: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "description",
            label: "Rules Name",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value): any => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "eventName",
            label: "Events",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "notificationCount",
            label: "Notification Count",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "entityName",
            label: "Entity",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? 'true' : 'false'}</div>;
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
                                <Tooltip title="Edit MDS">
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

export default RuleColumns;
