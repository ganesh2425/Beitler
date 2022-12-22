import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ListingTable = ({ columns, data }: any) => {
    return (
        <div className="w-overflow">
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
                                    <td>{v.ticket_id}</td>
                                    <td>{v.subject}</td>
                                    <td>{v.contact_name}</td>
                                    <td>{v.email}</td>
                                    <td>{v.phone_number}</td>
                                    <td>{v.event_name}</td>
                                    <td>{v.impact}</td>
                                    <td>{v.priority}</td>
                                    <td>{v.lst_modified_date}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <FontAwesomeIcon icon={faPencilAlt} className='mx-2 color-highlight' />
                                            </div>
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