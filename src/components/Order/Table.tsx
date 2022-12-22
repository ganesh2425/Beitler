import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faPaste } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// type props = {
//     asnTooltip: boolean
// }

const OSDTooltip = (props: any) => (
    <Tooltip id="button-tooltip"  {...props}>
        OSD Icon
    </Tooltip>
);

const bolTooltip = (props: any) => (
    <Tooltip  {...props}>Bol Icon</Tooltip>
);



const ListingTable = ({ columns, data }: any) => {

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
                                    <td>{v.startarrival}</td>
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
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListingTable;