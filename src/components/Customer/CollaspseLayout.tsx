import React, {useCallback, useEffect, useState} from "react";
// import Collapse from 'rc-collapse';
import * as BS from "react-bootstrap";
// import 'rc-collapse/assets/index.css'
import CorporateOfficeForm from "./Forms/CorporateOfficeForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {
    defaultInitialValues,
    entityInitialValues,
    getLookupDataByType,
    PageContent
} from "../../utilities/common";
import {Formik, Form, FormikProps} from "formik";
import * as Yup from "yup";
import BillToForm from "./Forms/BillTo";
import {customerFormProps, customerFormValues} from "../../interfaces/customerTypes";
import {addTypesFormData} from "../../interfaces/forms";
import {useSelector} from "react-redux";
import {getLookupDetails} from "../../reducers/lookupReducer";
import DistributionCenterColumns from "./columns/DistributionCenterTableColumn";
import CustomTableContainer from "../../containers/CommonTableContainer";
import InvoiceToForm from "./Forms/InvoiceTo";
import PoolTerminalForm from "./Forms/Terminal";
import StoreDeliveryForm from "./Forms/Delivery";
import DeleteModal from "../common/DeleteModal";
import DistributionCenterModal from "./Forms/DistributionCenterModal";
import {LANDlINE, PHONE} from "../../constants/actionTypes";
// const Panel = Collapse.Panel;
let showStyle = {}
let hideStyle = {}
let mstyle = {}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const customersValidation = Yup.object().shape({
    legalName: Yup.string().matches(/^[a-zA-Z ]*$/, "Please Enter valid Name").required('Please enter the legalName'),
    city: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required('Please enter the city'),
    zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    state: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required('Please enter the state'),
    phone: Yup.string().matches(LANDlINE, 'Phone number is not valid'),
    MC_Number: Yup.string().when(['Federal_Tax_ID', 'DOT_Number', 'DUNS_Number'], {
        is: (Federal_Tax_ID: any, DOT_Number: any, DUNS_Number: any) => !Federal_Tax_ID && !DOT_Number && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    Federal_Tax_ID: Yup.string().when(['MC_Number', 'DOT_Number', 'DUNS_Number'], {
        is: (MC_Number: any, DOT_Number: any, DUNS_Number: any) => !MC_Number && !DOT_Number && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    DOT_Number: Yup.string().when(['MC_Number', 'Federal_Tax_ID', 'DUNS_Number'], {
        is: (MC_Number: any, Federal_Tax_ID: any, DUNS_Number: any) => !MC_Number && !Federal_Tax_ID && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    // SCAC: Yup.string().when(['MC_Number', 'Federal_Tax_ID', 'DOT_Number', 'DUNS_Number'], {
    //     is: (MC_Number: any, Federal_Tax_ID: any, DOT_Number: any, DUNS_Number: any) => !MC_Number && !Federal_Tax_ID && !DOT_Number && !DUNS_Number,
    //     then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or SCAC or DUNS Number required')}),
    DUNS_Number: Yup.string().when(['MC_Number', 'Federal_Tax_ID', 'DOT_Number', 'SCAC'], {
        is: (MC_Number: any, Federal_Tax_ID: any, DOT_Number: any) => !MC_Number && !Federal_Tax_ID && !DOT_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number is required')}),
    billTo_zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    billTo_phone: Yup.string().matches(LANDlINE, 'Phone number is not valid'),
    billTo_contactName: Yup.string().matches(/^[a-zA-Z ]*$/, "Please enter valid contact name").required('Please enter the contact name'),
    billTo_contactPhone: Yup.string().required('Please enter the contact number').matches(PHONE, 'Contact number is not valid'),
    billTo_contactEmail:  Yup.string().email('Please enter valid email format').required('Please enter the contact email')
}, [['Federal_Tax_ID','DOT_Number'],
    ['Federal_Tax_ID','DUNS_Number'],
    ['Federal_Tax_ID','MC_Number'],
    ['DOT_Number','DUNS_Number'],
    ['DOT_Number','MC_Number'],
    ['DUNS_Number','MC_Number']]);

const brokersValidation = Yup.object().shape({
    legalName: Yup.string().matches(/^[a-zA-Z ]*$/, "Please Enter valid Name").required('Please enter the legalName'),
    city: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required('Please enter the city'),
    zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    state: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required('Please enter the state'),
    phone: Yup.string().matches(LANDlINE, 'Phone number is not valid'),
    MC_Number: Yup.string().when(['Federal_Tax_ID', 'DOT_Number', 'DUNS_Number'], {
        is: (Federal_Tax_ID: any, DOT_Number: any, DUNS_Number: any) => !Federal_Tax_ID && !DOT_Number && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    Federal_Tax_ID: Yup.string().when(['MC_Number', 'DOT_Number', 'DUNS_Number'], {
        is: (MC_Number: any, DOT_Number: any, DUNS_Number: any) => !MC_Number && !DOT_Number && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    DOT_Number: Yup.string().when(['MC_Number', 'Federal_Tax_ID', 'DUNS_Number'], {
        is: (MC_Number: any, Federal_Tax_ID: any, DUNS_Number: any) => !MC_Number && !Federal_Tax_ID && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    SCAC: Yup.string().matches(/^[a-zA-Z ]*$/, "Please Enter valid SCAC name").required('Please enter SCAC').min(2, 'Minimum 2-4 characters allowed').max(4, 'Minimum 2-4 characters allowed'),
    DUNS_Number: Yup.string().when(['MC_Number', 'Federal_Tax_ID', 'DOT_Number'], {
        is: (MC_Number: any, Federal_Tax_ID: any, DOT_Number: any) => !MC_Number && !Federal_Tax_ID && !DOT_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number is required')}),

    IsCarrier: Yup.boolean(),
    billTo_zipCode: Yup.string().when('IsCarrier', {
        is: true,
        then: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits')
    }),

    /* billTo_zipCode: Yup.string().when("IsCarrier",{
        is: true,
        then: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits')
    }), */
    // billTo_zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    billTo_phone: Yup.string().when('IsCarrier', {
        is: true,
        then: Yup.string().matches(LANDlINE, 'Phone number is not valid')
    }),
    billTo_contactName: Yup.string().when('IsCarrier', {
        is: true,
        then: Yup.string().matches(/^[a-zA-Z ]*$/, "Please enter valid contact name").required('Please enter the contact name')}),
    billTo_contactPhone: Yup.string().when('IsCarrier', {
        is: true,
        then: Yup.string().required('Please enter the contact number').matches(PHONE, 'Contact number is not valid')
    }),
    billTo_contactEmail:  Yup.string().when('IsCarrier', {
        is: true,
        then: Yup.string().email('Please enter valid email format').required('Please enter the contact email')
    })

    //IsCarrier: Yup.boolean(),
    // billTo_zipCode: Yup.string().when('IsCarrier', {
    //     is: true,
    //     then: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits')
    // }),

    /* billTo_zipCode: Yup.string().when("IsCarrier",{
        is: true,
        then: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits')
    }), */
    // billTo_zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    // billTo_phone: Yup.string().matches(LANDlINE, 'Phone number is not valid'),

    // billTo_contactName: Yup.string().matches(/^[a-zA-Z ]*$/, "Please enter valid contact name").required('Please enter the contact name'),
    // billTo_contactPhone: Yup.string().required('Please enter the contact number').matches(PHONE, 'Contact number is not valid'),
    // billTo_contactEmail:  Yup.string().email('Please enter valid email format').required('Please enter the contact email'),
   
}, [['Federal_Tax_ID','DOT_Number'],
    ['Federal_Tax_ID','DUNS_Number'],
    ['Federal_Tax_ID','MC_Number'],
    ['DOT_Number','DUNS_Number'],
    ['DOT_Number','MC_Number'],
    ['DUNS_Number','MC_Number']]);

const carrierValidation = Yup.object().shape({
    legalName: Yup.string().matches(/^[a-zA-Z ]*$/, "Please Enter valid Name").required('Please enter the legalName'),
    city: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required('Please enter the city'),
    zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    state: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required('Please enter the state'),
    phone: Yup.string().matches(LANDlINE, 'Phone number is not valid'),
    MC_Number: Yup.string().when(['Federal_Tax_ID', 'DOT_Number', 'DUNS_Number'], {
        is: (Federal_Tax_ID: any, DOT_Number: any, DUNS_Number: any) => !Federal_Tax_ID && !DOT_Number && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    Federal_Tax_ID: Yup.string().when(['MC_Number', 'DOT_Number', 'DUNS_Number'], {
        is: (MC_Number: any, DOT_Number: any, DUNS_Number: any) => !MC_Number && !DOT_Number && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    DOT_Number: Yup.string().when(['MC_Number', 'Federal_Tax_ID', 'DUNS_Number'], {
        is: (MC_Number: any, Federal_Tax_ID: any, DUNS_Number: any) => !MC_Number && !Federal_Tax_ID && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    SCAC: Yup.string().matches(/^[a-zA-Z ]*$/, "Please Enter valid SCAC name").required('Please enter SCAC').min(2, 'Minimum 2-4 characters allowed').max(4, 'Minimum 2-4 characters allowed'),
    DUNS_Number: Yup.string().when(['MC_Number', 'Federal_Tax_ID', 'DOT_Number'], {
        is: (MC_Number: any, Federal_Tax_ID: any, DOT_Number: any) => !MC_Number && !Federal_Tax_ID && !DOT_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number is required')}),

    billTo_zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    billTo_phone: Yup.string().matches(LANDlINE, 'Phone number is not valid'),
    billTo_contactName: Yup.string().matches(/^[a-zA-Z ]*$/, "Please Enter valid Name").required('Please enter the contact name'),
    billTo_contactPhone: Yup.string().required('Please enter the contact number').matches(PHONE, 'Contact number is not valid'),
    billTo_contactEmail:  Yup.string().email('Please enter valid email format').required('Please enter the contact email'),
    invoiceTo_zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    invoiceTo_phone: Yup.string().matches(LANDlINE, 'Phone number is not valid'),
    invoiceTo_contactName: Yup.string().matches(/^[a-zA-Z ]*$/, "Please Enter valid Name").required('Please enter the contact name'),
    invoiceTo_contactPhone: Yup.string().required('Please enter the contact number').matches(PHONE, 'Contact number is not valid'),
    invoiceTo_contactEmail:  Yup.string().email('Please enter valid email format').required('Please enter the contact email'),
}, [['Federal_Tax_ID','DOT_Number'],
    ['Federal_Tax_ID','DUNS_Number'],
    ['Federal_Tax_ID','MC_Number'],
    ['DOT_Number','DUNS_Number'],
    ['DOT_Number','MC_Number'],
    ['DUNS_Number','MC_Number']]);

const blsValidation = Yup.object().shape({
    legalName: Yup.string().matches(/^[a-zA-Z ]*$/, "Please Enter valid Name").required('Please enter the legalName'),
    city: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required('Please enter the city'),
    zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    state: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required('Please enter the state'),
    phone: Yup.string().matches(LANDlINE, 'Phone number is not valid'),
    MC_Number: Yup.string().when(['Federal_Tax_ID', 'DOT_Number', 'DUNS_Number'], {
        is: (Federal_Tax_ID: any, DOT_Number: any, DUNS_Number: any) => !Federal_Tax_ID && !DOT_Number && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    Federal_Tax_ID: Yup.string().when(['MC_Number', 'DOT_Number', 'DUNS_Number'], {
        is: (MC_Number: any, DOT_Number: any, DUNS_Number: any) => !MC_Number && !DOT_Number && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    DOT_Number: Yup.string().when(['MC_Number', 'Federal_Tax_ID', 'DUNS_Number'], {
        is: (MC_Number: any, Federal_Tax_ID: any, DUNS_Number: any) => !MC_Number && !Federal_Tax_ID && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    DUNS_Number: Yup.string().when(['MC_Number', 'Federal_Tax_ID', 'DOT_Number'], {
        is: (MC_Number: any, Federal_Tax_ID: any, DOT_Number: any) => !MC_Number && !Federal_Tax_ID && !DOT_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number is required')}),
    billTo_zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    billTo_phone: Yup.string().matches(LANDlINE, 'Phone number is not valid'),
    billTo_contactName: Yup.string().matches(/^[a-zA-Z ]*$/, "Please Enter valid Name").required('Please enter the contact name'),
    billTo_contactPhone: Yup.string().required('Please enter the contact number').matches(PHONE, 'Contact number is not valid'),
    billTo_contactEmail:  Yup.string().email('Please enter valid email format').required('Please enter the contact email'),
    invoiceTo_zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    invoiceTo_phone: Yup.string().matches(LANDlINE, 'Phone number is not valid'),
    invoiceTo_contactName: Yup.string().matches(/^[a-zA-Z ]*$/, "Please Enter valid Name").required('Please enter the contact name'),
    invoiceTo_contactPhone: Yup.string().required('Please enter the contact number').matches(PHONE, 'Contact number is not valid'),
    invoiceTo_contactEmail:  Yup.string().email('Please enter valid email format').required('Please enter the contact email'),
}, [['Federal_Tax_ID','DOT_Number'],
    ['Federal_Tax_ID','DUNS_Number'],
    ['Federal_Tax_ID','MC_Number'],
    ['DOT_Number','DUNS_Number'],
    ['DOT_Number','MC_Number'],
    ['DUNS_Number','MC_Number']]);

const poolProviderValidation = Yup.object().shape({
    legalName: Yup.string().matches(/^[a-zA-Z ]*$/, "Please Enter valid Name").required('Please enter the legalName'),
    city: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required('Please enter the city'),
    zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    state: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required('Please enter the state'),
    phone: Yup.string().matches(LANDlINE, 'Phone number is not valid'),
    MC_Number: Yup.string().when(['Federal_Tax_ID', 'DOT_Number', 'DUNS_Number'], {
        is: (Federal_Tax_ID: any, DOT_Number: any, DUNS_Number: any) => !Federal_Tax_ID && !DOT_Number && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    Federal_Tax_ID: Yup.string().when(['MC_Number', 'DOT_Number', 'DUNS_Number'], {
        is: (MC_Number: any, DOT_Number: any, DUNS_Number: any) => !MC_Number && !DOT_Number && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    DOT_Number: Yup.string().when(['MC_Number', 'Federal_Tax_ID', 'DUNS_Number'], {
        is: (MC_Number: any, Federal_Tax_ID: any, DUNS_Number: any) => !MC_Number && !Federal_Tax_ID && !DUNS_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number required')}),
    // SCAC: Yup.string().when(['MC_Number', 'Federal_Tax_ID', 'DOT_Number', 'DUNS_Number'], {
    //     is: (MC_Number: any, Federal_Tax_ID: any, DOT_Number: any, DUNS_Number: any) => !MC_Number && !Federal_Tax_ID && !DOT_Number && !DUNS_Number,
    //     then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or SCAC or DUNS Number required')}),
    DUNS_Number: Yup.string().when(['MC_Number', 'Federal_Tax_ID', 'DOT_Number'], {
        is: (MC_Number: any, Federal_Tax_ID: any, DOT_Number: any) => !MC_Number && !Federal_Tax_ID && !DOT_Number,
        then: Yup.string().required('Either MC number or Federal Tax ID or DOT Number or DUNS Number is required')}),
    pool_city:  Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    pool_state:  Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    pool_zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    pool_phone:  Yup.string().matches(LANDlINE, 'Phone number is not valid'),
    pool_PoolLocationNumber:  Yup.string().required('Please enter the location number'),
}, [['Federal_Tax_ID','DOT_Number'],
    ['Federal_Tax_ID','DUNS_Number'],
    ['Federal_Tax_ID','MC_Number'],
    ['DOT_Number','DUNS_Number'],
    ['DOT_Number','MC_Number'],
    ['DUNS_Number','MC_Number']]);

const storesValidation = Yup.object().shape({
    legalName: Yup.string().required('Please enter the legalName'),
    city: Yup.string().matches(/^[aA-zZ\s.]+$/, "Only alphabets are allowed").required('Please enter the city'),
    zipCode: Yup.string().required('Please enter the zipcode').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    state: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required('Please enter the state'),
    phone: Yup.string().matches(LANDlINE, 'Phone number is not valid'),
    StoreNumber: Yup.string().required('Please enter the store Number'),
    address: Yup.string().required('Please enter the address'),
    Zone: Yup.string().required('Please choose the zone'),
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const entityValidation = (entityType: any) => {
    if (entityType === 1)
        return customersValidation
    else if (entityType === 2){
        return brokersValidation
    }
    else if (entityType === 3)
        return carrierValidation
    else if (entityType === 4)
        return poolProviderValidation
    else if (entityType === 5)
        return storesValidation
    else if (entityType === 50){
        return blsValidation
    }
}

const CollapseLayout = ({
                            header,
                            edit,
                            onCancel,
                            isDelete,
                            corporateContacts,
                            setCorporateContacts,
                            dcInfoData,
                            storesDeliveryData,
                            formData,
                            setFormData,
                            isSubmit,
                            onDeleteCoContact,
                            pathName,
                            pathEntityType,
                            onDeleteDcData,
                            setAllDcInfoData
                        }: customerFormProps): JSX.Element => {
    const [showPopup, setShowPopup] = useState(false);
    const [commonInitialValues, setCommonInitialValues] = useState(pathEntityType ? entityInitialValues[pathEntityType] : defaultInitialValues);
    const [validation, setValidation] = useState(pathEntityType ? entityValidation(pathEntityType) : pathEntityType);
    const [storesData, setStoresData] = useState([]);
    const [currentDcInfoData, setCurrentDcInfoData] = useState({});
    const [removeId, setRemoveId] = useState(0);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isLoad, setIsLoad] = useState(true);
    const [sortedContacts, setSortedContacts] = useState([]);
    const [FirstDeliveryDate, setFirstDeliveryDate] = useState<any>(null);
    const [localStoreData, setLocalStoreData] = useState<any>(null);
    const [showBillToSection, setshowBillToSection] = useState(false);

    const getAllLookups = useSelector(getLookupDetails);
    const contacts = getLookupDataByType(getAllLookups, 'Contact_Type');
    const years = getLookupDataByType(getAllLookups, 'DCYears');

   
    const toggleShowHide = (val:any) =>{
        //if(pathName === 'carrier'){
            if(val){
                mstyle = {
                    display:'block'
                }
            }
            else {
                mstyle = {
                    display:'none'
                }
            }
    // }
    // else{
    //     mstyle = {
    //         display:'block'
    //     }
     //   }
        
    }

    useEffect(() => {
        if(pathName === 'carriers'){
                mstyle = {
                    display:'none'
                }
            
        }
        else{
            mstyle = {
                display:'block'
            }
        }
        setCommonInitialValues(entityInitialValues[pathEntityType])
        setValidation(entityValidation(pathEntityType))
        setIsLoad(false)
        if (Object.keys(formData).length != 0){
            setEditDataInfo(formData);
            const deliveryDate = formData.FirstDeliveryDate ? new Date(formData.FirstDeliveryDate) : null
            setFirstDeliveryDate(deliveryDate);
            if(storesDeliveryData.length > 0){
                const temp: any = []
                const sortedValues = storesDeliveryData.length > 0 && storesDeliveryData.reverse();
                sortedValues.length > 0 && sortedValues.map ((v: any) => {
                    const newObj = {
                        Id: v.Id,
                        Days_id: v.Days_id,
                        StartTime: v.StartTime,
                        EndTime: v.EndTime
                    };
                    temp.push(newObj);
                });
                setLocalStoreData(temp);
            }
        }

        const sortedValues = contacts.length > 0 && contacts.sort(function(a: any, b: any) {
            return a.value.localeCompare(b.value);
        });
        setSortedContacts(sortedValues)
    },[]);

    const showModal = (): void => {
        setCurrentDcInfoData({})
        setShowPopup(true)
    }

    const  onGetData = (id: number): void => {
        const data = dcInfoData && dcInfoData.length > 0 && dcInfoData.find((v: any) => v.Id === id)
        setCurrentDcInfoData(data);
        setShowPopup(true)
    }

    const  onFormSubmitData = (data: customerFormValues, resetForm: () => void): void => {
        Object.assign(data, {stores: storesData.length > 0 ? storesData : localStoreData, FirstDeliveryDate: FirstDeliveryDate})
        setFormData(data);
        setShowPopup(false);
        if (edit) {
            isSubmit(true, data)
        } else {
            isSubmit(false, data)
        }

    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    const corporateOfficeContact = (value: any, isEdit= false): void => {
        if (corporateContacts && !isEdit) {
            const tempArray: any = [...corporateContacts, value]
            setCorporateContacts(tempArray);
        } else if (isEdit && corporateContacts) {
            const temp: any = []
            corporateContacts.length > 0 && corporateContacts.map((item: addTypesFormData) => {
                if (item.Id === value.Id) {
                    temp.push(value)
                } else {
                    temp.push(item)
                }
            });
            setCorporateContacts(temp)
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    const onSendDcInfoData = useCallback((value: any, isEdit= false) => {
        if (dcInfoData && !isEdit) {
            const tempArray: any = [...dcInfoData, value]
            setAllDcInfoData(tempArray);
        } else if (isEdit && dcInfoData) {
            const temp: any = []
            dcInfoData.length > 0 && dcInfoData.map((item: any) => {
                if (item.Id === value.Id) {
                    temp.push(value)
                } else {
                    temp.push(item)
                }
            });
            setAllDcInfoData(temp)
        }
    }, [dcInfoData, setAllDcInfoData]);

    const setEditDataInfo = (formValues: any)  => {
        setCommonInitialValues(formValues);
    }
    // const onSubmitData = (): void => {
    //     setShowPopup(false);
    //     isSubmit()
    // }
    //
    // const onUpdateData = (): void => {
    //     setShowPopup(false);
    //     isSubmit(true)
    // }

    const cancelAccordion = () => {
        onCancel();
    }

    const onFormKeyChange = (values: any) => {
        Object.assign(values, {stores: storesData.length > 0 ? storesData : localStoreData, FirstDeliveryDate: FirstDeliveryDate})
        setFormData(values)
    }

    const changeDeliveryDate = (date: any) => {
        setFirstDeliveryDate(date)
    }

    const onWeekUpdateData = (values: any) => {
        setStoresData(values)
    }

    const onDeleteData = useCallback((id: number) => {
        setDeleteModal(true);
        setRemoveId(id);
    }, []);

    let dcInfoCols: any = [];
    dcInfoCols = DistributionCenterColumns({
        onGetData,
        onDeleteData
    });

    const modalShowClose = () => { setDeleteModal(false)}
    const onDeleteRecord = () => { onDeleteDcData(removeId); }

    if (contacts && contacts.length > 0 && sortedContacts.length === 0) {
        const sortedValues = contacts.length > 0 && contacts.sort(function(a: any, b: any) {
            return a.value.localeCompare(b.value);
        });
        setSortedContacts(sortedValues)
    }

    showStyle = {
        display:'block'
    }

    hideStyle = {
        display:'none'
    }


    return(
        <>
            <PageContent>
                {
                    isDelete ? null :
                        <BS.Accordion defaultActiveKey="0">
                            {
                                isLoad ? null : (
                                    <Formik
                                        initialValues={commonInitialValues}
                                        initialErrors ={commonInitialValues}
                                        onSubmit={(values: customerFormValues, actions) => {
                                            onFormSubmitData(values, actions.resetForm)
                                            setTimeout(() => {
                                                actions.setSubmitting(false)
                                            }, 500)
                                        }}
                                        validationSchema={validation}
                                        enableReinitialize
                                        validateOnMount={true}
                                        validateOnChange={true}
                                        validateOnBlur={true}
                                    >
                                        {(props: FormikProps<customerFormValues>) => {
                                            const {
                                                values,
                                                touched,
                                                errors,
                                                handleBlur,
                                                handleChange,
                                                isValid,
                                                dirty,
                                                setFieldValue
                                            } = props
                                            return (
                                                <Form onKeyUp={() => onFormKeyChange(values)} autoComplete="off">
                                                    <div className='show'>
                                                        <BS.Accordion.Item eventKey="0">
                                                            <BS.Accordion.Header className="main-head">{header}</BS.Accordion.Header>
                                                            <BS.Accordion.Body>
                                                                <BS.Accordion defaultActiveKey={'0'}>
                                                                    <BS.Accordion.Item eventKey="0">
                                                                        <BS.Accordion.Header>Corporate Office</BS.Accordion.Header>
                                                                        <BS.Accordion.Body>
                                                                            <CorporateOfficeForm
                                                                                corporateOfficeContact={corporateOfficeContact}
                                                                                onDeleteCoContact={onDeleteCoContact}
                                                                                contactsData={corporateContacts}
                                                                                contacts={sortedContacts ? sortedContacts: contacts}
                                                                                errors={errors}
                                                                                setFieldValue={setFieldValue}
                                                                                touched={touched}
                                                                                handleBlur={handleBlur}
                                                                                values={values}
                                                                                edit={edit}
                                                                                handleChange={handleChange}
                                                                                pathEntityType={pathEntityType}
                                                                                changeDeliveryDate={changeDeliveryDate}
                                                                                toggleShowHide={toggleShowHide}
                                                                            />
                                                                        </BS.Accordion.Body>
                                                                    </BS.Accordion.Item>
                                                                    { (pathEntityType === 1 || pathEntityType === 2 || pathEntityType === 3 || pathEntityType === 50) &&
                                                                    <BS.Accordion.Item eventKey={'1'} id="carrierBilltoSection"  style={mstyle}>
                                                                        <BS.Accordion.Header>
                                                                            {pathName === 'carriers' ? 'Insurance' : 'Bill To'}
                                                                        </BS.Accordion.Header>
                                                                        <BS.Accordion.Body>
                                                                            
                                                                            <BillToForm
                                                                                errors={errors}
                                                                                touched={touched}
                                                                                handleBlur={handleBlur}
                                                                                values={values}
                                                                                handleChange={handleChange}
                                                                                edit={edit}
                                                                            />
                                                                        </BS.Accordion.Body>
                                                                    </BS.Accordion.Item>
                                                                    }
                                                                    { (pathEntityType === 4) &&
                                                                    <BS.Accordion.Item eventKey="1">
                                                                        <BS.Accordion.Header>
                                                                            Terminal Info
                                                                        </BS.Accordion.Header>
                                                                        <BS.Accordion.Body>
                                                                            <PoolTerminalForm
                                                                                errors={errors}
                                                                                touched={touched}
                                                                                handleBlur={handleBlur}
                                                                                values={values}
                                                                                edit={edit}
                                                                                years={years}
                                                                                handleChange={handleChange}
                                                                            />
                                                                        </BS.Accordion.Body>
                                                                    </BS.Accordion.Item>
                                                                    }
                                                                    { (pathEntityType === 5) &&
                                                                    <BS.Accordion.Item eventKey="1">
                                                                        <BS.Accordion.Header>
                                                                            Stores Delivery
                                                                        </BS.Accordion.Header>
                                                                        <BS.Accordion.Body>
                                                                            <StoreDeliveryForm
                                                                                errors={errors}
                                                                                touched={touched}
                                                                                handleBlur={handleBlur}
                                                                                values={values}
                                                                                edit={edit}
                                                                                handleChange={handleChange}
                                                                                onWeekUpdate={onWeekUpdateData}
                                                                                storesDeliveryData={storesDeliveryData}
                                                                            />
                                                                        </BS.Accordion.Body>
                                                                    </BS.Accordion.Item>
                                                                    }
                                                                    { (pathEntityType === 3 || pathEntityType === 50 || pathEntityType===2) &&
                                                                    <BS.Accordion.Item eventKey="2">
                                                                        <BS.Accordion.Header>
                                                                            { pathEntityType === 3 ? 'Remit To' : pathEntityType === 2 ? 'Pay To' : 'Invoice To'}
                                                                        </BS.Accordion.Header>
                                                                        <BS.Accordion.Body>
                                                                            <InvoiceToForm
                                                                                errors={errors}
                                                                                touched={touched}
                                                                                handleBlur={handleBlur}
                                                                                values={values}
                                                                                edit={edit}
                                                                                handleChange={handleChange}
                                                                            />
                                                                        </BS.Accordion.Body>
                                                                    </BS.Accordion.Item>
                                                                    }
                                                                    { (pathEntityType === 1) &&
                                                                        <BS.Accordion.Item eventKey="2">
                                                                            <BS.Accordion.Header>Distribution Center Information</BS.Accordion.Header>
                                                                            <BS.Accordion.Body>
                                                                                <div style={{display: 'flex'}}>
                                                                                    <div className={'contact-header'}><h6>Contact Details</h6></div>
                                                                                    <div style={{flex: 'auto'}}/>
                                                                                    <div
                                                                                        className={'color-highlight'}
                                                                                        onClick={showModal}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faPlus} />
                                                                                        <span>&nbsp;Add DC</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="add-lease d-flex justify-content-end mb-2 BS.Color-highlight">
                                                                                    <DistributionCenterModal
                                                                                        contacts={sortedContacts ? sortedContacts: contacts}
                                                                                        showPopup={showPopup}
                                                                                        setShowPopup={setShowPopup}
                                                                                        onSendDcInfoData={onSendDcInfoData}
                                                                                        editData = {currentDcInfoData}
                                                                                    />
                                                                                </div>
                                                                                {/*<CustomerTable*/}
                                                                                {/*    data={formData}*/}
                                                                                {/*    showData={showModal}*/}
                                                                                {/*/>*/}
                                                                                <CustomTableContainer
                                                                                    columns={dcInfoCols}
                                                                                    data={dcInfoData.length != 0 ? dcInfoData : []}
                                                                                    options={false}
                                                                                />
                                                                            </BS.Accordion.Body>
                                                                        </BS.Accordion.Item>
                                                                    }
                                                                </BS.Accordion>

                                                                <div className="mt-3">
                                                                    <div className="d-flex justify-content-end">

                                                                        <BS.Button
                                                                            type="button"
                                                                            className="btn btn-secondary btn-md-w mr-2"
                                                                            onClick={ cancelAccordion}
                                                                        >
                                                                            Cancel
                                                                        </BS.Button>
                                                                        {
                                                                            edit ?
                                                                                <BS.Button
                                                                                    type="submit"
                                                                                    // onClick={ onUpdateData }
                                                                                    className="btn btn-primary btn-md-w"
                                                                                    disabled={pathEntityType === 1 ? !!Object.keys(errors).length || !dcInfoData.length : pathEntityType === 5 ? (!corporateContacts.length || !!Object.keys(errors).length) : !!Object.keys(errors).length }
                                                                                >
                                                                                    Update

                                                                                </BS.Button>
                                                                                :
                                                                                pathEntityType === 5 ? (
                                                                                    <BS.Button
                                                                                        type="submit"
                                                                                        // onClick={ onSubmitData }
                                                                                        className="btn btn-primary btn-md-w"
                                                                                        disabled={!(dirty && isValid && corporateContacts.length != 0)}
                                                                                    >
                                                                                        Save
                                                                                    </BS.Button>
                                                                                    ) : (
                                                                                    <BS.Button
                                                                                        type="submit"
                                                                                        // onClick={ onSubmitData }
                                                                                        className="btn btn-primary btn-md-w"
                                                                                        // disabled={pathEntityType === 1 ? !(dirty && isValid && dcInfoData.length != 0) : !(dirty && isValid)}
                                                                                    >
                                                                                        Save
                                                                                    </BS.Button>
                                                                                    )

                                                                        }
                                                                    </div>
                                                                </div>
                                                            </BS.Accordion.Body>
                                                        </BS.Accordion.Item>
                                                    </div>
                                                </Form>
                                            )
                                        }}
                                    </Formik>
                                )
                            }
                    </BS.Accordion>
                }
                {
                    deleteModal && removeId &&
                    <DeleteModal
                        show={deleteModal}
                        handleClose={modalShowClose}
                        onDeleteData={onDeleteRecord}
                    />
                }
            </PageContent>
        </>
    )
};
export default CollapseLayout;