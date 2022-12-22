import React from "react";
import { Accordion, Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import StoreProfile from "./Forms/StoreProfile";
import Delivery from "./Forms/Delivery";
import { PageContent, BoxBody } from '../../utilities/common';

const columns = [
    {
        title: 'Name',
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
        title: 'Zip Code',
        type: 'string'
    },
    {
        title: 'Action'
    }
];

// const data = [
//     {
//         name: 'Alex',
//         state: 'abcdefgh',
//         city: 'New york',
//         zipcode: '2658974',
//     },
//     {
//         name: 'Alex',
//         state: 'abcdefgh',
//         city: 'New york',
//         zipcode: '2658974',
//     }
// ]

type IProps = {
    header: string
}
type IState = {
    setLgShow: boolean
}

// interface IData {
//     id: number,
//     name: string,
//     state: string,
//     city: string,
//     zipcode: string
// }

class AccordionLayout extends React.Component<IProps, IState>{

    readonly state = {
        setLgShow: false,
        column: columns
    };

    showModal = (): void => {
        this.setState({ setLgShow: true })
    }

    render(): JSX.Element {
        const { header } = this.props;
        const { setLgShow } = this.state;
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
                                            <Accordion.Header>Store Profile</Accordion.Header>
                                            <Accordion.Body>
                                                <StoreProfile />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Delivery</Accordion.Header>
                                            <Accordion.Body>
                                                <Delivery />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </BoxBody>
                </PageContent>

                <Modal
                    size="lg"
                    show={setLgShow}
                    onHide={() => this.setState({ setLgShow: false })}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Distributed Center Information
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <BillTo /> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ setLgShow: false })}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.setState({ setLgShow: false })}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default AccordionLayout;