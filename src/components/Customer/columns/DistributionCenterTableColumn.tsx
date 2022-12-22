import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { Tooltip } from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";

const DistributionCenterColumns = ({
                                       onGetData,
                                       onDeleteData
                                   }: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "DC_GroupNumber",
            label: "DC Number",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "DC_city",
            label: "City",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "DC_state",
            label: "State",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "DC_zipCode",
            label: "Zip Code",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
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
                                            onGetData(value)
                                        }}
                                    />
                                </Tooltip>
                            </i>

                            <i className="iconMargin" title="Delete">
                                <Tooltip title="Delete Contact">
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

export default DistributionCenterColumns;
