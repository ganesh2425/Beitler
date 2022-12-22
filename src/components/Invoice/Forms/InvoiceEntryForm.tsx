import React from 'react';
import { Form, Button, Row, Col, FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
    faAddressBook
} from '@fortawesome/free-solid-svg-icons'

class InvoiceEntryForm extends React.Component {
    render() {
        return (
            <Form>
                <Row className="d-block-sm">
                    <Form.Group as={Col} controlId="Pro Number">
                        <Form.Label>Pro Number</Form.Label>
                        <Form.Control type="text" placeholder="Pro Number" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Ship Date</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Ship Date" />
                            <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Delivery Date</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Delivery Date" />
                            <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Invoice Date</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Invoice Date" />
                            <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Due Date</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Due Date" />
                            <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="d-block-sm">
                    <Form.Group as={Col} controlId="Shipment Type">
                        <Form.Label>Shipment Type</Form.Label>
                        <Form.Control type="text" placeholder="Shipment Type" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Trailer Number">
                        <Form.Label>Trailer Number</Form.Label>
                        <Form.Control type="text" placeholder="Trailer Number" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Miles Class">
                        <Form.Label>Miles Class</Form.Label>
                        <Form.Control type="text" placeholder="Miles Class" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="References#">
                        <Form.Label>References#</Form.Label>
                        <Form.Control type="text" placeholder="References#" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>Has ExtraPickNstop</Form.Label>
                        <Form.Check type="checkbox" id="customControlAutosizing" label="" />
                    </Form.Group>

                </Row>
                <Row className="bg-lgray align-items-center mb-3 d-block-sm">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Customer Name</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Customer Name" />
                            <InputGroup.Text><FontAwesomeIcon icon={faAddressBook} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Address" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" className="select-option">
                                <option value="0">Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="City">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="City" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="ZipCode">
                        <Form.Label>ZipCode</Form.Label>
                        <Form.Control type="text" placeholder="ZipCode" />
                    </Form.Group>
                </Row>
                <Row className="bg-lgray align-items-center mb-3 d-block-sm">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >PickUp Name</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="PickUp Name" />
                            <InputGroup.Text><FontAwesomeIcon icon={faAddressBook} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Address" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" className="select-option">
                                <option value="0">Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="City">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="City" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="ZipCode">
                        <Form.Label>ZipCode</Form.Label>
                        <Form.Control type="text" placeholder="ZipCode" />
                    </Form.Group>
                </Row>
                <Row className="bg-lgray align-items-center mb-3 d-block-sm">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Company Name</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="PickUp Name" />
                            <InputGroup.Text><FontAwesomeIcon icon={faAddressBook} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Address" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" className="select-option">
                                <option value="0">Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="City">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="City" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="ZipCode">
                        <Form.Label>ZipCode</Form.Label>
                        <Form.Control type="text" placeholder="ZipCode" />
                    </Form.Group>
                </Row>
                <Row className="d-block-sm">
                    <Form.Group as={Col} controlId="Notes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                        />
                    </Form.Group>
                </Row>
                
            </Form>

        );
    }

}



export default InvoiceEntryForm;