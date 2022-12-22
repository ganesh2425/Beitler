import React from "react";
import Modal from 'react-bootstrap/Modal'
import { Accordion, Button } from 'react-bootstrap';
import BasicDetails from "./Forms/BasicDetails";
import InboundTable from "./Forms/InboundTable";
import ViewEditDamagesForm from "./Forms/ViewEditDamages";
import Finalize from "./Forms/Finalize";
import Paginate from "../common/Pagination";
import ListingSearch from "../common/Search";
import { PageContent, BoxBody } from "../../utilities/common";


const columnspick = [
    {
        title: 'Shipper Number',
        type: 'string'
    },
    {
        title: 'Expected Pallets',
        type: 'string'
    },
    {
        title: 'Over',
        type: 'string'
    },
    {
        title: 'Short',
        type: 'number'
    },
    {
        title: 'Actual Pallets',
        type: 'number'
    },
    {
        title: 'Actual Weight',
        type: 'number'
    },
    {
        title: 'Damaged',
        type: 'number'
    },
    {
        title: 'Show Damaged',
        type: 'number'
    },
    {
        title: 'Action'
    }
];
const datapick = [
    {
        shipper_num: '12345',
        exp_pallets: '0',
        over: '0',
        short: '0',
        actual_pallets: '5',
        actual_weight: '0',
        damaged: '0',
        show_damaged: 'Show Damages'
    },
    {
        shipper_num: '12345',
        exp_pallets: '0',
        over: '0',
        short: '0',
        actual_pallets: '5',
        actual_weight: '0',
        damaged: '0',
        show_damaged: 'Show Damages'
    },
    {
        shipper_num: '12345',
        exp_pallets: '0',
        over: '0',
        short: '0',
        actual_pallets: '5',
        actual_weight: '0',
        damaged: '0',
        show_damaged: 'Show Damages'
    }
]

type IProps = {
    header: string,
    showPurchase?: () => void

}

type IState = {
    accordion: boolean,
    showPopup: boolean,
    showPopupfinalize: boolean
    // setLgShow: boolean
}

class AccordionLayout extends React.Component<IProps, IState> {
    public readonly state: IState = {
        accordion: false,
        showPopup: false,
        showPopupfinalize: false
    }

    showAccordion = () => {
        console.log('inininin')
        this.setState({ accordion: true })
    }

    showPurchase = () => {
        console.log('inininin')
        this.setState({ showPopup: true })
    }

    finalize = () => {
        console.log('inininin')
        this.setState({ showPopupfinalize: true })

    }

    // openForm = () => {
    //     this.setState({ setLgShow: true })
    // }

    // purchaseJournal = () => {
    //     console.log('inininin')
    //     this.setState({Modal: true})
    // }

    render(): JSX.Element {
        const { showPopup, showPopupfinalize } = this.state;
        const { header } = this.props;
        // const { Modal } = this.state;
        return (
            <>
                <PageContent>
                    <BoxBody>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="main-head">{header}</Accordion.Header>
                                <Accordion.Body>
                                    <BasicDetails />
                                    <div className="mt-3">
                                        <ListingSearch
                                            showAccordion={this.showAccordion}
                                            title={'Entry'}
                                        />
                                        <InboundTable
                                            columnData={columnspick}
                                            data={datapick}
                                        />
                                        <Paginate />
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <div className="mt-4">
                        <div className="d-flex justify-content-end">
                            <Button type="button"
                                className="btn btn-secondary btn-md-w mr-2" onClick={this.showPurchase}>Dead Overages
                            </Button>
                            <Button type="button"
                                className="btn btn-primary btn-md-w" onClick={this.finalize}>Finalize
                            </Button>
                        </div>
                    </div>
                    </BoxBody>
                    
                </PageContent>

                <Modal id="viewentryinbound"
                    size="lg"
                    show={showPopup}
                    onHide={() => this.setState({ showPopup: false })}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            View/Edit Damage(s)
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewEditDamagesForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-md-w" variant="secondary" onClick={() => this.setState({ showPopup: false })}>
                            Close
                        </Button>
                        <Button className="btn-md-w" variant="primary" onClick={() => this.setState({ showPopup: false })}>
                            Add/Update Damages
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal id="finalize"
                    size="lg"
                    show={showPopupfinalize}
                    onHide={() => this.setState({ showPopupfinalize: false })}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Finalization Complete
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Finalize />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-md-w" variant="secondary" onClick={() => this.setState({ showPopupfinalize: false })}>
                            Close
                        </Button>
                        <Button className="btn-md-w" variant="primary" onClick={() => this.setState({ showPopupfinalize: false })}>
                            Download BOL
                        </Button>
                        <Button className="btn-md-w" variant="primary" onClick={() => this.setState({ showPopupfinalize: false })}>
                            Return to ASN List
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default AccordionLayout;