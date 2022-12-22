import React, {useEffect, useState} from "react";
import { Accordion, Button, Modal } from 'react-bootstrap';
import BasicDetails from "./Forms/BasicDetails";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {PageContent, BoxHead, BoxBody, constructRatesData} from '../../utilities/common';
import AddRateForm from "./AddRatesEntryDetails";
import CustomTableContainer from "../../containers/CommonTableContainer";
import PerfectScrollbar from "react-perfect-scrollbar";
import ratestypesColumn from "./columns/RatestypesColumn";
import {Form, Formik, FormikProps} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import DeleteModal from "../common/DeleteModal";
import {useDispatch, useSelector} from "react-redux";
import {createRatesRequest, updateRatesRequest} from "../../actions/rateActions";
import {getLookupDetails} from "../../reducers/lookupReducer";
import StorageService from "../../services/Storage.service";
import * as BS from "react-bootstrap";

let entryId:any
const ratesEntryValidation = Yup.object().shape({
    sectionType: Yup.string().required('Please choose the section'),
    customer: Yup.string().required('Please choose the customer'),
    carrier: Yup.string().required('Please choose the carrier'),
    effective_start_date: Yup.date().nullable().required('Please select start date'),
    effective_end_date: Yup.date().nullable().required('Please select end date'),
    ediCode: Yup.string().matches(/^[aA-zZ]{3,4}$/, "max 4 characters are allowed"),
});

