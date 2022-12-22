import React, { useState, useEffect } from "react";
import * as BS from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import PerfectScrollbar from "react-perfect-scrollbar";
import AddTypes from "./addTypes";
import {addTypesFormData} from "../../../interfaces/forms";
import { corporateOfficeProps } from "../../../interfaces/customerTypes";
import { toast } from "react-toastify";
import ContactListingColumn from "../columns/ContactListingColumn";
import CustomTableContainer from "../../../containers/CommonTableContainer";
import { isEmailExists, isMobileExists } from "../../../utilities/common";
import DeleteModal from "../../common/DeleteModal";
import DatePicker from "react-datepicker";
import { addMonths } from 'date-fns';
import moment from "moment";

export const zones = [
    {id: 1, value: 'A'},
    {id: 2, value: 'B'},
    {id: 3, value: 'C'},
    {id: 4, value: 'D'}
]

const CorporateOfficeForm = ({
                                 corporateOfficeContact,
                                 values,
                                 handleChange,
                                 handleBlur,
                                 errors,
                                 touched,
                                 contactsData,
                                 contacts,
                                 type,
                                 onDeleteCoContact,
                                 setFieldValue,
                                 edit,
                                 pathEntityType,
                                 changeDeliveryDate,
                                 toggleShowHide

                             }: corporateOfficeProps): JSX.Element => {
    const [isInit, setIsInit] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const [removeId, setRemoveId] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [localError, setLocalErrors] = useState(false);
    // const [startDate, setStartDate] = useState<any>(null);
    const [startDate, setStartDate] = useState<any>(null);
    const [isCarrierFlag, setIsCarrierFlag] = useState<any>(false);

    const [mobileDisable, setMobileDisable] = useState(false);
    const [emailDisable, setEmailDisable] = useState(false);

    const addRow = () => {
        setShowModal(true);
        setIsInit(true);
        setCurrentData({});
    };

    const onGetData = (id: number): void => {
        const data =
            contactsData &&
            contactsData.length > 0 &&
            contactsData.find((v: any) => v.Id === id);
        setCurrentData(data);
        setShowModal(true);
    };

    const onDeleteData = (id: number): void => {
        setDeleteModal(true);
        setRemoveId(id);
    };
    const addCorporateOfficeContact = (
        values: addTypesFormData,
        isEdit = false
    ) => {
        const checkEmail = isEmailExists(contactsData, values);
        const checkmobile = isMobileExists(contactsData, values);

        console.log(checkEmail);

        if (checkEmail && !emailDisable) {
            toast.error(checkEmail + " Already exists on the contact table");
            setEmailDisable(true)
        }
        if (checkmobile && !mobileDisable) {
            toast.error(values.mobile + " Already exists on the contact table");
            setMobileDisable(true)
        }

        if (!checkmobile && !checkEmail) {
            setShowModal(false);
            setEmailDisable(false)
            setMobileDisable(false)
            if (corporateOfficeContact) {
                corporateOfficeContact(values, isEdit);
            }
        }
    };

    let cols: any = [];
    if (contacts.length > 0) {
        cols = ContactListingColumn({
            contacts,
            onGetData,
            onDeleteData,
        });
    }
    const modalShowClose = () => {
        setDeleteModal(false);
    };
    const onDeleteRecord = () => {
        onDeleteCoContact(removeId);
    };

    if (Object.keys(errors).length > 0) {
        if (touched.zipCode && !localError) {
            // corporateOfficeErrors(true);
            setLocalErrors(true);
        }
    }

    const onChangeDeliveryDate = (date: any) => {
        setStartDate(date)
        changeDeliveryDate(date)
    }

    useEffect(() => {
        if(values.IsCarrier && parseInt(values.IsCarrier) === 1){
            setIsCarrierFlag(true)
        }
        if(values.Entity_Type_Id && values.Entity_Type_Id === 2){
            toggleShowHide(true)
        }
        if(edit) {
            if((values.FirstDeliveryDate && moment(new Date(values.FirstDeliveryDate.replace(/\s+/g, 'T') ),"DD/MM/YYYY").year() === 1 )|| values.FirstDeliveryDate === undefined) {
                setStartDate(null)
            } else {
                setStartDate(new Date(values.FirstDeliveryDate.replace(/\s+/g, 'T') ))
            }
            console.log(values);
            // if(navigator.userAgent.indexOf("Firefox") != -1) {
            //     if(moment(new Date(values.FirstDeliveryDate),"DD/MM/YYYY").year() === 1) {
            //         console.log("DID mount")
            //         setStartDate(null)
            //     }
            // }

        }
    }, [])

    const showHideSections = (e:any) =>{
        toggleShowHide(e.target.checked)
    }
    
    // console.log(values)
    return (
        <>
            <BS.Row className="mb-3 d-block-sm">
                <BS.Form.Group as={BS.Col} controlId="legalName">
                    <BS.Form.Label>
                        Legal Name <span className="required">*</span>
                    </BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        autoComplete="nope"
                        placeholder="Enter Legal Name"
                        name="legalName"
                        value={values.legalName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div
                        className={
                            !!(errors.legalName && touched.legalName) ||
                            !!(errors.legalName && edit)
                                ? "error-span show"
                                : "error-span"
                        }
                    >
                        {(errors.legalName && touched.legalName) ||
                        (errors.legalName && edit)
                            ? errors.legalName
                            : "Enter legalName"}
                    </div>
                </BS.Form.Group>
                {
                    pathEntityType === 5 ? (
                        <BS.Form.Group as={BS.Col} controlId="StoreNumber">
                            <BS.Form.Label>Store Number <span className="required">*</span></BS.Form.Label>
                            <BS.Form.Control
                                type="text"
                                autoComplete="nope"
                                placeholder="Enter StoreNumber"
                                name="StoreNumber"
                                value={values.StoreNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div
                                className={
                                    !!(errors.StoreNumber && touched.StoreNumber) || !!(errors.StoreNumber && edit)
                                        ? "error-span show"
                                        : "error-span"
                                }
                            >
                                {(errors.StoreNumber && touched.StoreNumber) || (errors.StoreNumber && edit)
                                    ? errors.StoreNumber
                                    : "Enter StoreNumber"}
                            </div>
                        </BS.Form.Group>
                    ) : null}
                <BS.Form.Group as={BS.Col} controlId="address">
                    <BS.Form.Label>Address(Street#,name) {pathEntityType === 5 ? <span className="required">*</span> : ''}</BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        autoComplete="nope"
                        placeholder="Enter address"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div
                        className={
                            !!(errors.address && touched.address) ||
                            !!(errors.address && edit)
                                ? "error-span show"
                                : "error-span"
                        }
                    >
                        {(errors.address && touched.address) || (errors.address && edit)
                            ? errors.address
                            : "Enter Address"}
                    </div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="address2">
                    <BS.Form.Label>Address BuildingFloor</BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        autoComplete="nope"
                        placeholder="Enter building floor"
                        name="address2"
                        value={values.address2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div
                        className={
                            !!(errors.address2 && touched.address2) ||
                            !!(errors.address2 && edit)
                                ? "error-span show"
                                : "error-span"
                        }
                    >
                        {(errors.address2 && touched.address2) || (errors.address2 && edit)
                            ? errors.address2
                            : "Enter address building floor"}
                    </div>
                </BS.Form.Group>
            </BS.Row>
            <BS.Row className="mb-3 d-block-sm">
                <BS.Form.Group as={BS.Col} controlId="City">
                    <BS.Form.Label>City <span className="required">*</span></BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        autoComplete="nope"
                        placeholder="Enter city"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div
                        className={
                            !!(errors.city && touched.city) || !!(errors.city && edit)
                                ? "error-span show"
                                : "error-span"
                        }
                    >
                        {(errors.city && touched.city) || (errors.city && edit)
                            ? errors.city
                            : "Enter city"}
                    </div>
                </BS.Form.Group>

                <BS.Form.Group as={BS.Col} controlId="State">
                    <BS.Form.Label>State <span className="required">*</span></BS.Form.Label>
                    <BS.Form.Control
                        type="text"
                        autoComplete="nope"
                        placeholder="Enter state"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div
                        className={
                            !!(errors.state && touched.state) || !!(errors.state && edit)
                                ? "error-span show"
                                : "error-span"
                        }
                    >
                        {(errors.state && touched.state) || (errors.state && edit)
                            ? errors.state
                            : "Enter state"}
                    </div>
                </BS.Form.Group>
                <BS.Form.Group as={BS.Col} controlId="Zip Code">
                    <BS.Form.Label>
                        Zip Code <span className="required">*</span>
                    </BS.Form.Label>
                    <BS.Form.Control
                        type="number"
                        autoComplete="nope"
                        placeholder="Enter Zip Code"
                        name="zipCode"
                        value={values.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div
                        className={
                            !!(errors.zipCode && touched.zipCode) ||
                            !!(errors.zipCode && edit)
                                ? "error-span show"
                                : "error-span"
                        }
                    >
                        {(errors.zipCode && touched.zipCode) || (errors.zipCode && edit)
                            ? errors.zipCode
                            : "Enter zipCode"}
                    </div>
                </BS.Form.Group>

                <BS.Form.Group as={BS.Col} controlId="Fax Number">
                    <BS.Form.Label>Fax Number</BS.Form.Label>
                    <BS.Form.Control
                        type="number"
                        autoComplete="nope"
                        placeholder="Enter Fax Number"
                        name="fax"
                        value={values.fax}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div
                        className={
                            !!(errors.fax && touched.fax) || !!(errors.fax && edit)
                                ? "error-span show"
                                : "error-span"
                        }
                    >
                        {(errors.fax && touched.fax) || (errors.fax && edit)
                            ? errors.fax
                            : "Enter fax"}
                    </div>
                </BS.Form.Group>
            </BS.Row>
            <BS.Row className="mb-3 d-block-sm">
                <BS.Form.Group as={BS.Col} controlId="Phone Number">
                    <BS.Form.Label>Phone Number</BS.Form.Label>
                    <BS.Form.Control
                        type="number"
                        autoComplete="nope"
                        placeholder="Enter Phone Number"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div
                        className={
                            !!(errors.phone && touched.phone) || !!(errors.phone && edit)
                                ? "error-span show"
                                : "error-span"
                        }
                    >
                        {(errors.phone && touched.phone) || (errors.phone && edit)
                            ? errors.phone
                            : "Enter phone"}
                    </div>
                </BS.Form.Group>
                {
                    pathEntityType === 5 ? (
                        <>
                            <BS.Form.Group as={BS.Col} controlId="zone">
                                <BS.Form.Label>Zone <span className="required">*</span></BS.Form.Label>
                                <BS.Form.Control
                                    as="select"
                                    autoComplete="nope"
                                    name="Zone"
                                    value={values.Zone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="select-option"
                                >
                                    <option key={0} value={''} >
                                        {"Select"}
                                    </option>
                                    {
                                        zones.map((p: any, i: number) => {
                                            return (
                                                <option key={i} value={p.value}>
                                                    {p.value}
                                                </option>
                                            );
                                        })
                                    }
                                </BS.Form.Control>
                                <div
                                    className={
                                        !!(errors.Zone && touched.Zone) ||
                                        !!(errors.Zone && edit)
                                            ? "error-span show"
                                            : "error-span"
                                    }
                                >
                                    {(errors.Zone && touched.Zone) || (errors.Zone && edit)
                                        ? errors.Zone
                                        : "Please choose the zone"}
                                </div>
                            </BS.Form.Group>
                            <BS.Form.Group as={BS.Col} controlId="FreightDescription">
                                <BS.Form.Label>Freight Description</BS.Form.Label>
                                <BS.Form.Control
                                    type="text"
                                    autoComplete="nope"
                                    placeholder="Enter FreightDescription"
                                    name="FreightDescription"
                                    value={values.FreightDescription}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </BS.Form.Group>

                            <BS.Form.Group as={BS.Col} controlId="First Delivery Date">
                                <BS.Form.Label>First Delivery Date</BS.Form.Label>
                                <BS.InputGroup className="d-date-picker">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => onChangeDeliveryDate(date)}
                                        onBlur={handleBlur}
                                        minDate={new Date()}
                                        maxDate={addMonths(new Date(), 20)}
                                        placeholderText="mm/dd/yyyy"
                                        dateFormat="MM/dd/yyyy"
                                    />
                                    {/* <BS.Form.Control id="inlineFormInputGroup" placeholder="15/05/2021" /> */}
                                    <BS.InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></BS.InputGroup.Text>
                                </BS.InputGroup>
                            </BS.Form.Group>



                        </>
                    ) : (
                        <>
                            <BS.Form.Group as={BS.Col} controlId="dbaName">
                                <BS.Form.Label>DBA name</BS.Form.Label>
                                <BS.Form.Control
                                    type="text"
                                    autoComplete="nope"
                                    placeholder="Enter DBA name"
                                    name="dbaName"
                                    value={values.dbaName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <div
                                    className={
                                        !!(errors.dbaName && touched.dbaName) ||
                                        !!(errors.dbaName && edit)
                                            ? "error-span show"
                                            : "error-span"
                                    }
                                >
                                    {(errors.dbaName && touched.dbaName) || (errors.dbaName && edit)
                                        ? errors.dbaName
                                        : "Enter DBA name"}
                                </div>
                            </BS.Form.Group>
                            <BS.Form.Group as={BS.Col} controlId="MC_Number">
                                <BS.Form.Label>MC Number</BS.Form.Label>
                                <BS.Form.Control
                                    type="text"
                                    autoComplete="nope"
                                    placeholder="Enter MC Number"
                                    name="MC_Number"
                                    value={values.MC_Number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                            </BS.Form.Group>
                            <BS.Form.Group as={BS.Col} controlId="Federal_Tax_ID">
                                <BS.Form.Label>Federal Tax ID</BS.Form.Label>
                                <BS.Form.Control
                                    type="text"
                                    autoComplete="nope"
                                    placeholder="Federal Tax ID"
                                    name="Federal_Tax_ID"
                                    value={values.Federal_Tax_ID}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </BS.Form.Group>
                        </>
                    )
                }
            </BS.Row>
            <BS.Row className="mb-3 d-block-sm">
                {
                    pathEntityType != 5 && (
                        <>
                            <BS.Form.Group as={BS.Col} controlId="DOT_Number">
                                <BS.Form.Label>DOT Number</BS.Form.Label>
                                <BS.Form.Control
                                    type="text"
                                    autoComplete="nope"
                                    placeholder="DOT Number"
                                    name="DOT_Number"
                                    value={values.DOT_Number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {/*<div className={!!(errors.DOT_Number && touched.DOT_Number) || !!(errors.DOT_Number && edit) ? 'error-span show' : 'error-span'}>*/}
                                {/*    {*/}
                                {/*        (errors.DOT_Number && touched.DOT_Number) || (errors.DOT_Number && edit)*/}
                                {/*            ? errors.DOT_Number*/}
                                {/*            : 'Enter DOT Number'*/}
                                {/*    }</div>*/}
                            </BS.Form.Group>
                            {
                                (pathEntityType === 2 || pathEntityType === 3) &&
                                <BS.Form.Group as={BS.Col} controlId="SCAC">
                                    <BS.Form.Label>
                                        SCAC &nbsp;
                                        <span className="required">*</span>
                                    </BS.Form.Label>
                                    <BS.Form.Control
                                        type="text"
                                        autoComplete="nope"
                                        placeholder="Enter SCAC"
                                        name="SCAC"
                                        value={values.SCAC}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <div
                                        className={
                                            !!(errors.SCAC && touched.SCAC) || !!(errors.SCAC && edit)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {(errors.SCAC && touched.SCAC) || (errors.SCAC && edit)
                                            ? errors.SCAC
                                            : "Enter SCAC"}
                                    </div>
                                </BS.Form.Group>
                            }

                            <BS.Form.Group as={BS.Col} controlId="DUNS_Number">
                                <BS.Form.Label>DUNS Number</BS.Form.Label>
                                <BS.Form.Control
                                    type="text"
                                    autoComplete="nope"
                                    placeholder="Enter DUNS Number"
                                    name="DUNS_Number"
                                    value={values.DUNS_Number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </BS.Form.Group>
                            <BS.Form.Group as={BS.Col} controlId="IsW9_YN">
                                <BS.Form.Label>IsActive(IsW9_YN)</BS.Form.Label>
                                <BS.Form.Check
                                    type="checkbox"
                                    autoComplete="nope"
                                    name="IsW9_YN"
                                    value={values.IsW9_YN}
                                    onChange={() => setFieldValue("IsW9_YN", !values.IsW9_YN)}
                                    onBlur={handleBlur}
                                    checked={!!values.IsW9_YN}
                                />
                            </BS.Form.Group>
                 {

                    pathEntityType === 1 ?
                
                            <BS.Form.Group as={BS.Col} controlId="IsW9_YN">
                                <BS.Form.Label>Is EDI?</BS.Form.Label>
                                <BS.Form.Check
                                    type="checkbox"
                                    autoComplete="nope"
                                    name="isedi"
                                    value={values.IsEdi}
                                    onChange={() => setFieldValue("IsEdi", !values.IsEdi)}
                                    onBlur={handleBlur}
                                    checked={values.IsEdi === 1 ? true : false}
                                />
                            </BS.Form.Group>
                    : ''
                 }
                 {

                    pathEntityType === 2 ?
                        <>
                            <BS.Form.Group as={BS.Col} controlId="IsCarrier">
                                <BS.Form.Label>Is Carrier</BS.Form.Label>
                                <BS.Form.Check
                                    type="checkbox"
                                    autoComplete="nope"
                                    name="IsCarrier"
                                    value={values.IsCarrier}
                                    onChange={(e:any) =>{ 
                                        console.log(e.target.checked)
                                        setIsCarrierFlag(e.target.checked)
                                        showHideSections(e)
                                        setFieldValue("IsCarrier", !values.IsCarrier)}
                                    }
                                    onBlur={handleBlur}
                                    checked={values.Entity_Type_Id && values.Entity_Type_Id === 2 ? true : isCarrierFlag===true ? true : false}
                                />
                                {console.log(values)}
                            </BS.Form.Group>
                        </>
                    : ''
                    }
                        </>
                    )
                }
            </BS.Row>
            <div
                className={
                    !!(errors.DUNS_Number && edit) ||
                    !!(errors.DOT_Number && edit) ||
                    !!(errors.Federal_Tax_ID && edit) ||
                    !!(errors.MC_Number && edit) ||
                    localError
                        ? "error-span show"
                        : "error-span"
                }
            >
                <b>{errors.MC_Number && "* "}</b>
                {!!(errors.DUNS_Number && edit) ||
                !!(errors.DOT_Number && edit) ||
                !!(errors.Federal_Tax_ID && edit) ||
                !!(errors.MC_Number && edit) ||
                localError
                    ? errors.DUNS_Number ||
                    errors.DOT_Number ||
                    errors.Federal_Tax_ID ||
                    errors.MC_Number
                    : "Enter DUNS Number"}
            </div>
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <BS.Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    name={"comments"}
                    value={values.comments}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <div
                    className={
                        !!(errors.comments && touched.comments) ||
                        !!(errors.comments && edit)
                            ? "error-span show"
                            : "error-span"
                    }
                >
                    {(errors.comments && touched.comments) || (errors.comments && edit)
                        ? errors.comments
                        : "Enter comments"}
                </div>
            </FloatingLabel>
            <div className="listing crp-table mt-3">
                <div style={{ display: "flex" }}>
                    <div className={"contact-header"}>
                        <h6>Contact Details {pathEntityType === 5 && contactsData.length === 0 ? <span className="required" style={{ color: '#ff0018' }}>*</span> : ''}</h6>
                    </div>
                    <div style={{ flex: "auto" }} />
                    <div className={"color-highlight"} onClick={addRow}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>&nbsp;Add</span>
                    </div>
                </div>
                <PerfectScrollbar>
                    <CustomTableContainer columns={cols} data={contactsData} />
                </PerfectScrollbar>
                <BS.Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    dialogClassName="modal-70w"
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <BS.Modal.Header closeButton>
                        <BS.Modal.Title id="example-modal-sizes-title-lg">
                            {removeId
                                ? "Are you sure you want to delete?"
                                : "Add Contact Information"}
                        </BS.Modal.Title>
                    </BS.Modal.Header>
                    <BS.Modal.Body>
                        <AddTypes
                            contactInfoCO={addCorporateOfficeContact}
                            contacts={contacts}
                            type={type}
                            editData={currentData}
                            isInit={isInit}
                            pathEntityType={pathEntityType}
                        />
                    </BS.Modal.Body>
                </BS.Modal>

                {deleteModal && removeId && (
                    <DeleteModal
                        show={deleteModal}
                        handleClose={modalShowClose}
                        onDeleteData={onDeleteRecord}
                    />
                )}
            </div>
        </>
    );
};
export default CorporateOfficeForm;


