import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel'

class Delivery extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <Row className="my-2">
                    <Col>
                        <Form>
                            <Row >
                                <div className="pl-0"><h5>Delivery Schedule</h5></div>
                                <table className="table table-bordered table_del-schedule mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Days</th>
                                            <th scope="col">Early Arrival</th>
                                            <th scope="col">Late Arrival</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th style={{ width: '188px' }}>
                                                <span className="content">Sunday</span>
                                            </th>
                                            <td>
                                                <span className="content">700</span>
                                            </td>
                                            <td>
                                                <span className="content">900</span>
                                            </td>

                                        </tr>
                                        <tr>
                                            <th style={{ width: '188px' }}>
                                                <span className="content">Monday</span>
                                            </th>
                                            <td>
                                                <span className="content">700</span>
                                            </td>
                                            <td>
                                                <span className="content">900</span>
                                            </td>

                                        </tr>
                                        <tr>
                                            <th style={{ width: '188px' }}>
                                                <span className="content">Tuesday</span>
                                            </th>
                                            <td>
                                                <span className="content">700</span>
                                            </td>
                                            <td>
                                                <span className="content">900</span>
                                            </td>

                                        </tr>
                                        <tr>
                                            <th style={{ width: '188px' }}>
                                                <span className="content">Wednesday</span>
                                            </th>
                                            <td>
                                                <span className="content">700</span>
                                            </td>
                                            <td>
                                                <span className="content">900</span>
                                            </td>

                                        </tr>
                                        <tr>
                                            <th style={{ width: '188px' }}>
                                                <span className="content">Thursday</span>
                                            </th>
                                            <td>
                                                <span className="content">700</span>
                                            </td>
                                            <td>
                                                <span className="content">900</span>
                                            </td>

                                        </tr>
                                        <tr>
                                            <th style={{ width: '188px' }}>
                                                <span className="content">Friday</span>
                                            </th>
                                            <td>
                                                <span className="content">700</span>
                                            </td>
                                            <td>
                                                <span className="content">900</span>
                                            </td>

                                        </tr>
                                        <tr>
                                            <th style={{ width: '188px' }}>
                                                <span className="content">Saturday</span>
                                            </th>
                                            <td>
                                                <span className="content">700</span>
                                            </td>
                                            <td>
                                                <span className="content">900</span>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </Row>
                        </Form>
                    </Col>
                    <Col>
                        <div><h5>Delivery Instruction (show on BOL)</h5></div>
                        <FloatingLabel controlId="floatingTextarea2" label="">
                            {/* label="Delivery Instruction (show on BOL)" */}
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '266px' }}
                            />
                        </FloatingLabel></Col>
                </Row>

            </div>
        )
    }
}

export default Delivery;