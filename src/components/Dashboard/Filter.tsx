import React from 'react';
import { Col, Form, InputGroup, Row } from "react-bootstrap";

interface IState {
    startDate: Date,
    endDate?: string
}

class Filter extends React.Component {
    state: Readonly<IState> = {
        startDate: new Date(),
        endDate: ''
    }


    render(): JSX.Element {
        // const { startDate, endDate } = this.state;
        return (

            <>
                <Row className="my-0 align-items-center">
                    <Col>
                        <div className="">
                            <h3 className="page-title"><strong>Dashboard</strong></h3>
                        </div>
                    </Col>
                    <Col>
                        <Row className="mt-0">
                            <Form.Group as={Col} controlId="By Carrier">
                                <Form.Label>By Carrier</Form.Label>
                                <Form.Control as="select" className="select-option">
                                    <option value="0">Choose...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="Duration From & To">
                                <Form.Label htmlFor="inlineFormInputGroup" >Duration From &amp; To</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control id="inlineFormInputGroup" placeholder="Duration From &amp; To" />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                    </Col>
                </Row>


                {/* <div className="form-row">
                    <div className="col-md-3">

                    </div>
                    <div className="col-md-9">
                        <div className="form-row justify-content-end">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor=''>By Carrier</label>
                                    <div className="">
                                        <select className="form-select mb-3 form-control" aria-label="Default select">
                                            <option>select</option>
                                            <option value="1">Carrier 1</option>
                                            <option value="2">Carrier 2</option>
                                            <option value="3">Carrier 3</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor=''>Duration From & To</label>
                                    <div className="">
                                        <input type={'text'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

            </>

        );
    }
}

export default Filter;