import React from 'react';
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import * as BS from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'
import ListingTable from "./Table";
import Paginate from "../common/Pagination";
import ListingSearch from "../common/Search";
import { BoxBody, BoxHead, PageContent } from "../../utilities/common";

const columns = [
    {
        title: ''
    },
    {
        title: 'Store#',
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
        title: 'Shipper#',
        type: 'string'
    },
    {
        title: 'Exp Weight',
        type: 'number'
    },
    {
        title: 'Over',
        type: 'number'
    },
    {
        title: 'Short',
        type: 'number'
    },
    {
        title: 'Damaged',
        type: 'number'
    },
    {
        title: 'Delivery Arrival',
        type: 'string'
    },
    {
        title: 'Start Time',
        type: 'string'
    },
    {
        title: 'Finish Time',
        type: 'string'
    },
    {
        title: 'Store Signed By',
        type: 'string'
    },
    {
        title: 'Status',
        type: 'string'
    },
    {
        title: 'Action'
    }
];

const data = [
    {
        store: 'Bl74567',
        city: 'Brooklyn',
        state: 'New York',
        shipper: 'Bl2345',
        expweight: '200',
        over: '2',
        short: '3',
        damaged: '0',
        deliveryarrival: '13/05/2021',
        startTime: '9:00 am',
        finishTime: '10:00 pm',
        storesignby: 'John',
        status: 'Delivered',
    },
    {
        store: 'Bl74567',
        city: 'Brooklyn',
        state: 'New York',
        shipper: 'Bl2345',
        expweight: '200',
        over: '2',
        short: '3',
        damaged: '0',
        deliveryarrival: '13/05/2021',
        startTime: '9:00 am',
        finishTime: '10:00 pm',
        storesignby: 'Hendry',
        status: 'Delivered',
    }
]

// type IProps = {
//     header: string
// }
//
// type IState = {
//     setLgShow: boolean,
//     isopen: boolean
// }

class Delivery extends React.Component {

    readonly state = {
        setLgShow: false,
        column: columns
    };

    openForm = (): void => {
        this.setState({ setLgShow: true })
    }
    render(): JSX.Element {

        return (

            <>
                <PageContent>
                    <Row className="p-3 align-items-end justify-content-between d-flex d-block-sm">
                        {/* <Col xs="auto"> */}
                        <Form.Group as={Col} controlId="formGridEmail" sm="2" className="w-sm-100" >
                            <Form.Label htmlFor="inlineFormInputGroup" >Start Date</Form.Label>
                            <InputGroup className="">
                                <Form.Control id="inlineFormInputGroup" placeholder="StartDate" />
                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail" sm="2" className="w-sm-100">
                            <Form.Label htmlFor="inlineFormInputGroup" >End Date</Form.Label>
                            <InputGroup className="">
                                <Form.Control id="inlineFormInputGroup" placeholder="EndDate" />
                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} id="formGridCheckbox" sm="3" className="w-sm-100">
                            <Form.Label htmlFor="inlineFormInputGroup" className="invisible" ></Form.Label>
                            <InputGroup className="">
                                <Form.Check type="checkbox" label="Show Previous Deliveries" />
                            </InputGroup>
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
                    <BoxHead
                        title={'Delivery'}
                    ></BoxHead>
                    <BoxBody>
                        <ListingSearch
                            // showAccordion = {this.showAccordion}
                            title={''}
                        />
                        <ListingTable
                            columns={columns}
                            data={data}
                        />
                        <Paginate />
                        <div className="mt-4">
                            <div className="d-flex justify-content-end">
                                <BS.Button type="button"
                                    className="btn btn-primary btn-md-w">Bulk Save
                                </BS.Button>
                            </div>
                        </div>
                    </BoxBody>

                </PageContent>
            </>

        );
    }
}


export default Delivery;