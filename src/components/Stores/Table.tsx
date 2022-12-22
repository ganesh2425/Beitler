import React from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const CustomerTable = ({ columns, data }: any): JSX.Element => {
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
                                    <td>{v.company_name}</td>
                                    <td>{v.store_id}</td>
                                    <td>
                                        <div>
                                            <Form.Control as="select" className="select-option w-100">
                                                <option value="0">Choose...</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Control>
                                        </div>
                                    </td>
                                    <td>{v.Fdd}</td>
                                    <td>{v.city}</td>
                                    <td>{v.zipcode}</td>
                                    <td>{v.phone}</td>
                                    <td>{v.primary_contact}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <FontAwesomeIcon icon={faPencilAlt} className='mx-2 color-highlight cursor' />
                                            </div>
                                            <FontAwesomeIcon icon={faTrashAlt} className='mx-2 color-red cursor' />
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

export default CustomerTable;