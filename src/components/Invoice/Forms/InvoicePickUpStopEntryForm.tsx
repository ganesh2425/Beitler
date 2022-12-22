import React from "react";
import { IType } from "../../../interfaces/forms";
import * as Yup from "yup";
import * as BS from "react-bootstrap";
import { Form, Formik, FormikProps } from "formik";
import { IInvoicePickUpEntryStop } from "../../../interfaces/invoiceTypeProps";
import NumberFormat from 'react-number-format';


type Props = {
    showPopup?: any;
    invoicePickUpStopEditRecord?: any;
    setFormData: any;
    InvoiceId?: any;
};

const validationShape = {
    Address: Yup.string().required("Address is required"),
    City: Yup.string().required("City is required"),
    State: Yup.string().required("State is required"),
    ZipCode: Yup.string().required("ZipCode is required")
        .matches(/^[0-9]+$/, "Must be a number")
        .test('len', 'Must be exactly 5 digits',
            function (value: any) {
                if (value !== undefined && value.length === 5) {
                    return (true)
                } else {
                    return (false);
                }
            }),
    ExtraSequence: Yup.string()
        .required("Extra Sequence is required")
        .matches(/^[0-9]+$/, "Must be a digit.")
        .test('len', 'Must be min 1 digit and max 2 digits',
            function (value: any) {
                if (value.toString() !== undefined && value.toString().length >= 1 && value.toString().length <= 2) {
                    return (true)
                } else {
                    return (false);
                }
            }),
    ReferenceNumber: Yup.string().required("Reference Number is required")
};

const onFormSubmit = (
    props: any,
    values: IInvoicePickUpEntryStop,
    resetForm: () => void
) => {

    let isEdit = false;
    if (
        props.invoicePickUpStopEditRecord.Id !== undefined &&
        props.invoicePickUpStopEditRecord.Id !== ""
    ) {
        Object.assign(values, { Id: props.invoicePickUpStopEditRecord.Id });
        Object.assign(values, { isNewRecord: props.invoicePickUpStopEditRecord.isNewRecord });
        Object.assign(values, { Invoice_Id: props.invoicePickUpStopEditRecord.Invoice_Id });
        Object.assign(values, { InvoiceStatus: props.invoicePickUpStopEditRecord.InvoiceStatus });
        Object.assign(values, { IsActive: props.invoicePickUpStopEditRecord.IsActive });
        Object.assign(values, { IsDeleted: props.invoicePickUpStopEditRecord.IsDeleted });
        isEdit = true;
    } else {

        Object.assign(values, { Id: 0 });
        Object.assign(values, { InvoiceStatus: "Pending" });
        Object.assign(values, { IsActive: true });
        Object.assign(values, { IsDeleted: false });
        Object.assign(values, { isNewRecord: true });
        Object.assign(values, { Invoice_Id: props.InvoiceId });
    }
    props.setFormData(values, isEdit);
    props.showPopup(false);
};

const onSelectChangeVal = (e: React.FormEvent, setFieldValue: any) => {
    const target = e.target as HTMLSelectElement;
    const intVal: string = target.value;
    const intName: string = target.name;
    setFieldValue(intName, intVal);
    // onSelectValue(intVal);
};

