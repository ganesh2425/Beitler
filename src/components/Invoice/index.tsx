import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PageContent, BoxHead, BoxBody, entityTypes, pageTitle, fixTimezoneOffset, checkEmailTemplate } from '../../utilities/common';
import * as BS from "react-bootstrap";
import { IInvoiceProps } from '../../interfaces/invoiceTypeProps';
import { toast } from "react-toastify";
import { history } from "../../config/history";
import { getInvoiceDetails, getInvoiceFailure, getInvoiceSuccess, getPurchaseJournalSuccess, getPurchaseJournalError, getPurchaseJournalDetails } from "../../reducers/invoiceReducer";
import InvoiceColumn from "../../columns/InvoiceColumn";
import CustomTableContainer from "../../containers/CommonTableContainer";
import { addInvoiceRequest, addPurchaseJournalRequest, fetchInvoiceRequest, fetchPurchaseJournalRequest, processQueue, updateInvoiceRequest, updatePurchaseJournalRequest } from "../../actions/invoiceActions";
import moment from "moment";
import { faFileDownload, faPlus, faStreetView } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccordionLayout from "./Accordion";
import DeleteModal from "../common/DeleteModal";
import Modal from 'react-bootstrap/Modal'
import { Button } from "react-bootstrap";
import PurchaseJournalForm from "./Forms/PurchaseJournal";
import StorageService from "../../services/Storage.service";
import { ids } from "webpack";
import { UpdateLastUsedNumber } from "../../services/invoice.service";
import InvoicePDF from "./InvoicePDF";
import CheckPDF from "./CheckPDF";
import { fetchLookupRequest } from "../../actions/lookupDataActions";
import { getLookupDetails } from "../../reducers/lookupReducer";
import  {customerDetails}  from "../../services/customerApi"

