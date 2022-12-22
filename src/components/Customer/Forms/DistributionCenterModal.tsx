import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import * as BS from "react-bootstrap";
import { Form, Formik, FormikProps } from "formik";
import { PHONE } from "../../../constants/actionTypes";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PerfectScrollbar from "react-perfect-scrollbar";
import CustomTableContainer from "../../../containers/CommonTableContainer";
import AddTypes from "./addTypes";
import DeleteModal from "../../common/DeleteModal";
import { dcInfoFormValues } from "../../../interfaces/customerTypes";
import ContactListingColumn from "../columns/ContactListingColumn";
import { addTypesFormData } from "../../../interfaces/forms";
import { isEmailExists, isMobileExists } from "../../../utilities/common";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const DistributionCenterModal = ({
  contacts,
  onSendDcInfoData,
  editData,
  showPopup,
  setShowPopup,
}: any): JSX.Element => {
  const [removeId, setRemoveId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [dcInfoContacts, setDCInfoContacts] = useState([]);
  const [currentData, setCurrentData] = useState({});

  const [initialValues, setInitialValues] = useState({
    DC_address: "",
    DC_address2: "",
    DC_city: "",
    DC_state: "",
    DC_zipCode: "",
    DC_fax: "",
    DC_phone: "",
    DC_freightDescription: "",
    DC_locationNumber: "",
    DC_GroupNumber: "",
    DC_mobile: "",
    DC_comments: "",
    DC_directions: "",
    Contacts: [],
  });

  useEffect(() => {
    if (Object.keys(editData).length != 0 && editData) {
      setInitialValues(editData);
      setDCInfoContacts(editData.Contacts);
    }
  }, [editData]);

  const validationShape = {
    DC_city: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    DC_state: Yup.string().matches(
      /^[aA-zZ\s]+$/,
      "Only alphabets are allowed"
    ),
    DC_zipCode: Yup.string()
      .required("Please enter the zipcode")
      .min(5, "Must be exactly 5 digits")
      .max(5, "Must be exactly 5 digits"),
    DC_phone: Yup.string().matches(PHONE, "Phone number is not valid"),
    DC_mobile: Yup.string()
      .required("Please enter the mobile number")
      .matches(PHONE, "mobile number is not valid"),
  };

  const onFormSubmit = (values: any, resetForm: () => void) => {
    if (Object.keys(editData).length != 0 && editData) {
      Object.assign(values, { Id: editData.Id, Contacts: dcInfoContacts });
      onSendDcInfoData(values, true);
    } else {
      Object.assign(values, {
        Id: new Date().valueOf(),
        Contacts: dcInfoContacts,
      });
      onSendDcInfoData(values);
    }
    setShowPopup(false);
  };

  const addDCInfoContact = (values: addTypesFormData, isEdit = false) => {
    let checkEmail: boolean;
    let checkMobile: boolean;
    if (Object.keys(editData).length != 0) {
      checkEmail = isEmailExists(editData.Contacts, values);
      checkMobile = isMobileExists(editData.Contacts, values);
    } else {
      checkEmail = isEmailExists(dcInfoContacts, values);
      checkMobile = isMobileExists(dcInfoContacts, values);
    }

    if (checkEmail) {
      toast.error(values.email + " Already exists on the contact table");
    } else if (checkMobile) {
      toast.error(values.mobile + " Already exists on the contact table");
    } else {
      setShowModal(false);
      const contactArray: any = [...dcInfoContacts, values];
      setDCInfoContacts(contactArray);
      if (isEdit) {
        if (Object.keys(editData).length != 0) {
          const temp: any = [];
          editData.Contacts.length > 0 &&
            editData.Contacts.map((v: any) => {
              if (v.Id === values.Id) {
                temp.push(values);
              } else {
                temp.push(v);
              }
            });
          setDCInfoContacts(temp);
        } else {
          const temp: any = [];
          dcInfoContacts.length > 0 &&
            dcInfoContacts.map((v: any) => {
              if (v.Id === values.Id) {
                temp.push(values);
              } else {
                temp.push(v);
              }
            });
          setDCInfoContacts(temp);
        }
      }
    }
  };

  const onDeleteData = (id: number): void => {
    setDeleteModal(true);
    setRemoveId(id);
  };
  const addRow = () => {
    setShowModal(true);
    setCurrentData({});
  };

  const onGetData = (id: number): void => {
    let data: any =
      Object.keys(initialValues).length != 0 &&
      initialValues.Contacts.length > 0 &&
      initialValues.Contacts.find((v: any) => v.Id === id);
    if (!data)
      data =
        dcInfoContacts.length > 0 &&
        dcInfoContacts.find((v: any) => v.Id === id);
    setCurrentData(data);
    setShowModal(true);
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
    console.log("DC info");
    toast.success("Contact Deleted");
    const filteredContacts = dcInfoContacts.filter(
      (item: any) => item.Id !== removeId
    );
    setDCInfoContacts(filteredContacts);
  };

  return (
    <div>
      <BS.Modal
        size="lg"
        show={showPopup}
        onHide={() => setShowPopup(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <BS.Modal.Header closeButton>
          <BS.Modal.Title id="example-modal-sizes-title-lg">
            Distributed Center Information
          </BS.Modal.Title>
        </BS.Modal.Header>
        <BS.Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: dcInfoFormValues, actions) => {
              onFormSubmit(values, actions.resetForm);
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape(validationShape)}
            enableReinitialize
          >
            {(props: FormikProps<dcInfoFormValues>) => {
              const {
                values,
                touched,
                errors,
                handleBlur,
                handleChange,
                isValid,
                dirty,
              } = props;
              return (
                <Form autoComplete="off">
                  <BS.Row className="mb-3 d-block-sm">
                    <BS.Form.Group as={BS.Col} controlId="DC_address">
                      <BS.Form.Label>Address(Street#,name)</BS.Form.Label>
                      <BS.Form.Control
                        type="text"
                        placeholder="Enter address"
                        name="DC_address"
                        value={values.DC_address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        className={
                          !!(errors.DC_address && touched.DC_address)
                            ? "error-span show"
                            : "error-span"
                        }
                      >
                        {errors.DC_address && touched.DC_address
                          ? errors.DC_address
                          : "Enter Address"}
                      </div>
                    </BS.Form.Group>
                    <BS.Form.Group as={BS.Col} controlId="DC_address2">
                      <BS.Form.Label>Address BuildingFloor</BS.Form.Label>
                      <BS.Form.Control
                        type="text"
                        placeholder="Enter building floor"
                        name="DC_address2"
                        value={values.DC_address2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        className={
                          !!(errors.DC_address2 && touched.DC_address2)
                            ? "error-span show"
                            : "error-span"
                        }
                      >
                        {errors.DC_address2 && touched.DC_address2
                          ? errors.DC_address2
                          : "Enter address building floor"}
                      </div>
                    </BS.Form.Group>
                    <BS.Form.Group as={BS.Col} controlId="DC_city">
                      <BS.Form.Label>City</BS.Form.Label>
                      <BS.Form.Control
                        type="text"
                        placeholder="Enter city"
                        name="DC_city"
                        value={values.DC_city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        className={
                          !!(errors.DC_city && touched.DC_city)
                            ? "error-span show"
                            : "error-span"
                        }
                      >
                        {errors.DC_city && touched.DC_city
                          ? errors.DC_city
                          : "Enter city"}
                      </div>
                    </BS.Form.Group>

                    <BS.Form.Group as={BS.Col} controlId="DC_state">
                      <BS.Form.Label>State</BS.Form.Label>
                      <BS.Form.Control
                        type="text"
                        placeholder="Enter state"
                        name="DC_state"
                        value={values.DC_state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        className={
                          !!(errors.DC_state && touched.DC_state)
                            ? "error-span show"
                            : "error-span"
                        }
                      >
                        {errors.DC_state && touched.DC_state
                          ? errors.DC_state
                          : "Enter state"}
                      </div>
                    </BS.Form.Group>
                  </BS.Row>
                  <BS.Row className="mb-3 d-block-sm">
                    <BS.Form.Group as={BS.Col} controlId="DC_zipCode">
                      <BS.Form.Label>
                        Zip Code <span className="required">*</span>
                      </BS.Form.Label>
                      <BS.Form.Control
                        type="number"
                        placeholder="Enter Zip Code"
                        name="DC_zipCode"
                        value={values.DC_zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        className={
                          !!(errors.DC_zipCode && touched.DC_zipCode)
                            ? "error-span show"
                            : "error-span"
                        }
                      >
                        {errors.DC_zipCode && touched.DC_zipCode
                          ? errors.DC_zipCode
                          : "Enter zipCode"}
                      </div>
                    </BS.Form.Group>

                    <BS.Form.Group as={BS.Col} controlId="DC_fax">
                      <BS.Form.Label>Fax Number</BS.Form.Label>
                      <BS.Form.Control
                        type="number"
                        placeholder="Enter Fax Number"
                        name="DC_fax"
                        value={values.DC_fax}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        className={
                          !!(errors.DC_fax && touched.DC_fax)
                            ? "error-span show"
                            : "error-span"
                        }
                      >
                        {errors.DC_fax && touched.DC_fax
                          ? errors.DC_fax
                          : "Enter fax"}
                      </div>
                    </BS.Form.Group>

                    <BS.Form.Group as={BS.Col} controlId="DC_phone">
                      <BS.Form.Label>Phone Number</BS.Form.Label>
                      <BS.Form.Control
                        type="number"
                        placeholder="Enter Phone Number"
                        name="DC_phone"
                        value={values.DC_phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        className={
                          !!(errors.DC_phone && touched.DC_phone)
                            ? "error-span show"
                            : "error-span"
                        }
                      >
                        {errors.DC_phone && touched.DC_phone
                          ? errors.DC_phone
                          : "Enter phone"}
                      </div>
                    </BS.Form.Group>
                    <BS.Form.Group
                      as={BS.Col}
                      controlId="DC_freightDescription"
                    >
                      <BS.Form.Label>Freight Description</BS.Form.Label>
                      <BS.Form.Control
                        type="text"
                        placeholder="Freight Description"
                        name="DC_freightDescription"
                        value={values.DC_freightDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        className={
                          !!(
                            errors.DC_freightDescription &&
                            touched.DC_freightDescription
                          )
                            ? "error-span show"
                            : "error-span"
                        }
                      >
                        {errors.DC_freightDescription &&
                        touched.DC_freightDescription
                          ? errors.DC_freightDescription
                          : "Enter Freight Description"}
                      </div>
                    </BS.Form.Group>
                    <BS.Form.Group as={BS.Col} controlId="DC_locationNumber">
                      <BS.Form.Label>Location Number</BS.Form.Label>
                      <BS.Form.Control
                        type="text"
                        placeholder="Location Number"
                        name="DC_locationNumber"
                        value={values.DC_locationNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        className={
                          !!(
                            errors.DC_locationNumber &&
                            touched.DC_locationNumber
                          )
                            ? "error-span show"
                            : "error-span"
                        }
                      >
                        {errors.DC_locationNumber && touched.DC_locationNumber
                          ? errors.DC_locationNumber
                          : "Enter location number"}
                      </div>
                    </BS.Form.Group>
                    <BS.Form.Group as={BS.Col} controlId="DC_GroupNumber">
                      <BS.Form.Label>DC Number</BS.Form.Label>
                      <BS.Form.Control
                        type="text"
                        placeholder="DC Number"
                        name="DC_GroupNumber"
                        value={values.DC_GroupNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        className={
                          !!(errors.DC_GroupNumber && touched.DC_GroupNumber)
                            ? "error-span show"
                            : "error-span"
                        }
                      >
                        {errors.DC_GroupNumber && touched.DC_GroupNumber
                          ? errors.DC_GroupNumber
                          : "Enter dc number"}
                      </div>
                    </BS.Form.Group>
                    <BS.Form.Group as={BS.Col} controlId="DC_mobile">
                      <BS.Form.Label>
                        Mobile <span className="required">*</span>
                      </BS.Form.Label>
                      <BS.Form.Control
                        type="number"
                        placeholder="Mobile"
                        name="DC_mobile"
                        value={values.DC_mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        className={
                          !!(errors.DC_mobile && touched.DC_mobile)
                            ? "error-span show"
                            : "error-span"
                        }
                      >
                        {errors.DC_mobile && touched.DC_mobile
                          ? errors.DC_mobile
                          : "Enter mobile"}
                      </div>
                    </BS.Form.Group>
                  </BS.Row>

                  <FloatingLabel controlId="DC_comments" label="Comments">
                    <BS.Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                      name={"DC_comments"}
                      value={values.DC_comments}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div
                      className={
                        !!(errors.DC_comments && touched.DC_comments)
                          ? "error-span show"
                          : "error-span"
                      }
                    >
                      {errors.DC_comments && touched.DC_comments
                        ? errors.DC_comments
                        : "Enter comments"}
                    </div>
                  </FloatingLabel>

                  {/* <BS.Row className="mt-2 d-block-sm"> */}

                  <FloatingLabel controlId="DC_directions" label="Directions">
                    {/* className={''} */}
                    <BS.Form.Control
                      className="mt-2"
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                      name={"DC_directions"}
                      value={values.DC_directions}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div
                      className={
                        !!(errors.DC_directions && touched.DC_directions)
                          ? "error-span show"
                          : "error-span"
                      }
                    >
                      {errors.DC_directions && touched.DC_directions
                        ? errors.DC_directions
                        : "Enter directions"}
                    </div>
                  </FloatingLabel>
                  {/* </BS.Row> */}

                  <div className="listing crp-table mt-3">
                    <div style={{ display: "flex" }}>
                      <div className={"contact-header"}>
                        <h6>Contact Details</h6>
                      </div>
                      <div style={{ flex: "auto" }} />
                      <div className={"color-highlight"} onClick={addRow}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>&nbsp;Add</span>
                      </div>
                    </div>
                    <PerfectScrollbar>
                      {/*<CustomerListing*/}
                      {/*    data={contactsData}*/}
                      {/*    onGetData={onGetData}*/}
                      {/*    onDeleteData={onDeleteData}*/}
                      {/*    contacts={contacts}*/}
                      {/*/>*/}
                      <CustomTableContainer
                        columns={cols}
                        data={dcInfoContacts}
                        options={false}
                      />
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
                          contactInfoCO={addDCInfoContact}
                          contacts={contacts}
                          editData={currentData}
                          title={"dcInfo"}
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
                  {/*<div className="listing crp-table mt-3">*/}
                  {/*    <div className="add-lease d-flex justify-content-end mb-2 BS.Color-highlight">*/}
                  {/*        <BS.Button type="submit" disabled={isSubmitting}>*/}
                  {/*            &nbsp;Save*/}
                  {/*        </BS.Button>*/}
                  {/*    </div>*/}
                  {/*</div>*/}
                  <BS.Modal.Footer>
                    <BS.Button
                      variant="secondary"
                      className="btn-md-w"
                      onClick={() => setShowPopup(false)}
                    >
                      Close
                    </BS.Button>
                    <BS.Button
                      type="submit"
                      className="btn-md-w"
                      disabled={!(dirty && isValid)}
                    >
                      Save
                    </BS.Button>
                  </BS.Modal.Footer>
                </Form>
              );
            }}
          </Formik>
        </BS.Modal.Body>
      </BS.Modal>
    </div>
  );
};

export default DistributionCenterModal;
