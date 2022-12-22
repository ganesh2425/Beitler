import React, { useCallback, useEffect, useState } from "react";
import { IType } from "../../../interfaces/forms";
import * as Yup from "yup";
import * as BS from "react-bootstrap";
import { Formik, Form, FormikProps } from "formik";
import { IInvoiceChargesEntry, invoiceBasicIProps } from "../../../interfaces/invoiceTypeProps";
import { ESLint } from "eslint";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from 'react-number-format';


type InvoiceChargesEntryFormProps = {
    sectionTypesLookUp?: any;
    rateTypesLookup?: any;
    chargeTypesLookup?: any;
    UOMLookup?: any;
    showPopup?: any;
    InvoiceChargesEditRecord?: any;
    setFormData: any;
    InvoiceId?: any;
    customerRatesDetails?: any;
    chargesData?: any;
};

const InvoiceChargesEntryForm = ({
    sectionTypesLookUp,
    rateTypesLookup,
    chargeTypesLookup,
    UOMLookup,
    showPopup,
    InvoiceChargesEditRecord,
    setFormData,
    InvoiceId,
    customerRatesDetails,
    chargesData
}: InvoiceChargesEntryFormProps): JSX.Element => {
    const dispatch = useDispatch();
    const [rateseList, setRateseList] = useState<any>([]);
    const [rateMastersList, setRateMastersList] = useState<any>([]);
    const [ratessTypesList, setRatessTypesList] = useState<any>([]);
    const [isFieldDisabled, setIsFieldDisabled] = useState(false);
    const [isUOMDisabled, setIsUOMDisabled] = useState(false);
    const [sectionName, setSectionName] = useState("");
    const [UOMName, setUOMName] = useState("");
    const validationShape = {
        //Amount: Yup.number().required("Amount is required"),
        UOM: Yup.string().required("UOM is required"),
        Invoice_Description: Yup.string().required("Invoice Description is required")
            .matches(
                /^[0-9a-zA-Z.&,@ !]*$/,
                " Description with Alphabets, Numbers and special characters such as dot, space & @!, are allowed"
            )
            .min(2, "Length should be in 2 characters")
            .max(150, "Length should not Exceed 150 characters"),
        Quantity: Yup.number().required("Quantity is required"),
        Charge_Id: Yup.number().required("Charge Type is required"),
    };

    useEffect(() => {
        if (InvoiceChargesEditRecord) {
            if (parseInt(InvoiceChargesEditRecord.Charge_Id) > 0) {
                setSectionName(InvoiceChargesEditRecord.Charge_Name);
                setUOMName(InvoiceChargesEditRecord.UOM_Name);
                setIsFieldDisabled(true);
            }
        }
    }, [!isFieldDisabled]);

    const onFormSubmit = (
        values: IInvoiceChargesEntry,
        resetForm: () => void
    ) => {

        let isEdit = false;
        if (
            InvoiceChargesEditRecord.Id !== undefined &&
            InvoiceChargesEditRecord.Id !== ""
        ) {
            Object.assign(values, { Id: InvoiceChargesEditRecord.Id });
            Object.assign(values, { isNewRecord: InvoiceChargesEditRecord.isNewRecord });
            Object.assign(values, { Invoice_Id: InvoiceChargesEditRecord.Invoice_Id });
            Object.assign(values, { InvoiceStatus: InvoiceChargesEditRecord.InvoiceStatus });
            Object.assign(values, { IsActive: InvoiceChargesEditRecord.IsActive });
            Object.assign(values, { IsDeleted: InvoiceChargesEditRecord.IsDeleted });
            isEdit = true;
        } else {
            Object.assign(values, { Id: 0 });
            Object.assign(values, { Charge_Name: sectionName });
            Object.assign(values, { UOM_Name: UOMName });
            Object.assign(values, { InvoiceStatus: "Pending" });
            Object.assign(values, { isNewRecord: true });
            Object.assign(values, { Invoice_Id: InvoiceId });
            Object.assign(values, { IsActive: true });
            Object.assign(values, { IsDeleted: false });
        }
        setFormData(values, isEdit);
        showPopup(false);
    };

    const onHandleBlurVal = (e: React.FormEvent, setFieldValue: any, value: any) => {

        const target = e.target as HTMLInputElement;
        const intVal: any = target.value;
        const intName: string = target.name;
        switch (intName) {
            case "Quantity":
                if (sectionName !== "Accessorial - Others") {
                    if (rateseList && rateseList.length > 0) {
                        rateseList.forEach((ele: any) => {

                            if (Boolean(ele.IsActive) && parseFloat(intVal) >= parseFloat(ele.rangeFrom) && parseFloat(intVal) <= parseFloat(ele.rangeTo)) {
                                setFieldValue("Charged_Per_Rate", ele.rate);
                                const perTon = parseFloat(intVal) / 100;
                                const totalprice = perTon * parseFloat(ele.rate);
                                setFieldValue("Invoice_Calculate_Price", totalprice.toFixed(2));

                                if (totalprice < value.Invoice_Charged_Min_Rate) {
                                    setFieldValue("Amount", value.Invoice_Charged_Min_Rate.toFixed(2));
                                } else if (totalprice > value.Invoice_Charged_Max_Rate && parseInt(value.Invoice_Charged_Max_Rate) > 0) {
                                    setFieldValue("Amount", value.Invoice_Charged_Max_Rate.toFixed(2));
                                }
                                else if(totalprice > value.Invoice_Charged_Max_Rate && (parseInt(value.Invoice_Charged_Max_Rate) === 0 || value.Invoice_Charged_Max_Rate ===null || value.Invoice_Charged_Max_Rate === undefined)){
                                    setFieldValue("Amount", totalprice.toFixed(2));
                                } else {
                                    setFieldValue("Amount", totalprice.toFixed(2));
                                }

                            }
                        });
                    }
                } else {

                    const perTon = parseFloat(intVal);
                    const totalprice = perTon * parseFloat(value.Charged_Per_Rate);
                    setFieldValue("Invoice_Calculate_Price", totalprice.toFixed(2));
                    setFieldValue("Amount", totalprice.toFixed(2));
                }
                break;
            case "Amount":
                setFieldValue(intName, parseFloat(intVal).toFixed(2));
                break;
            case "Charged_Per_Rate":
                if (sectionName === "Accessorial - Others") {
                    if (value.Quantity > 0) {
                        const perTon = parseFloat(value.Quantity);
                        const totalprice = perTon * parseFloat(value.Charged_Per_Rate);
                        setFieldValue("Invoice_Calculate_Price", totalprice.toFixed(2));
                        setFieldValue("Amount", totalprice.toFixed(2));
                    }
                }
                setFieldValue(intName, parseFloat(intVal).toFixed(2));
                break;
            default:
                break;
        }
    };

    const onSelectChangeVal = (e: React.FormEvent, setFieldValue: any, value: any) => {

        const target = e.target as HTMLSelectElement;
        const displaytext = target.options[target.selectedIndex].text;
        const intVal: string = target.value;
        const intName: string = target.name;
        let rateMasterDetails = [];
        let rateTypeList = [];
        let isSectionChargeExist = false;
        const isRateTypeExist = false;

        // setFieldValue('Rate_Type_Id', recordExist.Rate_Type_Id);
        switch (intName) {
            case "Charge_Id":
                setSectionName(displaytext);
                const recordExist = chargesData.filter((charges: any) => parseInt(charges.Charge_Id) === parseInt(intVal));
                if (recordExist.length > 0) {
                    customerRatesDetails.forEach((element: any) => {
                        if (element.ratesMaster.sectionTypeId === parseInt(intVal)) {
                            setFieldValue(intName, intVal);
                            isSectionChargeExist = true;
                            rateTypeList = element.ratesMaster.rateTypesList;
                            rateTypeList.forEach((elementrate: any) => {
                                if (element.ratesMaster.id === elementrate.ratesMasterId) {
                                    //isRateTypeExist = true;
                                    setFieldValue('Rate_Type_Id', elementrate.rateType ? elementrate.rateType : 0);
                                    setFieldValue('UOM', elementrate.uom ? elementrate.uom : '');
                                    for (let i = 0; i < chargeTypesLookup.length; i++) {
                                        if (chargeTypesLookup[i].value === displaytext) {
                                            setFieldValue('Invoice_Description', chargeTypesLookup[i].displayText);
                                        }
                                    }

                                    setFieldValue('Invoice_Charged_Min_Rate', elementrate.min_Value ? elementrate.
                                        min_Value : 0);
                                    setFieldValue('Invoice_Charged_Max_Rate', elementrate.max_Value ? elementrate.max_Value : 0);
                                    rateMasterDetails = element;
                                    setRateMastersList(rateMasterDetails);
                                    setRatessTypesList(elementrate);
                                    setRateseList(elementrate.ratesList);
                                    setIsFieldDisabled(true);
                                }
                            });
                        }
                    });
                    toast.error('Charge already exist', {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: 0,
                    });
                } else {

                    if (displaytext === "Accessorial - Others") {
                        setIsFieldDisabled(false);
                        setFieldValue('Rate_Type_Id', 0);
                        for (let i = 0; i < chargeTypesLookup.length; i++) {
                            if (chargeTypesLookup[i].value === displaytext) {
                                setFieldValue('Invoice_Description', chargeTypesLookup[i].displayText);
                            }
                        }
                        const NAValue = UOMLookup.filter((element: any) => element.value === "NA");

                        setFieldValue('UOM', NAValue[0].id.toString());
                        setUOMName(NAValue[0].displayText);
                        setIsUOMDisabled(true);
                    } else {
                        customerRatesDetails.forEach((element: any) => {
                            if (element.ratesMaster.sectionTypeId === parseInt(intVal)) {
                                isSectionChargeExist = true;
                                rateTypeList = element.ratesMaster.rateTypesList;
                                rateTypeList.forEach((elementrate: any) => {
                                    if (element.ratesMaster.id === elementrate.ratesMasterId) {
                                        //isRateTypeExist = true;
                                        setFieldValue('Rate_Type_Id', elementrate.rateType ? elementrate.rateType : 0);
                                        setFieldValue('UOM', elementrate.uom ? elementrate.uom : '');
                                        for (let i = 0; i < chargeTypesLookup.length; i++) {
                                            if (chargeTypesLookup[i].value === displaytext) {
                                                setFieldValue('Invoice_Description', chargeTypesLookup[i].displayText);
                                            }
                                        }

                                        setFieldValue('Invoice_Charged_Min_Rate', elementrate.min_Value ? elementrate.
                                            min_Value : 0);
                                        setFieldValue('Invoice_Charged_Max_Rate', elementrate.max_Value ? elementrate.max_Value : 0);
                                        rateMasterDetails = element;
                                        setRateMastersList(rateMasterDetails);
                                        setRatessTypesList(elementrate);
                                        setRateseList(elementrate.ratesList);
                                        setIsFieldDisabled(true);
                                    }
                                });
                            }
                        });
                        if (!isSectionChargeExist) {
                            toast.error('Charge Type does not exist', {
                                position: "top-right",
                                autoClose: false,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: 0,
                            });
                        }
                        // if (!isRateTypeExist && isSectionChargeExist) {
                        //     toast.error('Rate Type does not exist');
                        // }
                    }
                    setFieldValue(intName, intVal);

                }
                break;
            case "Rate_Type_Id":
                const recordRateExist = chargesData.filter((charges: any) => charges.Charge_Id === parseInt(value.Charge_Id));
                const RateTypelist = recordRateExist.rateTypesList.filter((rate: any) => rate.rateType === parseInt(intVal));
                if (RateTypelist.length > 0) {
                    const qty = recordRateExist.Quantity;
                    const RateList = RateTypelist.ratesList;
                    if (RateList.length > 0) {
                        const rate = RateList.filter((rates: any) => {
                            rates.rangeFrom >= parseInt(qty) && rates.rangeTo <= parseInt(qty)
                        });
                        if (rate) {
                            setFieldValue("Amount", rate.rate.toFixed(2));
                        }
                    }
                    // setFieldValue('Rate_Type_Id', recordExist.Rate_Type_Id);
                    // setFieldValue('UOM', recordExist.UOM);
                } else {
                    toast.error('Rates does not exist for selected Rates');
                }
                break;
            case "UOM":

                setUOMName(displaytext);
                setFieldValue(intName, intVal);
                break;
            default:
                break;
        }
        //    setFieldValue(intName, intVal);
    };


    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    Amount: InvoiceChargesEditRecord.Amount ? InvoiceChargesEditRecord.Amount : 0,
                    Charge_Id: InvoiceChargesEditRecord.Charge_Id,
                    Invoice_Description: InvoiceChargesEditRecord.Invoice_Description,
                    Quantity: InvoiceChargesEditRecord.Quantity,
                    Rate_Type_Id: InvoiceChargesEditRecord.Rate_Type_Id,
                    UOM: InvoiceChargesEditRecord.UOM,
                    Invoice_Charged_Min_Rate: InvoiceChargesEditRecord.Invoice_Charged_Min_Rate,
                    Invoice_Charged_Max_Rate: InvoiceChargesEditRecord.Invoice_Charged_Max_Rate,
                    Charged_Per_Rate: InvoiceChargesEditRecord.Charged_Per_Rate,
                    Invoice_Calculate_Price: InvoiceChargesEditRecord.Invoice_Calculate_Price,
                }}
                onSubmit={(values: IInvoiceChargesEntry, actions) => {
                    onFormSubmit(values, actions.resetForm);
                    setTimeout(() => {
                        actions.setSubmitting(false);
                    }, 500);
                }}

                validationSchema={Yup.object().shape(validationShape)}
            >

                {(props: FormikProps<IInvoiceChargesEntry>) => {
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
                            <BS.Row>
                                <BS.Form.Group as={BS.Col} controlId="Charge_Id">
                                    <BS.Form.Label>
                                        Charge Type <span className="required">*</span>
                                    </BS.Form.Label>
                                    <BS.Form.Control
                                        as={"select"}
                                        placeholder="Enter Charge"
                                        name="Charge_Id"
                                        value={values.Charge_Id}
                                        onChange={(e) => onSelectChangeVal(e, setFieldValue, values)}
                                        onBlur={handleBlur}
                                        className="select-option form-control"
                                    >
                                        <option key={0} value={0}>
                                            --Select Charge--
                                        </option>
                                        {sectionTypesLookUp &&
                                            sectionTypesLookUp.length > 0 &&
                                            sectionTypesLookUp.map((type: IType, i: number) => {
                                                return (
                                                    <option key={i} value={type.id}>
                                                        {type.displayText}
                                                    </option>
                                                );
                                            })}
                                    </BS.Form.Control>
                                    <div
                                        className={
                                            !!(errors.Charge_Id && touched.Charge_Id)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.Charge_Id && touched.Charge_Id
                                            ? errors.Charge_Id
                                            : "Enter Section Type"}
                                    </div>
                                </BS.Form.Group>
                                <BS.Form.Group as={BS.Col} className="mb-2" >
                                    <BS.Form.Label>Units Of Measurement
                                        <span className="required">*</span>
                                    </BS.Form.Label>
                                    <BS.Form.Control
                                        as={"select"}
                                        disabled={values.UOM ?
                                            isFieldDisabled : isUOMDisabled === true ? true : false}
                                        placeholder="Select UOM"
                                        name="UOM"
                                        value={values.UOM}
                                        onChange={(e) => onSelectChangeVal(e, setFieldValue, values)}
                                        onBlur={handleBlur}
                                        className="select-option form-control"
                                    >
                                        <option key={0} value={0}>
                                            --Select UOM --
                                        </option>
                                        {UOMLookup &&
                                            UOMLookup.length > 0 &&
                                            UOMLookup.map((event: IType, i: number) => {
                                                return (
                                                    <option key={i} value={event.id}>
                                                        {event.displayText}
                                                    </option>
                                                );
                                            })}
                                    </BS.Form.Control>
                                    <div className={!!(errors.UOM && touched.UOM) || (errors.UOM) ? 'error-span show' : 'error-span'}>
                                        {
                                            (errors.UOM && touched.UOM) || (errors.UOM)
                                                ? errors.UOM
                                                : 'Enter Units of Measurement'
                                        }</div>
                                </BS.Form.Group>


                                <BS.Form.Group as={BS.Col} className="mb-2" >
                                    <BS.Form.Label>Rate Per
                                        <span className="required">*</span>
                                    </BS.Form.Label>
                                    <NumberFormat
                                        //thousandSeparator={false}
                                        //prefix={'$'}
                                        decimalSeparator="."
                                        displayType="input"
                                        type="text"
                                        placeholder="Charged Rate"
                                        className="text-right form-control"
                                        name='Charged_Per_Rate'
                                        readOnly={isFieldDisabled}
                                        value={values.Charged_Per_Rate ? values.Charged_Per_Rate : ''}
                                        onChange={handleChange}
                                        onBlur={(e) => onHandleBlurVal(e, setFieldValue, values)}
                                    />
                                    {/* <BS.Form.Control
                                        type="text"
                                        className="text-right"
                                        disabled={isFieldDisabled}
                                        placeholder="Charged Rate"
                                        name="Charged_Per_Rate"
                                        value={values.Charged_Per_Rate ? values.Charged_Per_Rate : ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    > 
                                    </BS.Form.Control> */}
                                </BS.Form.Group>

                                <BS.Form.Group as={BS.Col} className="mb-2" >
                                    <BS.Form.Label>Quantity
                                        <span className="required">*</span>
                                    </BS.Form.Label>
                                    <BS.Form.Control
                                        type="text"
                                        className="text-right"
                                        placeholder="Quantity"
                                        name='Quantity'
                                        value={values.Quantity}
                                        onChange={handleChange}
                                        onBlur={(e) => onHandleBlurVal(e, setFieldValue, values)}
                                    //onBlur={handleBlur}
                                    />
                                    <div className={!!(errors.Quantity && touched.Quantity) || (errors.Quantity) ? 'error-span show' : 'error-span'}>
                                        {
                                            (errors.Quantity && touched.Quantity) || (errors.Quantity)
                                                ? errors.Quantity
                                                : 'Enter Quantity'
                                        }</div>
                                </BS.Form.Group>


                                <BS.Form.Group as={BS.Col} className="mb-2" >
                                    <BS.Form.Label>Price
                                        {/* <span className="required">*</span> */}
                                    </BS.Form.Label>
                                    <NumberFormat thousandSeparator={true} prefix={'$'}
                                        decimalSeparator="."
                                        displayType="input"
                                        type="text"
                                        placeholder="Price"
                                        className="text-right form-control"
                                        name='Amount'
                                        readOnly={true}
                                        value={values.Amount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <div className={!!(errors.Amount && touched.Amount) || (errors.Amount) ? 'error-span show' : 'error-span'}>
                                        {
                                            (errors.Amount && touched.Amount) || (errors.Amount)
                                                ? errors.Amount
                                                : 'Enter Price'
                                        }</div>
                                </BS.Form.Group>
                            </BS.Row>
                            <BS.Row className="mb-2 d-block-sm">
                                <BS.Form.Group as={BS.Col} controlId="Invoice_Description">
                                    <BS.Form.Label>
                                        Description <span className="required">*</span>
                                    </BS.Form.Label>
                                    <BS.Form.Control
                                        type="text"
                                        placeholder="Enter Description"
                                        name="Invoice_Description"
                                        value={values.Invoice_Description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={isFieldDisabled}
                                    />
                                    <div
                                        className={
                                            !!(errors.Invoice_Description && touched.Invoice_Description)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.Invoice_Description && touched.Invoice_Description
                                            ? errors.Invoice_Description
                                            : "Enter Description"}
                                    </div>
                                </BS.Form.Group>
                            </BS.Row>
                            <BS.Row className="d-none">
                                <BS.Form.Group as={BS.Col} controlId="Rate_Type_Id" >
                                    <BS.Form.Label>
                                        Rate Type <span className="required">*</span>
                                    </BS.Form.Label>
                                    <BS.Form.Control
                                        as={"select"}
                                        placeholder="Enter Rate"
                                        disabled={isFieldDisabled}
                                        name="Rate_Type_Id"
                                        value={values.Rate_Type_Id}
                                        onChange={(e) => onSelectChangeVal(e, setFieldValue, values)}
                                        onBlur={handleBlur}
                                        className="select-option form-control"
                                    >
                                        <option key={0} value={0}>
                                            --Select Rate Type--
                                        </option>
                                        {rateTypesLookup &&
                                            rateTypesLookup.length > 0 &&
                                            rateTypesLookup.map((event: IType, i: number) => {
                                                return (
                                                    <option key={i} value={event.id}>
                                                        {event.displayText}
                                                    </option>
                                                );
                                            })}
                                    </BS.Form.Control>
                                    <div
                                        className={
                                            !!(errors.Rate_Type_Id && touched.Rate_Type_Id)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.Rate_Type_Id && touched.Rate_Type_Id
                                            ? errors.Rate_Type_Id
                                            : "Enter Notification Event"}
                                    </div>
                                </BS.Form.Group>

                                <BS.Form.Group as={BS.Col} className="mb-2" >
                                    <BS.Form.Label>Calculated Price</BS.Form.Label>
                                    <BS.Form.Control
                                        type="text"
                                        className="text-right"
                                        disabled={isFieldDisabled}
                                        placeholder="Calculated Price"
                                        name='Invoice_Calculate_Price'
                                        value={values.Invoice_Calculate_Price}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </BS.Form.Group>


                                <BS.Form.Group as={BS.Col} className="mb-2" >
                                    <BS.Form.Label>Charged Min Rate</BS.Form.Label>
                                    <BS.Form.Control
                                        type="text"
                                        className="text-right"
                                        disabled={isFieldDisabled}
                                        placeholder="Charged Min Rate"
                                        name="Invoice_Charged_Min_Rate"
                                        value={values.Invoice_Charged_Min_Rate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                    </BS.Form.Control>
                                </BS.Form.Group>
                                <BS.Form.Group as={BS.Col} className="mb-2" >
                                    <BS.Form.Label>Charged Max Rate</BS.Form.Label>
                                    <BS.Form.Control
                                        type="text"
                                        className="text-right"
                                        disabled={isFieldDisabled}
                                        placeholder="Charged Max Rate"
                                        name="Invoice_Charged_Max_Rate"
                                        value={values.Invoice_Charged_Max_Rate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                    </BS.Form.Control>
                                </BS.Form.Group>
                            </BS.Row>
                            <div className="d-flex justify-content-end mt-3">
                                {/* <div className="d-flex"> */}
                                <BS.Button
                                    className="btn-md-w mr-2"
                                    variant="secondary"
                                    onClick={() => {
                                        showPopup(false);
                                    }}
                                >
                                    Cancel
                                </BS.Button>
                                <BS.Button
                                    className="btn-md-w"
                                    variant="primary"
                                    disabled={!(dirty && isValid)}
                                    type="submit" >
                                    Save
                                </BS.Button>
                                {/* </div> */}
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};
export default InvoiceChargesEntryForm;