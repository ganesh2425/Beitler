import React  from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faFolder, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// type props = {
//     asnTooltip: boolean
// }

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

const ListingTable = ({ columns, data }: any): JSX.Element => {

    return (

        <>
            <div className="w-overflow">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            {columns.map((column: any, i: number) => { return <th key={i}>{column.title}</th>; })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((v: any, i: number) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        <div>
                                            <input type="checkbox" id="" className="form-check-input" />
                                        </div>
                                    </td>
                                    <td>{v.store}</td>
                                    <td>{v.city}</td>
                                    <td>{v.state}</td>
                                    <td>{v.shipper}</td>
                                    <td>{v.expweight}</td>
                                    <td>{v.over}</td>
                                    <td>{v.short}</td>
                                    <td>{v.damaged}</td>
                                    <td>{v.deliveryarrival}</td>
                                    <td>{v.startTime}</td>
                                    <td>{v.finishTime}</td>
                                    <td>{v.storesignby}</td>
                                    <td>{v.status}</td>
                                    <td>
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
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div></>
    )
}

export default ListingTable;