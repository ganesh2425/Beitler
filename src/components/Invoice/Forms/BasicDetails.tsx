import React, { useEffect, useState } from 'react';
import { Form, Row, Col, FormControl, InputGroup } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons'

import DatePicker from "react-datepicker";
import {addMonths, addDays, subWeeks} from "date-fns";
import { useSelector } from "react-redux";
import { getCustomerDetails } from "../../../reducers/customerReducer";
import * as BS from "react-bootstrap";
import SelectBox from "../../common/SelectBox";
import { toast } from "react-toastify";
import moment from "moment/moment";
const carriersPayto : any ={} 
const BasicDetailsForm = ({ values, handleChange, handleBlur, errors, touched, edit, setFieldValue, stores, carriers, custRatesDetails, isDisabled, pickupStopsChecked, InvoiceChargesTotal, AddressTypeLookup, InvoiceAPLastNumber, InvoiceARLastNumber, PathName, resetForm }: any): JSX.Element => {
    const [customers, setCustomers] = useState([]);
    const [customersId, setCustomersId] = useState();
    const [shipDt, setShipDt] = useState<any>(null);
    const [deliveredDt, setDeliveredDt] = useState<any>(null);
    const [deliveredMinDt, setDeliveredMinDt] = useState<any>(null);
    const [invoiceDt, setInvoiceDt] = useState<any>(null);
    const [invoiceMinDt, setInvoiceMinDt] = useState<any>(null);
    const [dueDt, setDueDate] = useState<any>(null);
    const [dueMinDt, setDueMinDate] = useState<any>(null);
    const [dueMaxDt, setDueMaxDate] = useState<any>(null);
    const [invoiceNumber, setInvoiceNumber] = useState('');

    const customersList: any = useSelector(getCustomerDetails);


    useEffect(() => {
        const tempData: any = [];
        if (customersList) {
            customersList.length > 0 &&
                customersList.map((customer: any) => {
                    tempData.push(customer.corporateoffice);
                });
            setCustomers(tempData);
        }
    }, [customersList]);

    const onCheckedChange = (e: any, setFieldValue: any) => {
        setFieldValue(e.target.name, e.target.checked);
        pickupStopsChecked(e.target.checked);
    }

    const onHandleChange = (e: any, setFieldValue: any, type: string) => {
        let corporateAdd: any[] = [];
        if (type === 'customer') {
            const customerData: any = {}
            customers && customers.length > 0 && customers.map((customer: any) => {
                if (customer.id === e.id) {
                    Object.assign(customerData, customer)
                }
            });
            // console.log(customerData)
            corporateAdd = [];
            setCustomersId(customerData.id);

            AddressTypeLookup.forEach((item: any) => {
                if (item.value === "Corporate" && item.isActive === true) {
                    corporateAdd.push(item);
                }
            });

            setFieldValue('Customer_Address_Id', 0);
            setFieldValue('CustomerName', '')
            setFieldValue('state', '');
            setFieldValue('City', '');
            setFieldValue('zipcode', '');
            setFieldValue('Address1', '');

            corporateAdd && corporateAdd.length > 0 && customerData.Address_Id && customerData.Address_Id.forEach((custElement: any) => {
                if (corporateAdd[0].id === parseInt(custElement.Type)) {
                    setFieldValue('Customer_Address_Id', custElement.Id.toString());
                    setFieldValue('CustomerName', customerData.LegalName)
                    setFieldValue('state', custElement.State);
                    setFieldValue('City', custElement.City);
                    setFieldValue('zipcode', custElement.Zipcode);
                    setFieldValue('Address1', custElement.Address1);
                    const APAR = PathName === 'accounts_payable' ? 'AP' : 'AR';
                    const yearDate = new Date();
                    const lastARAPnum = APAR === 'AP' ? (parseInt(InvoiceAPLastNumber[0].value) + 1).toString().padStart(4, '0') : (parseInt(InvoiceARLastNumber[0].value) + 1).toString().padStart(4, '0');
                    const InvNumber = APAR + "-" + customerData.LegalName.substring(0, 3) + "-" + yearDate.getFullYear().toString() + "-" + lastARAPnum;

                    setInvoiceNumber(InvNumber);
                    setFieldValue('ProNumber', InvNumber);
                }
            });

        } else if (type === 'pickup') {
            const pickupData: any = {}
            carriers && carriers.length > 0 && carriers.map((carrier: any) => {
                if (carrier.id === e.id) {
                    Object.assign(pickupData, carrier)
                }
            });

            
            AddressTypeLookup.forEach((item: any) => {
                if (item.value === "Corporate" && item.isActive === true) {
                    corporateAdd.push(item);
                }
            });

            setFieldValue('PickUp_Address_Id', 0);
            setFieldValue('PickUpName', '')
            setFieldValue('Pickup_state', '');
            setFieldValue('Pickup_City', '');
            setFieldValue('Pickup_zipcode', '');
            setFieldValue('Pickup_Address1', '');
            
    
            setFieldValue('invoiceTo_contactName',carriersPayto[e.id].ContactName);
            setFieldValue('invoiceTo_contactPhone',carriersPayto[e.id].ContactPhone);
            setFieldValue('invoiceTo_contactEmail',carriersPayto[e.id].ContactEmail);
            setFieldValue('invoiceTo_phone',carriersPayto[e.id].Phone);
            setFieldValue('invoiceTo_fax',carriersPayto[e.id].Fax);
            
            setFieldValue('invoiceTo_address',carriersPayto[e.id].Address1);
            setFieldValue('invoiceTo_address2',carriersPayto[e.id].Address2);
            setFieldValue('invoiceTo_city',carriersPayto[e.id].City);
            setFieldValue('invoiceTo_state',carriersPayto[e.id].State);
            setFieldValue('invoiceTo_zipCode',carriersPayto[e.id].Zipcode);
            
            setFieldValue('invoiceTo_terms',carriersPayto[e.id].Terms);
            setFieldValue('invoiceTo_comments',carriersPayto[e.id].Comments);

            corporateAdd && corporateAdd.length > 0 && pickupData.Address_Id && pickupData.Address_Id.forEach((custElement: any) => {
                if (corporateAdd[0].id === parseInt(custElement.Type)) {
                    setFieldValue('PickUp_Address_Id', custElement.Id.toString());
                    setFieldValue('PickUpName', pickupData.LegalName)
                    setFieldValue('Pickup_state', custElement.State);
                    setFieldValue('Pickup_City', custElement.City);
                    setFieldValue('Pickup_zipcode', custElement.Zipcode);
                    setFieldValue('Pickup_Address1', custElement.Address1);
                }
            });

        } else if (type === 'consignee') {
            const consigneeData: any = {}
            stores && stores.length > 0 && stores.map((store: any) => {
                if (store.id === e.id) {
                    Object.assign(consigneeData, store)
                }
            });
            AddressTypeLookup.forEach((item: any) => {
                if (item.value === "Corporate" && item.isActive === true) {
                    corporateAdd.push(item);
                }
            });
            setFieldValue('Consignee_Address_Id', 0);
            setFieldValue('ConsigneeName', '')
            setFieldValue('Consignee_state', '');
            setFieldValue('Consignee_City', '');
            setFieldValue('Consignee_zipcode', '');
            setFieldValue('Consignee_Address1', '');
            corporateAdd && corporateAdd.length > 0 && consigneeData.Address_Id && consigneeData.Address_Id.forEach((custElement: any) => {
                if (corporateAdd[0].id === parseInt(custElement.Type)) {
                    setFieldValue('Consignee_Address_Id', custElement.Id.toString());
                    setFieldValue('ConsigneeName', consigneeData.LegalName)
                    setFieldValue('Consignee_state', custElement.State);
                    setFieldValue('Consignee_City', custElement.City);
                    setFieldValue('Consignee_zipcode', custElement.Zipcode);
                    setFieldValue('Consignee_Address1', custElement.Address1);
                }
            });
        }

    }

    const customerData = customers && customers.length > 0 && customers.map((customer: any) => ({ value: customer.id, label: customer.LegalName }));
    const storesData = stores && stores.length > 0 && stores.map((store: any) => ({ value: store.id, label: store.LegalName }));
    const carriersData = carriers && carriers.length > 0 && carriers.map((carrier: any) => ({ value: carrier.id, label: carrier.LegalName }));

    if(carriers && carriers.length > 0){
        carriers.forEach((carrier:any, i:any)=>{
            let objItem = {}
            if(carrier.InvoiceTo && carrier.InvoiceTo.length > 0){
                objItem = {
                    ContactName: carrier.InvoiceTo[0].ContactName, 
                    ContactPhone: carrier.InvoiceTo[0].ContactPhone,
                    ContactEmail: carrier.InvoiceTo[0].ContactEmail, 
                    Phone: carrier.InvoiceTo[0].Phone, 
                    Terms: carrier.InvoiceTo[0].Terms, 
                    Comments: carrier.InvoiceTo[0].Comments, 
                    Fax: carrier.InvoiceTo[0].Address_Id[0].Fax, 
                    City: carrier.InvoiceTo[0].Address_Id[0].City, 
                    State: carrier.InvoiceTo[0].Address_Id[0].State, 
                    Zipcode: carrier.InvoiceTo[0].Address_Id[0].Zipcode, 
                    Address1: carrier.InvoiceTo[0].Address_Id[0].Address1, 
                    Address2: carrier.InvoiceTo[0].Address_Id[0].Address2
                }
            }
            else{
                objItem = {
                    ContactName: '', 
                    ContactPhone: '',
                    ContactEmail: '', 
                    Phone: '', 
                    Terms: '', 
                    Comments: '', 
                    Fax: '', 
                    City: '', 
                    State: '', 
                    Zipcode: '', 
                    Address1: '', 
                    Address2: ''
                }
                
            }
            carriersPayto[carrier.id] = objItem
        })
    }
    ///Customer Change Event
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (customersId && customersId !== 0 && customersId !== '' && customersId !== null) {
            custRatesDetails(customersId)
        }
    }, [customersId]);

    const onChangeEffectiveFromDate = (e: any, setFieldValue: any, type: string, values: any, _resetForm: any) => {

        if (type === 'ShipDate') {
            if (e <= new Date()) {
                _resetForm({values:{...values, InvoiceDate: null, DeliveryDate: null, DueDate: null}})
                setFieldValue('DeliveryDate', null);
                setFieldValue('InvoiceDate', null);
                setFieldValue('DueDate', null);
                setDeliveredDt(e);
                setDeliveredMinDt(e);
                setFieldValue(type, e);
                setShipDt(e);
            } else {
                setFieldValue(type, '');
                toast.error("Ship Date should be less than current date", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else if (type === 'DeliveryDate') {
            if (e >= shipDt) {
                if (values.InvoiceDate && e > values.InvoiceDate) {
                    _resetForm({values:{...values, InvoiceDate: null, DueDate: null}})
                    setFieldValue('InvoiceDate', null);
                    setFieldValue('DueDate', null);
                    setInvoiceMinDt(null);
                } else if (e > new Date()) {
                    setFieldValue(type, '');
                    toast.error("Delivery Date cannot be greater than Today Date", {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    setDeliveredDt(e);
                    setInvoiceMinDt(e);
                    setFieldValue(type, e);
                }
            } else {
                setFieldValue(type, '');
                toast.error("Delivery Date should be greater than Ship Date", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else if (type === 'InvoiceDate') {
            if (e >= deliveredDt) {
                const currentDate: any = moment(new Date()).add(1, 'M')
                if (e > new Date(currentDate)) {
                    setFieldValue(type, '');
                    toast.error("Invoice Date cannot be greater than Today Date", {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    setFieldValue(type, e);
                    setFieldValue('DueDate', null);
                    setDueMinDate(e);
                    setDueMaxDate(addDays(e, 14));
                }
            } else {
                setFieldValue(type, '');
                toast.error("Invoice Date should be greater than Delivery Date", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }

    return (
        <>
            <Form>
                <Row className="mt-0 d-block-sm">
                    {/* controlId="ProNumber" */}
                    <Form.Group as={Col} >
                        <Form.Label>Pro Number
                            <span className="required">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            readOnly={true}
                            disabled={true}
                            placeholder="Pro Number"
                            name='ProNumber'
                            value={invoiceNumber !== '' ? invoiceNumber : values.ProNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {/*<div className={!!(errors.ProNumber && touched.ProNumber) || (errors.ProNumber && edit) ? 'error-span show' : 'error-span'}>*/}
                        {/*    {*/}
                        {/*        (errors.ProNumber && touched.ProNumber) || (errors.ProNumber && edit)*/}
                        {/*            ? errors.ProNumber*/}
                        {/*            : 'Enter Pro Number'*/}
                        {/*    }</div>*/}

                    </Form.Group>

                    {/* controlId="ShipDate" */}
                    <Form.Group as={Col} >
                        <Form.Label htmlFor="ShipDate" >Ship Date
                            <span className="required">*</span>
                        </Form.Label>

                        <InputGroup className="mb-2 d-date-picker">
                            <DatePicker
                                selected={values.ShipDate ? new Date(values.ShipDate) : null}
                                onChange={(e: any) => {
                                    onChangeEffectiveFromDate(e, setFieldValue, 'ShipDate', values, resetForm);
                                }}

                                onBlur={handleBlur}
                                maxDate={new Date()}
                                minDate={addMonths(new Date(), -5)}
                                disabled={edit ? edit : isDisabled}
                                readOnly={edit ? true : isDisabled}
                                placeholderText="Ship Date"
                            />
                            <BS.InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></BS.InputGroup.Text>
                        </InputGroup>
                        <div className={!!(errors.ShipDate && touched.ShipDate) || (errors.ShipDate && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.ShipDate && touched.ShipDate) || (errors.ShipDate && edit)
                                    ? errors.ShipDate
                                    : 'Enter Ship Date'
                            }</div>
                    </Form.Group>

                    {/* controlId="Delivered Date" */}
                    <Form.Group as={Col} >
                        <Form.Label htmlFor="DeliveryDate" >Delivered Date
                            <span className="required">*</span>
                        </Form.Label>
                        <InputGroup className="mb-2 d-date-picker">
                            <DatePicker
                                selected={values.DeliveryDate ? new Date(values.DeliveryDate) : null}
                                //onChange={(date) => onChangeEffectiveFrom(date)}
                                onChange={(e: any) => {
                                    onChangeEffectiveFromDate(e, setFieldValue, 'DeliveryDate', values, resetForm);
                                }}
                                onBlur={handleBlur}
                                disabled={edit ? edit : isDisabled}
                                readOnly={edit ? true : isDisabled}
                                minDate={new Date(values.ShipDate)}
                                maxDate={new Date()}
                                showDisabledMonthNavigation
                            />
                            <BS.InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></BS.InputGroup.Text>
                        </InputGroup>
                        <div className={!!(errors.DeliveryDate && touched.DeliveryDate) || (errors.DeliveryDate && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.DeliveryDate && touched.DeliveryDate) || (errors.DeliveryDate && edit)
                                    ? errors.DeliveryDate
                                    : 'Enter Delivered Date'
                            }</div>
                    </Form.Group>

                    {/* controlId="InvoiceDate" */}
                    <Form.Group as={Col} >
                        <Form.Label htmlFor="InvoiceDate" >Invoice Date
                            <span className="required">*</span>
                        </Form.Label>

                        <InputGroup className="mb-2 d-date-picker">
                            <DatePicker
                                selected={values.InvoiceDate ? new Date(values.InvoiceDate) : null}
                                onChange={(e: any) => {
                                    onChangeEffectiveFromDate(e, setFieldValue, 'InvoiceDate', values, resetForm);
                                }}
                                // onChange={(date) => {
                                //     setFieldValue('InvoiceDate', date);
                                // }}
                                disabled={edit ? edit : isDisabled}
                                onBlur={handleBlur}
                                minDate={values.DeliveryDate ? new Date(values.DeliveryDate) : subWeeks(new Date(), 1)}
                                //minDate={addMonths(new Date(), -3)}
                                maxDate={addDays(new Date(), + 30)}
                                showDisabledMonthNavigation
                            />
                            <BS.InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></BS.InputGroup.Text>
                        </InputGroup>
                        <div className={!!(errors.InvoiceDate && touched.InvoiceDate) || (errors.InvoiceDate && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.InvoiceDate && touched.InvoiceDate) || (errors.InvoiceDate && edit)
                                    ? errors.InvoiceDate
                                    : 'Enter Invoice Date'
                            }</div>
                    </Form.Group>

                    {/* controlId="DueDate" */}
                    <Form.Group as={Col} >
                        <Form.Label htmlFor="DueDate" >Due Date
                            <span className="required">*</span>
                        </Form.Label>

                        <InputGroup className="mb-2 d-date-picker">
                            <DatePicker
                                selected={values.DueDate ? new Date(values.DueDate) : null}
                                disabled={edit ? edit : isDisabled}
                                onChange={(date) => {
                                    setFieldValue('DueDate', date);
                                }}
                                onBlur={handleBlur}
                                // minDate={new Date()}
                                // maxDate={addDays(new Date(), 7)}
                                minDate={dueMinDt}
                                maxDate={dueMaxDt}
                                showDisabledMonthNavigation
                            />

                            <BS.InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></BS.InputGroup.Text>
                        </InputGroup>
                        <div className={!!(errors.DueDate && touched.DueDate) || (errors.DueDate && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.DueDate && touched.DueDate) || (errors.DueDate && edit)
                                    ? errors.DueDate
                                    : 'Enter Due Date'
                            }</div>
                    </Form.Group>
                </Row>

                {/* 2nd Row */}
                <Row className="mt-2 d-block-sm">
                    {/* controlId="ShipmentType" */}
                    <Form.Group as={Col} >
                        <Form.Label>Shipment Type
                            <span className="required">*</span>
                        </Form.Label>

                        <Form.Control
                            type="text"
                            disabled={isDisabled}
                            placeholder="Shipment Type"
                            name='ShipmentType'
                            value={values.ShipmentType}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <div className={!!(errors.ShipmentType && touched.ShipmentType) || (errors.ShipmentType && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.ShipmentType && touched.ShipmentType) || (errors.ShipmentType && edit)
                                    ? errors.ShipmentType
                                    : 'Enter Shipment Type'
                            }</div>

                    </Form.Group>

                    {/* controlId="TrailerNumber" */}
                    <Form.Group as={Col} >
                        <Form.Label>Trailer Number
                            <span className="required">*</span>
                        </Form.Label>

                        <Form.Control
                            type="text"
                            disabled={isDisabled}
                            placeholder="Trailer Number"
                            name='TrailerNumber'
                            value={values.TrailerNumber ? values.TrailerNumber : ''}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <div className={!!(errors.TrailerNumber && touched.TrailerNumber) || (errors.TrailerNumber && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.TrailerNumber && touched.TrailerNumber) || (errors.TrailerNumber && edit)
                                    ? errors.TrailerNumber
                                    : 'Enter Trailer Number'
                            }</div>

                    </Form.Group>

                    {/* controlId="MilesClass" */}
                    <Form.Group as={Col} >
                        <Form.Label>Miles Class</Form.Label>
                        <Form.Control
                            type="text"
                            disabled={isDisabled}
                            placeholder="Miles Class"
                            name='MilesClass'
                            value={values.MilesClass ? values.MilesClass : ''}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <div className={!!(errors.MilesClass && touched.MilesClass) || (errors.MilesClass && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.MilesClass && touched.MilesClass) || (errors.MilesClass && edit)
                                    ? errors.MilesClass
                                    : 'Enter Miles Class'
                            }</div>

                    </Form.Group>

                    {/* controlId="References_Number" */}
                    <Form.Group as={Col} >
                        <Form.Label>References#</Form.Label>
                        <Form.Control
                            type="text"
                            className="text-right"
                            disabled={isDisabled}
                            placeholder="References#"
                            name='References_Number'
                            value={values.References_Number}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <div className={!!(errors.References_Number && touched.References_Number) || (errors.References_Number && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.References_Number && touched.References_Number) || (errors.References_Number && edit)
                                    ? errors.References_Number
                                    : 'Enter Pro Number'
                            }</div>

                    </Form.Group>

                    {/* controlId="HasExtraPickNStop" */}
                    <Form.Group as={Col} >
                        <Form.Label>Has ExtraPickNstop</Form.Label>
                        {/* <Form.Check type="checkbox" id="customControlAutosizing" label="" /> */}
                        <Form.Check
                            type="checkbox"
                            name='HasExtraPickNStop'
                            value={values.HasExtraPickNStop}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                                onCheckedChange(e, setFieldValue);
                            }}
                            checked={values.HasExtraPickNStop}
                            disabled={isDisabled}
                        />
                        <div className={!!(errors.HasExtraPickNStop && touched.HasExtraPickNStop) || (errors.HasExtraPickNStop && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.HasExtraPickNStop && touched.HasExtraPickNStop) || (errors.HasExtraPickNStop && edit)
                                    ? errors.HasExtraPickNStop
                                    : 'Please Tick PickNStop'
                            }</div>

                    </Form.Group>
                </Row>

                {/* 3rd Row controlId="CAAddress1" */}
                {
                    values.Customer_Address.length > 0 && values.Customer_Address.map((item: any, index: any) => {
                        if (parseInt(item.Id) && (parseInt(item.Id) === parseInt(values.Customer_Address_Id))) {
                            return (
                                <Row className="bg-lgray align-items-center mb-3 mt-3 d-block-sm" key={index}>
                                    <Form.Group as={Col} className="mb-2">
                                        <Form.Label htmlFor="CustomerName" >Customer Name {PathName === 'accounts_receivables' ?
                                        <span className="required">*</span>
                                        :
                                        '' 
                            }
                                        </Form.Label>
                                        {/*<InputGroup className="mb-2">*/}
                                        <SelectBox
                                            options={customerData}
                                            name={"CustomerName"}
                                            onChange={(e: any) => {
                                                onHandleChange(e, setFieldValue, 'customer');
                                            }}
                                            setValue={values.Customer_Address[0].Entity_Id}
                                            defaultval={{ value: values.Customer_Address[0].Entity_Id, label: values.CustomerName }}
                                            disabled={edit ? true : isDisabled}
                                            className="form-control"
                                        />

                                        <div className={!!(errors.CustomerName && touched.CustomerName) || (errors.CustomerName && edit) ? 'error-span show' : 'error-span'}>
                                            {
                                                (errors.CustomerName && touched.CustomerName) || (errors.CustomerName && edit)
                                                    ? errors.CustomerName
                                                    : 'Enter Customer Name'
                                            }</div>

                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-2">
                                        <Form.Label>Address</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                disabled={isDisabled}
                                                placeholder="Customer Address"
                                                name='Address1'
                                                value={values.Address1 ? values.Address1 : item.Address1}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-2" >
                                        <Form.Label>State</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                disabled={isDisabled}
                                                placeholder="State"
                                                name='state'
                                                value={values.state ? values.state : item.state}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-2">
                                        <Form.Label>City</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                disabled={isDisabled}
                                                placeholder="City"
                                                name='City'
                                                value={values.City ? values.City : item.City}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-2">
                                        <Form.Label>ZipCode</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                className="text-right"
                                                placeholder="zipcode"
                                                name='zipcode'
                                                value={values.zipcode ? values.zipcode : item.zipcode}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>

                                    </Form.Group>
                                </Row>
                            );
                        }
                    })
                }
                {/** New Record Entry */}
                {
                    //&& (values.Customer_Address_Id === "" || parseInt(values.Customer_Address_Id) === 0)
                    !edit && !isDisabled
                        ?
                        <Row className="bg-lgray align-items-center mb-3 mt-3 d-block-sm" >
                            <Form.Group as={Col} className="mb-2">
                                <Form.Label htmlFor="CustomerName" >Customer Name{PathName === 'accounts_receivables' ?
                                        <span className="required">*</span>
                                        :
                                        '' 
                            }
                                </Form.Label>
                                {/*<InputGroup className="mb-2">*/}
                                <SelectBox
                                    options={customerData}
                                    name={"CustomerName"}
                                    onChange={(e: any) => {
                                        onHandleChange(e, setFieldValue, 'customer');
                                    }}
                                    onBlur={handleBlur}
                                    //defaultval={values.Customer_Address[0].Entity_Id}
                                    className="form-control"
                                />
                                <div className={!!(errors.CustomerName && touched.CustomerName) || (errors.CustomerName && edit) ? 'error-span show' : 'error-span'}>
                                    {
                                        (errors.CustomerName && touched.CustomerName) || (errors.CustomerName && edit)
                                            ? errors.CustomerName
                                            : 'Enter Customer Name'
                                    }</div>

                            </Form.Group>

                            <Form.Group as={Col} className="mb-2">
                                <Form.Label>Address</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        disabled={isDisabled}
                                        placeholder="Customer Address"
                                        name='Address1'
                                        value={values.Address1}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    />
                                </InputGroup>

                            </Form.Group>

                            <Form.Group as={Col} className="mb-2" >
                                <Form.Label>State</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        disabled={isDisabled}
                                        placeholder="State"
                                        name='state'
                                        value={values.state}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    />
                                </InputGroup>

                            </Form.Group>
                            <Form.Group as={Col} className="mb-2">
                                <Form.Label>City</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        disabled={isDisabled}
                                        placeholder="City"
                                        name='City'
                                        value={values.City}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-2">
                                <Form.Label>ZipCode</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        className="text-right"
                                        placeholder="zipcode"
                                        name='zipcode'
                                        value={values.zipcode}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        : null
                }

                {/* 4th Row controlId="PickUpName" */}

                {
                    values.Pickup_Address && values.Pickup_Address.length > 0 && values.Pickup_Address.map((item: any, index: any) => {
                        if (values.Pickup_Address_Id !== "" && parseInt(item.Id) === parseInt(values.Pickup_Address_Id)) {
                            return (
                                <Row className="bg-lgray align-items-center mb-3 mt-3 d-block-sm" key={index}>
                                    <Form.Group as={Col} className="mb-2">
                                        <Form.Label htmlFor="PickUpName" >PickUp Name {PathName === 'accounts_payable' ?
                                        <span className="required">*</span>
                                        :
                                        '' 
                            }
                            </Form.Label>
                                        <SelectBox
                                            options={carriersData}
                                            name={"PickUpName"}
                                            onChange={(e: any) => {
                                                onHandleChange(e, setFieldValue, 'pickup');
                                            }}
                                            defaultval={{ value: values.Pickup_Address[0].Entity_Id, label: values.PickUpName }}
                                            disabled={edit ? true : isDisabled}
                                            onBlur={handleBlur}
                                            className="form-control"
                                        />
                                        <div className={!!(errors.PickUpName && touched.PickUpName) || (errors.PickUpName && edit) ? 'error-span show' : 'error-span'}>
                                            {
                                                (errors.PickUpName && touched.PickUpName) || (errors.PickUpName && edit)
                                                    ? errors.PickUpName
                                                    : 'Enter PickUp Name'
                                            }</div>

                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-2">
                                        <Form.Label>Address</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                placeholder="Pickup Address"
                                                name='Pickup_Address1'
                                                value={values.Pickup_Address1 ? values.Pickup_Address1 : item.Address1}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>

                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-2" >
                                        <Form.Label>State</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                placeholder="State"
                                                name='Pickup_state'
                                                value={values.Pickup_state ? values.Pickup_state : item.State}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>

                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-2" >
                                        <Form.Label>City</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                placeholder="City"
                                                name='Pickup_City'
                                                value={values.Pickup_City ? values.Pickup_City : item.City}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>

                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-2" >
                                        <Form.Label>ZipCode</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                className="text-right"
                                                placeholder="zipcode"
                                                name='Pickup_zipcode'
                                                value={values.Pickup_zipcode ? values.Pickup_zipcode : item.zipcode}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Row>

                            );
                        }
                    })
                }

                {/** If Blank then we would be using this */}
                {
                    !edit && !isDisabled ?
                        <Row className="bg-lgray align-items-center mb-3 mt-3 d-block-sm" >
                            <Form.Group as={Col} className="mb-2">
                                <Form.Label htmlFor="PickUpName" >PickUp Name{PathName === 'accounts_payable' ?
                                        <span className="required">*</span>
                                        :
                                        '' 
                            }</Form.Label>
                                <SelectBox
                                    options={carriersData}
                                    name={"PickUpName"}
                                    onBlur={handleBlur}
                                    onChange={(e: any) => {
                                        onHandleChange(e, setFieldValue, 'pickup');

                                    }}
                                    className="form-control"
                                />
                                <div className={!!(errors.PickUpName && touched.PickUpName) || (errors.PickUpName && edit) ? 'error-span show' : 'error-span'}>
                                    {
                                        (errors.PickUpName && touched.PickUpName) || (errors.PickUpName && edit)
                                            ? errors.PickUpName
                                            : 'Enter PickUp Name'
                                    }</div>

                            </Form.Group>

                            <Form.Group as={Col} className="mb-2">
                                <Form.Label>Address</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        placeholder="Pickup Address"
                                        name='Pickup_Address1'
                                        value={values.Pickup_Address1}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}                                    
                                    />
                                </InputGroup>

                            </Form.Group>

                            <Form.Group as={Col} className="mb-2" >
                                <Form.Label>State</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        placeholder="State"
                                        name='Pickup_state'
                                        value={values.Pickup_state}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    />
                                </InputGroup>

                            </Form.Group>
                            <Form.Group as={Col} className="mb-2" >
                                <Form.Label>City</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        placeholder="City"
                                        name='Pickup_City'
                                        value={values.Pickup_City}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    />
                                </InputGroup>


                            </Form.Group>
                            <Form.Group as={Col} className="mb-2" >
                                <Form.Label>ZipCode</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        className="text-right"
                                        placeholder="zipcode"
                                        name='Pickup_zipcode'
                                        value={values.Pickup_zipcode}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    />
                                </InputGroup>


                            </Form.Group>
                        </Row>
                        :
                        values.Pickup_Address === null ? <Row className="bg-lgray align-items-center mb-3 mt-3 d-block-sm" >
                            <Form.Group as={Col} className="mb-2">
                                <Form.Label htmlFor="PickUpName" >PickUp Name{PathName === 'accounts_payable' ?
                                        <span className="required">*</span>
                                        :
                                        '' 
                            }</Form.Label>
                                <SelectBox
                                    options={carriersData}
                                    name={"PickUpName"}
                                    onBlur={handleBlur}
                                    disabled={isDisabled}
                                    onChange={(e: any) => {
                                        onHandleChange(e, setFieldValue, 'pickup');
                                    }}
                                    className="form-control"
                                />
                                <div className={!!(errors.PickUpName && touched.PickUpName) || (errors.PickUpName && edit) ? 'error-span show' : 'error-span'}>
                                    {
                                        (errors.PickUpName && touched.PickUpName) || (errors.PickUpName && edit)
                                            ? errors.PickUpName
                                            : 'Enter PickUp Name'
                                    }</div>

                            </Form.Group>

                            <Form.Group as={Col} className="mb-2">
                                <Form.Label>Address</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        placeholder="Pickup Address"
                                        name='Pickup_Address1'
                                        value={values.Pickup_Address1}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}                                    
                                    />
                                </InputGroup>

                            </Form.Group>

                            <Form.Group as={Col} className="mb-2" >
                                <Form.Label>State</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        placeholder="State"
                                        name='Pickup_state'
                                        value={values.Pickup_state}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    />
                                </InputGroup>

                            </Form.Group>
                            <Form.Group as={Col} className="mb-2" >
                                <Form.Label>City</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        placeholder="City"
                                        name='Pickup_City'
                                        value={values.Pickup_City}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    />
                                </InputGroup>


                            </Form.Group>
                            <Form.Group as={Col} className="mb-2" >
                                <Form.Label>ZipCode</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        className="text-right"
                                        placeholder="zipcode"
                                        name='Pickup_zipcode'
                                        value={values.Pickup_zipcode}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    />
                                </InputGroup>


                            </Form.Group>
                        </Row>
                            : ""
                }

                {/* 5th Row Consignee Name / Consignee Details */}
                {
                    edit && !isDisabled && values.Consignee_Address && values.Consignee_Address.length > 0 && values.Consignee_Address.map((item: any, index: any) => {
                        if (parseInt(item.Id) === parseInt(values.Consignee_Address_Id)) {
                            return (
                                <Row className="bg-lgray align-items-center mb-3 mt-3 d-block-sm" key={index}>
                                    <Form.Group as={Col} className="mb-2">
                                        <Form.Label htmlFor="ConsigneeName" >Consignee Name<span className="required">*</span>
                                        </Form.Label>
                                        <SelectBox
                                            options={storesData}
                                            name={"ConsigneeName"}
                                            //onBlur={handleBlur}
                                            onChange={(e: any) => {
                                                onHandleChange(e, setFieldValue, 'consignee');
                                            }}
                                            defaultval={{ value: values.Consignee_Address[0].Entity_Id, label: values.ConsigneeName }}
                                            disabled={edit ? true : isDisabled}
                                            className="form-control"
                                        />
                                        <div className={!!(errors.ConsigneeName && touched.ConsigneeName) || (errors.ConsigneeName && edit) ? 'error-span show' : 'error-span'}>
                                            {
                                                (errors.ConsigneeName && touched.ConsigneeName) || (errors.ConsigneeName && edit)
                                                    ? errors.ConsigneeName
                                                    : 'Enter Consignee Name'
                                            }</div>

                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-2">
                                        <Form.Label>Address</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                placeholder="Consignee Address"
                                                name='Consignee_Address1'
                                                value={values.Consignee_Address1 ? values.Consignee_Address1 : item.Address1}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>

                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-2" >
                                        <Form.Label>State</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                placeholder="State"
                                                name='Consignee_state'
                                                value={values.Consignee_state ? values.Consignee_state : item.State}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>

                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-2" >
                                        <Form.Label>City</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                placeholder="City"
                                                name='Consignee_City'
                                                value={values.Consignee_City ? values.Consignee_City : item.City}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>


                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-2" >
                                        <Form.Label>ZipCode</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                className="text-right"
                                                placeholder="zipcode"
                                                name='Consignee_zipcode'
                                                value={values.Consignee_zipcode ? values.Consignee_zipcode : item.zipcode}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>


                                    </Form.Group>
                                </Row>

                            );
                        }
                    })
                }
                {
                    !edit && isDisabled && values.Consignee_Address && values.Consignee_Address.length > 0 && values.Consignee_Address.map((item: any, index: any) => {
                        if (parseInt(item.Id) === parseInt(values.Consignee_Address_Id)) {
                            return (
                                <Row className="bg-lgray align-items-center mb-3 mt-3 d-block-sm" key={index}>
                                    <Form.Group as={Col} className="mb-2">
                                        <Form.Label htmlFor="ConsigneeName" >Consignee Name<span className="required">*</span>
                                        </Form.Label>
                                        <SelectBox
                                            options={storesData}
                                            name={"ConsigneeName"}
                                            //onBlur={handleBlur}
                                            onChange={(e: any) => {
                                                onHandleChange(e, setFieldValue, 'consignee');
                                            }}
                                            defaultval={{ value: values.Consignee_Address[0].Entity_Id, label: values.ConsigneeName }}
                                            disabled={edit ? true : isDisabled}
                                            className="form-control"
                                        />
                                        <div className={!!(errors.ConsigneeName && touched.ConsigneeName) || (errors.ConsigneeName && edit) ? 'error-span show' : 'error-span'}>
                                            {
                                                (errors.ConsigneeName && touched.ConsigneeName) || (errors.ConsigneeName && edit)
                                                    ? errors.ConsigneeName
                                                    : 'Enter Consignee Name'
                                            }</div>

                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-2">
                                        <Form.Label>Address</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                placeholder="Consignee Address"
                                                name='Consignee_Address1'
                                                value={values.Consignee_Address1 ? values.Consignee_Address1 : item.Address1}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>

                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-2" >
                                        <Form.Label>State</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                placeholder="State"
                                                name='Consignee_state'
                                                value={values.Consignee_state ? values.Consignee_state : item.State}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>

                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-2" >
                                        <Form.Label>City</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                placeholder="City"
                                                name='Consignee_City'
                                                value={values.Consignee_City ? values.Consignee_City : item.City}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>


                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-2" >
                                        <Form.Label>ZipCode</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                type="text"
                                                readOnly={true}
                                                className="text-right"
                                                placeholder="zipcode"
                                                name='Consignee_zipcode'
                                                value={values.Consignee_zipcode ? values.Consignee_zipcode : item.zipcode}
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            />
                                        </InputGroup>


                                    </Form.Group>
                                </Row>

                            );
                        }
                    })
                }

                {/** If Blank then we would be using this */}

                {
                    !edit && !isDisabled ?
                        <Row className="bg-lgray align-items-center mb-3 mt-3 d-block-sm" >
                            <Form.Group as={Col} className="mb-2">
                                <Form.Label htmlFor="ConsigneeName" >Consignee Name<span className="required">*</span>
                                </Form.Label>
                                <SelectBox
                                    options={storesData}
                                    name={"ConsigneeName"}
                                    onBlur={handleBlur}
                                    onChange={(e: any) => {
                                        onHandleChange(e, setFieldValue, 'consignee');
                                    }}
                                    className="form-control"
                                />
                                <div className={!!(errors.ConsigneeName && touched.ConsigneeName) || (errors.ConsigneeName && edit) ? 'error-span show' : 'error-span'}>
                                    {
                                        (errors.ConsigneeName && touched.ConsigneeName) || (errors.ConsigneeName && edit)
                                            ? errors.ConsigneeName
                                            : 'Enter Consignee Name'
                                    }</div>

                            </Form.Group>

                            <Form.Group as={Col} className="mb-2">
                                <Form.Label>Address</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        placeholder="Consignee Address"
                                        name='Consignee_Address1'
                                        value={values.Consignee_Address1}
                                    />
                                </InputGroup>

                            </Form.Group>

                            <Form.Group as={Col} className="mb-2" >
                                <Form.Label>State</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        placeholder="State"
                                        name='Consignee_state'
                                        value={values.Consignee_state}
                                    />
                                </InputGroup>

                            </Form.Group>
                            <Form.Group as={Col} className="mb-2" >
                                <Form.Label>City</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        placeholder="City"
                                        name='Consignee_City'
                                        value={values.Consignee_City}
                                    />
                                </InputGroup>

                            </Form.Group>
                            <Form.Group as={Col} className="mb-2" >
                                <Form.Label>ZipCode</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        readOnly={true}
                                        className="text-right"
                                        placeholder="zipcode"
                                        name='Consignee_zipcode'
                                        value={values.Consignee_zipcode}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        : edit && isDisabled ?
                            <Row className="bg-lgray align-items-center mb-3 mt-3 d-block-sm" >
                                <Form.Group as={Col} className="mb-2">
                                    <Form.Label htmlFor="ConsigneeName" >Consignee Name<span className="required">*</span>
                                    </Form.Label>
                                    <SelectBox
                                        options={storesData}
                                        name={"ConsigneeName"}
                                        onBlur={handleBlur}
                                        onChange={(e: any) => {
                                            onHandleChange(e, setFieldValue, 'consignee');
                                        }}
                                        className="form-control"
                                    />
                                    <div className={!!(errors.ConsigneeName && touched.ConsigneeName) || (errors.ConsigneeName && edit) ? 'error-span show' : 'error-span'}>
                                        {
                                            (errors.ConsigneeName && touched.ConsigneeName) || (errors.ConsigneeName && edit)
                                                ? errors.ConsigneeName
                                                : 'Enter Consignee Name'
                                        }</div>

                                </Form.Group>

                                <Form.Group as={Col} className="mb-2">
                                    <Form.Label>Address</Form.Label>
                                    <InputGroup className="mb-2">
                                        <Form.Control
                                            type="text"
                                            readOnly={true}
                                            placeholder="Consignee Address"
                                            name='Consignee_Address1'
                                            value={values.Consignee_Address1}
                                        />
                                    </InputGroup>

                                </Form.Group>

                                <Form.Group as={Col} className="mb-2" >
                                    <Form.Label>State</Form.Label>
                                    <InputGroup className="mb-2">
                                        <Form.Control
                                            type="text"
                                            readOnly={true}
                                            placeholder="State"
                                            name='Consignee_state'
                                            value={values.Consignee_state}
                                        />
                                    </InputGroup>

                                </Form.Group>
                                <Form.Group as={Col} className="mb-2" >
                                    <Form.Label>City</Form.Label>
                                    <InputGroup className="mb-2">
                                        <Form.Control
                                            type="text"
                                            readOnly={true}
                                            placeholder="City"
                                            name='Consignee_City'
                                            value={values.Consignee_City}
                                        />
                                    </InputGroup>

                                </Form.Group>
                                <Form.Group as={Col} className="mb-2" >
                                    <Form.Label>ZipCode</Form.Label>
                                    <InputGroup className="mb-2">
                                        <Form.Control
                                            type="text"
                                            readOnly={true}
                                            className="text-right"
                                            placeholder="zipcode"
                                            name='Consignee_zipcode'
                                            value={values.Consignee_zipcode}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            : null

                }


                {/* 6th Row */}
                <Row className="mt-2 d-block-sm">
                    {/* controlId="Amount" */}
                    <Form.Group as={Col} className="mb-2" >
                        <Form.Label>Invoice Amount</Form.Label>
                        <Form.Control
                            type="text"
                            disabled={true}
                            className="text-right"
                            placeholder="Amount"
                            name='TotalAmount'
                            value={"$" + (Math.round(InvoiceChargesTotal * 100) / 100).toFixed(2)}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <div className={!!(errors.TotalAmount && touched.TotalAmount) || (errors.TotalAmount && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.TotalAmount && touched.TotalAmount) || (errors.TotalAmount && edit)
                                    ? errors.TotalAmount
                                    : 'Enter Total Amount'
                            }</div>

                    </Form.Group>

                    {/* controlId="Status" */}
                    <Form.Group as={Col} className="mb-2" >
                        <Form.Label>Invoice Status</Form.Label>
                        <Form.Control
                            type="text"
                            disabled={true}
                            placeholder="Invoice Status"
                            name='InvoiceStatus'
                            value={(values.InvoiceStatus === 65 || values.InvoiceStatus === "") ? 'Pending' : 'Paid'}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <div className={!!(errors.InvoiceStatus && touched.InvoiceStatus) || (errors.InvoiceStatus && edit) ? 'error-span show' : 'error-span'}>
                            {
                                (errors.InvoiceStatus && touched.InvoiceStatus) || (errors.InvoiceStatus && edit)
                                    ? errors.InvoiceStatus
                                    : 'Enter Invoice Status'
                            }</div>

                    </Form.Group>
                    <Form.Group as={Col} className="mb-2" >
                        <Form.Label></Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-2" >
                        <Form.Label></Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-2" >
                        <Form.Label></Form.Label>
                    </Form.Group>
                </Row>

                <Row className="mt-2 d-block-sm">
                    <FloatingLabel controlId="floatingTextarea2" label="Note">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a Note here"
                            style={{ height: "100px" }}
                            name={"Note"}
                            value={values.Note ? values.Note : ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={edit ? false : isDisabled}
                        />
                    </FloatingLabel>
                </Row>

            </Form>
        </>
    );
}

export default BasicDetailsForm;