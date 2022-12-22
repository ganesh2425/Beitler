import React, {useEffect, useState} from 'react';
import * as BS from "react-bootstrap";
import { Form, Formik, FormikProps } from "formik";
import {Col} from "react-bootstrap";
import * as Yup from "yup";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AddRates = ({editRates, ratesInfo, onHide, formData, disableAddRates}: any): JSX.Element => {

    const [initialValues, setInitialValues] = useState({
        Id: 0,
        rangeFrom: disableAddRates ? '0' : '',
        rangeTo: disableAddRates ? '0' : '',
        rate: ''
    });

    useEffect(() => {
        if (Object.keys(editRates).length != 0) {
            setInitialValues({
                Id: editRates.Id,
                rangeFrom: editRates.rangeFrom,
                rangeTo: editRates.rangeTo,
                rate: editRates.rate
            });
        } else {
            setInitialValues({
                Id: 0,
                rangeFrom: disableAddRates ? '0' : '',
                rangeTo: disableAddRates ? '0' : '',
                rate: ''
            });
        }
    }, [editRates]);

    const onFormSubmit = (values: any, resetForm: () => void) => {
        if (Object.keys(editRates).length != 0) {
            Object.assign(values, { Id: editRates.Id });
            ratesInfo(values, true);
        } else {
            values.Id = new Date().valueOf();
            Object.assign(values, {
                Id: new Date().valueOf(),
                rateTypesListId: formData.id ? formData.id : new Date().valueOf()
            });
            ratesInfo(values);
        }
    }

    const validationShape = {
        rangeFrom: Yup.string().required("Please enter RangeFrom value"),
        rangeTo: Yup.string().required("Please enter the RangeTo value"),
        rate: Yup.string().required("Please enter the rate")
    };
    return(
        <div>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values: any, action) => {
                    onFormSubmit(values, action.resetForm);
                }}
                validationSchema={() => Yup.object().shape(validationShape)}
            >
                {(props: FormikProps<any>) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isValid,
                        dirty
                    } = props;
                    return (
                        <Form>
                            <BS.Row className="mb-3 d-block-sm">
                                <BS.Form.Group as={BS.Col} controlId="rangeFrom">
                                    <BS.Form.Label>Range From <span className="required">*</span></BS.Form.Label>
                                    <BS.Form.Control
                                        type="number"
                                        placeholder="Enter Range From"
                                        name="rangeFrom"
                                        value={values.rangeFrom}
                                        onChange={handleChange}
                                        disabled={disableAddRates}
                                        onBlur={handleBlur}
                                        // onKeyUp={(v: any) => {
                                        //     setMin(v.target.value);
                                        //     setFieldValue('rangeFrom', v.target.value)
                                        // }}
                                    />
                                    <div
                                        className={
                                            !!(errors.rangeFrom && touched.rangeFrom)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.rangeFrom && touched.rangeFrom ? errors.rangeFrom : "Enter rangeFrom"}
                                    </div>
                                </BS.Form.Group>
                                <BS.Form.Group as={BS.Col} controlId="rangeTo">
                                    <BS.Form.Label>Range To <span className="required">*</span></BS.Form.Label>
                                    <BS.Form.Control
                                        type="number"
                                        placeholder="Enter Range To"
                                        name="rangeTo"
                                        value={values.rangeTo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={disableAddRates}
                                    />
                                    <div
                                        className={
                                            !!(errors.rangeTo && touched.rangeTo)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.rangeTo && touched.rangeTo ? errors.rangeTo : "Enter RangeTo"}
                                    </div>
                                </BS.Form.Group>
                                <BS.Form.Group as={BS.Col} controlId="rate">
                                    <BS.Form.Label>Rate <span className="required">*</span></BS.Form.Label>
                                    <BS.Form.Control
                                        type="number"
                                        placeholder="Enter rate"
                                        name="rate"
                                        value={values.rate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <div
                                        className={
                                            !!(errors.rate && touched.rate)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.rate && touched.rate ? errors.rate : "Enter rate"}
                                    </div>
                                </BS.Form.Group>
                                <div className="listing crp-table mt-3">
                                    <div className="add-lease d-flex justify-content-end mb-2 BS.Color-highlight">
                                        <BS.Row>
                                            <BS.Form.Group
                                                as={Col}
                                                className="mb-3"
                                                controlId="parent"
                                            >
                                                <BS.Button
                                                    className="btn-md-w"
                                                    variant="secondary"
                                                    onClick={() => onHide(false)}
                                                >
                                                    Cancel
                                                </BS.Button>
                                                &nbsp;
                                                <BS.Button
                                                    className="btn-md-w"
                                                    variant="primary"
                                                    type="submit"
                                                    disabled={!(dirty && isValid)}
                                                >
                                                    Save
                                                </BS.Button>
                                            </BS.Form.Group>
                                        </BS.Row>
                                    </div>
                                </div>
                            </BS.Row>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    )
}

export default AddRates;