const RatesEntryForm = ({onFormCancel, carriers, editFormData, setCommonEditData, isUpdate, fuelData, view, onUpdateEditFormData} : any): JSX.Element => {
    const dispatch = useDispatch();
    const [modal, setShowPopup] = useState(false);
    const [entryIdI, setEntryId] = useState(0);
    //Add rates-3rd
    const [ratesData, setRatesData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [edit, setEdit] = useState(false);
    // const [deletePopup, setDeletePopup] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [viewData, setViewData] = useState(false);
    //Add Rates Entry 2nd
    const [ratesEntryData, setRatesEntryData] = useState([]);
    const [newRatesEntry, setNewRatesEntry] = useState(false);
    const [formData, setFormData] = useState({
        id: false,
        ratesList: []
    });
    const [updatedData, setUpdatedData] = useState({
        rateTypesList: []
    });
    const [deleteModal, setDeleteModal] = useState(false);
    const [removeId, setRemoveId] = useState(0);
    const [rateEntryFormData, setRatesEntryFormData] = useState({});
    const [rateTypes, setRateType] = useState([]);
    const [transTypes, setTransType] = useState([]);
    const [isEditNew, setIsEditNew] = useState(false);
    const [newEntryId, setNewGenId] = useState(0);
    const [tempRates, setTempRates] = useState([]);
    const [initialFvalues, setInitialFValues] = useState({
        sectionType: '',
        customer: '',
        carrier: '',
        effective_start_date: '',
        effective_end_date: '',
        status: undefined,
        tariffNumber: '',
        ediCode: ''
    });

    const showRates = (): void => {
        setShowPopup(true);
        setNewRatesEntry(true);
        if (isUpdate) {
            setIsEditNew(true);
            setTempRates([]);
            setEdit(false)
        }
    }

    useEffect(() => {
        setFormValues();
    }, []);

    useEffect(() => {
        setFormValues();
        const id = StorageService.getCookies("ratesEntryId")
        if (id)
            setEditDataInfo(parseInt(id))
    }, [editFormData])

    function setFormValues() {
        if (Object.keys(editFormData).length != 0) {
            setRatesEntryFormData(editFormData);
            setInitialFValues(editFormData);
            //2nd form
            setRatesEntryData(editFormData.rateTypesList);
            if (editFormData.rateTypesList && editFormData.rateTypesList.length > 0) {
                const temp: any = [];
                editFormData.rateTypesList.map((v: any) => {
                    if (v.ratesList)
                        temp.push(...v.ratesList)
                })
                setRatesData(temp)
            }
        }
    }

    useEffect(() => {
        if (ratesEntryData.length > 0) {
            const tempData: any = []
            ratesEntryData.filter((c: any) => (c.isDeleted != true)).map((v: any) => {
                const transData: any = transTypes.find((c: any)=> c.id === parseInt(v.transType));
                const rateTypeData: any = rateTypes.find((rate: any) =>  rate.id === parseInt(v.rateType));
                Object.assign(v,
                    {
                        transTypeName: transData && transData.displayText ? transData.displayText : '' ,
                        rateTypeName: rateTypeData && rateTypeData.displayText ? rateTypeData.displayText : ''
                    })
                tempData.push(v)
            });
            setTableData(tempData)
        } else {
            setTableData([])
        }
    }, [ratesEntryData])

    const setEditDataInfo = (id: any) => {
        const editData: any =
            ratesEntryData &&
            ratesEntryData.length > 0 &&
            ratesEntryData.find((v: any) => v.id === id);

        const setEditData = {
            id: editData ? editData.id : "",
            rateType: editData.rateType ? editData.rateType : "",
            transType: editData.transType ? editData.transType : "",
            storeType: editData.storeType ? editData.storeType : "",
            UOM: editData.UOM ? editData.UOM : "",
            MaxValue: editData.MaxValue ? editData.MaxValue : "",
            MinValue: editData.MinValue ? editData.MinValue : "",
            DefaultValue: editData.DefaultValue ? editData.DefaultValue : "",
            DestinationZip: editData.DestinationZip ? editData.DestinationZip : "",
            ratesList: editData.ratesList && editData.ratesList.length > 0 ? editData.ratesList : [],
        }
        setFormData(setEditData);
        setTempRates(editData.ratesList ? editData.ratesList : [])
        setEdit(true)
    }

    const showRatesData = (data: any, isDelete = false, isView = false): void => {
        if (isUpdate) {
            setIsEditNew(true)
        }
        setNewRatesEntry(false)
        if (isDelete) {
            onDeleteData(data)
            setViewData(isView);
        } else if(isView) {
            setShowPopup(true);
            setDelete(isDelete);
            setViewData(isView);
            setEditDataInfo(data);
        } else {
            setShowPopup(true);
            setEdit(true);
            setDelete(isDelete);
            setEditDataInfo(data);
            setViewData(isView);
            setNewRatesEntry(false)
        }
    };

    const lookups = useSelector(getLookupDetails);

    useEffect(() => {
        if (lookups){
            const rateType = lookups.filter((rate: any) => rate.type === "Rate_type");
            const transType = lookups.filter((rate: any) => rate.type === "Trans_type");
            setTransType(transType)
            setRateType(rateType);
        }
    }, [lookups])

    const onDeleteData = (id: number): void => {
        setDeleteModal(true);
        setRemoveId(id);
    };

    let cols: any = [];
    cols = ratestypesColumn({
        showRatesData,
        view
    });

    const constructRateData = (values: any) => {
        if (Object.keys(values).length)
        {
            const Obj = {
                Id: -1,
                rate: values.rate,
                rangeTo: values.rangeTo,
                IsActive: true,
                IsDeleted: false,
                rangeFrom: values.rangeFrom,
                rateTypesId: -1
            }
            const tempArray: any = [...ratesData, Obj]
            setRatesData(tempArray);
            return tempArray
        }
    }

    //Add Rates
    const onSaveRatesData = (value: any, isEdit= false): void => {
        if (isEditNew && !isEdit) {
            const newGenId = new Date().valueOf();
            setNewGenId(newGenId)
            // const newValues: any = constructRateData(value);
            const newRateValues: any = [...tempRates, value]
            setTempRates(newRateValues)
        } else {
            if (ratesData && !isEdit) {
                const tempArray: any = [...ratesData, value]
                setRatesData(tempArray);
                const rateDataByForm = {...formData, ratesList: tempArray}
                setFormData(rateDataByForm)
                if (edit) {
                    const newValues: any = constructRateData(value);
                    setCommonEditData(newValues, formData && formData.id)
                }
            } else if (isEdit && ratesData) {
                const temp: any = []
                formData.ratesList.length > 0 && formData.ratesList.map((item: any) => {
                    if (item.Id === value.Id) {
                        temp.push(value)
                    } else {
                        temp.push(item)
                    }
                });
                StorageService.setCookies("ratesEntryId", formData && formData.id);
                setCommonEditData(temp, formData && formData.id)
                setRatesData(temp)
            }
        }
    }

    const onDeleteRatesData = (id: number, rateTypeId: number) => {
        const deletedData: any = [];
        const ratesEntryValues: any = ratesEntryData.find((e: any) => { return e.id === rateTypeId});
        ratesEntryValues.ratesList.map((item: any) => {
            if (item.Id === id) {
                Object.assign(item, {
                    IsActive: true,
                    IsDeleted: true,
                });
                deletedData.push(item)
            } else
                deletedData.push(item)
        });
        ratesEntryData.map((v: any) => {
            if (v.id === rateTypeId){
                v.ratesList = deletedData
            }
        })
        setRatesEntryData(ratesEntryData);
        setRatesData(deletedData);
        setTempRates(deletedData);
        formData.ratesList = deletedData;
        setFormData(formData)
        toast.success("Rates Deleted");
    };

    //Add Rates Entry 2nd
    const onSaveRatesEntryData = (value: any, isEdit= false): void => {
        if (isEditNew) {
            const transData: any = transTypes.find((c: any)=> c.id === parseInt(value.transType))
            const rateTypeData: any = rateTypes.find((rate: any) =>  rate.id === parseInt(value.rateType));
            Object.assign(value,
                {
                    transTypeName: transData && transData.displayText ? transData.displayText : '',
                    rateTypeName: rateTypeData && rateTypeData.displayText ? rateTypeData.displayText : '',
                    isDeleted: false,
                    isActive: true
                });

            const tempData: any = [];
            editFormData.rateTypesList.length > 0 && editFormData.rateTypesList.map((obj: any) => {
                if (obj.id === value.id){
                    // obj.ratesList = value.ratesList
                    tempData.push(value)
                } else {
                    tempData.push(obj)
                }
            });
            const ifExist = editFormData.rateTypesList.length > 0 && editFormData.rateTypesList.find((v: any) => v.id === value.id)
            if (!ifExist && value.id.toString().length > 10) {
                tempData.push(value)
            }
            //onUpdateEditFormData(tempData)
            setTableData(tempData)
            setRatesEntryData(tempData)
        } else {
            if (!isEdit) {
                const tempArray: any = [...ratesEntryData, value]
                setRatesEntryData(tempArray);
                setRatesData([]);
                const rateEntryDataByForm = {...formData, value}
                setFormData(rateEntryDataByForm)
            } else if (isEdit && ratesEntryData) {
                const temp: any = []
                ratesEntryData.length > 0 && ratesEntryData.map((item: any) => {
                    if (item.id === value.Id) {
                        temp.push(value)
                    } else {
                        temp.push(item)
                    }
                });
                setRatesEntryData(temp)
                setUpdatedFormData(temp, value.Id, '')
            }
        }
    }

    const setUpdatedFormData = (data: any, id: any, newEntryId: any) => {
        const tempData: any = [];
        if (editFormData && editFormData.rateTypesList && editFormData.rateTypesList.length > 0) {
            editFormData.rateTypesList.map((v: any) => {
                if (v.id === id) {
                    tempData.push(...data)
                } else
                    tempData.push(v)
            });
            const updateData = {...editFormData, rateTypesList: tempData}
            setUpdatedData(updateData)
        }
    }

    const onDeleteRatesEntryData = (id: number) => {
        const tempArr: any = [];
        ratesEntryData.map((item: any) => {
            if (item.id === id){
                Object.assign(item, { isDeleted: true });
            } else {
                Object.assign(item, { isDeleted: false });
            }
            tempArr.push(item)
        })
        setRatesEntryData(tempArr);
        setTableData(tempArr);
        toast.success("RatesTypes Deleted");
    };

    //Add Rates Entry 2nd
    const addRatesEntryInfo = (values: any, isEdit = false) => {
        values.id = entryId
        setShowPopup(false);
        onSaveRatesEntryData(values, isEdit);
    }

    const onFormSubmit = (values: any, resetForm: () => void) => {
        setRatesEntryFormData(values);
        onFormCancel();
        let ratesPayload: any = ''
        if (isUpdate) {
            ratesPayload = constructRatesData(values, ratesEntryData, true, false);
            dispatch(updateRatesRequest({ ratesPayload }));
            setEdit(false)
        } else{
            ratesPayload = constructRatesData(values, ratesEntryData, false, false);
            dispatch(createRatesRequest({ ratesPayload }));
        }
    }

    const setVals = (data:any) =>{
       entryId =data.id
    }
    return (
        <>
            <PageContent>
                <BoxHead
                    title={'Rates Entry'}
                />
                <BoxBody>
                    <Formik
                        initialValues={initialFvalues}
                        // initialErrors ={initialFvalues}
                        onSubmit={(values: any, action) => {
                            onFormSubmit(values, action.resetForm)
                        }}
                        validationSchema={ratesEntryValidation}
                        validateOnMount={true}
                        validateOnChange={true}
                        validateOnBlur={true}
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
                                <Form>
                                    <BasicDetails
                                        values={values}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        touched={touched}
                                        errors={errors}
                                        setFieldValue ={setFieldValue }
                                        carriers={carriers}
                                        fuelData={fuelData}
                                        edit={isUpdate}
                                        view={view}
                                    />

                                    <div className="mt-3">
                                        <Accordion defaultActiveKey="0" className="accordion-rates">
                                            <Accordion.Item eventKey="0" className={'accordion-relative mb-0'}>
                                                <Accordion.Header>
                                                    Rates Types {ratesEntryData && ratesEntryData.length === 0 ? <span className="required" style={{color: '#ff0018'}}>&nbsp;*</span> : ''}
                                                </Accordion.Header >
                                                {
                                                    view ? null :
                                                        <div className={'pull-right accordion-absolute'} onClick={showRates}>
                                                            <FontAwesomeIcon icon={faPlus} />
                                                            <span>Add</span>
                                                        </div>
                                                }
                                                <Accordion.Body>
                                                    <PerfectScrollbar>
                                                        <CustomTableContainer
                                                            columns={cols}
                                                            data={tableData}
                                                            options={false}
                                                        />
                                                    </PerfectScrollbar>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                    <div className="mt-4">
                                        <div className="d-flex justify-content-end">
                                            <Button
                                                type="button"
                                                className="btn btn-secondary btn-md-w mr-2"
                                                onClick={onFormCancel}
                                            >
                                                Cancel
                                            </Button>

                                            {
                                                view ? null : (
                                                    isUpdate ?
                                                        <BS.Button
                                                            type="submit"
                                                            // onClick={ onUpdateData }
                                                            className="btn btn-primary btn-md-w"
                                                            disabled={ !!Object.keys(errors).length || !ratesEntryData.length  }
                                                        >
                                                            Update
                                                        </BS.Button> :
                                                        <Button
                                                            type="submit"
                                                            disabled={!(isValid && ratesEntryData.length != 0)}
                                                            className="btn btn-primary btn-md-w">
                                                            Save
                                                        </Button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </BoxBody>

            </PageContent>
            <Modal id="addRates"
                   size="lg"
                   show={modal}
                   onHide={() => (setShowPopup(false))}
                   dialogClassName="modal-90w"
                   aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Add Rates Entry Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddRateForm
                        newRatesEntry={newRatesEntry}
                        ratesData={ratesData}
                        setRatesAllData={onSaveRatesData}
                        onDeleteRatesData={onDeleteRatesData}
                        edit={edit}
                        formData={formData}
                        rateEntryFormData={rateEntryFormData}
                        ratesEntry={addRatesEntryInfo}
                        onHide={() => setShowPopup(false)}
                        isEditNew={isEditNew}
                        tempRates={tempRates}
                        viewData={viewData}
                        setVals={setVals}
                    />
                </Modal.Body>
            </Modal>
            {deleteModal && removeId && (
                <DeleteModal
                    show={deleteModal}
                    handleClose={() => setDeleteModal(false)}
                    onDeleteData={() => onDeleteRatesEntryData(removeId)}
                />
            )}
        </>

    );
};

export default RatesEntryForm;