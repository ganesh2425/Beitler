// import { Form } from "formik";
import {faPencilAlt, faEye, faTrashAlt, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { Col } from "react-bootstrap";
import * as BS from "react-bootstrap";
import {Tooltip} from "@material-ui/core";

const ratestypesColumn = ({
                              showRatesData,
                              view
}: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "rateTypeName",
            label: "Rate Type",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value): any => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "UOM",
            label: "UOM",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "transTypeName",
            label: "Transaction Type",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "MinValue",
            label: "Min Value",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "MaxValue",
            label: "Max Value",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "DefaultValue",
            label: "Default Value",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "id",
            label: "Action",
            options: {
                filter: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return (
                        view ?
                            <i className="iconMargin" title="Edit">
                                <Tooltip title="Edit Contact">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className='mx-2 color-highlight'
                                        onClick={() => {
                                            if (showRatesData) {
                                                showRatesData(value, false, true)
                                            }
                                        }}
                                    />
                                </Tooltip>
                            </i>
                            :
                        <div>
                            <i className="iconMargin" title="Edit">
                                <Tooltip title="Edit Contact">
                                    <FontAwesomeIcon
                                        icon={faPencilAlt}
                                        className='mx-2 color-highlight'
                                        onClick={() => {
                                            if (showRatesData) {
                                                showRatesData(value, false)
                                            }
                                        }}
                                    />
                                </Tooltip>
                            </i>

                            <i className="iconMargin" title="Delete">
                                <Tooltip title="Delete Contact">
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            if (showRatesData) {
                                                showRatesData(value, true)
                                            }
                                        }}
                                        icon={faTrash}
                                        className='mx-2 color-red'
                                    />
                                </Tooltip>
                            </i>
                        </div>
                    )
                },
            },
        }
    ];
};

export default ratestypesColumn;
