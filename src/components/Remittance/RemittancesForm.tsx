import React from "react";
import { Accordion, Button } from 'react-bootstrap';
import BasicDetails from "./Forms/BasicDetails";
import RemittancesTable from "./Forms/RemittancesTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageContent, BoxHead, BoxBody } from '../../utilities/common';

const columns = [
    {
        title: 'Invoice Number',
        type: 'string'
    },
    {
        title: 'Invoice Amount',
        type: 'number'
    },
    {
        title: 'Paid Amount',
        type: 'string'
    },
    {
        title: 'Pending Amount',
        type: 'number'
    },
    {
        title: 'Reference Number',
        type: 'number'
    },
    {
        title: 'Paid Status',
        type: 'string'
    },
    {
        title: 'Action'
    }
];

const data = [
    {
        invoice_number: 'Bl-37683',
        invoice_amount: '1200',
        paid_amount: '1000',
        pending_amount: '200',
        ref_number: 'Bl-3282',
        paid_status: 'Partial'
    },
    {
        invoice_number: 'Bl-37683',
        invoice_amount: '1000',
        paid_amount: '800',
        pending_amount: '200',
        ref_number: 'Bl-3285',
        paid_status: 'Partial'
    },
    {
        invoice_number: 'Bl-37683',
        invoice_amount: '1000',
        paid_amount: '1000',
        pending_amount: '0',
        ref_number: 'Bl-4285',
        paid_status: 'Paid'
    }
]

type IProps = {
    header?: string
}

type IState = {
    setLgShow: boolean
}

class RemittancesForm extends React.Component<IProps, IState> {
    readonly state = {
        setLgShow: false,
        column: columns
    };

    render(): JSX.Element {
        // const { header } = this.props;
        // const { setLgShow, column } = this.state;
        return (
            <>
                <PageContent>
                    <BoxHead
                        title={'Remittances'}
                    ></BoxHead>
                    <BoxBody>
                        <BasicDetails />
                        <div className="mt-3">
                            <Accordion defaultActiveKey="0" className="accordion-rates">
                                <Accordion.Item eventKey="0" className={'accordion-relative mb-0'}>
                                    <Accordion.Header>
                                        Remittances Details
                                    </Accordion.Header >
                                    <div className={'pull-right accordion-absolute'} >
                                        <FontAwesomeIcon icon={faPlus} />
                                        <span>Assign to Invoice</span>
                                    </div>
                                    <Accordion.Body>
                                        <RemittancesTable
                                            columnData={columns}
                                            data={data}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className="mt-5">
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

export default RemittancesForm;