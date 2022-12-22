import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, FloatingLabel, Form } from "react-bootstrap";

const CustomerTable = ({ columns, data }: any) => {
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
                                    <td>
                                        <div>
                                            <FloatingLabel controlId="floatingTextarea2" label="Question" >
                                                <Form.Control
                                                    as="textarea"
                                                    style={{ height: '200px' }} className="w-100"
                                                />
                                            </FloatingLabel>
                                        </div>
                                    </td>
                                    <td> <div>
                                        <FloatingLabel controlId="floatingTextarea2" label="Answer" className="w-100">
                                            <Form.Control
                                                as="textarea"
                                                style={{ height: '200px' }} className="w-100"
                                            />
                                        </FloatingLabel>
                                    </div></td>
                                    <td>
                                        <Form.Group as={Col} controlId="Category">
                                            <Form.Control as="select" className="select-option w-100">
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </td>
                                    <td>{v.sequence}</td>
                                    <td><Form.Group as={Col} controlId="">
                                        <Form.Check type="checkbox" id="customControlAutosizing" label="" />
                                    </Form.Group></td>
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