let currentPath = ''
let vendorNames = [] as any
const payToNames = [] as any
let quickbookData = [] as any
let doSave = false
const Invoice = ({
    text,
    stores, carriers,
}: IInvoiceProps): JSX.Element => {
    const dispatch = useDispatch();
    const [invoiceData, setInvoiceData] = useState([]);
    const [purchaseJournalData, setPurchaseJournalData] = useState([]);
    const [invoiceProcessData, setInvoiceProcessData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [view, setView] = useState(false);
    const [editDataInfo, setEditDataInfo] = useState<any>([]);
    const [editSelectedDataInfo, setEditSelectedDataInfo] = useState<any>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [isPJDelete, setIsPJDelete] = useState(false);
    const [deletePJId, setDeletePJId] = useState(0);
    const [deletePJPopup, setDeletePJPopup] = useState(false);
    const [pjEdit, setPJEdit] = useState(false);
    const [pjView, setPJView] = useState(false);
    const [pjEditId, setPJEditId] = useState(0);
    const [editId, setEditId] = useState(0);
    const [toasterRaised, setToasterRaised] = useState(true);
    const [formData, setFormData] = useState({});
    const [pathName, setPathName] = useState("")
    const [pathEntityType, setPathEntityType] = useState(0);
    const [accordion, setAccordion] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPurchasePopup, setShowPurchasePopup] = useState(false);
    const [proNumberDataList, setProNumberDataList] = useState([]);
    const [purchaseJournelData, setPurchaseJournelData] = useState({});
    const [purchaseJournelDt, setPurchaseJournelDt] = useState({});
    const [purchaseJLastNumber, setPurchaseJLastNumber] = useState<any>([]);
    const [addPurchaseJournalRequestInProgress, setAddPurchaseJournalRequestInProgress] = useState(false);
    const [invoiceIds, setInvoiceId] = useState([]);
    const [thePdfData, setPdfData] = useState([]);
    const [consigneeNamesList, setCnames] = useState([]);
    const [invoiceRecords, setinvoiceRecords] = useState([]);
    const [PdfType, setPdfType] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        vendorNames = []
        quickbookData = []
        const header1 = ["!TRNS\tTRNSTYPE\tDATE\tACCNT\tNAME\tAMOUNT\tDOCNUM\tMEMO\tCLASS\tSHIPDATE\tSHIPVIA"]
        quickbookData.push(header1)
        const header2 = ["!SPL\tTRNSTYPE\tDATE\tACCNT\tNAME\tAMOUNT\tDOCNUM\tMEMO\tCLASS\tINVITEM\tQNTY\tPRICE"]
        quickbookData.push(header2)
        const header3 = ["!ENDTRNS"]
        quickbookData.push(header3)
        setInvoiceId([])
        getInvoiceHandler(0);
        getCustomerInfo();
    }, []);

    const getCustomerInfo = async () =>{
        if (history.location.pathname) {
            currentPath = history.location.pathname.replace(/\\|\//g, "");
            setPathName(currentPath);
        }
        if(currentPath === 'accounts_receivables'){
            const resp = await customerDetails({payload:{entity_type: 1}})
            const data = JSON.parse(JSON.parse(resp.data))
            data.forEach((customerData:any)=>{
                const empData = {name: customerData.corporateoffice.LegalName, type: 1, remitTo_Id:customerData.corporateoffice.BillTo ? customerData.corporateoffice.BillTo[0].Id : '', remitToName:customerData.corporateoffice.BillTo ? customerData.corporateoffice.BillTo[0].ContactName : ''  }
                vendorNames.push(empData)
            })
        }
        else{
            const entityLookup = [2,3,91]
            entityLookup.forEach(async (entId:number) => {
                const resp = await customerDetails({payload:{entity_type: entId}})
                if(resp.data){
                    const data = JSON.parse(JSON.parse(resp.data))
                    data.forEach((customerData:any)=>{
                        const empData = {name: customerData.corporateoffice.LegalName, type: entId, remitTo_Id:customerData.corporateoffice.BillTo ? customerData.corporateoffice.BillTo[0].Id : '', remitToName:customerData.corporateoffice.BillTo ? customerData.corporateoffice.BillTo[0].ContactName : '' }
                        vendorNames.push(empData)
                    })
                }
            })
        }
    }
    /// Get Invoice Details
    const getInvoiceHandler = (Id: number) => {
        if (history.location.pathname) {
            const pathNameReplace = history.location.pathname.replace(/\\|\//g, "");
            setPathName(pathNameReplace);
            const payload = {
                Id: 0,
                Type: pathNameReplace === "accounts_receivables" ? 'AR' : 'AP'
            };
            const purchaseJournalPayload = {
                Id: 0,
                Type: pathNameReplace === "accounts_receivables" ? 'AR' : 'AP'
            };
            getLookups();
            dispatch(fetchInvoiceRequest(payload));
            dispatch(fetchPurchaseJournalRequest(purchaseJournalPayload));
        }
    };

    const getLookups = () => {
        dispatch(fetchLookupRequest({}));
    }


    /**
     * Use Selector for fetching the Invoice List
     */
    const invoiceDat: any = useSelector(getInvoiceDetails);
    const invoiceDataList: any = invoiceDat;
    let invoiceSuccess: any = useSelector(getInvoiceSuccess);
    // eslint-disable-next-line prefer-const
    let invoiceFailure: any = useSelector(getInvoiceFailure);
    const purchaseJournalDat: any = useSelector(getPurchaseJournalDetails);

    const lookupsData = useSelector(getLookupDetails);
    useEffect(() => {
        if (lookupsData.length > 0) {
            const PGAPNumber = lookupsData.filter((rate: any) => rate.type === "PG_AP_Last_Invoice");
            const PGARNumber = lookupsData.filter((rate: any) => rate.type === "PG_AR_Last_Invoice");
            pathName === "accounts_receivables" ? setPurchaseJLastNumber(PGARNumber) : setPurchaseJLastNumber(PGAPNumber);

        }
    }, [lookupsData]);

    useEffect(() => {
        if (invoiceDat) {
            setInvoiceData(invoiceDat);
            setEditSelectedDataInfo(invoiceDat);
            setPurchaseJournalData(purchaseJournalDat);
            ProcessInvoiceList(invoiceDat, purchaseJournalDat);
        }
    }, [invoiceDat, purchaseJournalDat])


    /// Process Invoice List for Invoice Details
    const ProcessInvoiceList = (invoiceData: any, purchaseJournalData: any) => {
        // eslint-disable-next-line prefer-const
        let invoiceProcessDataList: any = [];
        const proNumberTempList: any = [];
        purchaseJournalData.forEach((item: any) => {
            // eslint-disable-next-line prefer-const
            let invoiceProcessDataItem: any = {};
            const InvDate = moment(new Date(item.Date)).format("MM/DD/YYYY");
            invoiceProcessDataItem.Id = item.Id;
            invoiceProcessDataItem.ProNumber = item.Invoice_Number;
            invoiceProcessDataItem.InvoiceDate = "  " + InvDate.split('/')[0] + '/' + InvDate.split('/')[1] + '/' + InvDate.split('/')[2];
            invoiceProcessDataItem.CustomerName = item.PayTo;
            invoiceProcessDataItem.InvoiceAmount = "$" + parseFloat(item.Amount).toFixed(2);
            invoiceProcessDataItem.ConsigneeName = item.Vendor_Name;
            invoiceProcessDataItem.Status = item.Status;
            // invoiceProcessDataItem.InvoiceType = "Purchase Journal";
            invoiceProcessDataItem.InvoiceType = item.PJType === 'AR' ? "Invoice Journal" : "Purchase Journal";
            invoiceProcessDataItem.StatementNumber = '';
            invoiceProcessDataItem.TrailerNumber = '';
            invoiceProcessDataItem.PJNumber = item.PurchaseJournal_Number;
            invoiceProcessDataItem.CreatedDate = item.CreatedDate;
            invoiceProcessDataItem.Carrier_Pro = item.Carrier_Pro;
            invoiceProcessDataItem.Note = item.Note;
            invoiceProcessDataList.push(invoiceProcessDataItem);
            // const qbItem = invoiceProcessDataItem
            // Object.assign(qbItem,{quantity: 0})
            // vendorNames.push({name: item.Vendor_Name.trim() })
            // payToNames.push({name: item.PayTo.trim() })

        });

        invoiceData.forEach((item: any) => {
            // eslint-disable-next-line prefer-const
            let invoiceProcessDataItem: any = {};
            const InvDate = moment(new Date(item.InvoiceHeader.InvoiceDate)).format("MM/DD/YYYY");
            invoiceProcessDataItem.Id = item.InvoiceHeader.Id;
            invoiceProcessDataItem.ProNumber = item.InvoiceHeader.ProNumber;
            invoiceProcessDataItem.InvoiceDate = "  " + InvDate.split('/')[0] + '/' + InvDate.split('/')[1] + '/' + InvDate.split('/')[2];
            invoiceProcessDataItem.CustomerName = item.InvoiceHeader.CustomerName;
            // vendorNames.push({name: item.InvoiceHeader.ConsigneeName.trim() })
            // payToNames.push({name: item.InvoiceHeader.CustomerName.trim() })
            invoiceProcessDataItem.InvoiceAmount = "$" + parseFloat(item.InvoiceHeader.TotalAmount).toFixed(2);
            invoiceProcessDataItem.ConsigneeName = item.InvoiceHeader.ConsigneeName;
            invoiceProcessDataItem.Status = item.Status === 49 ? "Pending" : "Paid";
            invoiceProcessDataItem.InvoiceStatus = item.InvoiceHeader.InvoiceStatus === 65 ? "Pending" : "Paid"; 
            invoiceProcessDataItem.isCheckBox =  item.InvoiceHeader.Id //: false; 
            invoiceProcessDataItem.InvoiceType = item.InvoiceHeader.InvoiceType === "AP" ? "Account Payable" : "Account Receivable";
            invoiceProcessDataItem.StatementNumber = item.InvoiceHeader.statementNumber === null ? "-" : item.InvoiceHeader.statementNumber;
            invoiceProcessDataItem.TrailerNumber = item.InvoiceHeader.TrailerNumber === null ? "-" : item.InvoiceHeader.TrailerNumber;
            invoiceProcessDataItem.PJNumber = '';
            invoiceProcessDataItem.CreatedDate = item.InvoiceHeader.CreatedDt;
            invoiceProcessDataList.push(invoiceProcessDataItem);
            proNumberTempList.push({ Id: item.InvoiceHeader.Id, ProNumber: item.InvoiceHeader.ProNumber });
            
            
            //const qbItem = invoiceProcessDataItem
            const invDt = InvDate.split('/')[0] + '/' + InvDate.split('/')[1] + '/' + InvDate.split('/')[2].toString().trim()
            const row = 'TRNS' + '\t' +'INVOICE' +' \t' + invDt +'\t' + item.InvoiceHeader.InvoiceType.trim() + '\t'  + item.InvoiceHeader.CustomerName.trim() + '\t' + item.InvoiceHeader.TotalAmount + '\t' + item.InvoiceHeader.ProNumber + '\t' + 'Memo-N/A' + '\t' + 'CLASS-N/A' + '\t' + 'ITEM-N/A' + '\t' + 'Qty-N/A' + '\t' + '' 
            quickbookData.push(row)
            
            if(item.InvoiceCharges != null || item.InvoiceCharges != undefined){
                item.InvoiceCharges.forEach((charges:any) => {
                    const invDt = InvDate.split('/')[0] + '/' + InvDate.split('/')[1] + '/' + InvDate.split('/')[2].toString().trim()
                   const row = 'SPL' + '\t' +'INVOICE' +' \t' + invDt +'\t' + charges.Invoice_Description.trim() + '\t'  + item.InvoiceHeader.CustomerName.trim() + '\t' + item.InvoiceHeader.TotalAmount + '\t' + item.InvoiceHeader.ProNumber + '\t' + 'Memo-N/A' + '\t' + 'CLASS-N/A' + '\t' + 'ITEM-N/A' + '\t' + charges.Quantity + '\t' + charges.Charged_Per_Rate 
                    quickbookData.push(row)
                })
            }
        });

        setProNumberDataList(proNumberTempList);
        invoiceProcessDataList.sort((a: any, b: any) => {
            return new Date(b.CreatedDate).getTime() - new Date(a.CreatedDate).getTime();
        });

        if (invoiceProcessDataList.length > 0) {
            invoiceProcessDataList.forEach((item: any) => {
                if (item.InvoiceType === "Purchase Journal" && proNumberTempList.length > 0) {
                    const proNumber = proNumberTempList.filter((rate: any) => rate.Id === item.ProNumber);
                    proNumber.length > 0 ? item.ProNumber = proNumber[0].ProNumber : item.ProNumber = "";
                }
            });

            setInvoiceProcessData(invoiceProcessDataList);
        }
    };

    /**
     * UseEffect for Network Failure and passing the Cursor to Login Page
     * 
     */
    useEffect(() => {
        if (invoiceFailure !== null) {
            if (invoiceFailure === "Network Error") {
                window.location.assign("/login");
            }
        }
    }, [invoiceFailure]);

    /**
    * Use Effect for Success Toaster
    */
    useEffect(() => {
        if (
            invoiceSuccess &&
            invoiceSuccess.Message === "Invoice Updated Successfully" &&
            //invoiceSuccess.Id == deleteId &&
            isDelete &&
            !toasterRaised
        ) {
            toast.success("Deleted Successfully");
            setDeleteId(invoiceSuccess.Id);
            setToasterRaised(true);
            setEdit(false);
            setIsDelete(false);
            document.body.classList.remove("api-loading");
            setTimeout(() => {
                getInvoiceHandler(0);
            }, 1500);
            invoiceSuccess = null;
        } else if (
            invoiceSuccess &&
            invoiceSuccess.Message === "Invoice Updated Successfully" &&
            //invoiceSuccess.Id != deleteId &&
            edit &&
            !toasterRaised
        ) {
            toast.success("Updated Successfully");
            setDeleteId(invoiceSuccess.Id);
            setToasterRaised(true);
            setEdit(false);
            setIsDelete(false);
            document.body.classList.remove("api-loading");
            setTimeout(() => {
                getInvoiceHandler(0);
            }, 1500);
            invoiceSuccess = null;
        } else if (
            invoiceSuccess &&
            invoiceSuccess.Message === "Invoice Created Successfully" &&
            //invoiceSuccess.Id != deleteId &&
            !edit &&
            !toasterRaised
        ) {
            toast.success("Invoice Added Successfully");
            setDeleteId(invoiceSuccess.Id);
            setToasterRaised(true);
            setEdit(false);
            setIsDelete(false);
            document.body.classList.remove("api-loading");
            setTimeout(() => {
                getInvoiceHandler(0);
            }, 1500);
            invoiceSuccess = null;
        }
    }, [invoiceSuccess]);

    /**
     * Delete Invoice Template Record
     * As of now, it is not deleting the record from the database
     */
    const onDeleteInvoiceHandler = () => {
        document.body.classList.add("api-loading");

        editDataInfo.InvoiceHeader.IsDeleted = true;
        editDataInfo.InvoiceHeader.IsActive = false;
        editDataInfo.InvoiceHeader.InvoiceStatus = 65;
        editDataInfo.InvoiceHeader.ModifiedBy = 1;
        editDataInfo.InvoiceHeader.ModifiedDate = new Date().toISOString();
        editDataInfo.InvoiceHeader.HasExtraPickNStop = editDataInfo.InvoiceHeader.HasExtraPickNStop === 1 ? true : false;

        editDataInfo.InvoiceCharges && editDataInfo.InvoiceCharges.forEach((charge: any) => {
            charge.IsDeleted = charge.IsDeleted === 1 ? true : false;
            charge.IsActive = charge.IsActive === 1 ? true : false;
        });
        editDataInfo.InvoicePickupStops && editDataInfo.InvoicePickupStops.forEach((pickup: any) => {
            pickup.IsDeleted = pickup.IsDeleted === 1 ? true : false;
            pickup.IsActive = pickup.IsActive === 1 ? true : false;
        });
        //setAllFormData(editDataInfo);
        const Payload = {
            InvoiceDetail: editDataInfo.InvoiceHeader,
            PickUpStop: editDataInfo.InvoicePickupStops,
            Charges: editDataInfo.InvoiceCharges,
        }
        document.body.classList.add("api-loading");
        dispatch(updateInvoiceRequest(Payload));
        setDeletePopup(false);
        document.body.classList.remove("api-loading");
    };

    const onDeletePurchaseHandler = () => {
        document.body.classList.add("api-loading");
        const Payload: any = purchaseJournelData;
        Payload["IsDeleted"] = true;
        Payload["ModifiedBy"] = 1;
        Payload["ModifiedDate"] = new Date().toISOString();

        setToasterRaised(!toasterRaised)
        setAddPurchaseJournalRequestInProgress(true);
        dispatch(updatePurchaseJournalRequest(Payload));


        document.body.classList.remove("api-loading");
    };

    /**
     * Fetching the Data of the row selected and isDeleted flag is mainted
     * @param data
     * @param isDeleted
     */
    const showData = (data: any, isDeleted = false, isView = false, InvoicePurchaseType: any): void => {
        if (InvoicePurchaseType === "Purchase Journal") {
            setIsDelete(false);
            setEdit(false);
            setShowPopup(false);
            setIsPJDelete(isDeleted);
            setDeletePJPopup(isDeleted);
            setPJEdit(!isDelete);
            setPJView(isView);
            purchaseJournalData.map((item: any) => {
                if (item.Id === data) {
                    setPJEditId(item.Id);
                    setDeletePJId(!isDeleted ? item.Id : 0);
                    setPurchaseJournelData(item);
                    setPurchaseJournelDt(item);
                    setShowPurchasePopup(!isDeleted ? true : false);
                }
            });
        } else {
            !isDeleted ? setDeleteId(0) : setDeleteId(data);
            setToasterRaised(false);
            setDeletePopup(isDeleted);
            setIsDelete(isDeleted);
            setEdit(!isDeleted);
            setView(isView);
            if (isView && !isDeleted) {
                setEdit(false);
            }
            setShowPopup(!isDeleted);
            invoiceData.forEach((record: any) => {
                if (record.InvoiceHeader.Id === data) {

                    record.InvoiceCharges && record.InvoiceCharges.forEach((charge: any) => {
                        charge.IsDeleted = charge.IsDeleted === 1 ? true : false;
                        charge.IsActive = charge.IsActive === 1 ? true : false;
                    });
                    record.InvoicePickupStops && record.InvoicePickupStops.forEach((pickup: any) => {
                        pickup.IsDeleted = pickup.IsDeleted === 1 ? true : false;
                        pickup.IsActive = pickup.IsActive === 1 ? true : false;
                    });
                    setEditDataInfo(record);
                    setEditId(record.InvoiceHeader.Id);
                    setAccordion(!isDeleted);
                }
            });
        }
    };


    /**
     * Add Record for Seting up of the Method
     * 
     */
    const addRecordHandler = () => {
        //setShowPopup(true);
        setEdit(false);
        setView(false);
        setIsDelete(false);
        setAccordion(true);
        setToasterRaised(false);
        const record: any = [];
        setEditDataInfo(record);
    };


    /**
     * Initailisation of the Columns for showing in the Grid and
     * calling the Invoice Column Template also passing the Lookup value
     * showData Method
     */
    let cols: any = [];

    const addIdToPaymetList = (e:any,id:any)=>{
        let IdList: any = [];
        IdList = invoiceIds;
        
        if(e.target.checked){
            if( !IdList.includes(parseInt(e.target.id)))
            IdList.push(parseInt(e.target.id));
            // const cdata = {};
        }
        else{
            const idx = IdList.indexOf(parseInt(e.target.id));
            IdList.splice(idx, 1);
        }
        setInvoiceId(IdList);
        if( invoiceIds.length > 0){
            setIsDisabled(false)
        }
        else{
            setIsDisabled(true)
        }
    };

    const addPJPrefill = (flag: any, id:any) => {
        // purchaseJournalData
        const loadData = {} as any
        invoiceData.map((item: any) => {
            if (item.InvoiceHeader.Id === id) {
                // loadData = { ...item };
                loadData.Amount = item.InvoiceHeader.TotalAmount;
                loadData.Date = fixTimezoneOffset(new Date());
                loadData.Invoice_Number = item.InvoiceHeader.ProNumber;
                loadData.PayTo = item.InvoiceHeader.ConsigneeName;
                loadData.PurchaseJournal_Number = item.InvoiceHeader.PurchaseJournal_Number;
                loadData.Status = 'Approve';
                loadData.Vendor_Name = item.InvoiceHeader.CustomerName;
                loadData.Note = item.InvoiceHeader.PJ_Note;
                loadData.Carrier_Pro = item.InvoiceHeader.Carrier_PRO;
            }
        });
        proNumberDataList.forEach((list:any)=>{
            if(list.ProNumber === loadData.Invoice_Number)
                loadData.Invoice_Number = list.Id
        })
        
        setPJEdit(true);
        setPJView(false);
        setPJEditId(0);
        setPurchaseJournelData(loadData);
        doSave = true
        setShowPurchasePopup(!showPurchasePopup);
    };
    //if (NotinTempTypeLookUp.length > 0) {
    cols = InvoiceColumn({
        showData, pathName, addIdToPaymetList, addPJPrefill
    });
    //}

    const modalShowCloseHandler = () => {
        setDeletePopup(false);
        setDeletePJPopup(false);
    };

    const showAccordion = (): void => {
        setAccordion(!accordion);
        setFormData({
        });
        getInvoiceHandler(0);
    };

    const setAllFormData = (data: any) => {
        document.body.classList.add("api-loading");
        if (data.InvoiceDetail.Id > 0) {
            dispatch(updateInvoiceRequest(data));
        } else {
            dispatch(addInvoiceRequest(data));

            const InvNumber = data.InvoiceDetail.ProNumber.split("-")[3];

            const Payload = {
                LastInvoiceNumber: InvNumber,
                Type: data.InvoiceDetail.ProNumber.split("-")[0] === 'AP' ? "AP_Last_Invoice_No" : "AR_Last_Invoice_No",
            };
            UpdateLastUsedNumber(Payload);
        }
        setFormData(data);
    };

    const onDeleteRecord = (data: any, isDelete: false): void => {
        setIsDelete(isDelete);
        setEditDataInfo(data);
    };

    const onSubmitFormData = async (update = false, formValues: any) => {
        showAccordion();
    }

    let purchaseJournalSuccess: any = useSelector(getPurchaseJournalSuccess);
    let purchaseJournalError: any = useSelector(getPurchaseJournalError);

    useEffect(() => {
        setShowPurchasePopup(false);
        setPurchaseJournelData({});
        setAddPurchaseJournalRequestInProgress(false);
        if (
            purchaseJournalSuccess &&
            purchaseJournalSuccess.Message === "Purchase Journal Created Successfully" &&
            !toasterRaised
        ) {
            toast.success("Purchase Journal Added Successfully");
            setToasterRaised(true);
            document.body.classList.remove("api-loading");
            purchaseJournalSuccess = null;
            setTimeout(() => {
                getInvoiceHandler(0);
            }, 1500);
        } else if (
            purchaseJournalSuccess &&
            purchaseJournalSuccess.Message === "Purchase Journal Updated Successfully" &&
            !toasterRaised && !isPJDelete
        ) {
            toast.success("Purchase Journal Updated Successfully");
            setToasterRaised(true);
            document.body.classList.remove("api-loading");
            purchaseJournalSuccess = null;
            setTimeout(() => {
                getInvoiceHandler(0);
            }, 1500);
        } else if (
            purchaseJournalSuccess &&
            purchaseJournalSuccess.Message === "Purchase Journal Updated Successfully" &&
            !toasterRaised && isPJDelete
        ) {
            toast.success("Purchase Journal Deleted Successfully");
            setToasterRaised(true);
            setIsPJDelete(false);
            setDeletePJPopup(false);
            setDeletePJId(0);
            document.body.classList.remove("api-loading");
            purchaseJournalSuccess = null;
            setTimeout(() => {
                getInvoiceHandler(0);
            }, 1500);
        }
        else if (purchaseJournalError && !toasterRaised) {
            toast.error(purchaseJournalError.Error);
            setToasterRaised(true);
            document.body.classList.remove("api-loading");
            purchaseJournalError = null;
            setTimeout(() => {
                getInvoiceHandler(0);
            }, 1500);
        }
    }, [purchaseJournalSuccess, purchaseJournalError])


    const addPurchaseRecordHandler = (flag?: any) => {
        if (flag) {
            const payload: any = { ...purchaseJournelData };
            let loadData: any = {};
            purchaseJournalData.map((item: any) => {
                if (item.Id === payload.Id) {
                    loadData = { ...item };
                    loadData.Amount = payload.Amount;
                    loadData.Date = fixTimezoneOffset(new Date(payload.Date));
                    loadData.Invoice_Number = payload.Invoice_Number;
                    loadData.PayTo = payload.PayTo;
                    loadData.PurchaseJournal_Number = payload.PurchaseJournal_Number;
                    loadData.Status = payload.Status;
                    loadData.Vendor_Name = payload.Vendor_Name;
                    loadData.Note = payload.PJ_Note;
                    loadData.Carrier_Pro = payload.Carrier_PRO;
                }
            });


            if (payload.Id === 0) {
                Object.assign(payload, { PJType: pathName === "accounts_receivables" ? 'AR' : 'AP' });
                Object.assign(payload, { IsDeleted: false });
                Object.assign(payload, { CreatedBy: 1 });
                Object.assign(payload, { Date: fixTimezoneOffset(new Date(payload.Date)) });
                Object.assign(payload, { CreatedDate: new Date().toISOString() });
            }

            setToasterRaised(!toasterRaised)
            setAddPurchaseJournalRequestInProgress(true);
            if (payload.Id === 0) {
                dispatch(addPurchaseJournalRequest(payload));
            } else {
                dispatch(updatePurchaseJournalRequest(loadData));
            }

            const InvNumber = payload.PurchaseJournal_Number.split("-")[4];

            const PJPayload = {
                LastInvoiceNumber: InvNumber,
                Type: payload.PurchaseJournal_Number.split("-")[1] === 'AP' ? "PG_AP_Last_Invoice" : "PG_AR_Last_Invoice",
            };
            UpdateLastUsedNumber(PJPayload);

        } else {
            setPJEdit(false);
            setPJView(false);
            setPJEditId(0);
            setPurchaseJournelData({});
            setShowPurchasePopup(!showPurchasePopup);
        }
    };
    const onChangeInputPurchaseJournal = (data: any, isAllDataPresent: any) => {
        if (isAllDataPresent) {
            setPurchaseJournelData({ ...data });
        } else {
            setPurchaseJournelData({});
        }
    }
    const processPayments = (data: any)=>{
        invoiceIds.forEach( invId => {
            invoiceData.map((record: any) => {
                if (parseInt(record.InvoiceHeader.Id) === parseInt(invId)) {
                    let r = [] as any;
                    let r2 = [] as any;
                    const k = {} as any;
                    const em = {} as any;
                    r = consigneeNamesList;
                    r2 = invoiceRecords;
                    k[record.InvoiceHeader.ConsigneeName.trim()] =  {amt:record.InvoiceHeader.TotalAmount, invoiceInfo:record}
                    em[record.InvoiceHeader.ConsigneeName.trim()] =  record
                    r.push(k);
                    r2.push(em);
                    setinvoiceRecords(r2);
                    setCnames(r);
                }
            });
            
        });
    
        dispatch(processQueue({invoiceIds:invoiceIds, invoiceAmounts: JSON.stringify(consigneeNamesList)}))
        
        // localStorage.removeItem("invIds");
        // localStorage.removeItem("invoices");
        // localStorage.removeItem("invoiceInformation");
        // localStorage.setItem("invIds",invoiceIds.join(","));
        // localStorage.setItem("invoices",JSON.stringify(consigneeNamesList));
        invoiceIds.forEach( invId => {
            invoiceData.map((record: any) => {
                if (parseInt(record.InvoiceHeader.Id) === parseInt(invId)) {
                    record.InvoiceHeader.InvoiceStatus = 66; //65 - Pending, 66 - Paid
                    record.InvoiceHeader.isActive = record.InvoiceHeader.IsActive === 1 ? true : false ; //65 - Pending, 66 - Paid
                    const processData = { InvoiceDetail: record.InvoiceHeader, PickUpStop: record.InvoicePickupStops, Charges: record.InvoiceCharges };
                    const boolItems = ['IsActive','IsDeleted','HasExtraPickNStop'];
                    
                    boolItems.forEach( objName =>{
                        if( processData.InvoiceDetail[objName] ){
                            processData.InvoiceDetail[objName] = record.InvoiceHeader[objName] === 1 ? true : false; 
                        }
                        if( Array.isArray(processData.PickUpStop) ){
                            processData.PickUpStop.forEach((pickupItem: any, pickKey: any) => {
                                processData.PickUpStop[pickKey][objName] = record.InvoicePickupStops[pickKey][objName] === 1 ? true : false; 
                            });
                        }
                        else if(  processData.PickUpStop != undefined && processData.PickUpStop[objName] ){
                            processData.PickUpStop[objName] = record.InvoicePickupStops[objName] === 1 ? true : false; 
                        }

                        if( Array.isArray(processData.Charges) ){
                            processData.Charges.forEach((pickupItem: any, pickKey: any) => {
                                processData.Charges[pickKey][objName] = record.InvoiceCharges[pickKey][objName] === 1 ? true : false; 
                            });
                        }
                        else if( processData.Charges != undefined && processData.Charges[objName] ){
                            processData.Charges[objName] = record.InvoiceCharges[objName] === 1 ? true : false; 
                        }
                    });
                    const objArr = ['Pickup_Address','Customer_Address', 'Consignee_Address', 'Pickup_Bill_To_Address', 'Customer_Bill_To_Address'];
                    objArr.forEach(oName =>{
                        if( Array.isArray(processData.InvoiceDetail[oName]) ){
                            processData.InvoiceDetail[oName].forEach(( addr: any, addrKey: any) => {
                                //IsActive
                                processData.InvoiceDetail[oName][addrKey].IsActive = processData.InvoiceDetail[oName][addrKey].IsActive === 1 ? true : false; 
                                processData.InvoiceDetail[oName][addrKey].IsDeleted = processData.InvoiceDetail[oName][addrKey].IsDeleted === 1 ? true : false; 
                                if( processData.InvoiceDetail[oName][addrKey].HasExtraPickNStop != undefined)
                                processData.InvoiceDetail[oName][addrKey].HasExtraPickNStop = processData.InvoiceDetail[oName][addrKey].HasExtraPickNStop === 1 ? true : false; 
                            });
                        }
                    })
                    processData.InvoiceDetail.IsActive = processData.InvoiceDetail.IsActive === 1 ? true : false; 
                    processData.InvoiceDetail.IsDeleted = processData.InvoiceDetail.IsDeleted === 1 ? true : false; 
                    if( processData.InvoiceDetail.HasExtraPickNStop != undefined)
                        processData.InvoiceDetail.HasExtraPickNStop = processData.InvoiceDetail.HasExtraPickNStop === 1 ? true : false; 
                
                   dispatch(updateInvoiceRequest(processData));
                }
            })
        });
        setTimeout( async ()=>{
            getInvoiceHandler(0);
            const eventId = pathName === 'accounts_payable' ? 271 : (pathName === 'accounts_receivables' ? 272 : null );
            // if( eventId != null){
            //     const invoiceDetails = JSON.parse(
            //         localStorage.getItem("invoices") || "[]"
            //       );
            //     await checkEmailTemplate({id:eventId, subject:"", body: "Invoice <>"},"email@jh.ll", "hi");
            // }

            if(eventId === 271){
                localStorage.setItem("type",'AP');
                // window.open("/check_pdf","_blank","height=600,width=1000");
                setPdfType('check')
            }
            else if(eventId === 272){
                localStorage.setItem("type",'AR');
                setPdfType('invoice')
                // window.open("/invoice_pdf","_blank");
            }
            
        },1000)
        
    };  

    const exportToIIf = () =>{
        quickbookData.push('ENDTRNS')
        const tsvRows = quickbookData.join('\n')
        const currentdate = new Date(); 
        const iffFileName = "Quickbook-Export-" + currentdate.getDate() + "-"+ (currentdate.getMonth()+1)  + "-" + currentdate.getFullYear() + "T"+ currentdate.getHours() + "-" + currentdate.getMinutes() + "-" + currentdate.getSeconds();

        downloadQuickbooksFile(iffFileName+".iif",tsvRows)
        // downloadQuickbooksFile("quickbook-export-"++".iif",tsvRows)
    }

    const downloadQuickbooksFile = (filename:any, tsvRows:any) => {
        const element = document.createElement('a');
        // element.setAttribute('href', 'data:text/tab-separated-values,' + encodeURIComponent(tsvRows));
        element.setAttribute('href', 'data:text/tab-separated-values,' + tsvRows);
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);    
        element.click();
        document.body.removeChild(element);
      }
    
    
    const goBack = () =>{
        setPdfType('');
        setInvoiceId([])
        setCnames([])
        setIsDisabled(true)
    }

    return (
        <>
            {
                !accordion && PdfType==='invoice'?
                    <>
                        <PageContent>
                        <InvoicePDF goBack={goBack} />
                    </PageContent>
                    </>
                : !accordion && PdfType === 'check' ?
                    <>
                        <PageContent>
                        
                        <CheckPDF  goBack={goBack} />
                        </PageContent>
                        </>
                :
                ''
            }
            {!accordion && PdfType === ''?
                (<PageContent>
                    <BoxHead title={`${pageTitle[pathName]} Listing`} />
                    {
                    <BoxBody className="Invoiceapar">
                        <BS.Row className="mb-3">
                            <div className="d-flex justify-content-end text-right color-highlight invoice-accounts-add">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    onClick={() => addPurchaseRecordHandler()}
                                />
                                <span className="mr-3" onClick={() => addPurchaseRecordHandler()}>&nbsp;Add {pathName ==='accounts_payable' ? 'Purchase' : 'Invoice'}  Journal  </span>

                                <FontAwesomeIcon
                                    icon={faPlus}
                                    onClick={() => addRecordHandler()}
                                />
                                <span onClick={() => addRecordHandler()}>&nbsp;Add {text}</span>

                                {
                                pathName ==='accounts_payable' ? ''
                                :
                                <>             
                                &nbsp;&nbsp;&nbsp;                   
                                <FontAwesomeIcon
                                    icon={faFileDownload}
                                    onClick={() => exportToIIf()}
                                />
                                <span onClick={() => exportToIIf()}>&nbsp;Export Quickbook File</span>
                                </>

                            }
                            </div>
                            
                          
                        </BS.Row>
                        <BS.Row className="inv-listings-data">
                            <CustomTableContainer
                                title={""}
                                columns={cols}
                                data={invoiceProcessData}
                                options={true}
                                downloadFileName={pageTitle[pathName] + ".csv"}
                            />
                            <div>
                        <div className="mt-3">
                           <div className="d-flex justify-content-end">
                        <BS.Button 
                            className="float-right"
                            onClick={processPayments}
                            disabled={isDisabled}
                            >
                            
                            Process
                        </BS.Button>
                        </div>
                        </div>
                        </div>
                        </BS.Row>

                    </BoxBody>
                        
                    }
                </PageContent>)
                : accordion
                }
            {accordion && editDataInfo && (
                <AccordionLayout
                    header={`${pageTitle[pathName]} Entry`}
                    editData={editDataInfo}
                    edit={edit}
                    isDelete={isDelete}
                    onCancel={showAccordion}
                    onDeleteRecord={onDeleteRecord}
                    formData={formData}
                    setInvoiceFormData={setAllFormData}
                    isSubmit={onSubmitFormData}
                    isLoading={isLoading}
                    stores={stores}
                    carriers={carriers}
                    view={view}
                    pathName={pathName}
                />
            )
            }
            {deletePopup && (
                <DeleteModal
                    show={deletePopup}
                    handleClose={modalShowCloseHandler}
                    onDeleteData={onDeleteInvoiceHandler}
                />
            )}
            {
                showPurchasePopup && (
                    <Modal id="purchasejournal"
                        size="lg"
                        show={showPurchasePopup}
                        onHide={() => addPurchaseRecordHandler()}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                            {pathName === 'accounts_payable' ? 'Purchase': 'Invoice'} Journal Entry
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="invoice-journal">
                            <PurchaseJournalForm proNumberDataList={proNumberDataList}
                                values={purchaseJournelData}
                                isEdit={pjEdit}
                                isView={pjView}
                                editId={pjEditId}
                                onChangeInputData={onChangeInputPurchaseJournal}
                                pjfor={pathName === "accounts_receivables" ? 'AR' : 'AP'}
                                LastNumber={purchaseJLastNumber}
                                disabled={addPurchaseJournalRequestInProgress ? true : false} 
                                vendorNames={vendorNames} 
                                pathName={pathName}
                                payToNames={payToNames} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btn-md-w" disabled={addPurchaseJournalRequestInProgress ? true : false} variant="secondary" onClick={() => addPurchaseRecordHandler(false)}>
                                Cancel
                            </Button>
                            <Button
                                className="btn-md-w"
                                variant="primary"
                                disabled={doSave === true ? false : pjView ? true :  Object.keys(purchaseJournelData)?.length > 0 ? false : true}
                                onClick={() => addPurchaseRecordHandler(true)}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
            {deletePJPopup && (
                <DeleteModal
                    show={deletePJPopup}
                    handleClose={modalShowCloseHandler}
                    onDeleteData={onDeletePurchaseHandler}
                />
            )}

        </>
    );

};

export default Invoice;
