import React, { useState } from 'react';
import { Form, Row, Col, InputGroup, ListGroup } from "react-bootstrap";
import * as BS from "react-bootstrap";
import AccordionLayout from "./Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'
import ListingTable from "./Table";
import Paginate from "../common/Pagination";
import ListingSearch from "../common/Search";
import { PageContent, BoxHead, BoxBody } from '../../utilities/common';

const columns = [
    {
        title: 'Pool Location',
        type: 'string'
    },
    {
        title: 'Status',
        type: 'string'
    },
    {
        title: 'Receive',
        type: 'string'
    },
    {
        title: 'Shipper Ref',
        type: 'string'
    },
    {
        title: 'Stop',
        type: 'number'
    },
    {
        title: 'Linehaul ID',
        type: 'number'
    },
    {
        title: 'DC',
        type: 'number'
    },
    {
        title: 'Linehaul Carrier',
        type: 'string'
    },
    {
        title: 'Carrier Phone',
        type: 'string'
    },
    {
        title: 'Seal#',
        type: 'string'
    },
    {
        title: 'Trailer#',
        type: 'string'
    },
    {
        title: 'Ex. Pallets',
        type: 'string'
    },
    {
        title: 'Ex. Weight',
        type: 'string'
    },
    {
        title: 'Linehaul Dept',
        type: 'string'
    },
    {
        title: 'Linehaul Arrival',
        type: 'string'
    },
    {
        title: 'Action'
    }
];

const data = [
    {
        pool_loc: 'Alcoa',
        receive: 'Receive',
        shipper_Ref: 'Alcoa 1 12/05/2021',
        stop: '1 of 1',
        linehaul_ID: 'ID',
        dc: 'name',
        linehaul_carrier: 'Unknown',
        carrier_ph: '987654321',
        seal_nmb: '13GT6',
        trailer_num: '87642',
        ex_pallets: '3',
        ex_weight: '1577',
        line_dept: 'Name',
        line_arrival: '3/2/2021 6:00 PM',
    },
    {
        pool_loc: 'Alcoa',
        receive: 'Receive',
        shipper_Ref: 'Alcoa 1 14/05/2021',
        stop: '1 of 1',
        linehaul_ID: 'ID',
        dc: 'name',
        linehaul_carrier: 'Unknown',
        carrier_ph: '987654322',
        seal_nmb: '13GT6',
        trailer_num: '87642',
        ex_pallets: '3',
        ex_weight: '1578',
        line_dept: 'Name',
        line_arrival: '3/2/2021 6:00 PM',
    }
]

const Inbound = (): JSX.Element => {
    const [accordion, setAccordion] = useState(false);

    const showAccordion = () => {
        console.log('inininin')
        setAccordion(true)
    }
    return (
        <>
            {!accordion ?
                <PageContent>
                    <Row className="p-3 align-items-end justify-content-start d-flex d-block-sm">
                        {/* <Col xs="auto"> */}
                        <Form.Group as={Col} controlId="formGridEmail" sm="2" className="w-sm-100">
                            <Form.Label htmlFor="inlineFormInputGroup" >Start Date</Form.Label>
                            <InputGroup className="">
                                <Form.Control id="inlineFormInputGroup" placeholder="15/05/2021" />
                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail" sm="2" className="w-sm-100">
                            <Form.Label htmlFor="inlineFormInputGroup" >End Date</Form.Label>
                            <InputGroup className="">
                                <Form.Control id="inlineFormInputGroup" placeholder="21/05/2021" />
                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail" sm="6"  md={6} className="col-lg">
                            <ListGroup className="list-unstyled" horizontal>
                                <ListGroup.Item className="list-unstyled mr-3"><Form.Group as={Col} className="w-sm-100" id="formGridCheckbox">
                                    <Form.Label htmlFor="inlineFormInputGroup" className="invisible" />
                                    <InputGroup className="">
                                        <Form.Check type="checkbox" label="In Transit Only" />
                                    </InputGroup>
                                </Form.Group></ListGroup.Item>
                                <ListGroup.Item className="list-unstyled"><Form.Group as={Col} className="w-sm-100" id="formGridCheckbox" sm="">
                                    <Form.Label htmlFor="inlineFormInputGroup" className="invisible" />
                                    <InputGroup className="">
                                        <Form.Check type="checkbox" label="Show all Status Codes" />
                                    </InputGroup>
                                </Form.Group></ListGroup.Item>
                            </ListGroup>
                        </Form.Group>
                        {/* </Col> */}
                        <Col>
                            <div className="d-flex justify-content-end">
                                <BS.Button type="button"
                                    className="btn btn-primary btn-md-w mr-2">Apply Filters
                                </BS.Button>
                                <BS.Button type="button"
                                    className="btn btn-secondary btn-md-w">Reset Filters
                                </BS.Button>
                            </div>
                        </Col>
                    </Row>
                    <BoxHead title={'Inbound Listing'} />
                    <BoxBody>
                        <ListingSearch
                            showAccordion={showAccordion}
                            title={'Inbound'}
                        />
                        <ListingTable
                            columns={columns}
                            data={data}
                        />
                        <Paginate />
                    </BoxBody>
                </PageContent>

                :
                (
                    <AccordionLayout
                        header={'Inbound Entry'}
                    />
                )
            }

        </>

    );
}

export default Inbound;