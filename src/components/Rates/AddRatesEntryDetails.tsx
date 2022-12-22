import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {Button, Col} from "react-bootstrap";
import CustomTableContainer from "../../containers/CommonTableContainer";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as BS from "react-bootstrap";
import addratesColumn from "./columns/AddRatesColumn";
import {useSelector} from "react-redux";
import {getLookupDetails} from "../../reducers/lookupReducer";
import { IType} from "../../interfaces/forms";
import * as Yup from "yup";
import {FormikProps, Form, Formik} from "formik";
import AddRates from "./Forms/AddRates";
import {isAddRatesExists} from "../../utilities/common";
import DeleteModal from "../common/DeleteModal";
import {customerDetails} from "../../services/customerApi";
import {toast} from "react-toastify";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AddRateForm = ({ ratesData, newRatesEntry, setRatesAllData, onDeleteRatesData, edit, formData, ratesEntry, onHide, rateEntryFormData, isEditNew, tempRates, viewData, setVals }: any): JSX.Element => {
    const [rateTypes, setRateType] = useState([]);
    const [transTypes, setTransType] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [removeId, setRemoveId] = useState(0);
    const [currentData, setCurrentData] = useState({});
    const [localError, setLocalErrors] = useState(false);
    const [enableRatesError, setEnableRatesError] = useState(false);
    const [disableAddRates, setDisableAddRates] = useState(false);
    const [localInitialValues, setLocalInitialValues] =
        useState<any>({
            id: 0,
            rateType: "",
            transType: "",
            storeType: "",
            UOM: '',
            MaxValue: '',
            MinValue: '',
            DefaultValue: '',
            DestinationZip: '',
            parentId: rateEntryFormData.id
        });
    const [store, setStores] = useState([]);

    useEffect(() => {
        storesList();
    }, []);

    useEffect(() => {
        const tblData: any = [];
        formData.ratesList.filter((c: any) => (c.IsDeleted != true || c.IsDeleted != '1' )).map((v: any) => {
            tblData.push(v)
        });
        setTableData(tblData)
    }, [formData.ratesList])

    useEffect(() => {
        const tblData: any = [];
        const filterValues: any = tempRates && tempRates.length > 0 && tempRates.filter((c: any) => (c.IsDeleted != true || c.IsDeleted != '1' ));
        filterValues && filterValues.length > 0 && filterValues.map((v: any) => {
            tblData.push(v)
        });
        setTableData(tblData)
    }, [tempRates])

    useEffect(() => {
        if (Object.keys(formData).length != 0 && !newRatesEntry) {
            setLocalInitialValues({
                id: formData.id,
                rateType: formData.rateType ? formData.rateType : '',
                transType: formData.transType ? formData.transType : '',
                storeType: formData.storeType ? formData.storeType : '',
                UOM: formData.UOM,
                MaxValue: formData.MaxValue,
                MinValue: formData.MinValue,
                DefaultValue: formData.DefaultValue,
                DestinationZip: formData.DestinationZip,
            });
            if (formData.rateType === 44 || formData.rateType === '44') {
                setDisableAddRates(true)
            } else {
                setDisableAddRates(false)
            }
        } else {
            setLocalInitialValues({
                id: 0,
                rateType: "",
                transType: "",
                storeType: "",
                UOM: '',
                MaxValue: '',
                MinValue: '',
                DefaultValue: '',
                DestinationZip: '',
                parentId: rateEntryFormData.id
            });
        }
    }, [formData]);

    const storesList = async () => {
        const data = { payload : {
                entity_type: 5
            }}
        const storeLists = await customerDetails(data);
        const storeData = JSON.parse(JSON.parse(storeLists .data))
        const tempData: any = [];
        if (storeData) {
            storeData.length > 0 &&
            storeData.map((store: any) => {
                tempData.push(store.corporateoffice);
            });
            setStores(tempData);
        }
    }


    const validationShape = Yup.object().shape({
        rateType: Yup.string().required("Please select the RateType"),
        storeType: Yup.string().required("Please select the StoreType"),
        DestinationZip: Yup.string().required('Please enter the DestinationZip').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
        MaxValue: Yup.string().when(['MinValue', 'DefaultValue'], {
            is: (MinValue: any, DefaultValue: any) => !MinValue && !DefaultValue,
            then: Yup.string().required('Either MaxValue or MinValue or DefaultValue required')}),
        MinValue: Yup.string().when(['MaxValue', 'DefaultValue'], {
            is: (MaxValue: any, DefaultValue: any) => !MaxValue && !DefaultValue,
            then: Yup.string().required('Either MaxValue or MinValue or DefaultValue required')}),
        DefaultValue: Yup.string().when(['MinValue', 'MaxValue'], {
            is: (MinValue: any, MaxValue: any) => !MinValue && !MaxValue,
            then: Yup.string().required('Either MaxValue or MinValue or DefaultValue required')}),
    }, [['MinValue','DefaultValue'],
        ['MaxValue','DefaultValue'],
        ['MinValue','MaxValue']]);

    const onDeleteData = (id: number): void => {
        setDeleteModal(true);
        setRemoveId(id);
    };

    const onGetData = (id: number): void => {
        const data =
            formData.ratesList &&
            formData.ratesList.length > 0 &&
            formData.ratesList.find((v: any) => v.Id === id);
        setCurrentData(data);
        if (formData.rateType === 44) {
            setDisableAddRates(true)
        } else {
            setDisableAddRates(false)
        }
        setShowModal(true);
    };

    const addRow = () => {
        setShowModal(true);
        setCurrentData({});
    };

    const onFormSubmit = (values: any, resetForm: () => void) => {
        if (isEditNew) {
            if (values.id) {
                const checkData = tempRates.find((v: any) => v.rateTypesListId === values.id)
                if (checkData) {
                    Object.assign(values, {
                        ratesList: tempRates.length > 0 ? tempRates : [],
                    });
                } else {
                    const newID = new Date().valueOf();
                    tempRates.length > 0 && tempRates.map((v: any) => {
                        v.rateTypesListId = newID
                    })
                    Object.assign(values, {
                        id: newID,
                        ratesList: tempRates.length > 0 ? tempRates : [],
                        parentId: newID
                    });
                }
            } else {
                const newID = new Date().valueOf();
                tempRates.length > 0 && tempRates.map((v: any) => {
                    v.rateTypesListId = newID
                })
                Object.assign(values, {
                    id: newID,
                    ratesList: tempRates.length > 0 ? tempRates : [],
                    parentId: newID
                });
            }
            ratesEntry(values);
        } else {
            if (Object.keys(formData).length != 0 && edit) {
                Object.assign(values, { Id: formData.id, ratesList: formData.ratesList.length > 0 ? formData.ratesList : [] });
                ratesEntry(values, true);
            } else {
                values.id = new Date().valueOf();
                Object.assign(values, {
                    id: new Date().valueOf(),
                    ratesList: ratesData.length > 0 ? ratesData : [],
                    parentId: rateEntryFormData.id ? rateEntryFormData.id : new Date().valueOf()
                });
                ratesEntry(values);
            }
        }

    }

    let cols: any = [];
    cols = addratesColumn({
        onGetData,
        onDeleteData,
        viewData
    });

    const lookups = useSelector(getLookupDetails);

    useEffect(() => {
        if (lookups){
            const rateType = lookups.filter((rate: any) => rate.type === "Rate_type");
            const transType = lookups.filter((rate: any) => rate.type === "Trans_type");
            setRateType(rateType);
            setTransType(transType)
        }
    }, [lookups])

    const addRatesInfo = (values: any, isEdit = false) => {
        const checkRates = isAddRatesExists(formData.ratesList, values);
        if (checkRates && !enableRatesError) {
            toast.error( " Duplicate range not allowed", {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setEnableRatesError(true)
        }
        if (!checkRates) {
            setShowModal(false);
            setEnableRatesError(false);
            if (setRatesAllData) {
                setRatesAllData(values, isEdit);
            }
        }
    }

    function onRateTypeChange (e: any) {
        if (e.target.value === '44') {
            setDisableAddRates(true)
        } else {
            setDisableAddRates(false)
        }
    }
    const setValues = (data:any) =>{
        setVals(data)
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={localInitialValues}
                initialErrors ={localInitialValues}
                onSubmit={(values: any, actions) => {
                    setVals(values)
                    onFormSubmit(values, actions.resetForm);
                    setTimeout(() => {
                        actions.setSubmitting(false);
                    }, 500);
                }}
                validationSchema={validationShape}
                validateOnMount={true}
                validateOnChange={true}
                validateOnBlur={true}
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
                    if (Object.keys(errors).length > 0) {
                        if (touched.storeType && !localError) {
                            setLocalErrors(true);
                        }
                    }

                    return (
                        <Form>
                            <BS.Row className="mt-0 d-block-sm">
                                <BS.Form.Group as={Col} className="mb-3" controlId="RateType">
                                    <BS.Form.Label column>Rate Type <span className="required">*</span></BS.Form.Label>
                                    <BS.Form.Control
                                        as="select"
                                        onChange={ (e) => {
                                            onRateTypeChange(e);
                                            setFieldValue('rateType', e.target.value)
                                        } }
                                        onBlur={handleBlur}
                                        className="select-option form-control"
                                        name="rateType"
                                        value={values.rateType}
                                        disabled={viewData}
                                    >
                                        <option key={0} value={""}>
                                            {"Select"}
                                        </option>
                                        {
                                            rateTypes && rateTypes.length > 0 &&
                                            rateTypes.map((p: IType, i: number) => {
                                                return (
                                                    <option key={i} value={p.id}>
                                                        {p.value}
                                                    </option>
                                                );
                                            })
                                        }
                                    </BS.Form.Control>
                                    <div
                                        className={
                                            !!(errors.rateType && touched.rateType || !!(errors.rateType && edit))
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {(errors.rateType && touched.rateType) || (errors.rateType && edit)
                                            ? errors.rateType
                                            : "Enter RateType"}
                                    </div>
                                </BS.Form.Group>
                                <BS.Form.Group as={Col} className="mb-3" controlId="TransactionType">
                                    <BS.Form.Label column>Transaction Type </BS.Form.Label>
                                    <BS.Form.Control
                                        as="select"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="select-option form-control"
                                        name="transType"
                                        value={values.transType}
                                        disabled={viewData}
                                    >
                                        <option key={0} value={""}>
                                            {"Select"}
                                        </option>
                                        {
                                            transTypes && transTypes.length > 0 &&
                                            transTypes.map((p: IType, i: number) => {
                                                return (
                                                    <option key={i} value={p.id}>
                                                        {p.value}
                                                    </option>
                                                );
                                            })
                                        }
                                    </BS.Form.Control>
                                    <div
                                        className={
                                            !!(errors.transType && touched.transType) || !!(errors.transType && edit)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {(errors.transType && touched.transType) || (errors.transType && edit)
                                            ? errors.transType
                                            : "Enter TransType"}
                                    </div>
                                </BS.Form.Group>
                                <BS.Form.Group as={Col} className="mb-3" controlId="Store">
                                    <BS.Form.Label column>Store <span className="required">*</span></BS.Form.Label>
                                    <BS.Form.Control
                                        as="select"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="select-option form-control"
                                        name="storeType"
                                        value={values.storeType}
                                        disabled={viewData}
                                    >
                                        <option key={0} value={""}>
                                            {"Select"}
                                        </option>
                                        {
                                            store && store.length > 0 &&
                                            store.map((s: any, i: number) => {
                                                return (
                                                    <option key={i} value={s.id}>
                                                        {s.LegalName}
                                                    </option>
                                                );
                                            })
                                        }
                                    </BS.Form.Control>
                                    <div
                                        className={
                                            !!(errors.storeType && touched.storeType) || !!(errors.storeType && edit)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {(errors.storeType && touched.storeType) || (errors.storeType && edit)
                                            ? errors.storeType
                                            : "Enter StoreType"}
                                    </div>
                                </BS.Form.Group>
                                <BS.Form.Group as={Col} className="mb-3" controlId="uom">
                                    <BS.Form.Label column>UOM</BS.Form.Label>
                                    <BS.Form.Control
                                        type="text"
                                        placeholder="UOM"
                                        name="UOM"
                                        value={values.UOM}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={viewData}
                                    />
                                    <div
                                        className={
                                            !!(errors.UOM && touched.UOM) || !!(errors.UOM && edit)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {(errors.UOM && touched.UOM) || (errors.UOM && edit)
                                            ? errors.UOM
                                            : "Enter UOM"}
                                    </div>
                                </BS.Form.Group>
                            </BS.Row>
                            <BS.Row className="mb-2 d-block-sm">
                                <BS.Form.Group as={Col} className="mb-3" controlId="MinValue">
                                    <BS.Form.Label column>Min Value</BS.Form.Label>
                                    <BS.Form.Control
                                        type="text"
                                        placeholder="Min Value"
                                        name="MinValue"
                                        value={values.MinValue}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={viewData}
                                    />
                                </BS.Form.Group>

                                <BS.Form.Group as={Col} className="mb-3" controlId="MaxValue">
                                    <BS.Form.Label column>Max Value</BS.Form.Label>
                                    <BS.Form.Control
                                        type="text"
                                        placeholder="Max Value"
                                        name="MaxValue"
                                        value={values.MaxValue}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={viewData}
                                    />
                                </BS.Form.Group>
                                <BS.Form.Group as={Col} className="mb-3" controlId="DefaultValue">
                                    <BS.Form.Label column>Default Value</BS.Form.Label>
                                    <BS.Form.Control
                                        type="text"
                                        placeholder="Default Value"
                                        name="DefaultValue"
                                        value={values.DefaultValue}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={viewData}
                                    />
                                </BS.Form.Group>
                                <BS.Form.Group as={Col} className="mb-3" controlId="DestinationZip">
                                    <BS.Form.Label column>Destination Zip <span className="required">*</span></BS.Form.Label>
                                    <BS.Form.Control
                                        type="text"
                                        placeholder="Destination Zip"
                                        name="DestinationZip"
                                        value={values.DestinationZip}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={viewData}
                                    />
                                    <div
                                        className={
                                            !!(errors.DestinationZip && touched.DestinationZip) || !!(errors.DestinationZip && edit)
                                                ? "error-span show"
                                                : "error-span"
                                        }
                                    >
                                        {(errors.DestinationZip && touched.DestinationZip) || (errors.DestinationZip && edit)
                                            ? errors.DestinationZip
                                            : "Enter DestinationZip"}
                                    </div>
                                </BS.Form.Group>
                            </BS.Row>
                            <div
                                className={
                                    !!(errors.MaxValue && edit) ||
                                    !!(errors.MinValue && edit) ||
                                    !!(errors.DefaultValue && edit) ||
                                    localError
                                        ? "error-span show"
                                        : "error-span"
                                }
                            >
                                <b>{errors.MaxValue && "* "}</b>
                                {!!(errors.MaxValue && edit) ||
                                !!(errors.MinValue && edit) ||
                                !!(errors.DefaultValue && edit) ||
                                localError
                                    ? errors.MaxValue ||
                                    errors.MinValue ||
                                    errors.DefaultValue
                                    : "Enter Max Number"}
                            </div>
                            <BS.Row className="d-block-sm">
                                <div style={{ display: 'flex' }}>
                                    <div className={'contact-header'}><h6>Rates {ratesData && ratesData.length === 0 ? <span className="required" style={{color: '#ff0018'}}>&nbsp;*</span> : ''}</h6></div>
                                    <div style={{ flex: 'auto' }} />
                                    {
                                        viewData ? null : (
                                            <div
                                                className={'color-highlight'}
                                                onClick={addRow}
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                                <span>&nbsp;Add</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <PerfectScrollbar>
                                    <CustomTableContainer
                                        columns={cols}
                                        data={tableData}
                                        options={false}
                                    />
                                </PerfectScrollbar>
                            </BS.Row>
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
                                            {
                                                viewData ? null : (
                                                    edit ?
                                                        <BS.Button
                                                            type="submit"
                                                            // onClick={ onUpdateData }
                                                            className="btn btn-primary btn-md-w"
                                                            disabled={ !!Object.keys(errors).length && !formData.ratesList.length  }
                                                        >
                                                            Update
                                                        </BS.Button> :
                                                        <Button
                                                            type="submit"
                                                            disabled={!(dirty && isValid && (formData.ratesList.length != 0 || tempRates.length != 0))}
                                                            className="btn btn-primary btn-md-w">
                                                            Save
                                                        </Button>
                                                )
                                            }
                                        </BS.Form.Group>
                                    </BS.Row>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
            <BS.Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                dialogClassName="modal-50w"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <BS.Modal.Header closeButton>
                    <BS.Modal.Title id="example-modal-sizes-title-lg">
                        Add Rates
                    </BS.Modal.Title>
                </BS.Modal.Header>
                <BS.Modal.Body>
                    <AddRates
                        formData={formData}
                        editRates={currentData}
                        ratesInfo={addRatesInfo}
                        disableAddRates={disableAddRates}
                        onHide={() => setShowModal(false)}
                    />
                </BS.Modal.Body>
            </BS.Modal>
            {deleteModal && removeId && (
                <DeleteModal
                    show={deleteModal}
                    handleClose={() => setDeleteModal(false)}
                    onDeleteData={() => onDeleteRatesData(removeId, formData.id)}
                />
            )}
        </div>
    )
};

export default AddRateForm;