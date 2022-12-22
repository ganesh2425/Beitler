import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MdsDetailTable from "./MdsDetailTable";
import Paginate from "../common/Pagination";
import ListingSearch from "../common/Search";
import { PageContent, BoxHead, BoxBody } from "../../utilities/common";

const columns = [
    {
        title: 'Store Number',
        type: 'string'
    },
    {
        title: 'Address',
        type: 'string'
    },
    {
        title: 'City',
        type: 'string'
    },
    {
        title: 'State',
        type: 'string'
    },
    {
        title: 'Zipcode',
        type: 'string'
    },
    {
        title: 'Day',
        type: 'string'
    },
    {
        title: 'Start Time',
        type: 'string'
    },
    {
        title: 'End Time',
        type: 'string'
    },
];

const data = [
    {
        StoreNumber: 'Bl6765',
        address: 'Mont Lake View',
        city: 'Brookyln',
        state: 'New York',
        zipcode: '10001',
        day: 'Mon',
        startTime: '09:30 am',
        endTime: '09: 30 pm'
    },
    {
        StoreNumber: 'Bl6766',
        address: 'Mont Lake View',
        city: 'Brookyln',
        state: 'New York',
        zipcode: '10001',
        day: 'Wed',
        startTime: '09:30 am',
        endTime: '10: 30 pm'
    }
]




class MdsDetail extends React.Component {
    render(): JSX.Element {
        return (
            <>
                <PageContent>
                    <BoxHead
                        title={'MDS Details View'}
                    ></BoxHead>
                    <BoxBody>
                        <Form>
                            <Row className="mb-3 d-block-sm">
                                <Col xs="3" className="w-sm-100">
                                    <Row className="mb-3 d-block-sm">
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

                        <ListingSearch
                            title={''}
                        // buttonPlus={true}
                        />
                        <MdsDetailTable
                            columns={columns}
                            data={data}
                        />
                        <Paginate />
                        <div className="d-flex justify-content-between mt-5">
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
                    </BoxBody>
                   
                </PageContent>
            </>
        )
    }
}

export default MdsDetail;