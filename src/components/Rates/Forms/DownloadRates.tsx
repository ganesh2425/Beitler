import React from "react";
import { Form, Row, Col } from "react-bootstrap";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const DownloadRateForm = ({ onDownloadClick }: any): JSX.Element => {
    const onSelectChangeVal = (e: React.FormEvent) => {
        const target = e.target as HTMLSelectElement;
        const displaytext = target.options[target.selectedIndex].text;
        const intVal: string = target.value;
        const intName: string = target.name;
        onDownloadClick(intVal);
    };

    return (
        <div>
            <Form>
                <Row className="mt-0 d-block-sm">
                    <Form.Group as={Col} className="mb-3" controlId="RateType">
                        <Form.Label column>Rate Type</Form.Label>
                        <Form.Control as="select" className="form-select" onChange={(e) => onSelectChangeVal(e)}>
                            <option value="">--Select Rate Type--</option>
                            <option value="RatesMasterUpload_CWT_Std">CWT Standard</option>
                            <option value="RatesMaster_Upload_CWT_Custom">CWT Custom</option>
                            <option value="RatesMaster_Template_StdTypes">Standard Types</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

            </Form>
        </div>
    )
};

export default DownloadRateForm;