import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExcel, faFolder, faNewspaper} from "@fortawesome/free-solid-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {Form} from 'react-bootstrap';

const asnTooltip = (props: any) => (
    <Tooltip id="button-tooltip"  {...props}>
        ASN Icon
    </Tooltip>
);
const tripsheetTooltip = (props: any) => (

    <Tooltip  {...props}>Tripsheet Icon</Tooltip>
);

const bolTooltip = (props: any) => (

    <Tooltip  {...props}>Bol Icon</Tooltip>
);

const DeliveryTableColumn = ({
        onStatusSelect,
                                 reasonCodes
    }: any): MUIDataTableColumnDef[] => {
    return [
        {
            name: "store",
            label: "store",
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
                    return <div>{value ? value.trim() : ''}</div>;
                },
            },
        },
        {
            name: "state",
            label: "State",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value.trim() : ''}</div>;
                },
            },
        },
        {
            name: "shipper",
            label: "Shipper",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value : ''}</div>;
                },
            },
        },
        {
            name: "deliveredWeight",
            label: "Exp Weight",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value : ''}</div>;
                },
            },
        },
        {
            name: "overs",
            label: "Over",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value : ''}</div>;
                },
            },
        },
        {
            name: "short",
            label: "Short",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value : ''}</div>;
                },
            },
        },
        {
            name: "damaged",
            label: "Damaged",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value : ''}</div>;
                },
            },
        },
        {
            name: "plannedDeliveryStartDatetime",
            label: "Start Arrival",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value : ''}</div>;
                },
            },
        },
        {
            name: "plannedDeliveryStartTime",
            label: "Start Time",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value : ''}</div>;
                },
            },
        },
        // {
        //     name: "plannedDeliveryEndTime",
        //     label: "Finish Time",
        //     options: {
        //         // eslint-disable-next-line react/display-name
        //         customBodyRender: (value) => {
        //             return <div>{value? value : ''}</div>;
        //         },
        //     },
        // },
        {
            name: "actualDeliveryEndDatetime",
            label: "Actual Delivery EndTime",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value : ''}</div>;
                },
            },
        },
        {
            name: "plannedDeliveryEndDatetime",
            label: "Planned Delivery EndTime",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value : ''}</div>;
                },
            },
        },
        {
            name: "Store_Signed_by",
            label: "Store Signed By",
            options: {
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value : ''}</div>;
                },
            },
        },
        {
            name: "activeDelStatus",
            label: "Status",
            options: {
                searchable: true,
                display: true,
                viewColumns: true,
                filter: true,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value : ''}</div>;
                },
            },
        },
        {
            name: "lrcVal",
            label: "Late Reason",
            options: {
                searchable: true,
                display: false,
                viewColumns: true,
                filter: true,
                download: true,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value : ''}</div>;
                },
            },
        },
        {
            name: "lateReasonCode",
            label: "LateReasonCode",
            options: {
                searchable: true,
                display: "false",
                viewColumns: false,
                filter: false,
                download: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value) => {
                    return <div>{value? value : ''}</div>;
                },
            },
        },
        {
            name: "StatusDetail",
            label: "Status",
            options: {
                filter: false,
                download: false,
                filterOptions: {
                    names: ["true", "false"],
                    logic(StatusID: any, filterVal: any) {
                        const show =
                            (filterVal === 1 &&
                                (StatusID === true || StatusID === true)) ||
                            (filterVal === 0 &&
                                (StatusID === false || StatusID === false));
                        return !show;
                    },
                },
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, columnData) => {
                    return (
                        <Form.Control
                            as="select"
                            className="delivery-status-dropdown"
                            onChange={() => {
                                onStatusSelect(event, columnData, 'delivery')
                            }}
                        >
                            {
                                value && value.length> 0 && value.map((status: any) => {
                                    return (<option value={status.displayText} key={status.displayText} selected={status.activeStatus === true ? true : false }>{status.displayText}</option>)
                                })
                            }
                        </Form.Control>
                    );
                },
            },
        },
        {
            name: "isLateReason",
            label: "Late Reason",
            options: {
                searchable: false,
                display: true,
                viewColumns: false,
                filter: false,
                download: false,
                // eslint-disable-next-line react/display-name
                customBodyRender: (value, columnData) => {
                    return (
                        value ?
                        <Form.Control
                            as="select"
                            className="late-reason-dropdown"
                            onChange={() => {
                                onStatusSelect(event, columnData, 'late')
                            }}
                        >
                            <option key={0} value={0} >
                                Choose late reason
                            </option>
                            {reasonCodes &&
                            reasonCodes.length > 0 &&
                            reasonCodes.map((reasonCode: any, i: number) => {
                                return (
                                    <option key={i} value={reasonCode.id} selected={reasonCode.id === parseInt(columnData.rowData[15])}>
                                        {reasonCode.displayText}
                                    </option>
                                );
                            })}
                        </Form.Control>
                            : columnData.rowData[14] ? columnData.rowData[14] : ''
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
                        <div className="d-flex align-items-center">
                            <div>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={asnTooltip}
                                >
                                    <div className={'color-highlight'}><FontAwesomeIcon icon={faNewspaper} className='mx-2 color-highlight' /></div>
                                </OverlayTrigger>
                            </div>
                            <div>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={tripsheetTooltip}
                                >
                                    <div className={'color-highlight'}><FontAwesomeIcon icon={faFileExcel} className='mx-2 color-highlight' /></div>
                                </OverlayTrigger>
                            </div>
                            <div>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={bolTooltip}
                                >
                                    <div className={'color-highlight'}><FontAwesomeIcon icon={faFolder} className='mx-2 color-highlight' /></div>

                                </OverlayTrigger>
                            </div>

                        </div>
                    );
                },
            },
        },
    ];
};

export default DeliveryTableColumn;