import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Accordion, Button, Modal } from 'react-bootstrap';
import BasicDetails from "./Forms/BasicDetails";
import InvoicePickUp from "./Forms/InvoicePickup";
import InvoiceCharges from "./Forms/InvoiceCharges";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InvoiceFormProps, invoiceFormValues } from "../../interfaces/invoiceTypeProps";
import { InvoiceChargesInitalValue, invoiceDefaultInitialValues, InvoicePickupStopsInitalValue, PageContent } from "../../utilities/common";
import InvoicePickUpStopColumn from "../../columns/InvoicePickUpStopColumn";
import InvoiceChargesColumn from "../../columns/InvoiceChargesColumn";
import InvoiceChargesEntryForm from "./Forms/InvoiceChargesEntryForm";

import { fetchLookupRequest } from "../../actions/lookupDataActions";
import { getLookupDetails } from "../../reducers/lookupReducer";
import InvoicePickUpStopEntryForm from "./Forms/InvoicePickUpStopEntryForm";
import InvoicePayToForm from "./Forms/InvoicePayToForm";
import { getFuelPriceHistory, getInvoiceRatesByCustId, getFuelSurchargeAdjustment } from "../../services/common.service";
import DeleteModal from "../common/DeleteModal";
import { toast } from "react-toastify";
import * as BS from "react-bootstrap";
import { EditTwoTone } from "@material-ui/icons";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

