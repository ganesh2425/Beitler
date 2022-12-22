import React from 'react';
import { Form, Row, Col, FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
    faClock
} from '@fortawesome/free-solid-svg-icons'
// import InboundTable from './InboundTable';

class BasicDetailsForm extends React.Component {
    render() {
        return (
            <Form className="inbound-basicdetails">
                <Row className="mt-0 d-block-sm">
                    <Form.Group as={Col} controlId="Pool Point Name &amp; Location">
                        <Form.Label>Pool Point Name &amp; Location</Form.Label>
                        <Form.Control type="text" placeholder="Pool Point Name &amp; Location" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Load Bars/ Straps securing Load?</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Load Bars/ Straps securing Load?" />
                            {/* <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text> */}
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Linehaul Carrier</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Linehaul Carrier" />
                            {/* <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text> */}
                        </InputGroup>
                    </Form.Group>
                    {/* <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Invoice Date</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Invoice Date" />
                            <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group> */}
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Was the Trailer Sealed?</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Was the Trailer Sealed?" />
                            {/* <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text> */}
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mt-2 d-block-sm">
                    <Form.Group as={Col} controlId="Trailer Number">
                        <Form.Label>Trailer Number</Form.Label>
                        <Form.Control type="text" placeholder="Trailer Number" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Who Broke the Seal?</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Who Broke the Seal?" />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Seal Number</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Seal Number" />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >BOL Number</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="BOL Number" />
                            {/* <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text> */}
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="d-block-sm">
                    <Form.Group as={Col} controlId="Notes">
                        <Form.Label>Inbound Instructions</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '60px' }}
                        />
                    </Form.Group>
                </Row>

                <Row className="mt-2 d-block-sm">
                    <Form.Group as={Col} controlId="Planned Arrival">
                        <Form.Label>Planned Arrival</Form.Label>
                        <Form.Control type="text" placeholder="Planned Arrival" />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label htmlFor="inlineFormInputGroup" >Actual Arrival Date</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Actual Arrival Date" />
                            <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label htmlFor="inlineFormInputGroup" >Planned Time</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Planned Time" />
                            <InputGroup.Text><FontAwesomeIcon icon={faClock} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label htmlFor="inlineFormInputGroup" >Actual Time</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Actual Time" />
                            <InputGroup.Text><FontAwesomeIcon icon={faClock} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState" sm="2" className="w-sm-100">
                        <Form.Label>Status Code</Form.Label>
                        <Form.Control as="select" className="select-option">
                            <option value="0">Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
            </Form>

        );
    }

}



export default BasicDetailsForm;