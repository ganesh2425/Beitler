import React, { useEffect, useState } from "react";
import { Formik, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import {getEntityText, getQueryParams} from "../../utilities/common";
import { history } from "../../config/history";
import StorageService from "../../services/Storage.service";
import { API_SERVICE } from "../../services/commonApi";
import {
  IFormStatus,
  IFormStatusProps,
  ISignUpForm,
} from "../../interfaces/loginType";
import { commonAction } from "../../actions/configActions";
import {useDispatch} from "react-redux";
import { API_URLS } from "../../utilities/api_url_constants";
import { toast} from "react-toastify";
import {getAuthDetails} from "../../services/loginApi";

interface IValidateData {
  alreadExists: boolean;
  email: string;
  id: number;
  loginId: string;
  profilecontact_id: number;
  url: string;
  userName: string;
}

interface IQueryVal {
  entity_type: any;
  authcode: string;
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: "Register successfully.",
    type: "success",
  },
  duplicate: {
    message: "User already registered",
    type: "error",
  },
  error: {
    message: "Something went wrong. Please try again.",
    type: "error",
  },
};

const SignupForm: React.FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [validateData, setValidateData] = useState<IValidateData>({
    alreadExists: false,
    email: "",
    id: 0,
    loginId: "",
    profilecontact_id: 0,
    url: "",
    userName: "",
  });
  const [rules, setRules] = useState(false);
  const [entityType, setEntityType] = useState(1);
  // const [results, setResults] = useState([]);
  const [signupData, setSignupData] = useState({
    loginId: "",
    password: "",
    confirmPassword: "",
  });
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: "",
    type: "",
  });

  useEffect(() => {
    checkAuthCode()
      .then((r: any) => {
        const response = r.data[0];
        console.log(response)
        if (response.alreadExists) {
          toast.error('User already registered');
          history.push('/login')
        }
        if (response.userName) {
          setValidateData(response);
          setEntityType(response.entity_Type)
          StorageService.setCookies("inviteUser", JSON.stringify(response));
          setSignupData({
            loginId: response.loginId,
            password: "",
            confirmPassword: "",
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const checkAuthCode = async (): Promise<void> => {
    if (history.location && history.location.search) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const queryParams: IQueryVal = getQueryParams(history.location.search);
      setEntityType(queryParams?.entity_type)
      const token = StorageService.getCookies("token");
      const payload = {
        Type: queryParams?.entity_type,
        code: queryParams?.authcode,
      };
      return await API_SERVICE.post(API_URLS.validate_link, payload, token);
    }
  };

  const createNewUser = (data: ISignUpForm, resetForm: () => void) => {
    const token = StorageService.getCookies("token");
    const today = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
    const payload = {
      Id: validateData.id,
      Entity_Id: 1,
      Department_Id: 1,
      LoginId: data.loginId,
      Name: validateData.userName,
      Password: data.password,
      Password_Exp_Dt: today,
      Last_login_Dt: today,
      InvalidAttempts: 0,
      IsActive: true,
      Contact: {
        Email: data.loginId,
      },
    };
    API_SERVICE.put(API_URLS.REGISTER_USER, payload, token)
      .then((r) => {
        if (r.data) {
          StorageService.setCookies("userData", JSON.stringify(r.data));
          const payload: any = {
            login_id: data.loginId,
            password: data.password
          }
          const entityText = getEntityText[entityType] ? getEntityText[entityType] : 'customers'
          const loginDetails = getAuthDetails(payload).then((loginRes: any) => {
            if (loginRes.data.token) {
              StorageService.setCookies('token', loginRes.data.token)
              dispatch(commonAction({ entity_admin: false, entity_user: false }));
              window.location.replace(`/${entityText}?type=entity_admin`);
            }
          })
          console.log(loginDetails)
          dispatch(commonAction({ entity_admin: true, entity_user: false, entityText: entityText }));
          document.body.classList.add("api-loading");
          // window.location.replace(`/${entityText}?type=entity_admin`);
        }
      })
      .catch((e: any) => {
        document.body.classList.remove("api-loading");
        toast.error('Something went wrong. Please try again.');
        setDisplayFormStatus(true);
        setFormStatus(formStatusProps.error);
      });
  };

  // const getUserDetails  = useSelector(getConfigDetails);
  //
  // useEffect(() => {
  //   if (getUserDetails && getUserDetails.entity_admin && getUserDetails.entityText) {
  //     history.push(`/${getUserDetails.entityText}?type=entity_admin`);
  //     window.location.replace(`/${getUserDetails.entityText}?type=entity_admin`);
  //   }
  // }, [getUserDetails])

  const checkPassword = (values: any, setFieldError: any) => {
    if (values.password === '') {
      setFieldError('password', undefined)
    }
    if (values.confirmPassword === '') {
      setFieldError('confirmPassword', undefined)
    }
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
    regex.test(values.password) ? setRules(false) : setRules(true)
    if (values.password === '')
      setRules(false)
  }

  // if (displayFormStatus && formStatus.type === "error") {
  //   toast.error(formStatus.message)
  // }

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={signupData}
        onSubmit={(values: ISignUpForm, actions) => {
          createNewUser(values, actions.resetForm);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          loginId: Yup.string().email().required("Enter valid email-id"),
          password: Yup
              .string()
              .required('Please Enter your password')
              .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                  "Please enter a valid password"
              ),
          confirmPassword: Yup
              .string()
              .required('Please enter a confirm password')
              .oneOf([Yup.ref("password"), null], "Passwords must match")
        })}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={true}
      >
        {(props: FormikProps<ISignUpForm>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
              setFieldError
          } = props;
          return (
            <Form onKeyUp={() => checkPassword(values, setFieldError)}>
              <div className="form-group">
                <label htmlFor="loginId">
                  Login ID{" "}
                  {!!(errors.loginId && touched.loginId) ? (
                    <span className={"error-span show"}>*</span>
                  ) : (
                    ""
                  )}
                </label>
                <Field
                  name="loginId"
                  className="form-control"
                  type="text"
                  value={values.loginId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={true}
                  placeholder={'Enter login ID or email'}
                />
              </div>
              <div
                className={
                  !!(errors.loginId && touched.loginId)
                    ? "error-span show"
                    : "error-span"
                }
              >
                {errors.loginId && touched.loginId
                  ? errors.loginId
                  : "Enter the login id"}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  className="form-control"
                  name="password"
                  value={values.password}
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={'Enter password'}
                />
              </div>
              <div
                className={
                  !!(errors.password && touched.password)
                    ? "error-span show"
                    : "error-span"
                }
              >
                {errors.password && touched.password
                  ? errors.password
                  : "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"}
              </div>
              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <Field
                  className="form-control"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={'Enter confirm password'}

                />
              </div>
              <div
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? "error-span show"
                    : "error-span"
                }
              >
                {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword !== ''
                  ? errors.confirmPassword
                  : "Re-enter password to confirm"}
              </div>
              <Button
                variant="primary"
                className={"login-btn cursor"}
                type="submit"
                color="secondary"
                disabled={isSubmitting}
              >
                Submit
              </Button>

              <div
                  className={
                    !!(errors.password && touched.password)
                        ? "formStatus show"
                        : "error-span"
                  }
              >
                {errors.password && touched.password && rules
                    ?
                    <>
                      <p className="mb-0"><b>Password rules</b></p>
                      <p>* Password should consist of 8 characters, one uppercase, one lowercase, one special character, and no spaces</p>
                    </>
                    : ""}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignupForm;