class InvoicePickUpStopEntryForm extends React.Component<Props> {
    render(): JSX.Element {
        const { invoicePickUpStopEditRecord } = this.props;
        return (
            <>
                <Formik
                    initialValues={{
                        Address: invoicePickUpStopEditRecord ? invoicePickUpStopEditRecord.Address : "",
                        City: invoicePickUpStopEditRecord ? invoicePickUpStopEditRecord.City : "",
                        State: invoicePickUpStopEditRecord ? invoicePickUpStopEditRecord.State : "",
                        ZipCode: invoicePickUpStopEditRecord ? invoicePickUpStopEditRecord.ZipCode : "",
                        ExtraSequence: invoicePickUpStopEditRecord ? invoicePickUpStopEditRecord.ExtraSequence : "",
                        ReferenceNumber: invoicePickUpStopEditRecord ? invoicePickUpStopEditRecord.ReferenceNumber : "",
                        //pickStop: invoicePickUpStopEditRecord ? invoicePickUpStopEditRecord.pickStop : "",
                    }}
                    onSubmit={(values: IInvoicePickUpEntryStop, actions) => {
                        onFormSubmit(this.props, values, actions.resetForm);
                        setTimeout(() => {
                            actions.setSubmitting(false);
                        }, 500);
                    }}
                    validationSchema={
                        Yup.object().shape(validationShape)
                    }
                >
                    {(props: FormikProps<IInvoicePickUpEntryStop>) => {
                        const {
                            values,
                            touched,
                            errors,
                            handleBlur,
                            handleChange,
                            isSubmitting,
                            setFieldValue,
                            isValid,
                            dirty,
                        } = props;
                        return (
                            <Form>
                                <BS.Row className="mb-2 d-block-sm">
                                    <BS.Form.Group as={BS.Col} className="mb-2" >
                                        <BS.Form.Label>Address
                                            <span className="required">*</span>
                                        </BS.Form.Label>
                                        <BS.Form.Control
                                            type="text"
                                            placeholder="Address"
                                            name='Address'
                                            value={values.Address}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        <div className={!!(errors.Address && touched.Address) || (errors.Address) ? 'error-span show' : 'error-span'}>
                                            {
                                                (errors.Address && touched.Address) || (errors.Address)
                                                    ? errors.Address
                                                    : 'Enter Address'
                                            }</div>
                                    </BS.Form.Group>
                                    <BS.Form.Group as={BS.Col} className="mb-2" >
                                        <BS.Form.Label>City   <span className="required">*</span>
                                        </BS.Form.Label>
                                        <BS.Form.Control
                                            type="text"
                                            placeholder="City"
                                            name='City'
                                            value={values.City}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        <div className={!!(errors.City && touched.City) || (errors.City) ? 'error-span show' : 'error-span'}>
                                            {
                                                (errors.City && touched.City) || (errors.City)
                                                    ? errors.City
                                                    : 'Enter City'
                                            }</div>
                                    </BS.Form.Group>
                                    <BS.Form.Group as={BS.Col} className="mb-2" >
                                        <BS.Form.Label>State   <span className="required">*</span>
                                        </BS.Form.Label>
                                        <BS.Form.Control
                                            type="text"
                                            placeholder="State"
                                            name='State'
                                            value={values.State}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        <div className={!!(errors.State && touched.State) || (errors.State) ? 'error-span show' : 'error-span'}>
                                            {
                                                (errors.State && touched.State) || (errors.State)
                                                    ? errors.State
                                                    : 'Enter State'
                                            }</div>
                                    </BS.Form.Group>
                                    <BS.Form.Group as={BS.Col} className="mb-2" >
                                        <BS.Form.Label>Zip Code   <span className="required">*</span>
                                        </BS.Form.Label>
                                        <NumberFormat thousandSeparator={false}
                                            displayType="input"
                                            type="text"
                                            fixedDecimalScale={false}
                                            placeholder="ZipCode"
                                            className="text-right form-control"
                                            name='ZipCode'
                                            value={values.ZipCode}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <div className={!!(errors.ZipCode && touched.ZipCode) || (errors.ZipCode) ? 'error-span show' : 'error-span'}>
                                            {
                                                (errors.ZipCode && touched.ZipCode) || (errors.ZipCode)
                                                    ? errors.ZipCode
                                                    : 'Enter Zip Code'
                                            }</div>
                                    </BS.Form.Group>
                                    <BS.Form.Group as={BS.Col} className="mb-2" >
                                        <BS.Form.Label>Reference#   <span className="required">*</span>
                                        </BS.Form.Label>
                                        <BS.Form.Control
                                            type="text"
                                            placeholder="Reference Number"
                                            name='ReferenceNumber'
                                            value={values.ReferenceNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        <div className={!!(errors.ReferenceNumber && touched.ReferenceNumber) || (errors.ReferenceNumber) ? 'error-span show' : 'error-span'}>
                                            {
                                                (errors.ReferenceNumber && touched.ReferenceNumber) || (errors.ReferenceNumber)
                                                    ? errors.ReferenceNumber
                                                    : 'Enter Reference Number'
                                            }</div>
                                    </BS.Form.Group>
                                    <BS.Form.Group as={BS.Col} className="mb-2" >
                                        <BS.Form.Label>Extra Sequence   <span className="required">*</span>
                                        </BS.Form.Label>
                                        <NumberFormat thousandSeparator={false}
                                            displayType="input"
                                            type="text"
                                            fixedDecimalScale={false}
                                            placeholder="ExtraSequence"
                                            className="text-right form-control"
                                            name='ExtraSequence'
                                            value={values.ExtraSequence}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {/* <BS.Form.Control
                                            type="text"
                                            placeholder="Extra Sequence"
                                            name='ExtraSequence'
                                            value={values.ExtraSequence}
                                            onChange={handleChange}
                                            onBlur={handleBlur} /> */}
                                        <div className={!!(errors.ExtraSequence && touched.ExtraSequence) || (errors.ExtraSequence) ? 'error-span show' : 'error-span'}>
                                            {
                                                (errors.ExtraSequence && touched.ExtraSequence) || (errors.ExtraSequence)
                                                    ? errors.ExtraSequence
                                                    : 'Enter Extra Sequence'
                                            }</div>
                                    </BS.Form.Group>
                                </BS.Row>
                                <BS.Row></BS.Row>
                                <BS.Form.Group className="d-none">
                                    <BS.Row>
                                        <div style={{ height: "50px" }}></div>
                                    </BS.Row>
                                </BS.Form.Group>
                                <div className="d-flex justify-content-end mt-1">
                                    <div className="d-flex">
                                        <BS.Button
                                            className="btn-md-w mr-2"
                                            variant="secondary"
                                            onClick={() => {
                                                this.props.showPopup(false);
                                            }}
                                        >
                                            Cancel
                                        </BS.Button>
                                        <BS.Button
                                            className="btn-md-w"
                                            variant="primary"
                                            disabled={!(dirty && isValid)}
                                            type="submit"
                                        >
                                            Save
                                        </BS.Button>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </>
        );
    }
}

export default InvoicePickUpStopEntryForm;
