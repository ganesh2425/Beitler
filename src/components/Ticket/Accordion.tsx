import React from "react";
import { Accordion, Button } from 'react-bootstrap';
import BasicDetails from "./Forms/BasicDetails";
import { PageContent, BoxBody } from '../../utilities/common';

type IProps = {
    header: string
}

// type IState = {
//     setLgShow: boolean
// }

class AccordionLayout extends React.Component<IProps> {
    readonly state = {
        // setLgShow: false,
        // column: columns
    };

    render(): JSX.Element {
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