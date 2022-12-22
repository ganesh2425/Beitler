import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { Tooltip } from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";

const PermissionTableColumn = ({                                                        
                                  onGetData,
                                   onDeleteData
                              }: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "name",
            label: "Name",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value): any => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "description",
            label: "Description",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "parentName",
            label: "Parent Name",
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
                                <Tooltip title="Edit Permission">
                                    <FontAwesomeIcon
                                        icon={faPencilAlt}
                                        className='mx-2 color-highlight'
                                        onClick={() => {
                                            onGetData(value)
                                        }}
                                    />
                                </Tooltip>
                            </i>

                            <i className="iconMargin" title="Delete">
                                <Tooltip title="Delete Permission">
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

export default PermissionTableColumn;
