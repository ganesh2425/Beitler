import React from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import * as BS from "react-bootstrap";
import { billToIProps } from "../../../interfaces/customerTypes";


class BillToForm extends React.Component<billToIProps, any> {
    render(): JSX.Element {
        const { values, handleChange, handleBlur, errors, touched, edit } = this.props;
         
        
        return <>
            <BS.Row className="mb-3 d-block-sm" id="billToSection">
                <BS.Form.Group as={BS.Col} controlId="billTo_contactName">
                    <BS.Form.Label>Contact name <span className="required">*</span></BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        autoComplete="nope"
                        placeholder="Enter Contact name"
                        name='billTo_contactName'
                        value={values.billTo_contactName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.billTo_contactName && touched.billTo_contactName) || !!(errors.billTo_contactName && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.billTo_contactName && touched.billTo_contactName) || (errors.billTo_contactName && edit)
                                ? errors.billTo_contactName
                                : 'Enter Contact name'
                        }</div>
                </BS.Form.Group>

                <BS.Form.Group as={BS.Col} controlId="billTo_address">
                    <BS.Form.Label>Address(Street#,name)</BS.Form.Label>
                    <BS.Form.Control autoComplete="nope"
                        type="text"
                        placeholder="Enter address"
                        name='billTo_address'
                        value={values.billTo_address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.billTo_address && touched.billTo_address) || !!(errors.billTo_address && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.billTo_address && touched.billTo_address) || (errors.billTo_address && edit)
                                ? errors.billTo_address
                                : 'Enter Address'
                        }</div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="billTo_address2">
                    <BS.Form.Label>Address BuildingFloor</BS.Form.Label>
                    <BS.Form.Control
                        autoComplete="nope"
                        type="text"
                        placeholder="Enter building floor"
                        name='billTo_address2'
                        value={values.billTo_address2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.billTo_address2 && touched.billTo_address2) || !!(errors.billTo_address2 && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.billTo_address2 && touched.billTo_address2) || (errors.billTo_address2 && edit)
                                ? errors.billTo_address2
                                : 'Enter address line 2'
                        }</div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="billTo_city">
                    <BS.Form.Label>City</BS.Form.Label>
                    <BS.Form.Control
                        autoComplete="nope"
                        type="text"
                        placeholder="Enter city"
                        name='billTo_city'
                        value={values.billTo_city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.billTo_city && touched.billTo_city) || !!(errors.billTo_city && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.billTo_city && touched.billTo_city) || (errors.billTo_city && edit)
                                ? errors.billTo_city
                                : 'Enter city'
                        }</div>
                </BS.Form.Group>

                <BS.Form.Group as={BS.Col} controlId="billTo_state">
                    <BS.Form.Label>State</BS.Form.Label>
                    <BS.Form.Control
                        autoComplete="nope"
                        type="text"
                        placeholder="Enter state"
                        name='billTo_state'
                        value={values.billTo_state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.billTo_state && touched.billTo_state) || !!(errors.billTo_state && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.billTo_state && touched.billTo_state) || (errors.billTo_state && edit)
                                ? errors.billTo_state
                                : 'Enter state'
                        }</div>
                </BS.Form.Group>
            </BS.Row>
            <BS.Row className="mb-3 d-block-sm">
                <BS.Form.Group as={BS.Col} controlId="billTo_zipCode">
                    <BS.Form.Label>Zip Code <span className="required">*</span></BS.Form.Label>
                    <BS.Form.Control
                        autoComplete="nope"
                        type="number"
                        placeholder="Enter Zip Code"
                        name='billTo_zipCode'
                        value={values.billTo_zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.billTo_zipCode && touched.billTo_zipCode) || !!(errors.billTo_zipCode && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.billTo_zipCode && touched.billTo_zipCode) || (errors.billTo_zipCode && edit)
                                ? errors.billTo_zipCode
                                : 'Enter zipCode'
                        }</div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="billTo_phone">
                    <BS.Form.Label>Phone Number</BS.Form.Label>
                    <BS.Form.Control
                        autoComplete="nope"
                        type="number"
                        placeholder="Enter Phone Number"
                        name='billTo_phone'
                        value={values.billTo_phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.billTo_phone && touched.billTo_phone) || !!(errors.billTo_phone && edit)? 'error-span show' : 'error-span'}>
                        {
                            (errors.billTo_phone && touched.billTo_phone) || (errors.billTo_phone && edit)
                                ? errors.billTo_phone
                                : 'Enter phone'
                        }</div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="billTo_contactEmail">
                    <BS.Form.Label>Contact Email <span className="required">*</span></BS.Form.Label>
                    <BS.Form.Control
                        type="email"
                        autoComplete="nope"
                        placeholder="Enter Contact Email"
                        name='billTo_contactEmail'
                        value={values.billTo_contactEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.billTo_contactEmail && touched.billTo_contactEmail) || !!(errors.billTo_contactEmail && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.billTo_contactEmail && touched.billTo_contactEmail) || (errors.billTo_contactEmail && edit)
                                ? errors.billTo_contactEmail
                                : 'Enter Contact Email'
                        }</div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="billTo_contactPhone">
                    <BS.Form.Label>Contact Phone <span className="required">*</span></BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        autoComplete="nope"
                        placeholder="Enter contact phone"
                        name='billTo_contactPhone'
                        value={values.billTo_contactPhone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.billTo_contactPhone && touched.billTo_contactPhone) || !!(errors.billTo_contactPhone && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.billTo_contactPhone && touched.billTo_contactPhone) || (errors.billTo_contactPhone && edit)
                                ? errors.billTo_contactPhone
                                : 'Enter contact phone'
                        }</div>
                </BS.Form.Group>

                <BS.Form.Group as={BS.Col} controlId="billTo_fax">
                    <BS.Form.Label>Fax Number</BS.Form.Label>
                    <BS.Form.Control
                        autoComplete="nope"
                        type="number"
                        placeholder="Enter Fax Number"
                        name='billTo_fax'
                        value={values.billTo_fax}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.billTo_fax && touched.billTo_fax) || !!(errors.billTo_fax && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.billTo_fax && touched.billTo_fax) || (errors.billTo_fax && edit)
                                ? errors.billTo_fax
                                : 'Enter fax'
                        }</div>
                </BS.Form.Group>
            </BS.Row>
            <BS.Row className="mb-3 d-block-sm">
                <BS.Form.Group as={BS.Col} controlId="billTo_terms">
                    <BS.Form.Label>Terms</BS.Form.Label>
                    <BS.Form.Control
                        autoComplete="nope"
                        type="text"
                        placeholder="Enter terms"
                        name='billTo_terms'
                        value={values.billTo_terms}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={!!(errors.billTo_terms && touched.billTo_terms) || !!(errors.billTo_terms && edit) ? 'error-span show' : 'error-span'}>
                        {
                            (errors.billTo_terms && touched.billTo_terms) || (errors.billTo_terms && edit)
                                ? errors.billTo_terms
                                : 'Enter terms'
                        }</div>
                </BS.Form.Group>
            </BS.Row>

            <FloatingLabel controlId="billTo_comments" label="Comments">
                <BS.Form.Control
                    autoComplete="nope"
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    name={'billTo_comments'}
                    value={values.billTo_comments}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <div className={!!(errors.billTo_comments && touched.billTo_comments) || !!(errors.billTo_comments && edit) ? 'error-span show' : 'error-span'}>
                    {
                        (errors.billTo_comments && touched.billTo_comments) || (errors.billTo_comments && edit)
                            ? errors.billTo_comments
                            : 'Enter comments'
                    }</div>
            </FloatingLabel>
        </>;
    }
}

export default BillToForm;