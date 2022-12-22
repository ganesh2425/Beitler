import React from 'react';
import { Form, Row, Col, FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'

class BasicDetailsForm extends React.Component {
    render() {
        return (
            <Form>
                <Row className="mt-0 d-block-sm">
                    <Form.Group as={Col} controlId="Claim Number">
                        <Form.Label>Claim Number</Form.Label>
                        <Form.Control type="text" placeholder="Claim Number" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Claimant Name</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Claimant Name" />
                            {/* <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text> */}
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Claimant Number</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Claimant Number" />
                            {/* <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text> */}
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Carrier Name</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Carrier Name" />
                            {/* <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text> */}
                        </InputGroup>
                    </Form.Group>

                </Row>

                <Row className="mt-2 d-block-sm">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Claim Date</Form.Label>
                        <InputGroup className="">
                            <FormControl id="inlineFormInputGroup" placeholder="Claim Date" />
                            <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Carrier Number">
                        <Form.Label>Carrier Number</Form.Label>
                        <Form.Control type="text" placeholder="Carrier Number" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Claim Amount">
                        <Form.Label>Claim Amount</Form.Label>
                        <Form.Control type="text" placeholder="Claim Amount" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Reason">
                        <Form.Label>Reason</Form.Label>
                        <Form.Control type="text" placeholder="Reason" />
                    </Form.Group>



                </Row>

                <Row className="mt-2 d-block-sm">
                    <Form.Group as={Col} controlId="Shipment Description">
                        <Form.Label>Shipment Description</Form.Label>
                        <Form.Control type="text" placeholder="Shipment Description" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Trailer Number">
                        <Form.Label>Trailer Number</Form.Label>
                        <Form.Control type="text" placeholder="Trailer Number" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Routed via">
                        <Form.Label>Routed via</Form.Label>
                        <Form.Control type="text" placeholder="Routed via" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Invoice Number">
                        <Form.Label>Invoice Number</Form.Label>
                        <Form.Control type="text" placeholder="Invoice Number" />
                    </Form.Group>
                </Row>

                <Row className="mt-2 d-block-sm">
                    <Form.Group as={Col} controlId="Original Card Number">
                        <Form.Label>Original Card Number</Form.Label>
                        <Form.Control type="text" placeholder="Original Card Number" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Car Initial">
                        <Form.Label>Car Initial</Form.Label>
                        <Form.Control type="text" placeholder="Car Initial" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" className="select-option">
                            <option value="0">Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Connecting Line Ref" xs={3} className="w-sm-100">
                        <Form.Label>Connecting Line Ref</Form.Label>
                        <Form.Control type="text" placeholder="Connecting Line Ref" />
                    </Form.Group>
                    
                </Row>
                <Row className="mt-2 d-block-sm">
                <Form.Group as={Col} controlId="Consignee Name" xs={3} className="w-sm-100">
                        <Form.Label>Consignee Name</Form.Label>
                        <Form.Control type="text" placeholder="Consignee Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Original Card Number" xs={3} className="w-sm-100">
                        <Form.Label>Is Shiment Reconsigned</Form.Label>
                        <Form.Control type="checkbox" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Reconsigned Details" xs={3} className="w-sm-100">
                        <Form.Label>Reconsigned Details</Form.Label>
                        <Form.Control type="text" placeholder="Reconsigned Details" />
                    </Form.Group>
                </Row>
                <Row className="mt-2 d-block-sm">
                    <Form.Group as={Col} controlId="Remarks">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder=""
                            style={{ height: '100px' }}
                        />
                    </Form.Group>
                </Row>
            </Form>

        );
    }

}



export default BasicDetailsForm;