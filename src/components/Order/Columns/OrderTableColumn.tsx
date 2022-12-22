import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faPaste } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
const OSDTooltip = (props: any) => (
    <Tooltip id="button-tooltip"  {...props}>
        OSD Icon
    </Tooltip>
);

const bolTooltip = (props: any) => (
    <Tooltip  {...props}>Bol Icon</Tooltip>
);

const OrderTableColumn = ({
    onGetData,
    onDeleteData
}: any): MUIDataTableColumnDef[] => {

    return [
        {
            name: "store",
            label: "Store",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value): any => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "city",
            label: "City",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "state",
            label: "State",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "shipper",
            label: "Shipper",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "expectedWeight",
            label: "Exp Weight",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "over",
            label: "Over",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "short",
            label: "Short",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "damaged",
            label: "Damaged",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "shipperDeliveryStartDatetime",
            label: "Start Arrival",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? moment(value).format('MM/DD/YYYY') : ''}</div>;
                },
            },
        },
        {
            name: "shipperDeliveryStartDatetime",
            label: "Start Time",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? moment(value).format("HH:mm") : ''}</div>;
                },
            },
        },
        {
            name: "shipperDeliveryEndDatetime",
            label: "Finish Time",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? moment(value).format("HH:mm") : ''}</div>;
                },
            },
        },
        {
            name: "Store_Signed_by",
            label: "Store Signed By",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value ? value : ''}</div>;
                },
            },
        },
        {
            name: "statusID",
            label: "Status",
            options: {
                filter: true,
                filterOptions: {
                    names: ["true", "false"],
                    logic(StatusID: any, filterVal: any) {
                        console.log(filterVal)
                        const show =
                            (filterVal === 1 &&
                                (StatusID === true || StatusID === true)) ||
                            (filterVal === 0 &&
                                (StatusID === false || StatusID === false));
                        return !show;
                    },
                },
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return (
                        <div>
                            {value.toString() === "true"
                                ? "True"
                                : value.toString() === "false"
                                    ? "False"
                                    : "False"}
                        </div>
                    );
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
                        <>
                            <div className="d-flex align-items-center">
                                <div>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={OSDTooltip}
                                    >
                                        <div className={'color-highlight'}><FontAwesomeIcon icon={faPaste} className='mx-2 color-highlight cursor' /></div>
                                    </OverlayTrigger>
                                </div>
                                <div>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={bolTooltip}
                                    >
                                        <div className={'color-highlight'}><FontAwesomeIcon icon={faFolder} className='mx-2 color-highlight cursor' /></div>

                                    </OverlayTrigger>
                                </div>

                            </div>
                        </>
                    );
                },
            },
        },
    ];
};

export default OrderTableColumn;