// import { Form } from "formik";
import {faPencilAlt, faEye, faTrashAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { Col } from "react-bootstrap";
import * as BS from "react-bootstrap";
import moment from "moment";
import {Tooltip} from "@material-ui/core";

const rateslistingColumn = ({
                                showData,
                                onUploadData,
                                sectionType,
                                customers,
                                carriers
                            }: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "sectionName",
            label: "Section Type",
            options: {
                // setCellProps: () => ({ style: { minWidth: "500", maxWidth: "500" }}),
                // eslint-disable-next-line react/display-name
                customBodyRender: (data, type, row) => {return <>{data}</>}
            },
        },
        {
            name: "customerName",
            label: "Customer",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "carrierName",
            label: "Carrier",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "effectiveStart",
            label: "Effective Start Date",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "effectiveEnd",
            label: "Effective End Date",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "activeState",
            label: "Status",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value: any) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "id",
            label: "Action",
            options: {
                print: false,
                download: false,
                filter: false,
                viewColumns: false,
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
                                                showData(value, false, false)
                                            }
                                        }}
                                    />
                                </Tooltip>
                            </i>
                            <i className="iconMargin" title="View">
                                <Tooltip title="View Invoice">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mx-2 color-highlight"
                                        onClick={() => {
                                            if (showData) {
                                                showData(value, false, true)
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
                                                showData(value, true, false)
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
        }
    ];
};

export default rateslistingColumn;
