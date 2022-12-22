import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { Form } from 'react-bootstrap';

const ListingTable = ({ columns, data }: any) => {

    return (

        <>
            <div className="inboundList listing w-overflow">
                <table className="table table-bordered inbound-list">
                    <thead>
                        <tr>
                            {columns.map((column: any, i: number) => { return <th key={i}>{column.title}</th>; })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((v: any, i: number) => {
                            return (
                                <tr key={i}>
                                    {/* <td>
                                        <div>
                                            <input type="checkbox" id="" className="form-check-input" />
                                        </div>
                                    </td> */}
                                    <td>{v.pool_loc}</td>
                                    <td>
                                        <Form.Control as="select" className="select-option">
                                            <option value="0">Choose...</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Control>
                                    </td>

                                    <td>{v.receive}</td>
                                    <td>{v.shipper_Ref}</td>
                                    <td>{v.stop}</td>
                                    <td>{v.linehaul_ID}</td>
                                    <td>{v.dc}</td>
                                    <td>{v.linehaul_carrier}</td>
                                    <td>{v.carrier_ph}</td>
                                    <td>{v.seal_nmb}</td>
                                    <td>{v.trailer_num}</td>
                                    <td>{v.ex_pallets}</td>
                                    <td>{v.ex_weight}</td>
                                    <td>{v.line_dept}</td>
                                    <td>{v.line_arrival}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <FontAwesomeIcon icon={faPencilAlt} className='mx-2 color-highlight' />
                                            <FontAwesomeIcon icon={faEye} className='mx-2 color-highlight' />
                                            <FontAwesomeIcon icon={faTrashAlt} className='mx-2 color-red' />
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