import React, {useEffect, useState} from "react";
import { Col } from "react-bootstrap";
import * as BS from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Schedule = ({intervalList, onScheduleSubmit, editData}: any):JSX.Element => {
    const [startDate, setStartDate] = useState(new Date());
    const [edit, setEdit] = useState(false);
    const [initialValues, setInitialValues] = useState<any>({
        interval: '',
        scheduleTime: null,
    });

    useEffect(() => {
        if (Object.keys(editData).length > 0) {
            setEdit(true)
            setInitialValues({
                interval: editData.interval,
                scheduleTime: new Date(editData.scheduleTime)
            })
        } else {
            setEdit(false)
        }
    },[editData])

    const onFormSubmit = (values: any, resetForm: any) => {
        onScheduleSubmit(values, edit)
    }

    const onChangeScheduleTime = (values: any, setFieldValue: any) => {
        setStartDate(values);
        setFieldValue('scheduleTime', values)
    }

    const validationShape = {
        interval: Yup.string().required("Please choose the interval type"),
        scheduleTime: Yup.string().required("Please enter time"),
    };

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
                validationSchema={Yup.object().shape(validationShape)}
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
                            <BS.Row className="mt-0 d-block-sm">
                                <BS.Form.Group className="mb-2" as={Col}>
                                    <BS.Form.Label htmlFor="inlineFormInputGroup">Interval</BS.Form.Label>
                                    <BS.Form.Control
                                        as="select"
                                        className="select-option"
                                        name="interval"
                                        value={values.interval}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option key={0} value={""}>
                                            {"Select"}
                                        </option>
                                        {intervalList &&
                                        intervalList.length > 0 &&
                                        intervalList.map((interval: any, i: number) => {
                                            return (
                                                <option key={i} value={interval.id}>
                                                    {interval.value}
                                                </option>
                                            );
                                        })}
                                    </BS.Form.Control>
                                    <div
                                        className={
                                            !!(errors.interval && touched.interval)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.interval && touched.interval
                                            ? errors.interval
                                            : "Please choose title"}
                                    </div>
                                </BS.Form.Group>
                                <BS.Form.Group as={Col} controlId="rule name">
                                    <BS.Form.Label>Schedule Time</BS.Form.Label>
                                    <DatePicker
                                        selected={ values.scheduleTime ? values.scheduleTime : startDate}
                                        onChange={(date) => onChangeScheduleTime(date, setFieldValue)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                    />
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

export default Schedule;