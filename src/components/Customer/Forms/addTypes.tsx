import React, {useContext, useEffect, useState} from "react";
import * as Yup from "yup";
import * as BS from "react-bootstrap";
import { Form, Formik, FormikProps } from "formik";
import { PHONE, TITLES} from "../../../constants/actionTypes";
import { addTypesFormData, IContact, Idept } from "../../../interfaces/forms";
import { DepartmentContext } from "../../../containers/CustomerContainer";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AddTypes = ({
                    contactInfoCO,
                    contacts,
                    editData,
                    title,
                    pathEntityType
                  }: any): JSX.Element => {
  const [initialValues, setInitialValues] = useState({
    Id: 0,
    type: "10",
    department: "13",
    name: "",
    title: "1",
    phone: "",
    ext: "",
    mobile: "",
    email: "",
  });

  const departments = useContext(DepartmentContext)

  const onFormSubmit = (values: addTypesFormData, resetForm: () => void) => {
    if (Object.keys(editData).length != 0) {
      Object.assign(values, { Id: editData.Id });
      contactInfoCO(values, true);
    } else {
      values.Id = new Date().valueOf();
      Object.assign(values, { Id: new Date().valueOf() });
      contactInfoCO(values);
    }
  };

  useEffect(() => {
    if (Object.keys(editData).length != 0) {
      setInitialValues({
        Id: editData.Id,
        type: editData.type,
        department: editData.department,
        name: editData.name,
        title: editData.title,
        phone: editData.phone,
        ext: editData.ext,
        mobile: editData.mobile,
        email: editData.email,
      });
    } else {
      setInitialValues({
        Id: 0,
        type: "10",
        department: "4",
        name: "",
        title: "1",
        phone: "",
        ext: "",
        mobile: "",
        email: "",
      });
    }
  }, [editData]);

  const storeValidation =  {
    type: Yup.string().required("Please enter type"),
    name: Yup.string().required("Please enter the name"),
    email: Yup.array()
        .transform(function(value, originalValue) {
          if (this.isType(value) && value !== null) {
            return value;
          }
          return originalValue ? originalValue.split(/[\s,]+/) : [];
        })
        .of(Yup.string().email(({ value }) => `${value} is not a valid email`)),
  }
  const validationShape = {
    type: Yup.string().required("Please enter type"),
    name: Yup.string().required("Please enter the name"),
    mobile: Yup.string()
        .required("Please enter the mobile number")
        .matches(PHONE, "mobile number is not valid"),
    email: Yup.string()
        .email("Please enter valid email format")
        .required("Please enter the email"),
  };
  return (
      <div>
        <Formik
            initialValues={initialValues}
            onSubmit={(values: addTypesFormData, actions) => {
              onFormSubmit(values, actions.resetForm);
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape(pathEntityType === 5 ? storeValidation : validationShape)}
            enableReinitialize
        >
          {(props: FormikProps<addTypesFormData>) => {
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
                    <BS.Form.Group as={BS.Col} controlId="type">
                      <BS.Form.Label>Type <span className="required">*</span></BS.Form.Label>
                      <BS.Form.Control
                          as="select"
                          placeholder="Enter type"
                          name="type"
                          value={values.type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="select-option"
                      >
                        {contacts &&
                        contacts.length > 0 &&
                        contacts.map((contact: IContact, i: number) => {
                          return (
                              <option key={i} value={contact.id}>
                                {contact.value}
                              </option>
                          );
                        })}
                      </BS.Form.Control>
                      <div
                          className={
                            !!(errors.type && touched.type)
                                ? "error-span show"
                                : "error-span"
                          }
                      >
                        {errors.type && touched.type ? errors.type : "Enter type"}
                      </div>
                    </BS.Form.Group>
                    <BS.Form.Group as={BS.Col} controlId="department">
                      <BS.Form.Label>Department </BS.Form.Label>
                      <BS.Form.Control
                          as="select"
                          placeholder="Enter department"
                          name="department"
                          value={values.department}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={true}
                      >
                        {departments &&
                        departments.length > 0 &&
                        departments.map((department: Idept, i: number) => {
                          if (title === 'dcInfo') {
                            if (department.id === 2 ){
                              return (
                                  <option key={i} value={department.id}>
                                    {department.name}
                                  </option>
                              );
                            }
                          } else {
                            return (
                                <option key={i} value={department.id}>
                                  {department.name}
                                </option>
                            );
                          }
                        })}
                      </BS.Form.Control>
                      <div
                          className={
                            !!(errors.department && touched.department)
                                ? "error-span show"
                                : "error-span"
                          }
                      >
                        {errors.department && touched.department
                            ? errors.department
                            : "Enter type"}
                      </div>
                    </BS.Form.Group>
                    <BS.Form.Group as={BS.Col} controlId="name">
                      <BS.Form.Label>Name <span className="required">*</span></BS.Form.Label>
                      <BS.Form.Control
                          type="text"
                          placeholder="Enter name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      <div
                          className={
                            !!(errors.name && touched.name)
                                ? "error-span show"
                                : "error-span"
                          }
                      >
                        {errors.name && touched.name ? errors.name : "Enter name"}
                      </div>
                    </BS.Form.Group>
                    <BS.Form.Group as={BS.Col} controlId="title">
                      <BS.Form.Label>Title </BS.Form.Label>
                      <BS.Form.Control
                          as="select"
                          placeholder="choose title"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="select-option"
                      >
                        {TITLES.map((title: any, i: number) => {
                          return (
                              <option key={i} value={title.id}>
                                {title.value}
                              </option>
                          );
                        })}
                      </BS.Form.Control>
                      <div
                          className={
                            !!(errors.title && touched.title)
                                ? "error-span show"
                                : "error-span"
                          }
                      >
                        {errors.title && touched.title
                            ? errors.title
                            : "Enter title"}
                      </div>
                    </BS.Form.Group>
                  </BS.Row>
                  <BS.Row className="mb-3 d-block-sm">
                    <BS.Form.Group as={BS.Col} controlId="ext">
                      <BS.Form.Label>Corporate office Ext </BS.Form.Label>
                      <BS.Form.Control
                          type="number"
                          placeholder="Enter ext"
                          name="ext"
                          value={values.ext ? values.ext : ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      <div
                          className={
                            !!(errors.ext && touched.ext)
                                ? "error-span show"
                                : "error-span"
                          }
                      >
                        {errors.ext && touched.ext ? errors.ext : "Enter ext"}
                      </div>
                    </BS.Form.Group>
                    <BS.Form.Group as={BS.Col} controlId="phone">
                      <BS.Form.Label>Phone </BS.Form.Label>
                      <BS.Form.Control
                          type="number"
                          placeholder="Enter phone"
                          name="phone"
                          value={values.phone ? values.phone : ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      <div
                          className={
                            !!(errors.phone && touched.phone)
                                ? "error-span show"
                                : "error-span"
                          }
                      >
                        {errors.phone && touched.phone
                            ? errors.phone
                            : "Enter phone"}
                      </div>
                    </BS.Form.Group>
                    <BS.Form.Group as={BS.Col} controlId="mobile">
                      <BS.Form.Label>Mobile { pathEntityType === 5 ? null : <span className="required">*</span> }</BS.Form.Label>
                      <BS.Form.Control
                          type="number"
                          placeholder="Enter mobile"
                          name="mobile"
                          value={values.mobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      <div
                          className={
                            !!(errors.mobile && touched.mobile)
                                ? "error-span show"
                                : "error-span"
                          }
                      >
                        {errors.mobile && touched.mobile
                            ? errors.mobile
                            : "Enter mobile"}
                      </div>
                    </BS.Form.Group>
                    <BS.Form.Group as={BS.Col} controlId="email">
                      <BS.Form.Label>Email <span className="required">*</span></BS.Form.Label>
                      <BS.Form.Control
                          placeholder="Enter email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      <div
                          className={
                            !!(errors.email && touched.email)
                                ? "error-span show"
                                : "error-span"
                          }
                      >
                        {errors.email && touched.email
                            ? errors.email
                            : "Enter email"}
                      </div>
                    </BS.Form.Group>
                  </BS.Row>
                  <div className="listing crp-table mt-3">
                    <div className="add-lease d-flex justify-content-end mb-2 BS.Color-highlight">
                      <BS.Button
                          type="submit"
                          className="btn-md-w"
                          disabled={!(dirty && isValid)}
                      >
                    <span>
                      &nbsp;
                      {Object.keys(editData).length != 0 ? "Update" : "Submit"}
                    </span>
                      </BS.Button>
                    </div>
                  </div>
                </Form>
            );
          }}
        </Formik>
      </div>
  );
};

export default AddTypes;