let custRates = [] as any
const AccordionLayout = ({
    header,
    editData,
    edit,
    isDelete,
    onDeleteRecord,
    formData,
    setInvoiceFormData,
    isSubmit,
    isLoading,
    onCancel,
    stores,
    carriers,
    view,
    pathName
}: InvoiceFormProps): JSX.Element => {
    const dispatch = useDispatch();
    const [showpickUpPopup, setShowPickUpPopup] = useState(false);
    const [chargesAddPopup, setChargesAddPopup] = useState(false);
    const [paytoAddPopup, setPaytoAddPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

    const [deletePickUpPopup, setDeletePickUpPopup] = useState(false);
    const [deletePickUpId, setDeletePickUpId] = useState(0);
    const [commonInitialValues, setCommonInitialValues] = useState(invoiceDefaultInitialValues);
    const [invoicePickUpStop, setInvoicePickUpStop] = useState<any>([]);
    const [invoiceDelPickUpStop, setInvoiceDelPickUpStop] = useState<any>([]);
    const [invoiceCharges, setInvoiceCharges] = useState<any>([]);
    const [invoiceDelCharges, setInvoiceDelCharges] = useState<any>([]);

    const [pickUpColumns, setPickUpColumns] = useState([]);
    const [validation, setValidation] = useState();
    const [storesData, setStoresData] = useState([]);
    const [currentDcInfoData, setCurrentDcInfoData] = useState({});
    const [removeId, setRemoveId] = useState(0);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [sortedContacts, setSortedContacts] = useState([]);
    const [FirstDeliveryDate, setFirstDeliveryDate] = useState<any>(null);
    const [localStoreData, setLocalStoreData] = useState<any>(null);
    const [rateTypes, setRateType] = useState<any>([]);
    const [chargeTypes, setChargesType] = useState<any>([]);
    const [invoiceAPLastNumber, setInvoiceAPLastNumber] = useState<any>([]);
    const [invoiceARLastNumber, setInvoiceARLastNumber] = useState<any>([]);
    const [pgLastNumber, setPgLastNumber] = useState<any>([]);
    const [uomTypes, setUomTypes] = useState<any>([]);
    const [addressType, setAddressType] = useState<any>([]);
    const [sectionTypes, setsectionType] = useState<any>([]);
    const [chargesEntry, setChargesEntry] = useState<any>([]);
    const [pickStopEntry, setPickStopEntry] = useState<any>([]);
    const [invoiceId, setInvoiceId] = useState(0);
    const [invoicePaidStatus, setInvoicePaidStatus] = useState("Pending");
    const [hasPickUpChecked, setHasPickUpChecked] = useState(false);
    const [custRatesDetails, setCustRatesDetails] = useState<any>([]);
    const [customersId, setCustomersId] = useState(0);
    const [fuelHistory, setFuelHistory] = useState<any>([]);
    const [fuelDateSurcharge, setFuelDateSurcharge] = useState<any>([]);
    const [totalAmount, setTotalAmount] = useState(0);

    ///Use Callback to get the data from the store

    useEffect(() => {
        getLookups();
        setIsLoad(false);
        setInvoiceId(editData.InvoiceHeader === undefined ? 0
            : editData.InvoiceHeader.Id);
        setInvoicePaidStatus(editData.InvoiceHeader === undefined ? "Pending" : editData.InvoiceHeader.InvoiceStatus === 65 ? "Pending" : "Paid");
        setCustomersId(editData.InvoiceHeader === undefined ? 0 : editData.InvoiceHeader.Customer_Address_Id !== undefined ? editData.InvoiceHeader.Customer_Address[0].Entity_Id : 0);
    }, []);

    const getLookups = () => {
        dispatch(fetchLookupRequest({}));
    }

    const lookupsData = useSelector(getLookupDetails);
    useEffect(() => {
        if (lookupsData.length > 0) {
            const AddressType = lookupsData.filter((rate: any) => rate.type === "Address_Type");
            const rateType = lookupsData.filter((rate: any) => rate.type === "Rate_type");
            const chargeType = lookupsData.filter((rate: any) => rate.type === "Charges_type");
            const sectionType = lookupsData.filter((rate: any) => rate.type === "Section_type");
            const UOMTpye = lookupsData.filter((rate: any) => rate.type === "UOM_type");
            const APInvoiceNumber = lookupsData.filter((rate: any) => rate.type === "AP_Last_Invoice_No");
            const ARInvoiceNumber = lookupsData.filter((rate: any) => rate.type === "AR_Last_Invoice_No");
            const PGAPARNumber = lookupsData.filter((rate: any) => rate.type === "PG_APAR_Last_Invoice");
            setRateType(rateType);
            setChargesType(chargeType);
            setsectionType(sectionType);
            setUomTypes(UOMTpye);
            setAddressType(AddressType);
            setInvoiceAPLastNumber(APInvoiceNumber);
            setInvoiceARLastNumber(ARInvoiceNumber);
            setPgLastNumber(PGAPARNumber);
        }
    }, [lookupsData]);


    useEffect(() => {
        if (sectionTypes.length > 0) {
            setInitialValues();
        }
    }, [sectionTypes]);

    const onFormKeyChange = (values: any) => {
        Object.assign(values, { stores: storesData.length > 0 ? storesData : localStoreData, FirstDeliveryDate: FirstDeliveryDate })
    }

    ///Set Intial Values for the object

    const setInitialValues = (): any => {

        if (editData.InvoiceHeader !== undefined) {
            setCommonInitialValues({
                ...editData.InvoiceHeader,
            });

            editData.InvoiceHeader.HasExtraPickNStop === 1 ? setHasPickUpChecked(true) : setHasPickUpChecked(false);

            const pickupList: any[] = [];
            editData.InvoicePickupStops && editData.InvoicePickupStops.length > 0 ?
                editData.InvoicePickupStops.filter((c: any) => (c.IsActive === 1 || c.IsActive === true) && (c.IsDeleted === 0 || c.IsDeleted === false)).map((pickup: any) => {
                    Object.assign(pickup, { isNewRecord: false });
                    Object.assign(pickup, { InvoiceStatus: invoicePaidStatus });
                    Object.assign(pickup, { InvoiceViewMode: view });
                    // pickup.IsActive === 1 ? pickup.IsActive = true : pickup.IsActive = false;
                    // pickup.IsDeleted === 1 ? pickup.IsDeleted = true : pickup.IsDeleted = false;
                    pickupList.push(pickup);
                }) : null;
            setInvoicePickUpStop(pickupList);
            ///Set Invoice Charges Details

            const chargesList: any[] = [];
            editData.InvoiceCharges && editData.InvoiceCharges.length > 0 ?
                editData.InvoiceCharges.filter((c: any) => (c.IsActive === 1 || c.IsActive === true) && (c.IsDeleted === 0 || c.IsDeleted === false)).map((charges: any) => {
                    const chargeName = sectionTypes.filter((rate: any) => rate.id === parseInt(charges.Charge_Id));
                    const UOMName = uomTypes.filter((rate: any) => rate.id === parseInt(charges.UOM));
                    charges.Amount = charges.Amount === null ? 0.00 : parseFloat(charges.Amount.toFixed(2));
                    Object.assign(charges, { Charge_Name: chargeName[0].displayText });
                    Object.assign(charges, { UOM_Name: UOMName.length > 0 ? UOMName[0].displayText : "" });
                    Object.assign(charges, { InvoiceStatus: invoicePaidStatus });
                    Object.assign(charges, { Invoice_Charged_Min_Rate: 0 });
                    Object.assign(charges, { Invoice_Charged_Max_Rate: 0 });
                    // charges.IsActive === 1 ? Object.assign(charges, { IsActive: true }) : Object.assign(charges, { IsActive: false });
                    // charges.IsDeleted === 1 ? Object.assign(charges, { IsDeleted: true }) : Object.assign(charges, { IsDeleted: false });
                    charges.Charged_Per_Rate === undefined ? Object.assign(charges, { Charged_Per_Rate: 0 }) : charges.Charged_Per_Rate;
                    Object.assign(charges, { Invoice_Calculate_Price: 0 });
                    Object.assign(charges, { InvoiceViewMode: view });
                    Object.assign(charges, { isNewRecord: false });
                    chargesList.push(charges);
                }) : null;


            editData.InvoiceCharges && chargesList.length > 0 ? setInvoiceCharges(chargesList) : null;
            setIsLoad(true);
        } else {
            if (!edit && !view) {
                setIsLoad(true);
            }
        }
    }

    /**
     * Add Invoice Pickup Stops which are fetched from the Pickup Stops Entry Form
    */
    const AddPickStopToGrid = (data: any, isEdit: any): void => {
        let isExist = false;
        if (data.Id === 0) {
            data.Id = invoicePickUpStop ? invoicePickUpStop.length + 99 : 1;
        }
        let tempInvoiceStopPick: any = [];
        invoicePickUpStop && invoicePickUpStop.length > 0 ?
            tempInvoiceStopPick = [...invoicePickUpStop] : null;
        tempInvoiceStopPick.forEach((element: any) => {
            if (element.Id === data.Id) {
                isExist = true;
                element.Id = data.Id;
                element.Address = data.Address;
                element.City = data.City;
                element.State = data.State;
                element.ZipCode = data.ZipCode;
                element.pickStop = data.pickStop;
                element.ExtraSequence = data.ExtraSequence;
                element.ReferenceNumber = data.ReferenceNumber;
                element.InvoiceStatus = invoicePaidStatus;
                element.isNewRecord = data.isNewRecord;
                element.Invoice_Id = data.Invoice_Id;
                element.IsActive = data.IsActive;
                element.IsDeleted = data.IsDeleted;
                element.InvoiceViewMode = view;
            }
        });
        if (!isExist) {
            Object.assign(data, { InvoiceStatus: invoicePaidStatus });
            Object.assign(data, { InvoiceViewMode: view });
            tempInvoiceStopPick.push({ ...data });
        }

        setInvoicePickUpStop(tempInvoiceStopPick);
        ShowStopPopup();
    };

    /** 
     * Showing the Invoice Pickup Popup
    */
    const showPickUpStop = (data: any, isDeleted = false): void => {

        if (!view) {
            setDeletePickUpPopup(isDeleted);
            if (!isDeleted) {
                if (invoicePickUpStop && invoicePickUpStop.length > 0) {
                    for (let index = 0; index < invoicePickUpStop.length; index++) {
                        const element = invoicePickUpStop[index];
                        if (element.Id === data) {
                            element.isNewRecord = false;
                            setPickStopEntry(element);
                            ShowPickUpUpPop();
                        }
                    }
                }
            } else {
                setDeletePickUpId(data);
            }
        }

    };

    /**
     * Initalizing the Invoice Pickup Stop Columns
     */
    let pickupStopsCols: any = [];
    pickupStopsCols = InvoicePickUpStopColumn({ showPickUpStop });



    /**
     * Delete Invoice PickUp Stop Record
    */
    const onDeleteInvoicePickUpHandler = () => {
        //calling Dispatch method
        document.body.classList.add("api-loading");
        //dispatch(deleteNotificationTemplateRequest(editDataInfo));
        if (invoicePickUpStop && invoicePickUpStop.length > 0) {
            const invoPcikUpStop = invoicePickUpStop.filter((element: any) => element.Id !== deletePickUpId);
            setInvoicePickUpStop(invoPcikUpStop);
        }
        if (invoicePickUpStop && invoicePickUpStop.length > 0) {
            const invopickupStop = invoicePickUpStop.filter((element: any) => element.Id === deletePickUpId);

            const tempinvoiceDelPickUpStop = [...invoiceDelPickUpStop, ...invopickupStop];
            setInvoiceDelPickUpStop(tempinvoiceDelPickUpStop);
        }

        document.body.classList.remove("api-loading");
        setDeletePickUpPopup(false);
    };



    /***
     * Adding Invoice Charges which are fetched from the Chanrges Entry Form
     */
    const AddInvoiceChargesToGrid = (data: any): void => {
        let isExist = false;
        let totAmt = 0.00;
        if (data.Id === 0) {
            data.Id = data.Charge_Id; //invoiceCharges.length + 99 : 1;
        }
        // eslint-disable-next-line prefer-const
        let tempInvoiceCharges: any = [];
        invoiceCharges && invoiceCharges.length > 0 ?
            tempInvoiceCharges = [...invoiceCharges] : null;

        tempInvoiceCharges.forEach((element: any) => {
            const chargeName = sectionTypes.filter((rate: any) => parseInt(rate.id) === parseInt(data.Charge_Id));
            const UOMName = uomTypes.filter((rate: any) => parseInt(rate.id) === parseInt(data.UOM));
            if (element.Id === data.Id) {
                isExist = true;
                element.Id = data.Id;
                element.Amount = data.Amount;
                element.Charge_Id = data.Charge_Id;
                element.Charge_Name = chargeName.length > 0 ? chargeName[0].displayText : '';
                element.Invoice_Description = data.Invoice_Description;
                element.Quantity = data.Quantity;
                element.Rate_Type_Id = data.Rate_Type_Id;
                element.UOM = data.UOM;
                element.UOM_Name = UOMName.length > 0 ? UOMName[0].displayText : "";
                element.InvoiceStatus = invoicePaidStatus;
                element.isNewRecord = data.isNewRecord;
                element.Invoice_Id = data.Invoice_Id;
                element.Invoice_Charged_Min_Rate = data.Invoice_Charged_Min_Rate;
                element.Invoice_Charged_Max_Rate = data.Invoice_Charged_Max_Rate;
                element.Charged_Per_Rate = data.Charged_Per_Rate;
                element.Invoice_Calculate_Price = data.Invoice_Calculate_Price;
                element.InvoiceViewMode = view;
                element.IsActive = data.IsActive;
                element.IsDeleted = data.IsDeleted;
            }
        });

        if (!isExist) {
            let FuelChargeNameExist = false;
            Object.assign(data, { InvoiceViewMode: view });
            tempInvoiceCharges.push({ ...data });
            invoiceCharges.forEach((invEle: any) => {
                if (invEle.Charge_Name === "FuelSurcharge") {
                    FuelChargeNameExist = true;
                }
            });
            if (!FuelChargeNameExist) {
                if (data.Charge_Name === "DeliveryCharges") {
                    const FuelchargeName = sectionTypes.filter((rate: any) => rate.displayText === "FuelSurcharge");
                    const FuelChargeTypesDet = chargeTypes.filter((rate: any) => rate.value === "FuelSurcharge");
                    const fuelSurcharge = data;
                    fuelSurcharge.Id = FuelchargeName[0].id;
                    fuelSurcharge.Charge_Id = FuelchargeName[0].id;
                    fuelSurcharge.Charge_Name = FuelchargeName[0].displayText;
                    fuelSurcharge.Invoice_Description = FuelChargeTypesDet[0].displayText;

                    if (fuelHistory !== null && fuelHistory !== undefined) {
                        const d = fuelDateSurcharge.length > 0 ? fuelDateSurcharge[0].fscPercent : 0;
                        fuelSurcharge.Amount = (data.Amount * d / 100).toFixed(2);
                        fuelSurcharge.Charged_Per_Rate = d.toFixed(2);
                        fuelSurcharge.Invoice_Calculate_Price = (data.Amount * d / 100).toFixed(2);
                    }
                    tempInvoiceCharges.push({ ...fuelSurcharge });
                }
            }
        }
        setInvoiceCharges(tempInvoiceCharges);
        tempInvoiceCharges.forEach((totEle: any) => {
            totAmt += parseFloat(totEle.Amount);
        });
        setTotalAmount(totAmt);
        ShowchargesPopup();
    };

    /** 
     * Showing the Invoice Charges Popup
    */
    const showCharges = (data: any, isDeleted = false): void => {
        if (!view) {
            setDeletePopup(isDeleted);
            if (!isDeleted) {
                if (invoiceCharges && invoiceCharges.length > 0) {
                    for (let index = 0; index < invoiceCharges.length; index++) {
                        const element = invoiceCharges[index];
                        if (element.Id === data) {
                            element.isNewRecord = false;
                            setChargesEntry(element);
                            ShowchargesPopup();
                        }
                    }
                }
            } else {
                setDeleteId(data);
            }
        }
        // else {
        //     toast.error("You can't add or edit the record in view mode.");
        // }
    };


    /***
     * Add Charges Handler
    */
    const addChargesHandler = () => {
        if (!view) {
            if (invoicePaidStatus === "Paid") {
                toast.error("Invoice is already paid, you can not add charges.", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                setChargesEntry([]);
                setChargesAddPopup(!chargesAddPopup);
            }
        }
        // else {
        //     toast.error("You can't add or edit the record in view mode.");
        // }

    };
    /***
     * Add PayTo Handler
    */
    const addPaytoHandler = () => {
        setPaytoAddPopup(true);
        if (!view) {
            if (invoicePaidStatus === "Paid") {
                toast.error("Invoice is already paid, you can not add charges.", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
               // setPaytoEntry([]);
                // setPaytoAddPopup(!payToAddPopup);
            }
        }
        // else {
        //     toast.error("You can't add or edit the record in view mode.");
        // }

    };

    /**
     * 
    */
    let chargesCols: any = [];
    chargesCols = InvoiceChargesColumn({ showCharges, edit });

    /***
     * Show Charges Popup
     */
    const ShowchargesPopup = (): void => {
        setChargesAddPopup(!chargesAddPopup);
    };
    
    const ShowPTPopup = (val:any): void => {
        setPaytoAddPopup(val);
    };

    const ShowPickUpUpPop = (): void => {
        setShowPickUpPopup(!showpickUpPopup);
    };

    /** 
     * Showing the Invoice PickUp Stop Popup
    */
    const ShowStopPopup = (): void => {

        if (!view) {
            if (invoicePaidStatus === "Paid") {
                toast.error("Invoice is already paid, you can not add stop.", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                if (hasPickUpChecked) {
                    setPickStopEntry([]);
                    ShowPickUpUpPop()
                }
                else {
                    toast.error("Please tick HasPickupStop to Add Stop.", {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        }
        // else {
        //     toast.error("You can't add or edit the record in view mode.");
        // }
    };


    /**
     * 
     * @param value 
     */
    const onCustomerChangeForRate = (value: any) => {
        setCustomersId(value);
    }

    useEffect(() => {
        if (customersId > 0) {
            getList();
            getFuelHistory();
            getFuelSurcharge();
        }
    }, [customersId]);


    const getList = (): any => {
        getInvoiceRatesByCustId(customersId).then((res: any) => {
            setCustRatesDetails(res);
            custRates = res
        }).catch((err: any) => { console.log(err) });
    }

    const getFuelHistory = (): any => {
        getFuelPriceHistory().then((res: any) => {

            setFuelHistory(res);
        }).catch((err: any) => { console.log(err) });
    }

    const getFuelSurcharge = (): any => {
        getFuelSurchargeAdjustment(fuelHistory).then((res: any) => {
            setFuelDateSurcharge(res);
        }).catch((err: any) => { console.log(err) });
    }

    /**
     * Delete Charges Record
    */
    const onDeleteInvoiceChargesHandler = () => {
        //calling Dispatch method
        document.body.classList.add("api-loading");
        //dispatch(deleteNotificationTemplateRequest(editDataInfo));
        if (invoiceCharges && invoiceCharges.length > 0) {
            const invoCharge = invoiceCharges.filter((element: any) => element.Id !== deleteId);
            setInvoiceCharges(invoCharge);
        }
        if (invoiceCharges && invoiceCharges.length > 0) {
            const invoCharge = invoiceCharges.filter((element: any) => element.Id === deleteId);

            const tempInvoiceDelCharges = [...invoiceDelCharges, ...invoCharge];
            setInvoiceDelCharges(tempInvoiceDelCharges);
        }

        document.body.classList.remove("api-loading");
        setDeletePopup(false);
    };

    /***
     * Modal Close Handler
     */
    const modalShowCloseHandler = () => {
        setDeletePopup(false);
        setDeletePickUpPopup(false);
    };

    ///Submit Invoice Details to Server
    const onFormSubmitData = (data: any, resetForm: () => void): void => {
        invoicePickUpStop.forEach((element: any) => {
            if (element.isNewRecord) {
                element.Id = 0;
                Object.assign(element, { CreatedBy: 1 });
                Object.assign(element, { CreatedDt: new Date().toISOString() });
            }
            Object.assign(element, { IsActive: true });
            Object.assign(element, { IsDeleted: false });
            Object.assign(element, { ModifiedBy: 1 });
            Object.assign(element, { ModifiedDt: new Date().toISOString() });
        });
        invoiceDelPickUpStop.forEach((element: any) => {
            if (element.Id > 0 && !element.isNewRecord) {
                element.IsDeleted = true;
                element.IsActive = false;
                Object.assign(element, { ModifiedBy: 1 });
                Object.assign(element, { ModifiedDt: new Date().toISOString() });
                invoicePickUpStop.push(element);
            }
        });

        const totAmt = invoiceCharges.length > 0 ? invoiceCharges.map((element: any) => parseFloat(element.Amount)).reduce((a: any, b: any) => a + b) : 0;

        data.TotalAmount = totAmt;
        data.IsActive = true;
        data.IsDeleted = false;
        if (data.HasExtraPickNStop === 0 || data.HasExtraPickNStop === 1 || data.HasExtraPickNStop === "") {
            data.HasExtraPickNStop = data.HasExtraPickNStop === 1 ? true : false;
        }

        invoiceCharges.forEach((element: any) => {
            element.IsDeleted = false;
            element.IsActive = true;
            if (element.isNewRecord) {
                element.Id = 0;
                Object.assign(element, { CreatedBy: 1 });
                Object.assign(element, { CreatedDt: new Date().toISOString() });
            }
            Object.assign(element, { ModifiedBy: 1 });
            Object.assign(element, { ModifiedDt: new Date().toISOString() });
        });
        invoiceDelCharges.forEach((element: any) => {
            if (element.Id > 0 && element.isNewRecord === false) {
                element.IsDeleted = true;
                element.IsActive = false;
                Object.assign(element, { ModifiedBy: 1 });
                Object.assign(element, { ModifiedDt: new Date().toISOString() });
                invoiceCharges.push(element);
            }
        });


        if (data.Id === "") {
            Object.assign(data, { InvoiceType: pathName === "accounts_receivables" ? 'AR' : 'AP' });
            data.Id = 0;
            data.InvoiceStatus = 65;
            data.CreatedBy = 1;
            data.CreatedDt = new Date().toISOString();
        }
        else if (data.Id > 0) {
            data.InvoiceStatus = "65";
        }

        const payToData = {} as any
        payToData.Id = 0
        payToData.InvoiceId = data.Id
        payToData.Name = data.invoiceTo_contactName
        payToData.address = data.invoiceTo_address
        payToData.address2 = data.invoiceTo_address2
        payToData.city = data.invoiceTo_city
        payToData.state = data.invoiceTo_state
        payToData.zipcode = data.invoiceTo_zipCode ? data.invoiceTo_zipCode : 0
        payToData.phone = data.invoiceTo_phone ? data.invoiceTo_phone : 0
        payToData.contactEmail = data.invoiceTo_contactEmail
        payToData.contactPhone = data.invoiceTo_contactPhone
        payToData.createdBy = 0
        payToData.createdDt = new Date().toISOString()

        const processData = { InvoiceDetail: data, PickUpStop: invoicePickUpStop, Charges: invoiceCharges, payto:payToData }

        
        setInvoiceFormData(processData);
        //setShowPopup(false);
        if (edit) {
            isSubmit(true, data);
        } else {
            isSubmit(false, data);
        }

    }

    const onCancelHandler = () => {
        onCancel()
    }

    const pickupTooltip = (props: any) => {
        return (
            <Tooltip id="button-tooltip"  {...props}>You can&apos;t add / edit  the Invoice Pickup Stop in view mode.
            </Tooltip>
        );
    }

    const chargeTooltip = (props: any) => {
        return (
            <Tooltip  {...props}>You can&apos;t add / edit  the Invoice Pickup Stop in view mode.
            </Tooltip>
        );
    }

    const validationSchemaAPAR = () =>{
         
        if(pathName==='accounts_payable'){
            return Yup.object().shape({
                    ProNumber: Yup.string().required("Pro Number is required"),
                    ShipDate: Yup.date().required("Ship Date is required"),
                    DeliveryDate: Yup.date().required("Invoice Date is required"),
                    InvoiceDate: Yup.date().required("Invoice Date is required"),
                    DueDate: Yup.date().required("Invoice Date is required"),
                    ShipmentType: Yup.string().required("Shipment Type is required"),
                    ConsigneeName: Yup.string().required("Consignee Name is required"),
                    PickUpName: Yup.string().required("Pickup Name is required"),
                    TrailerNumber: Yup.string()
                        .required("Trailer Number is required")
                        .nullable(),
                })
        }
        else if(pathName === 'accounts_receivables'){
            return Yup.object().shape({
                    ProNumber: Yup.string().required("Pro Number is required"),
                    ShipDate: Yup.date().required("Ship Date is required"),
                    DeliveryDate: Yup.date().required("Invoice Date is required"),
                    InvoiceDate: Yup.date().required("Invoice Date is required"),
                    DueDate: Yup.date().required("Invoice Date is required"),
                    ShipmentType: Yup.string().required("Shipment Type is required"),
                    CustomerName: Yup.string().required("Customer Name is required"),
                    ConsigneeName: Yup.string().required("Consignee Name is required"),
                    // PickUpName: Yup.string().required("Pickup Name is required"),
                    TrailerNumber: Yup.string()
                        .required("Trailer Number is required")
                        .nullable(),
                })
        }
        
    }

    return (
        <>
            <PageContent>
                <Accordion defaultActiveKey="0">
                    {
                        !isLoad ? null : (
                            <Formik
                                initialValues={commonInitialValues}
                                initialErrors={commonInitialValues}
                                onSubmit={(values: any, actions) => {
                                    onFormSubmitData(values, actions.resetForm)
                                    setTimeout(() => {
                                        actions.setSubmitting(false)
                                    }, 500)
                                }}
                                validationSchema= {validationSchemaAPAR}
                                enableReinitialize
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
                                        setFieldValue,
                                        resetForm
                                    } = props
                                    //console.log("values", values);
                                    // console.log("errors", errors);
                                    // console.log("touched", touched);
                                    // console.log("isValid", isValid);
                                    // console.log("dirty", dirty);
                                    // console.log("setFieldValue", setFieldValue);
                                    // console.log("handleBlur", handleBlur);
                                    // console.log("handleChange", handleChange);

                                    return (
                                        <Form onKeyUp={() => onFormKeyChange(values)} autoComplete="off">
                                            <div className='show'>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header className="main-head">{header}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <Accordion defaultActiveKey="0">
                                                            <Accordion.Item eventKey="0">
                                                                <Accordion.Header>
                                                                    Basic Details
                                                                </Accordion.Header>
                                                                <Accordion.Body>
                                                                    <BasicDetails
                                                                        errors={errors}
                                                                        touched={touched}
                                                                        handleBlur={handleBlur}
                                                                        values={values}
                                                                        edit={edit}
                                                                        handleChange={handleChange}
                                                                        setFieldValue={setFieldValue}
                                                                        resetForm={resetForm}
                                                                        stores={stores}
                                                                        carriers={carriers}
                                                                        custRatesDetails={onCustomerChangeForRate}
                                                                        isDisabled={view ? true : invoicePaidStatus === "Paid"}
                                                                        pickupStopsChecked={setHasPickUpChecked}
                                                                        InvoiceChargesTotal={totalAmount}
                                                                        AddressTypeLookup={addressType}
                                                                        InvoiceAPLastNumber={invoiceAPLastNumber}
                                                                        InvoiceARLastNumber={invoiceARLastNumber}
                                                                        PathName={pathName}
                                                                        chargesTotal = {InvoiceCharges}
                                                                    />
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                            <Accordion.Item eventKey="1" className={'accordion-relative'}>
                                                                <Accordion.Header>Invoice Pickup Stops</Accordion.Header>

                                                                {
                                                                    (view) ?
                                                                        <OverlayTrigger
                                                                            placement="top"
                                                                            delay={{ show: 250, hide: 400 }}
                                                                            overlay={pickupTooltip}
                                                                        >
                                                                            <div className={'pull-right accordion-absolute'}
                                                                                onClick={() => ShowStopPopup()}>
                                                                                <FontAwesomeIcon icon={faPlus} />
                                                                                <span>Add a stop</span>
                                                                            </div>
                                                                        </OverlayTrigger>
                                                                        : <div className={'pull-right accordion-absolute'}
                                                                            onClick={() => ShowStopPopup()}>
                                                                            <FontAwesomeIcon icon={faPlus} />
                                                                            <span>Add a stop</span>
                                                                        </div>
                                                                }
                                                                <Accordion.Body>
                                                                    <InvoicePickUp
                                                                        columnData={pickupStopsCols}
                                                                        pickUpData={invoicePickUpStop}
                                                                    />
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                            <Accordion.Item eventKey="2" className={'accordion-relative'}>
                                                                <Accordion.Header>Invoice Charges</Accordion.Header>
                                                                {
                                                                    (view) ?
                                                                        <OverlayTrigger
                                                                            placement="top"
                                                                            delay={{ show: 250, hide: 400 }}
                                                                            overlay={chargeTooltip}
                                                                        >
                                                                            <div className={'pull-right accordion-absolute'}
                                                                                onClick={() => addChargesHandler()}>
                                                                                <FontAwesomeIcon icon={faPlus} />
                                                                                <span>Add Charges</span>
                                                                            </div>
                                                                        </OverlayTrigger>
                                                                        : <div className={'pull-right accordion-absolute'}
                                                                            onClick={() => addChargesHandler()}>
                                                                            <FontAwesomeIcon icon={faPlus} />
                                                                            <span>Add Charges</span>
                                                                        </div>
                                                                }

                                                                <Accordion.Body>
                                                                    <InvoiceCharges
                                                                        columnData={chargesCols}
                                                                        chargesData={invoiceCharges}
                                                                    />
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                            {/* //PayTo Added */}
                                                            <Accordion.Item eventKey="3" className={'accordion-relative'}>
                                                                <Accordion.Header>PayTo</Accordion.Header>
                                                                <Accordion.Body>
                                                                <InvoicePayToForm
                                                                    values={values}
                                                                    handleChange={handleChange}
                                                                    handleBlur={handleBlur}
                                                                    errors={errors}
                                                                    touched={touched}
                                                                    edit={edit}
                                                                    />
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                            {/* //PayTo Added */}
                                                        </Accordion>
                                                    </Accordion.Body>

                                                    <div className="d-flex justify-content-end invoice-entry-submit">
                                                        <BS.Button
                                                            className="btn-md-w mr-2"
                                                            variant="secondary"
                                                            onClick={() => { onCancelHandler() }}
                                                        >
                                                            Cancel
                                                        </BS.Button>
                                                        {
                                                            edit ?
                                                                <BS.Button
                                                                    type="submit"
                                                                    // onClick={ onUpdateData }
                                                                    className="btn btn-primary btn-md-w"
                                                                    disabled={Object.keys(errors).length > 0}
                                                                >
                                                                    Update
                                                                </BS.Button>
                                                                :

                                                                <BS.Button
                                                                    className="btn-md-w"
                                                                    variant="primary"
                                                                    disabled={!(dirty)} //isValid &&
                                                                    type="submit"
                                                                >
                                                                    Save
                                                                </BS.Button>
                                                        }
                                                    </div>
                                                </Accordion.Item>


                                            </div>

                                        </Form>
                                    )
                                }}
                            </Formik>
                        )
                    }
                </Accordion>
            </PageContent>

            <Modal id="ChargesEntryForm"
                size="lg"
                show={chargesAddPopup}
                onHide={() => ShowchargesPopup()}
                dialogClassName="modal-90w"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Invoice Charges
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InvoiceChargesEntryForm
                        showPopup={ShowchargesPopup}
                        setFormData={AddInvoiceChargesToGrid}
                        rateTypesLookup={rateTypes}
                        chargeTypesLookup={chargeTypes}
                        UOMLookup={uomTypes}
                        sectionTypesLookUp={sectionTypes}
                        InvoiceChargesEditRecord={chargesEntry}
                        InvoiceId={invoiceId}
                        chargesData={invoiceCharges} //Existing Record
                        customerRatesDetails={custRates} //All Charges
                        // customerRatesDetails={custRatesDetails} //All Charges
                    />
                </Modal.Body>

            </Modal>

            <Modal id="StopEntryForm"
                size="lg"
                show={showpickUpPopup}
                onHide={() => ShowStopPopup()}
                dialogClassName="modal-90w"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Invoice Pickup Stops
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InvoicePickUpStopEntryForm
                        showPopup={ShowStopPopup}
                        setFormData={AddPickStopToGrid}
                        invoicePickUpStopEditRecord={pickStopEntry}
                        InvoiceId={invoiceId}
                    />
                </Modal.Body>
            </Modal>
            {deletePopup && (
                <DeleteModal
                    show={deletePopup}
                    handleClose={modalShowCloseHandler}
                    onDeleteData={onDeleteInvoiceChargesHandler}
                />
            )}
            {
                deletePickUpPopup && (
                    <DeleteModal
                        show={deletePickUpPopup}
                        handleClose={modalShowCloseHandler}
                        onDeleteData={onDeleteInvoicePickUpHandler}
                    />
                )}
        </>
    )

};
export default AccordionLayout;