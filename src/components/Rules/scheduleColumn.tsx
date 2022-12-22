import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight, faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const ScheduleColumn = ({
                         showData,
                            showRecipients,
    view
                     }: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "intervalData",
            label: "Intervals",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value): any => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "time",
            label: "Schedule Time",
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
                        view ? null :
                        <div>
                            <i className="iconMargin" title="Edit">
                                <Tooltip title="Edit schedule">
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
                                <Tooltip title="Delete schedule">
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        className='mx-2 color-red'
                                        onClick={() => {
                                            if (showData) {
                                                showData(value, true)
                                            }
                                        }}
                                    />
                                </Tooltip>
                            </i>

                            <i className="iconMargin" title="showRecipients">
                                <Tooltip title="View MDS">
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className='mx-2 color-highlight'
                                        onClick={() => {
                                            showRecipients(value)
                                        }}
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

export default ScheduleColumn;
