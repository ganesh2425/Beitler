import React, {useEffect, useState} from 'react'
import { Formik, FormikProps, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button } from "react-bootstrap";
import {fetchLoginRequest} from "../../actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import {history} from "../../config/history";
import {getLoginDetails} from "../../reducers/authReducer";
import StorageService from "../../services/Storage.service";
import {LoginState} from "../../interfaces/types";
import {IFormStatus, IFormStatusProps, ILoginForm} from "../../interfaces/loginType"
import {commonAction} from "../../actions/configActions";

const formStatusProps: IFormStatusProps = {
    success: {
        message: 'Login successfully.',
        type: 'success',
    },
    duplicate: {
        message: 'Email-id already exist. Please use different email-id.',
        type: 'error',
    },
    error: {
        message: 'Incorrect login credentials. Please try again.',
        type: 'error',
    },
}

const LoginForm: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const [displayFormStatus, setDisplayFormStatus] = useState(false)
    const [loginData, setLoginData] = useState<LoginState>({
        pending: false,
        error: null,
        token: ''
    });
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    })

    const loginRes = useSelector(getLoginDetails);
    useEffect(() => {
        if (loginRes.token && !loginData.token) {
            setLoginData(loginRes)
            setFormStatus(formStatusProps.success)
            StorageService.setCookies('token', loginRes.token)
            history.push('/dashboard');
            dispatch(commonAction({ entity_admin: false, entity_user: false }));
            // window.location.reload();
        } else if (loginRes.error === 'Unauthorized') {
            document.body.classList.remove("api-loading");
            // toast.error('Invalid login credentials, Please try again');
            setDisplayFormStatus(true)
            setFormStatus(formStatusProps.error)
        }
    }, [loginData.token, loginRes]);

    const CheckLogin = (data: ILoginForm, resetForm: () => void) => {
        dispatch(fetchLoginRequest(data));
    }

    return (
        <div>
            <Formik
                initialValues={{
                    password: '',
                    login_id: '',
                }}
                onSubmit={(values: ILoginForm, actions) => {
                    CheckLogin(values, actions.resetForm)
                    setTimeout(() => {
                        actions.setSubmitting(false)
                    }, 500)
                }}
                validationSchema={Yup.object().shape({
                    login_id: Yup.string()
                        .email("Please enter valid email format")
                        .required("Please enter a valid Login ID"),
                    password: Yup.string()
                        .required(
                            'Please enter Password'
                        )
                })}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {(props: FormikProps<ILoginForm>) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                    } = props
                    return (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="login_id">Login ID {!!(errors.login_id && touched.login_id) ? (<span className={'error-span show'}>*</span>) : ''} </label>
                                <Field
                                    name="login_id"
                                    className="form-control"
                                    type="text"
                                    value={values.login_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={'email@example.com'}
                                />
                            </div>
                            <div className={!!(errors.login_id && touched.login_id) ? 'error-span show' : 'error-span'}>
                                {
                                errors.login_id && touched.login_id
                                    ? errors.login_id
                                    : 'Please enter a valid Login ID'
                            }</div>
                            <div className="form-group">
                                <label htmlFor="password">Password {!!(errors.password && touched.password) ? (<span className={'error-span show'}>*</span>) : ''}</label>
                                <Field
                                    className="form-control"
                                    name="password"
                                    value={values.password}
                                    type="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={'enter your password'}
                                />
                            </div>
                            <div className={!!(errors.password && touched.password) ? 'error-span show' : 'error-span'}>
                                {
                                errors.password && touched.password
                                    ? 'Please enter Password'
                                    : 'Please enter Password'
                            }
                            </div>
                            <Button
                                variant="primary"
                                className={'login-btn cursor'}
                                type="submit"
                                color="secondary"
                                disabled={isSubmitting}
                            >
                                Login
                            </Button>

                            {displayFormStatus && (!errors.login_id || !errors.password ) && (
                                <div className="formStatus">
                                    {formStatus.type === 'error' ? (
                                        <p>
                                            {formStatus.message}
                                        </p>
                                    ) : formStatus.type ===
                                    'success' ? (
                                        <p>
                                            {formStatus.message}
                                        </p>
                                    ) : null}
                                </div>
                            )}
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default LoginForm
