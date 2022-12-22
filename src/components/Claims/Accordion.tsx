import React from "react";
import { Accordion, Button } from 'react-bootstrap';
import BasicDetails from "./Forms/BasicDetails";
import ClaimsCharges from "./Forms/claimsCharges";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomerDetails from "./Forms/CustomerDetails";
import PickDetails from "./Forms/PickDetails";
import ConsigneeDetails from "./Forms/ConsigneeDetails";
import { BoxBody, PageContent } from "../../utilities/common";

const columns = [
    {
        title: 'Articles Description',
        type: 'number'
    },
    {
        title: 'Articles Quantity',
        type: 'string'
    },
    {
        title: 'Damage Details',
        type: 'string'
    },
    {
        title: 'Consignee Name',
        type: 'string'
    },
    {
        title: 'Amount To Claim',
        type: 'number'
    },
    {
        title: 'Action'
    }
];

const data = [
    {
        articles_des: '12345',
        articles_quantity: '23',
        damage_details: '25',
        consignee_name: 'name',
        amount_claim: '$100'
    },
    {
        articles_des: '12348',
        articles_quantity: '23',
        damage_details: '25',
        consignee_name: 'name',
        amount_claim: '$300'
    },
    {
        articles_des: '12349',
        articles_quantity: '23',
        damage_details: '25',
        consignee_name: 'name',
        amount_claim: '$300'
    }
]

type IProps = {
    header: string
}

// type IState = {
//     setLgShow: boolean
// }

class AccordionLayout extends React.Component<IProps> {
    readonly state = {
        // setLgShow: false,
        column: columns
    };

    render(): JSX.Element {
        const { header } = this.props;
        // const { setLgShow, column } = this.state;
        // const { Modal } = this.state;
        return (
            <>
                <PageContent>
                    <BoxBody>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="main-head">{header}</Accordion.Header>
                                <Accordion.Body>
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                Basic Information
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <BasicDetails />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>
                                                Customer Address
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <CustomerDetails />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>
                                                Pick Address
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <PickDetails />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header>
                                                Consignee Address
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <ConsigneeDetails />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="4" className={'accordion-relative'}>
                                            <Accordion.Header>Claim Details</Accordion.Header>
                                            <div className={'pull-right accordion-absolute'} >
                                                <FontAwesomeIcon icon={faPlus} />
                                                <span>Add</span>
                                            </div>
                                            <Accordion.Body>
                                                <ClaimsCharges
                                                    columnData={columns}
                                                    data={data}
                                                />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <div className="mt-4">
                            <div className="d-flex justify-content-end">
                                <Button type="button"
                                    className="btn btn-secondary btn-md-w mr-2">Cancel
                                </Button>
                                <Button type="button"
                                    className="btn btn-primary btn-md-w">Save
                                </Button>
                            </div>
                        </div>
                    </BoxBody>

                </PageContent>

            </>
        );
    }
}

export default AccordionLayout;