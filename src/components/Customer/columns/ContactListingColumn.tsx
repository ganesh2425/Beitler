import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getValues } from "../../../utilities/common";
import { TITLES } from "../../../constants/actionTypes";

const ContactListingColumn = ({
    contacts,
    onGetData,
    onDeleteData
}: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "type",
            label: "Type",
            options: {
                filter: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value): any => {
                    return (
                        getValues(contacts, parseInt(value))
                    );
                },
            },
        },
        {
            name: "name",
            label: "Name",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value}</div>;
                },
            },
        },
        {
            name: "title",
            label: "Title",
            options: {
                filter: true,
                filterOptions: {
                    names: ["Mr", "Mrs"],
                    logic(title: any, filterVal: any) {
                        const show =
                            (filterVal.indexOf("Mr") >= 0 &&
                                (title === "1" || title === "1")) ||
                            (filterVal.indexOf("Mrs") >= 0 &&
                                (title === "2" || title === "2"));
                        return !show;
                    },
                },
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return (getValues(TITLES, parseInt(value)));
                },
            },
        },
        {
            name: "ext",
            label: "Ext",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value && parseInt(value) != 0 ? value : ''}</div>;
                },
            },
        },
        {
            name: "phone",
            label: "Phone",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "mobile",
            label: "Mobile",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "email",
            label: "Email",
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

export default ContactListingColumn;
