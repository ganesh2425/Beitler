import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {BoxHead, BoxBody} from "../../../utilities/common";

class MdsEntryForm extends React.Component {
    render(): JSX.Element {
        return (
            <>
                <BoxHead
                    title={'MDS Entry'}
                />
                <BoxBody>
                    <div>
                        <Form>
                            <Row className="mb-3 d-block-sm">
                                <Col xs="3" className="w-sm-100">
                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="Name">
                                            <Form.Label>Name</Form.Label>
                                            <InputGroup className="mb-2">
                                                <Form.Control type="text" placeholder="Name" />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label htmlFor="inlineFormInputGroup" >Effective From</Form.Label>
                                            <InputGroup className="mb-2">
                                                <Form.Control id="inlineFormInputGroup" placeholder="Effective From" />
                                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label htmlFor="inlineFormInputGroup" >Effective To</Form.Label>
                                            <InputGroup className="mb-2">
                                                <Form.Control id="inlineFormInputGroup" placeholder="Effective To" />
                                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                    </Row>
                                </Col>
                                <Col className="w-sm-100">
                                    <Form.Label htmlFor="inlineFormInputGroup" >Comments</Form.Label>
                                    <FloatingLabel controlId="floatingTextarea2" label="" className="mb-2">
                                        <Form.Control
                                            as="textarea"
                                            placeholder=""
                                            style={{ height: '100px' }}
                                        />
                                    </FloatingLabel>
                                    <Form.Group as={Col} controlId="">
                                        <Form.Label>Is PP Agreed</Form.Label>
                                        <Form.Check type="checkbox" id="customControlAutosizing" label="" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        <div className="inbound-table position-relative">
                            <div className="d-flex justify-content-between my-4">
                                <Button
                                    className='ml-auto btn-md-w'
                                    variant="primary"
                                >
                                    Upload
                                </Button>
                                <div>
                                    <Button className="mr-2 btn-md-w" variant="secondary">
                                        Cancel
                                    </Button>
                                    <Button variant="primary" className="btn-md-w">
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </BoxBody>
            </>
        )
    }
}

export default MdsEntryForm;