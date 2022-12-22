import React from "react";
import { Form, Row, Col, FormControl, InputGroup } from "react-bootstrap";
import { faPencilAlt, faPlus, faSave, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

class StoreProfile extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="legalName">
                            <Form.Label>Company</Form.Label>
                            <Form.Control type="text" placeholder="Enter legalName" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="address">
                            <Form.Label>Address(Street#,name)</Form.Label>
                            <Form.Control type="text" placeholder="address" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="buildingFloor">
                            <Form.Label>Address BuildingFloor</Form.Label>
                            <Form.Control type="text" placeholder="Enter building floor" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="City">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="Enter City" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="State">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select" className="select-option">
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="Zip Code">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter Zip Code" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="Phone Number">
                            <Form.Label>Customer Type</Form.Label>
                            <Form.Control type="text" placeholder="CustomerType" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="Description">
                            <Form.Label>Frieght Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="Store Number" xs={3}>
                            <Form.Label>Store Number</Form.Label>
                            <Form.Control type="text" placeholder="Store Number" />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="inlineFormInputGroup" >First Delivery Date</Form.Label>
                            <InputGroup className="mb-2">
                                <FormControl id="inlineFormInputGroup" placeholder="Delivery Date" />
                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                            </InputGroup>
                        </Form.Group>


                        <Form.Group as={Col} controlId="Phone" xs={3}>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Phone" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="Email" xs={3}>
                            <Form.Label>Store Email Address</Form.Label>
                            <Form.Control type="text" placeholder="Email" />
                        </Form.Group>
                    </Row>
                </Form>

                <div className="listing crp-table mt-3">
                    <div className="add-lease d-flex justify-content-end mb-2 color-highlight">
                        <div>
                            <FontAwesomeIcon icon={faPlus} />
                            <span>&nbsp;Add</span>
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Name</th>
                                <th scope="col">Title</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Ext</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ width: '188px' }}>
                                    <span className="content">Primary Contact</span>
                                </td>
                                <td>
                                    <span className="content">Jack</span>
                                </td>
                                <td>
                                    <span className="content">Title 1</span>
                                </td>
                                <td>
                                    <span className="content">9876543210</span>
                                </td>
                                <td>
                                    <span className="content">10001</span>
                                </td>
                                <td>
                                    <span className="content">9876543211</span>
                                </td>
                                <td>
                                    <span className="content">a@mail.com</span>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon icon={faPencilAlt} className={'mx-2 color-highlight'} />
                                        <FontAwesomeIcon icon={faSave} className={'mx-2 crp-edit color-highlight'} />
                                        <FontAwesomeIcon icon={faTrashAlt} className={'color-red mx-2'} />
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    Secondary Contact
                                </td>
                                <td>
                                    Jack
                                </td>
                                <td>
                                    Title 1
                                </td>
                                <td>
                                    9876543211
                                </td>
                                <td>
                                    10001
                                </td>
                                <td>
                                    9876543212
                                </td>
                                <td>
                                    b@mail.com
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon icon={faPencilAlt} className={'mx-2 color-highlight cursor'} />
                                        <FontAwesomeIcon icon={faSave} className={'mx-2 crp-edit color-highlight cursor'} />
                                        <FontAwesomeIcon icon={faTrashAlt} className={'color-red mx-2'} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default StoreProfile;