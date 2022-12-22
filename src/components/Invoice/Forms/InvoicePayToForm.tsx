import React from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import * as BS from "react-bootstrap";
import { invoiceToIProps } from "../../../interfaces/customerTypes";

class InvoicePayToForm extends React.Component<invoiceToIProps, any> {
    render(): JSX.Element {
        const { values, handleChange, handleBlur, errors, touched, edit } = this.props;
        return <>
            <BS.Row className="mb-3 d-block-sm">
                <BS.Form.Group as={BS.Col} controlId="invoiceTo_contactName">
                    <BS.Form.Label>Contact name <span className="required">*</span></BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        placeholder="Enter Contact name"
                        name='invoiceTo_contactName'
                        value={values.invoiceTo_contactName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.invoiceTo_contactName && touched.invoiceTo_contactName) || (errors.invoiceTo_contactName && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.invoiceTo_contactName && touched.invoiceTo_contactName) || (errors.invoiceTo_contactName && edit)
                                ? errors.invoiceTo_contactName
                                : 'Enter Contact name'
                        }</div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="invoiceTo_address">
                    <BS.Form.Label>Address(Street#,name)</BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        placeholder="Enter address"
                        name='invoiceTo_address'
                        value={values.invoiceTo_address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.invoiceTo_address && touched.invoiceTo_address) || (errors.invoiceTo_address && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.invoiceTo_address && touched.invoiceTo_address) || (errors.invoiceTo_address && edit)
                                ? errors.invoiceTo_address
                                : 'Enter Address'
                        }</div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="invoiceTo_address2">
                    <BS.Form.Label>Address BuildingFloor</BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        placeholder="Enter building floor"
                        name='invoiceTo_address2'
                        value={values.invoiceTo_address2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.invoiceTo_address2 && touched.invoiceTo_address2) || (errors.invoiceTo_address2 && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.invoiceTo_address2 && touched.invoiceTo_address2) || (errors.invoiceTo_address2 && edit)
                                ? errors.invoiceTo_address2
                                : 'Enter address line 2'
                        }</div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="invoiceTo_city">
                    <BS.Form.Label>City</BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        placeholder="Enter city"
                        name='invoiceTo_city'
                        value={values.invoiceTo_city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.invoiceTo_city && touched.invoiceTo_city) || (errors.invoiceTo_city && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.invoiceTo_city && touched.invoiceTo_city) || (errors.invoiceTo_city && edit)
                                ? errors.invoiceTo_city
                                : 'Enter city'
                        }</div>
                </BS.Form.Group>

                <BS.Form.Group as={BS.Col} controlId="invoiceTo_state">
                    <BS.Form.Label>State</BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        placeholder="Enter state"
                        name='invoiceTo_state'
                        value={values.invoiceTo_state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.invoiceTo_state && touched.invoiceTo_state) || (errors.invoiceTo_state && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.invoiceTo_state && touched.invoiceTo_state) || (errors.invoiceTo_state && edit)
                                ? errors.invoiceTo_state
                                : 'Enter state'
                        }</div>
                </BS.Form.Group>
            </BS.Row>
            <BS.Row className="mb-3 d-block-sm">
                <BS.Form.Group as={BS.Col} controlId="invoiceTo_zipCode">
                    <BS.Form.Label>Zip Code <span className="required">*</span></BS.Form.Label>
                    <BS.Form.Control
                        type="number"
                        placeholder="Enter Zip Code"
                        name='invoiceTo_zipCode'
                        value={values.invoiceTo_zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.invoiceTo_zipCode && touched.invoiceTo_zipCode) || (errors.invoiceTo_zipCode && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.invoiceTo_zipCode && touched.invoiceTo_zipCode) || (errors.invoiceTo_zipCode && edit)
                                ? errors.invoiceTo_zipCode
                                : 'Enter zipCode'
                        }</div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="invoiceTo_phone">
                    <BS.Form.Label>Phone Number</BS.Form.Label>
                    <BS.Form.Control
                        type="number"
                        placeholder="Enter Phone Number"
                        name='invoiceTo_phone'
                        value={values.invoiceTo_phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.invoiceTo_phone && touched.invoiceTo_phone) || (errors.invoiceTo_phone && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.invoiceTo_phone && touched.invoiceTo_phone) || (errors.invoiceTo_phone && edit)
                                ? errors.invoiceTo_phone
                                : 'Enter phone'
                        }</div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="invoiceTo_contactEmail">
                    <BS.Form.Label>Contact Email <span className="required">*</span></BS.Form.Label>
                    <BS.Form.Control
                        type="email"
                        placeholder="Enter Contact Email"
                        name='invoiceTo_contactEmail'
                        value={values.invoiceTo_contactEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.invoiceTo_contactEmail && touched.invoiceTo_contactEmail) || (errors.invoiceTo_contactEmail && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.invoiceTo_contactEmail && touched.invoiceTo_contactEmail) || (errors.invoiceTo_contactEmail && edit)
                                ? errors.invoiceTo_contactEmail
                                : 'Enter Contact Email'
                        }</div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="invoiceTo_contactPhone">
                    <BS.Form.Label>Contact Phone <span className="required">*</span></BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        placeholder="Enter contact phone"
                        name='invoiceTo_contactPhone'
                        value={values.invoiceTo_contactPhone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.invoiceTo_contactPhone && touched.invoiceTo_contactPhone) || (errors.invoiceTo_contactPhone && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.invoiceTo_contactPhone && touched.invoiceTo_contactPhone) || (errors.invoiceTo_contactPhone && edit)
                                ? errors.invoiceTo_contactPhone
                                : 'Enter contact phone'
                        }</div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="invoiceTo_fax">
                    <BS.Form.Label>Fax Number</BS.Form.Label>
                    <BS.Form.Control
                        type="number"
                        placeholder="Enter Fax Number"
                        name='invoiceTo_fax'
                        value={values.invoiceTo_fax}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </BS.Form.Group>

            </BS.Row>

            <BS.Row className="mb-3 d-block-sm">
                <BS.Form.Group as={BS.Col} controlId="invoiceTo_terms">
                    <BS.Form.Label>Terms</BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        placeholder="Enter terms"
                        name='invoiceTo_terms'
                        value={values.invoiceTo_terms}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </BS.Form.Group>
            </BS.Row>

            <FloatingLabel controlId="invoiceTo_comments" label="Comments" className="mb-3">
                <BS.Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    name={'invoiceTo_comments'}
                    value={values.invoiceTo_comments}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FloatingLabel>
        </>;
    }
}

export default InvoicePayToForm;