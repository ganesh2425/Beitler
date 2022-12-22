import React from "react";
import { Form, Row, Col } from "react-bootstrap";

class ViewEditDamagesForm extends React.Component {
    render() {
        return (
            <div>
                <Form>
                    <Row className="d-block-sm">
                        <Form.Group as={Col} className="mb-3" controlId="VendorName" disabled>
                            <Form.Label column sm="6">Identifier</Form.Label>
                            <Col sm="12">
                                <Form.Control type="text" placeholder="Name" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="Status">
                            <Form.Label column sm="6">Damage Type</Form.Label>
                            <Col sm="12">
                                <Form.Control as="select" className="form-select">
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row className="d-block-sm">
                        <Form.Group as={Col} controlId="Notes" className="position-relative">

                            <Form.Control
                                as="textarea"
                                placeholder="Comments"
                                style={{ height: '50px' }} className="w-100"
                            />
                        </Form.Group>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default ViewEditDamagesForm;