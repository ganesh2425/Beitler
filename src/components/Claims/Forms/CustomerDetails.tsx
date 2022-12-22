import React from 'react';
import { Form, Row, Col, FormControl, InputGroup } from "react-bootstrap";

class CustomerDetails extends React.Component {
    render() {
        return (
            <Form>
                <Row className="mt-0 d-block-sm">
                    <Form.Group as={Col} controlId="Address 1">
                        <Form.Label>Address 1</Form.Label>
                        <Form.Control type="text" placeholder="Address 1" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Address 2</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Address 2" />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >City</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="City" />
                        </InputGroup>
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
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="inlineFormInputGroup" >Zip Code</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="Zip Code" />
                        </InputGroup>
                    </Form.Group>
                </Row>
            </Form>

        );
    }

}



export default CustomerDetails;