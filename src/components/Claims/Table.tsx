import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ListingTable = ({ columns, data }: any) => {
    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {
                            columns.map((column: any, i: number) => { return <th key={i}>{column.title}</th> })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((v: any, i: number) => {
                            return (
                                <tr key={i}>
                                    <td>{v.claim_num}</td>
                                    <td>{v.carrier_name}</td>
                                    <td>{v.claim_date}</td>
                                    <td>{v.consignee_name}</td>
                                    <td>{v.invoice_num}</td>
                                    <td>{v.amount_claim}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <FontAwesomeIcon icon={faPencilAlt} className='mx-2 color-highlight' />
                                            </div>
                                            <FontAwesomeIcon icon={faEye} className='mx-2 color-highlight' />
                                            <FontAwesomeIcon icon={faTrashAlt} className='mx-2 color-red' />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListingTable;