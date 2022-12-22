// import { Form } from "formik";
import {faPencilAlt, faEye, faTrashAlt, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import {Tooltip} from "@material-ui/core";

const addratesColumn = ({
                            onGetData,
                            onDeleteData,
                            viewData
                        }: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "rangeFrom",
            label: "Range From",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value): any => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "rangeTo",
            label: "Range To",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "rate",
            label: "Rate",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "Id",
            label: "Action",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return (
                        viewData ?  null : (
                            <div className="d-flex align-items-center">
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
                        )

                    )
                },
            },
        }
    ];
};

export default addratesColumn;
