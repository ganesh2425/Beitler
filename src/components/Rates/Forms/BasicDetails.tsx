import React, {useEffect, useState} from 'react';
import { Row, Col } from "react-bootstrap";
import * as BS from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import {useSelector} from "react-redux";
import {getLookupDetails} from "../../../reducers/lookupReducer";
import {IType} from "../../../interfaces/forms";
import {getCustomerDetails} from "../../../reducers/customerReducer";
import {addMonths} from "date-fns";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";
import { date } from 'yup';

const BasicDetailsForm = ({values, handleChange, handleBlur, touched, errors, setFieldValue, carriers, fuelData, edit, view}: any):JSX.Element => {
    const [sectionType, setSectionType] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [effectiveFrom, setEffectiveFrom] = useState<any>(null);
    const [effectiveTo, setEffectiveTo] = useState<any>(null);

    
    const onChangeEffectiveFromDate = (date: any) => {
        if (effectiveTo){
            if (effectiveTo > date) {
                setEffectiveFrom(date)
            } else {
                toast.error('Please choose past date')
            }
        } else {
            setEffectiveFrom(date)
        }
    }
    const onChangeEffectiveTo = (date: any) => {
       
        if (effectiveFrom < date) {
            setEffectiveTo(date)
            setFieldValue('effective_end_date', date);
        } else {
            toast.error('Please choose future date')
        }
    }

    const lookupsData = useSelector(getLookupDetails);
    const customersList: any = useSelector(getCustomerDetails);

    useEffect(() => {
        if (lookupsData){
            const sectionType = lookupsData.filter((rate: any) => rate.type === "Section_type");
            setSectionType(sectionType);
        }
        const tempData: any = [];
        if (customersList) {
            customersList.length > 0 &&
            customersList.map((customer: any) => {
                tempData.push(customer.corporateoffice);
            });
            setCustomers(tempData);
        }
    }, [lookupsData, customersList]);


    return (
        <>
            <Row className="mt-0 d-block-sm">
                <BS.Form.Group as={Col} controlId="Type" xs={"2"} className="w-sm-100">
                    <BS.Form.Label>Section Type <span className="required">*</span></BS.Form.Label>
                    <BS.Form.Control
                        as="select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="select-option form-control"
                        name="sectionType"
                        value={values.sectionType}
                        disabled={view}
                    >
                        <option key={0} value={""}>
                            {"Select"}
                        </option>
                        {
                            sectionType && sectionType.length > 0 &&
                            sectionType.map((p: IType, i: number) => {
                                return (
                                    <option key={i} value={p.id}>
                                        {p.displayText}
                                    </option>
                                );
                            })
                        }
                    </BS.Form.Control>
                    <div
                        className={
                            !!(errors.sectionType && touched.sectionType) || !!(errors.sectionType && edit)
                                ? "error-span show"
                                : "error-span"
                        }
                    >
                        {(errors.sectionType && touched.sectionType) || !!(errors.sectionType && edit)
                            ? errors.sectionType
                            : "Enter sectionType"}
                    </div>
                </BS.Form.Group>
                <BS.Form.Group as={Col} controlId="customer" xs={"2"} className="w-sm-100">
                    <BS.Form.Label>Customer <span className="required">*</span></BS.Form.Label>
                    <BS.Form.Control
                        as="select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="select-option form-control"
                        name="customer"
                        value={values.customer}
                        disabled={view}
                    >
                        <option key={0} value={""}>
                            {"Select"}
                        </option>
                        {
                            customers && customers.length > 0 &&
                            customers.map((customer: any, i: number) => {
                                return (
                                    <option key={i} value={customer.id}>
                                        {customer.LegalName}
                                    </option>
                                );
                            })
                        }
                    </BS.Form.Control>
                    <div
                        className={
                            !!(errors.customer && touched.customer) || !!(errors.customer && edit)
                                ? "error-span show"
                                : "error-span"
                        }
                    >
                        {(errors.customer && touched.customer) || !!(errors.customer && edit)
                            ? errors.customer
                            : "Enter customer"}
                    </div>
                </BS.Form.Group>
                <BS.Form.Group as={Col} controlId="carrier" xs={"2"} className="w-sm-100">
                    <BS.Form.Label>Carrier <span className="required">*</span></BS.Form.Label>
                    <BS.Form.Control
                        as="select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="select-option form-control"
                        name="carrier"
                        value={values.carrier}
                        disabled={view}
                    >
                        <option key={0} value={""}>
                            {"Select"}
                        </option>
                        {
                            carriers && carriers.length > 0 &&
                                carriers.map((carrier: any, i: number) => {
                                    return (
                                        <option key={i} value={carrier.id}>
                                            {carrier.LegalName}
                                        </option>
                                    );
                                })
                        }
                    </BS.Form.Control>
                    <div
                        className={
                            !!(errors.carrier && touched.carrier) || !!(errors.carrier && edit)
                                ? "eor-span show"
                                : "error-span"
                        }
                    >
                        {(errors.carrier && touched.carrier) || !!(errors.carrier && edit)
                            ? errors.carrier
                            : "Enter carrier"}
                    </div>
                </BS.Form.Group>
                
                <BS.Form.Group as={Col}>
                    <BS.Form.Label htmlFor="inlineFormInputGroup" >Effective Start Date <span className="required">*</span></BS.Form.Label>
                    <BS.InputGroup className="mb-2 d-date-picker">
                        <DatePicker
                            selected={values.effective_start_date ? values.effective_start_date : effectiveFrom}
                            onChange={(date) => {
                                onChangeEffectiveFromDate(date);
                                setFieldValue('effective_start_date', date);
                                
                            }}
                            onBlur={handleBlur}
                            maxDate={new Date()}
                            minDate={addMonths(new Date(), -5)}
                            placeholderText="Start Date"
                            dateFormat="MM/dd/yyyy"
                            //dateFormat="MM-DD-YYYY"
                            disabled={view}
                        />
                        <BS.FormControl
                            placeholder="Start Date"
                            type="hidden"
                            name="effective_start_date"
                            value={values.effective_start_date ? values.effective_start_date : effectiveFrom}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={view}
                        />
                        <BS.InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></BS.InputGroup.Text>
                    </BS.InputGroup>
                    <div
                        className={
                            !!(errors.effective_start_date && touched.effective_start_date) || !!(errors.effective_start_date && edit)
                                ? "error-span show"
                                : "error-span"
                        }
                    >
                        {(errors.effective_start_date && touched.effective_start_date ) || !!(errors.effective_start_date && edit)
                            ? errors.effective_start_date
                            : "Enter Start Date"}
                    </div>
                </BS.Form.Group>
                <BS.Form.Group as={Col}>
                    <BS.Form.Label htmlFor="inlineFormInputGroup" >Effective End Date <span className="required">*</span></BS.Form.Label>
                    <BS.InputGroup className="mb-2 d-date-picker">
                        <DatePicker
                            selected={values.effective_end_date ? values.effective_end_date : effectiveTo}
                            onChange={(date) => {
                                onChangeEffectiveTo(date);
                                setFieldValue('effective_end_date', date);
                            }}
                            onBlur={handleBlur}
                            minDate={new Date()}
                            maxDate={addMonths(new Date(), 20)}
                            placeholderText="End Date"
                            dateFormat="MM/dd/yyyy"
                            disabled={view}
                        />
                        <BS.FormControl
                            placeholder="Start Date"
                            type="hidden"
                            name="effective_end_date"
                            value={values.effective_end_date ? values.effective_end_date : effectiveTo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <BS.InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></BS.InputGroup.Text>
                    </BS.InputGroup>
                    <div
                        className={
                            !!(errors.effective_end_date && touched.effective_end_date) || !!(errors.effective_end_date && edit)
                                ? "error-span show"
                                : "error-span"
                        }
                    >
                        {(errors.effective_end_date && touched.effective_end_date) || !!(errors.effective_end_date && edit)
                            ? errors.effective_end_date
                            : "Enter End Date"}
                    </div>
                </BS.Form.Group>
            </Row>
            <Row className="my-2 d-block-sm">
                <BS.Form.Group as={Col} controlId="tariffNumber" xs={"2"} className="w-sm-100">
                    <BS.Form.Label>Tariff Number</BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        placeholder="Tariff Number"
                        name="tariffNumber"
                        value={values.tariffNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={view}
                    />
                </BS.Form.Group>
                <BS.Form.Group as={Col} controlId="FSC" xs={"2"} className="w-sm-100">
                    <BS.Form.Label>FSC</BS.Form.Label>
                    <BS.Form.Control
                        as="select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="select-option form-control"
                        name="FSC"
                        value={values.FSC}
                        disabled={view}
                    >
                        <option key={0} value={"0"}>
                            {"Select"}
                        </option>
                        {
                            fuelData && fuelData.length > 0 &&
                            fuelData.map((p: any, i: number) => {
                                return (
                                    <option key={i} value={p.id}>
                                        {p.fscPercent}
                                    </option>
                                );
                            })
                        }
                    </BS.Form.Control>
                </BS.Form.Group>
                <BS.Form.Group as={Col} controlId="ediCode" xs={"3"} className="w-sm-100">
                    <BS.Form.Label>EDI Code</BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        placeholder="Edi Code"
                        name="ediCode"
                        value={values.ediCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={view}
                    />
                    <div
                        className={
                            !!(errors.ediCode && touched.ediCode) || !!(errors.ediCode && edit)
                                ? "error-span show"
                                : "error-span"
                        }
                    >
                        {(errors.ediCode && touched.ediCode) || !!(errors.ediCode && edit)
                            ? errors.ediCode
                            : "Enter EDI code"}
                    </div>
                </BS.Form.Group>
                <BS.Form.Group as={Col} controlId="status" xs={"2"} className="w-sm-100">
                    <BS.Form.Label>&nbsp;</BS.Form.Label>
                    <BS.Form.Check
                        type={'checkbox'}
                        label={'Status'}
                        name="status"
                        value={values.status}
                        checked={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={view}
                    />
                </BS.Form.Group>
            </Row>
        </>
    )
}

export default BasicDetailsForm;