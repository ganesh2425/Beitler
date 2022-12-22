import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import CustomerTable from "./Table";
import Paginate from "../common/Pagination";
import CustomerSearch from "../common/Search";
import { Button, Modal } from "react-bootstrap";
import RecipientsForm from "./Forms/Recipients";
import { PageContent, BoxHead, BoxBody } from "../../utilities/common";

const columns = [
    {
        title: 'Event Name',
        type: 'string'
    },
    {
        title: 'Subject',
        type: 'number'
    },
    {
        title: 'Body',
        type: 'string'
    },
    {
        title: 'DateTime',
        type: 'string'
    },
    {
        title: 'Recipients'
    }
];

const data = [
    {
        event_name: 'name',
        subject: 'sub',
        body: 'text',
        datetime: '12/05/2021 09:00am'
    },
    {
        event_name: 'name',
        subject: 'sub',
        body: 'text',
        datetime: '12/05/2021 09:00am'
    }
]

type IProps = {
    showAccordion?: () => void
}

type State = {
    accordion: boolean,
    showPopup: boolean
}

class NotificationQueue extends React.Component<IProps>  {

    public readonly state: State = {
        accordion: false,
        showPopup: false
    }

    showAccordion = (): void => {
        console.log('inininin')
        this.setState({ accordion: true })
    }

    showPurchase = (): void => {
        console.log('inininin')
        this.setState({ showPopup: true })
    }

    render(): JSX.Element {
        const { showPopup } = this.state;
        return (
            <>
                <PageContent>
                    <BoxHead
                        title={'Notification Queue'}
                    ></BoxHead>
                    <BoxBody>
                        <CustomerSearch showAccordion={this.showAccordion} title={''}

                        />
                        <CustomerTable columns={columns} data={data}
                            showRecipients={this.showPurchase}
                        />
                        <Paginate />
                    </BoxBody>
                </PageContent>

                <Modal id="purchasejournal"
                    size="lg"
                    show={showPopup}
                    onHide={() => this.setState({ showPopup: false })}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Recipients Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RecipientsForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-md-w" variant="secondary" onClick={() => this.setState({ showPopup: false })}>
                            Cancel
                        </Button>
                        <Button className="btn-md-w" variant="primary" onClick={() => this.setState({ showPopup: false })}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default NotificationQueue;