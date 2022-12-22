import React from 'react';
import { Form, Row, Col, FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPaperclip,
    faEllipsisH,
    faPlus
} from '@fortawesome/free-solid-svg-icons'

class BasicDetailsForm extends React.Component {
    render() {
        return (
            <Form>
                <Row className="mt-0 d-block-sm">
                    <Form.Group as={Col} controlId="Ticket ID">
                        <Form.Label>Ticket ID</Form.Label>
                        <Form.Control type="text" placeholder="Ticket ID" disabled />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Event Name</Form.Label>
                        <InputGroup className="mb-2">
                            <Form.Control as="select" className="select-option">
                                <option value="0">Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Control>
                            {/* <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text> */}
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Impact</Form.Label>
                        <InputGroup className="mb-2">
                            <Form.Control as="select" className="select-option">
                                <option value="0">Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Control>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Priority</Form.Label>
                        <InputGroup className="mb-2">
                            <Form.Control as="select" className="select-option">
                                <option value="0">Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Control>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} className="" xs={12}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Subject</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Subject" />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mt-0 d-block-sm">
                    <Form.Group as={Col} controlId="Contact Name" className="">
                        <Form.Label>Contact Name</Form.Label>
                        <Form.Control type="text" placeholder="Contact Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Email" className="">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Email" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Phone" className="">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" placeholder="Phone" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Fax Number" className="">
                        <Form.Label>Fax Number</Form.Label>
                        <Form.Control type="text" placeholder="Fax Number" />
                    </Form.Group>
                </Row>
                <Row className="mt-2 d-block-sm">
                    <Form.Group as={Col} controlId="First Name" className="">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Last Name" className="">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Employee ID" className="">
                        <Form.Label>Employee ID</Form.Label>
                        <Form.Control type="text" placeholder="Employee ID" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Department" className="">
                        <Form.Label>Department</Form.Label>
                        <Form.Control type="text" placeholder="Department" />
                    </Form.Group>
                </Row>
                <Row className="mt-2 d-block-sm">
                    <Form.Group as={Col} controlId="Critical Users" className="w-sm-100" xs={3}>
                        <Form.Label>Critical Users</Form.Label>
                        <Form.Control type="text" placeholder="Critical Users" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Critical Users" className="align-items-center d-flex" xs={3}>
                        <a href="#"><Form.Label>Link Transactions</Form.Label></a>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Notes" className="position-relative">
                        <Form.Label>Attachments</Form.Label>
                        <div className="attachment position-absolute">
                            <a href="" className="mr-2"><FontAwesomeIcon icon={faEllipsisH} /></a>
                            <a href=""><FontAwesomeIcon icon={faPaperclip} /></a>
                        </div>
                        <Form.Control
                            as="textarea"
                            placeholder="Attachments(3)"
                            style={{ height: '40px' }}
                        />
                    </Form.Group>
                </Row>
                <Row className="mt-2 d-block-sm">
                    <Form.Group as={Col} controlId="Notes" className=" w-100 position-relative">
                        <Form.Label>Comments</Form.Label>
                        <div className="attachment position-absolute">
                            <a href="" className="mr-2 text-decoration-none"><FontAwesomeIcon icon={faPlus} />&nbsp;Add Comments</a>
                        </div>
                        <Form.Control
                            as="textarea"
                            placeholder="User A-Commented on 10-05-2021"
                            style={{ height: '50px' }} className=""
                        />
                    </Form.Group>
                </Row>
                <Row className="mt-2 d-block-sm">
                    <Form.Group as={Col} controlId="Notes" className="position-relative">
                        <Form.Control
                            as="textarea"
                            placeholder="User B-Commented on 12-05-2021"
                            style={{ height: '50px' }} className="w-100"
                        />
                    </Form.Group>
                </Row>
            </Form>
        );
    }
}


export default BasicDetailsForm;