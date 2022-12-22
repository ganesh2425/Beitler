import React, {useEffect, useState} from "react";
import * as BS from "react-bootstrap";
import * as Yup from "yup";
import {Formik, FormikProps, Form} from "formik";
import {Button} from "react-bootstrap";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const RecipientsForm = ({contacts, onSubmitAllContacts, contactsData, onCloseRecipients}: any): JSX.Element => {
    const [initialValues, setInitialValues] = useState({
        contact1: '',
        contact2: '',
        contact3: '',
    });
    const [commonError, setCommonError] = useState('');
    const [localValues, setLocalValues] = useState<any>([]);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (contactsData.length > 0) {
            setInitialValues({
                contact1: contactsData[0] && contactsData[0].ContactTypes ? contactsData[0].ContactTypes : '',
                contact2: contactsData[1] && contactsData[1].ContactTypes ? contactsData[1].ContactTypes : '',
                contact3: contactsData[2] && contactsData[2].ContactTypes ? contactsData[2].ContactTypes : ''
            });
            setLocalValues(contactsData);
            setEdit(true)
        } else {
            setEdit(false)
        }
    }, [contactsData]);

    const validationShape = Yup.object().shape({
        contact1: Yup.string().when(['contact2', 'contact3'], {
            is: (contact2: any, contact3: any) => !contact2 && !contact3,
            then: Yup.string().required('Either one contact is required')}),
        contact2: Yup.string().when(['contact1', 'contact3'], {
            is: (contact1: any, contact3: any) => !contact1 && !contact3,
            then: Yup.string().required('Either one contact is required')}),
        contact3: Yup.string().when(['contact1', 'contact2'], {
            is: (contact1: any, contact2: any) => !contact1 && !contact2,
            then: Yup.string().required('Either one contact is required')}),
    },[['contact1', 'contact2'],
        ['contact1', 'contact3'],
        ['contact2', 'contact3']]);

    const onFormSubmit = (val: any, reset: any) => {
        if (edit) {
            const temp: any = [val.contact1, val.contact2, val.contact3];
            const checkValues = temp.every((e: any, i: any, a: any) => a.indexOf(e) === i)
            if (checkValues) {
                const cValues: any = [];
                temp.length > 0 && temp.map((t: any, i: number) => {
                    const obj: any = localValues[i];
                    if (obj) {
                        obj.ContactTypes = t
                        cValues.push(obj);
                    } else {
                        const obj = {
                            id: new Date().valueOf() + i,
                            RulesScheduleId: localValues[0].RulesScheduleId,
                            ContactTypes: t
                        }
                        cValues.push(obj);
                    }
                });
                onSubmitAllContacts(cValues, true)
                setCommonError('')
            } else {
                setCommonError('* All the contacts should be unique')
            }
        } else {
            const temp: any = [val.contact1, val.contact2, val.contact3];
            const checkValues = temp.every((e: any, i: any, a: any) => a.indexOf(e) === i)
            if (checkValues) {
                onSubmitAllContacts(temp)
                setCommonError('')
            } else {
                setCommonError('* All the contacts should be unique')
            }
        }
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values: any, actions: any) => {
                    onFormSubmit(values, actions.resetForm);
                    setTimeout(() => {
                        actions.setSubmitting(false);
                    }, 500);
                }}
                validationSchema={validationShape}
                enableReinitialize
            >
                {(props: FormikProps<any>) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isValid,
                        dirty,
                        setFieldValue
                    } = props;
                    return (

                        <Form className="inbound-basicdetails">
                            {
                                <div
                                className={
                                    commonError && commonError
                                ? "error-span show"
                                : "error-span"
                            }
                                >
                                    {commonError && commonError
                                ? commonError
                                : ""}
                                </div>
                            }
                            <BS.Row className="mt-0 d-block-sm">
                                <BS.Form.Group className="mb-2">
                                    <BS.Form.Label htmlFor="inlineFormInputGroup">Contact Types</BS.Form.Label>
                                    <BS.Form.Control
                                        as="select"
                                        className="select-option"
                                        name="contact1"
                                        value={values.contact1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option key={0} value={""}>
                                            {"Select"}
                                        </option>
                                        {
                                            contacts &&
                                            contacts.length > 0 &&
                                            contacts.map((contact: any, i: number) => {
                                                return (
                                                    <option key={i} value={contact.id}>
                                                        {contact.value}
                                                    </option>
                                                );
                                            })}
                                    </BS.Form.Control>
                                    <div
                                        className={
                                            !!(errors.contact1 && touched.contact1)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.contact1 && touched.contact1
                                            ? errors.contact1
                                            : "Please choose contact"}
                                    </div>
                                </BS.Form.Group>
                                <BS.Form.Group className="mb-2">
                                    <BS.Form.Label htmlFor="inlineFormInputGroup">Contact Types</BS.Form.Label>
                                    <BS.Form.Control
                                        as="select"
                                        className="select-option"
                                        name="contact2"
                                        value={values.contact2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option key={0} value={""}>
                                            {"Select"}
                                        </option>
                                        {
                                            contacts &&
                                            contacts.length > 0 &&
                                            contacts.map((contact: any, i: number) => {
                                                return (
                                                    <option key={i} value={contact.id}>
                                                        {contact.value}
                                                    </option>
                                                );
                                            })}
                                    </BS.Form.Control>
                                    <div
                                        className={
                                            !!(errors.contact2 && touched.contact2)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.contact2 && touched.contact2
                                            ? errors.contact2
                                            : "Please choose contact"}
                                    </div>
                                </BS.Form.Group>
                                <BS.Form.Group className="mb-2">
                                    <BS.Form.Label htmlFor="inlineFormInputGroup">Contact Types</BS.Form.Label>
                                    <BS.Form.Control
                                        as="select"
                                        className="select-option"
                                        name="contact3"
                                        value={values.contact3}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option key={0} value={""}>
                                            {"Select"}
                                        </option>
                                        {contacts &&
                                        contacts.length > 0 &&
                                        contacts.map((contact: any, i: number) => {
                                            return (
                                                <option key={i} value={contact.id}>
                                                    {contact.value}
                                                </option>
                                            );
                                        })}
                                    </BS.Form.Control>
                                    <div
                                        className={
                                            !!(errors.contact3 && touched.contact3)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.contact3 && touched.contact3
                                            ? errors.contact3
                                            : "Please choose contact"}
                                    </div>
                                </BS.Form.Group>
                            </BS.Row>
                            <div className="listing crp-table mt-3">
                                <div className="add-lease d-flex justify-content-end mb-2 BS.Color-highlight">
                                    <Button
                                        type="button"
                                        className="btn btn-secondary btn-md-w mr-2"
                                        onClick={onCloseRecipients}
                                    >
                                        Cancel
                                    </Button>
                                    <BS.Button
                                        type="submit"
                                        className="btn-md-w"
                                        disabled={!(dirty && isValid)}
                                    >
                                        <span>
                                          &nbsp;
                                            Submit
                                        </span>
                                    </BS.Button>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    )
}

export default RecipientsForm;