import React, { useEffect, useState } from "react";
import { Row, Col, InputGroup } from "react-bootstrap";
import { Formik, FormikProps, Form } from "formik";
import * as BS from "react-bootstrap";
import { useSelector } from "react-redux";
import { getLookupDetails } from "../../../reducers/lookupReducer";
import { IType } from "../../../interfaces/forms";
import { addMonths } from "date-fns";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { API_SERVICE } from "../../../services/commonApi";
import { API_URLS } from "../../../utilities/api_url_constants";
import { useDispatch } from "react-redux";
import {
    commonAzureFileUpload,
    convertErrorObj,
    constructRatesData,
    fixTimezoneOffset
} from "../../../utilities/common";
import * as Yup from "yup";
import { history } from "../../../config/history";
import { fetchRatesRequest, updateRatesRequest } from "../../../actions/rateActions";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const UploadRateForm = ({ onUploadRate, onCancelUpload }: any): JSX.Element => {
    const dispatch = useDispatch();
    const [rateTypes, setRateType] = useState([]);
    const [sectionTypes, setSectionType] = useState([]);
    const [rateLookupOns, setRateLookupOn] = useState([]);
    const [transTypes, setTransType] = useState([]);
    const [effectiveFrom, setEffectiveFrom] = useState<any>(null);
    const [effectiveTo, setEffectiveTo] = useState<any>(null);
    const [fileSelected, setFileSelected] = useState<any>(null);
    const [modalRatesUpload, setUploadShowPopup] = useState(false);
    const [modalRatesDownload, setDownloadShowPopup] = useState(false);
    const lookupsData = useSelector(getLookupDetails);
    const [pathName, setPathName] = useState('');
    const [success, setSuccess] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [text, setText] = useState('');
    // const [tableData, setTableData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (history.location.pathname) {
            const pathNameReplace = history.location.pathname.replace(/\\|\//g, "");
            setPathName(pathNameReplace);
            setText(pathNameReplace);
            getList(pathNameReplace);
        }
    },[]);

    //   GET_RATE_LIST: "Invoice/RatesMaster",

    useEffect(() => {
        if (lookupsData) {
            const rateType = lookupsData.filter((rate: any) => rate.type === "Rate_type");
            const sectionType = lookupsData.filter((rate: any) => rate.type === "Section_type");
            const rateLookupOn = lookupsData.filter((rate: any) => rate.type === "Rates_Lookup_On");
            const transType = lookupsData.filter((rate: any) => rate.type === "Trans_type");
            setRateType(rateType);
            setRateLookupOn(rateLookupOn)
            setSectionType(sectionType)
            setTransType(transType)
        }
    }, [lookupsData]);

    const onChangeEffectiveFrom = (date: any, setFieldValue: any) => {
        if (effectiveTo) {
            if (effectiveTo > date) {
                setFieldValue('effectiveFrom', date)
                setEffectiveFrom(date)
            } else {
                toast.error('Please choose past date')
            }
        } else {
            setFieldValue('effectiveFrom', date)
            setEffectiveFrom(date)
        }
    }
    const onChangeEffectiveTo = (date: any, setFieldValue: any) => {
        if (effectiveFrom < date) {
            setEffectiveTo(date)
            setFieldValue('effectiveTo', date)
        } else {
            toast.error('Please choose future date')
        }
    }

    const onFileChange = (event: any) => {
        setFileSelected(event.target.files[0]);
    };



    const onFormSubmit = async (values: any, _resetForm: () => void) => {
        const apiUrl = API_URLS.RATE_MASTER_UPLOAD;
        if (values.file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const filePath = `${API_URLS.AZURE_FILE_UPLOAD_URL}testing/${values.file.name}`;
            const payload = {
                "azureFileURL": filePath,
                "azureAccountKey": "",
                "azureContainerName": "",
                "defaultEndpointsProtocol": "",
                "accountName": "",
                "endpointSuffix": "",
                "sectionType": values.SectionType,
                "effectiveStartDate": new Date(fixTimezoneOffset(effectiveFrom)),
                "effectiveEndDate": new Date(fixTimezoneOffset(effectiveTo)),
                "rateLookupOn": values.rateLookupOn,
                "rateType": values.rateType,
                "transactionType": values.TransactionType
            }

            commonAzureFileUpload(values, fileSelected, apiUrl, payload).then((responseData: any) => {
                
                // debugger;
                if (responseData) {

                    if (responseData.Message === 'RateMaster Uploaded Successfully') {
                        toast.success('Data uploaded successfully');
                        onUploadRate(true);
                        setSuccess(true);
                        setUploadShowPopup(false);
                        _resetForm();
                        // return
                    } else {
                        let stringVal: any = ''
                        if (responseData.errors && responseData.errors.length > 0) {
                            const errors = convertErrorObj(responseData.errors);
                            for (const [key, value] of Object.entries(errors)) {
                                if (key === 'undefined') {
                                    stringVal = stringVal + value + '\n'
                                    stringVal += '</br>'
                                }
                                else {
                                    stringVal = stringVal + '\n Row ' + key + ': ' + value + '\n '
                                    stringVal += '</br>'
                                }
                            }

                        } else {
                            stringVal = responseData.errors;
                        }
                        toast.error(<div className={'toastErrors'} dangerouslySetInnerHTML={{ __html: stringVal }} />, {
                            position: "top-right",
                            autoClose: false,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: 0,
                        })
                        setUploadShowPopup(false);
                    }
                } else {
                    toast.error(responseData), {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: 0,
                    }
                }
                onCancelUpload()
            });

            // reset state/form
            setFileSelected(null);
        } else {
            toast.error('Please upload .xlsx format file', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
            });
            _resetForm();
        }
    }

    useEffect(() => {
        if (success) {
            getList();
            setSuccess(false)
        }

    }, [success]);

    const getList = (val = '') => {
        // const apiUrl = !val ? pathName === 'rates': API_URLS.GET_RATE_LIST,
        // : val === 'rates' ? API_URLS.GET_RATE_LIST:
        const apiUrl = !val ? pathName === 'rates' ? API_URLS.GET_RATE_LIST : API_URLS.GET_RATE_LIST
            : val === 'rates' ? API_URLS.GET_RATE_LIST : API_URLS.GET_RATE_LIST;
        API_SERVICE.get(
            apiUrl,
            {},
            ''
        )
            .then((r) => {
                setData(JSON.parse(r.data))
            })
    }

    useEffect(() => {
        if (pathName === 'rates') {
            data.length > 0 && data.map((v: any) => {
                Object.assign(v,
                    {
                        sectionName: v.sectionType ? `$${v.sectionType}` : '',
                        customerName: v.customer ? `$${v.customer}` : '',
                        carrierName: v.carrier ? `$${v.carrier}` : '',
                        effectiveStart: v.effectiveStartDate ? `$${v.effectiveStartDate}` : '',
                        effectiveEnd: v.effectiveEndDate ? `$${v.effectiveEndDate}` : '',
                    })
            });
            setTableData(data)
        }
    }, [data]);

    const validationShape = {
        rateType: Yup.string().required("Please choose ratetype value"),
        rateLookupOn: Yup.string().required("Please choose rate lookupon value"),
        SectionType: Yup.string().required("Please choose sectiontype value"),
        TransactionType: Yup.string().required("Please choose transaction value"),
        effectiveFrom: Yup.date().required('EffectiveFrom date is required'),
        effectiveTo: Yup.date().required('EffectiveTo date is required'),
        file: Yup.mixed().required('File is required'),
    };

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    rateType: '',
                    rateLookupOn: '',
                    SectionType: '',
                    TransactionType: '',
                    effectiveFrom: null,
                    effectiveTo: null,
                    file: null
                }}
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
                        dirty,
                        setFieldValue
                    } = props;
                    return (
                        <Form>
                            <Row className="mt-0 d-block-sm">
                                <BS.Form.Group as={Col}>
                                    <BS.Form.Label htmlFor="inlineFormInputGroup" >Effective From <span className="required">*</span></BS.Form.Label>
                                    <InputGroup className="mb-2 d-date-picker">
                                        {/*<BS.Form.Control id="inlineFormInputGroup" placeholder="Effective From" />*/}
                                        <DatePicker
                                            selected={values.effectiveFrom ? values.effectiveFrom : effectiveFrom}
                                            onChange={(date) => onChangeEffectiveFrom(date, setFieldValue)}
                                            onBlur={handleBlur}
                                            minDate={new Date()}
                                            maxDate={addMonths(new Date(), 20)}
                                            showDisabledMonthNavigation
                                            placeholderText={'Effective From'}
                                            dateFormat="MM/dd/yyyy"
                                        />
                                        <BS.InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></BS.InputGroup.Text>
                                    </InputGroup>
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
                                <BS.Form.Group as={Col}>
                                    <BS.Form.Label htmlFor="inlineFormInputGroup" >Effective To <span className="required">*</span></BS.Form.Label>
                                    <InputGroup className="mb-2 d-date-picker">
                                        {/*<BS.Form.Control id="inlineFormInputGroup" placeholder="Effective To" />*/}
                                        <DatePicker
                                            selected={values.effectiveTo ? values.effectiveTo : effectiveTo}
                                            onChange={(date) => onChangeEffectiveTo(date, setFieldValue)}
                                            onBlur={handleBlur}
                                            minDate={new Date()}
                                            maxDate={addMonths(new Date(), 20)}
                                            showDisabledMonthNavigation
                                            placeholderText={'Effective To'}
                                            dateFormat="MM/dd/yyyy"
                                        />
                                        <BS.InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></BS.InputGroup.Text>
                                    </InputGroup>
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
                            </Row>
                            <Row className="mt-0 d-block-sm">
                                <BS.Form.Group as={Col} className="mb-2" controlId="RateType">
                                    <BS.Form.Label column>Rate Type <span className="required">*</span></BS.Form.Label>
                                    <BS.Form.Control
                                        as="select"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="select-option form-control"
                                        name="rateType"
                                        value={values.rateType}
                                    >
                                        <option key={0} value={''} >
                                            {"Select"}
                                        </option>
                                        {
                                            rateTypes && rateTypes.length > 0 &&
                                            rateTypes.map((p: IType, i: number) => {
                                                return (
                                                    <option key={i} value={p.value}>
                                                        {p.displayText}
                                                    </option>
                                                );
                                            })
                                        }
                                    </BS.Form.Control>
                                    <div
                                        className={
                                            !!(errors.rateType && touched.rateType)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.rateType && touched.rateType ? errors.rateType : "Please choose ratetype"}
                                    </div>
                                </BS.Form.Group>
                                <BS.Form.Group as={Col} className="mb-2" controlId="rateLookupOn">
                                    <BS.Form.Label column>Rate Lookup on <span className="required">*</span></BS.Form.Label>
                                    <BS.Form.Control
                                        as="select"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="select-option form-control"
                                        name="rateLookupOn"
                                        value={values.rateLookupOn}
                                    >
                                        <option key={0} value={""}>
                                            {"Select"}
                                        </option>
                                        {
                                            rateLookupOns && rateLookupOns.length > 0 &&
                                            rateLookupOns.map((p: IType, i: number) => {
                                                return (
                                                    <option key={i} value={p.value}>
                                                        {p.displayText}
                                                    </option>
                                                );
                                            })
                                        }
                                    </BS.Form.Control>
                                    <div
                                        className={
                                            !!(errors.rateLookupOn && touched.rateLookupOn)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.rateLookupOn && touched.rateLookupOn ? errors.rateLookupOn : "Please choose rate lookup on"}
                                    </div>
                                </BS.Form.Group>
                            </Row>
                            <Row className="mt-0 d-block-sm">
                                <BS.Form.Group as={Col} className="mb-2" controlId="SectionType">
                                    <BS.Form.Label column>Section Type <span className="required">*</span></BS.Form.Label>
                                    <BS.Form.Control
                                        as="select"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="select-option form-control"
                                        name="SectionType"
                                        value={values.SectionType}
                                    >
                                        <option key={0} value={""}>
                                            {"Select"}
                                        </option>
                                        {
                                            sectionTypes && sectionTypes.length > 0 &&
                                            sectionTypes.map((p: IType, i: number) => {
                                                return (
                                                    <option key={i} value={p.value}>
                                                        {p.displayText}
                                                    </option>
                                                );
                                            })
                                        }
                                    </BS.Form.Control>
                                    <div
                                        className={
                                            !!(errors.SectionType && touched.SectionType)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.SectionType && touched.SectionType ? errors.SectionType : "Please choose section type"}
                                    </div>
                                </BS.Form.Group>
                                <BS.Form.Group as={Col} className="mb-2" controlId="TransactionType">
                                    <BS.Form.Label column>Transaction Type <span className="required">*</span></BS.Form.Label>
                                    <BS.Form.Control
                                        as="select"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="select-option form-control"
                                        name="TransactionType"
                                        value={values.TransactionType}
                                    >
                                        <option key={0} value={""}>
                                            {"Select"}
                                        </option>
                                        {
                                            transTypes && transTypes.length > 0 &&
                                            transTypes.map((p: IType, i: number) => {
                                                return (
                                                    <option key={i} value={p.value}>
                                                        {p.displayText}
                                                    </option>
                                                );
                                            })
                                        }
                                    </BS.Form.Control>
                                    <div
                                        className={
                                            !!(errors.TransactionType && touched.TransactionType)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.TransactionType && touched.TransactionType ? errors.TransactionType : "Please choose transaction type"}
                                    </div>
                                </BS.Form.Group>
                            </Row>
                            <Row className="mt-0 d-block-sm">
                                <BS.Form.Group controlId="formFile" className="mb-3">
                                    <BS.Form.Label>Select File <span className="required">*</span></BS.Form.Label>
                                    <BS.Form.Control
                                        type="file"
                                        name="file"
                                        onChange={(event: any) => {
                                            setFieldValue("file", event.currentTarget.files[0]);
                                            onFileChange(event)
                                        }}
                                        accept=".xlsx"
                                    />
                                    <div
                                        className={
                                            !!(errors.file && touched.file)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {errors.file && touched.file ? errors.file : "Please choose file"}
                                    </div>
                                </BS.Form.Group>
                            </Row>
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
                                                onClick={() => onCancelUpload(false)}
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
                        </Form>
                    );
                }}
            </Formik>
        </div>
    )
};

export default UploadRateForm;