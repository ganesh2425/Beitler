import React  from "react";
import * as BS from "react-bootstrap";
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";
import {history} from "../../config/history";
import StorageService from "../../services/Storage.service";
import {API_SERVICE} from "../../services/commonApi";
import {API_URLS} from "../../utilities/api_url_constants";
import {toast} from "react-toastify";

interface IType {
  createdBy: number;
  createdDt: Date;
  displayText: string;
  id: number;
  isActive: boolean;
  isDeleted: boolean;
  modifiedBy: number;
  modifiedDt: Date;
  sequence: number;
  type: string;
  value: string;
}

interface Idept {
  createdBy: number;
  createdDt: Date;
  description: string;
  entity_Id: number;
  id: number;
  isActive: boolean;
  isDeleted: boolean;
  modifiedBy: number;
  modifiedDt: Date;
  name: string;
  permission_Group_Id: number;
}

type inviteFormTypes = {
  type: string;
  department: string;
  name: string;
  email: string;
};

const initialValue = {
  type: "3",
  department: "24",
  name: "",
  email: "",
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const UserInviteForm = ({
  departments,
  entities,
  onSubmit,
  onSelectValue,
}: any): JSX.Element => {
  const onFormSubmit = (values: inviteFormTypes, resetForm: () => void) => {
    // onSubmit(values);
    console.log(values)
    checkLoginName(values.email).then(r => {
      if (r)  onSubmit(values)
    }).catch(() => {console.log('error')})
  };


  const checkLoginName = (values: any) => {
    const token = StorageService.getCookies("token");
    return API_SERVICE.post(
        API_URLS.validateUserName,
        {
          emailid: values.loginId,
          Entity_Type: values.type
        },
        token
    )
        .then((r) => {
          console.log(r);
          if (!r.data) {
            return true;
          } else {
            toast.error('Login-id already exist. Please use different login-id.')
            return false;
          }
        })
        .catch((e) => {
          document.body.classList.remove("api-loading");
          toast.error('API Error');
          return false
        });
  };

  const onSelectChangeVal = (e: React.FormEvent, setFieldValue: any) => {
    const target = e.target as HTMLSelectElement;
    const intVal: string = target.value;
    setFieldValue("type", intVal);
    onSelectValue(intVal);
  };

  const InviteFormValidation = {
    type: Yup.string().required("Please enter type"),
    department: Yup.string().required("Please choose department"),
    name: Yup.string().required("Please enter the name"),
    email: Yup.string()
      .email("Please enter valid email format")
      .required("Please enter the email"),
  };

  return (
    <div>
      <Formik
        initialValues={initialValue}
        onSubmit={(values: inviteFormTypes, actions) => {
          onFormSubmit(values, actions.resetForm);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape(InviteFormValidation)}
        enableReinitialize
      >
        {(props: FormikProps<inviteFormTypes>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            setFieldValue,
            isValid,
            dirty,
          } = props;
          return (
            <>
              <Form>
                <BS.Row className="mb-4 user-invite-form d-block-sm">
                  <BS.Form.Group as={BS.Col} controlId="type">
                    <BS.Form.Label>Entity Type</BS.Form.Label>
                    <BS.Form.Select
                      as="select"
                      placeholder="Enter type"
                      name="type"
                      value={values.type}
                      onChange={(e) => onSelectChangeVal(e, setFieldValue)}
                      onBlur={handleBlur}
                    >
                      {entities &&
                        entities.length > 0 &&
                        entities.map((type: IType, i: number) => {
                          return (
                            <option key={i} value={type.id}>
                              {type.value}
                            </option>
                          );
                        })}
                    </BS.Form.Select>
                    </BS.Form.Group>
                  <BS.Form.Group as={BS.Col}  controlId="department">
                    <BS.Form.Label>Department</BS.Form.Label>
                    <BS.Form.Select
                      as="select"
                      placeholder="Select department"
                      name="department"
                      value={values.department}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {departments &&
                        departments.length > 0 &&
                        departments.map((dept: Idept, i: number) => {
                          return (
                            <option key={i} value={dept.id}>
                              {dept.name}
                            </option>
                          );
                        })}
                    </BS.Form.Select>
                    </BS.Form.Group>
                  <BS.Form.Group as={BS.Col} controlId="name">
                    <BS.Form.Label>Name <span className="required">*</span> </BS.Form.Label>
                    <BS.Form.Control
                      type="text"
                      placeholder="Enter name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur} />
                    <div
                      className={!!(errors.name && touched.name)
                        ? "error-span show"
                        : "error-span"}
                    >
                      {errors.name && touched.name ? errors.name : "Enter name"}
                    </div>
                    </BS.Form.Group>
                  <BS.Form.Group as={BS.Col} controlId="email">
                    <BS.Form.Label>User Email <span className="required">*</span> </BS.Form.Label>
                    <BS.Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur} />
                    <div
                      className={!!(errors.email && touched.email)
                        ? "error-span show"
                        : "error-span"}
                    >
                      {errors.email && touched.email
                        ? errors.email
                        : "Enter email"}
                    </div>
                  </BS.Form.Group>
                </BS.Row>
                <div className="listing crp-table user-submit">
                  <div className="add-lease d-flex justify-content-end BS.Color-highlight">
                    <BS.Button className="btn-md-w" variant="secondary" onClick={() => history.push('/dashboard')}>
                      Cancel
                    </BS.Button>&nbsp;
                    <BS.Button
                        className="btn-md-w"
                        type="submit"
                        disabled={!(dirty && isValid)}
                    >
                      <span>&nbsp;Submit</span>
                    </BS.Button>
                  </div>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default UserInviteForm;
