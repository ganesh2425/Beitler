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
                    <Form.Group as={Col} controlId="ChequeNumber">
                        <Form.Label>Cheque Number</Form.Label>
                        <Form.Control type="text" placeholder="Cheque Number" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="ChequeAmount">
                        <Form.Label>Cheque Amount</Form.Label>
                        <Form.Control type="text" placeholder="Cheque Amount" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Cheque Date</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Cheque Date" />
                            <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="PayeeName">
                        <Form.Label>Payee Name</Form.Label>
                        <Form.Control type="text" placeholder="Payee Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="BankName">
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control type="text" placeholder="Bank Name" />
                    </Form.Group>
                </Row>
            </Form>

        );
    }

}



export default BasicDetailsForm;