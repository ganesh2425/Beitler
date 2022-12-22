import React, {useEffect, useState} from 'react';
import RatesEntryForm from "./RatesEntryForm";
import {
    BoxBody,
    BoxHead,
    constructRatesData,
    PageContent,
    SearchContent,
    setRatesFormData
} from '../../utilities/common';
import {Button, Modal} from 'react-bootstrap';
import UploadRateForm from './Forms/UploadRates';
import DownloadRateForm from './Forms/DownloadRates';
import CustomTableContainer from "../../containers/CommonTableContainer";
import PerfectScrollbar from "react-perfect-scrollbar";
import rateslistingColumn from "./columns/RateslistingColumn";
// import data from '../../services/json/rateslisting.json'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {customerDetails} from "../../services/customerApi";
import {useDispatch, useSelector} from "react-redux";
import {getLookupDetails} from "../../reducers/lookupReducer";
import {getRateList, getRateSuccess} from "../../reducers/ratesReducer";
import {fetchRatesRequest, updateRatesRequest} from "../../actions/rateActions";
import {toast} from "react-toastify";
import DeleteModal from "../common/DeleteModal";
import {getCustomerDetails} from "../../reducers/customerReducer";
import {downloadTemplateFile} from "../../config/azureBlob";
import {API_SERVICE} from "../../services/commonApi";
import {API_URLS} from "../../utilities/api_url_constants";

const Rates = (): JSX.Element => {
    const dispatch = useDispatch();
    const [rates, setRates] = useState(false);
    const [modalRatesUpload, setUploadShowPopup] = useState(false);
    const [modalRatesDownload, setDownloadShowPopup] = useState(false);
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [carriers, setCarriers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [sectionType, setSectionType] = useState([]);
    const [fuelData, setFuelData] = useState([]);
    const [view, setView] = useState(false);
    const [editData, setEditData] = useState({
        rateTypesList: []
    });
    const [isDelete, setDelete] = useState(false);
    const [isUpdate, setUpdate] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [downloadRateFileName, setDownloadRateFileName] = useState('');
    const lookupsData = useSelector(getLookupDetails);
    const ratesList = useSelector(getRateList);
    const rateSuccess = useSelector(getRateSuccess);
    const customersList: any = useSelector(getCustomerDetails);

    useEffect(() => {
        if (rateSuccess &&
            rateSuccess.Message === "RatesMaster Created Successfully") {
            toast.success(`Added Successfully`);
        }
        if (isDelete && rateSuccess &&
            rateSuccess.Message === "RatesMaster Updated Successfully") {
            toast.success(`Deleted Successfully`);
            setDelete(false)
        }
        if (isUpdate && rateSuccess &&
            rateSuccess.Message === "RatesMaster Updated Successfully") {
            toast.success(`Updated Successfully`);
            setUpdate(false)
        }
        if (rateSuccess && rateSuccess.Message) {
            setUpdate(false)
            setDelete(false)
            getRatesDetails();
        }

    }, [rateSuccess])

    useEffect(() => {
        if (lookupsData) {
            const sectionType = lookupsData.filter((rate: any) => rate.type === "Section_type");
            setSectionType(sectionType)
        }
        if (ratesList) {
            const tempData: any = [];
            ratesList.length > 0 &&
                ratesList.map((rates: any) => {
                    tempData.push(rates.ratesMaster);
                });
            setData(tempData);
        }
        const tempData: any = [];
        if (customersList) {
            customersList.length > 0 &&
                customersList.map((customer: any) => {
                    tempData.push(customer.corporateoffice);
                });
            setCustomers(tempData);
        }
    }, [lookupsData, ratesList, customersList]);


    const ShowRatesEntry = (): void => {
        setRates(true);
        setEditData({
            rateTypesList: []
        });
        setUpdate(false)
    }
    const rateUpload = () => {
        setUploadShowPopup(true);
    }
    const rateDownload = () => {
        setDownloadShowPopup(true);
        const fileName = 'ratesData.xlsx'
         downloadTemplateFile(fileName)
    }

    const showData = (data: any, isDelete = false, view= false): void => {
        if (isDelete) {
            setDelete(isDelete);
            setDeletePopup(true);
            setEditDataInfo(data);
            setView(view)
        } else if (view) {
            setView(view);
            setUpdate(true);
            setDelete(isDelete);
            setEditDataInfo(data);
            setRates(true)
        } else {
            setUpdate(true);
            setDelete(isDelete);
            setEditDataInfo(data);
            setRates(true)
        }
    };
    const onUploadData = () => {
        console.log('')
    }

    let cols: any = [];
    if (data.length > 0) {
        cols = rateslistingColumn({
            showData,
            onUploadData,
            sectionType,
            customers,
            carriers
        });
    }


    useEffect(() => {
        if (data.length > 0) {
            data.map((v: any) => {
                const section: any = sectionType.find((s: any) => s.id === v.sectionTypeId)
                if (section)
                    Object.assign(v, { sectionName: section.displayText })
                const customer: any = customers.find((c: any) => c.id === v.customerId)
                const carrier: any = carriers.find((c: any) => c.id === v.carrierId)
                const status: any = v.IsActive === '1' ? "Active" : 'InActive'

                Object.assign(v, {
                    customerName: customer && customer.LegalName ? customer.LegalName : '',
                    carrierName: carrier && carrier.LegalName ? carrier.LegalName : '',
                    effectiveStart: ` ${new Date(v.effectiveStartDate.replace(/\s+/g, 'T')).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })} `,
                    
                    effectiveEnd: ` ${new Date(v.effectiveEndDate.replace(/\s+/g, 'T')).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })} `,
                    activeState: status,
                })
            });
            setTableData(data)
        }
    }, [data])

    const setEditDataInfo = (id: any) => {
        const editData: any =
            data &&
            data.length > 0 &&
            data.find((v: any) => v.id === id);
        const formValues = setRatesFormData(editData);
        setEditData(formValues);
    }

    const onDeleteRatesData = async () => {
        const ratesPayload = constructRatesData(editData, editData.rateTypesList, true, true);
        await dispatch(updateRatesRequest({ ratesPayload }));
    }

    const onUpdateEditFormData = async (values: any) => {
        editData.rateTypesList = values;
        setEditData(editData);
    }

    const onSaveEditData = (data: any, id: any, text = '') => {
        const tempData: any = [];
        if (text === 'rateEntry') {
            editData.rateTypesList && editData.rateTypesList.length > 0 && editData.rateTypesList.map((v: any) => {
                if (v.id === id) {
                    tempData.push(...data)
                } else
                    tempData.push(v)
            });
            const updateData = { ...editData, rateTypesList: tempData }
            setEditData(updateData)
        } else {
            editData.rateTypesList && editData.rateTypesList.length > 0 && editData.rateTypesList.map((v: any) => {
                if (v.id === id) {
                    v.ratesList = data
                    tempData.push(v)
                } else
                    tempData.push(v)
            });

            const updateData = { ...editData, rateTypesList: tempData }
            setEditData(updateData)
        }

    }

    const onCloseForm = () => {
        setRates(false)
    }

    useEffect(() => {
        carrierList();
        getFuelChargeList();
    }, []);

    const getRatesDetails = () => {
        dispatch(fetchRatesRequest({ token: '' }))
    }
    const getFuelChargeList = async () => {
       await API_SERVICE.get(API_URLS.FUEL_SURCHARGE_LIST, {}).then((r) => {
           setFuelData(JSON.parse(r.data))
       })
           .catch(r => console.log(r))
    }

    const carrierList = () => {
        const data = {
            payload: {
                entity_type: 2
            }
        }
      customerDetails(data).then((response) => {
          const carrierData = JSON.parse(JSON.parse(response.data))
            const tempData: any = [];
            if (carrierData) {
                carrierData.length > 0 &&
                carrierData.map((carrier: any) => {
                    tempData.push(carrier.corporateoffice);
                });
                setCarriers(tempData);
            }
        });
    }

    const onUploadRate = (flag: boolean) => {
        if (flag) {
            setUploadShowPopup(false);
            getRatesDetails()
        }
    }

    const exportFile = () => {
        if (downloadRateFileName !== '') {
            downloadTemplateFile(downloadRateFileName);
            setDownloadShowPopup(false);
            setDownloadRateFileName('');
        }
        else { toast.error('Please select file to download'); }
    }

     const onChangeDownloadFileHandler = (data: any) => {

        const fileName = data + ".xlsx";
        setDownloadRateFileName(fileName);
     }

    return (
        <>
            {!rates ?
                <PageContent>
                    <BoxHead
                        title={'Rates Master'}
                    />
                    <BoxBody>
                        <SearchContent>
                            <div className="addelement" onClick={ShowRatesEntry}>
                                <FontAwesomeIcon icon={faPlus} />
                                <span>&nbsp;Add Rates</span>
                            </div>
                            <div className="rates">
                                <Button
                                    className="btn-md-w mr-2"
                                    variant="secondary"
                                    onClick={rateDownload}
                                >
                                    Download Template
                                </Button>
                                <Button className="btn-md-w mr-2" variant="primary" onClick={rateUpload}>
                                    Upload
                                </Button>
                            </div>
                        </SearchContent>
                        <PerfectScrollbar>
                            <CustomTableContainer
                                columns={cols}
                                data={tableData}
                                //  data={tableData.length > 0 ? tableData : []}
                                options={true}
                                // downloadFileName={"Ratemaster.csv"}
                                downloadFileName={"Ratemaster.csv"}
                            />
                        </PerfectScrollbar>
                    </BoxBody>
                </PageContent>
                :
                (
                    <RatesEntryForm
                        onFormCancel={onCloseForm}
                        carriers={carriers}
                        fuelData={fuelData}
                        editFormData={editData}
                        isUpdate={isUpdate}
                        setCommonEditData={onSaveEditData}
                        onUpdateEditFormData={onUpdateEditFormData}
                        view={view}
                    />
                )
            }
            <Modal id="addRates"
                size="lg"
                show={modalRatesUpload}
                onHide={() => setUploadShowPopup(false)}
                dialogClassName="modal-50w"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Rates Master Upload
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UploadRateForm
                        onUploadRate={onUploadRate}
                        onCancelUpload={() => { setUploadShowPopup(false) }}
                    />
                </Modal.Body>
            </Modal>
            <Modal id="addRates"
                size="lg"
                show={modalRatesDownload}
                onHide={() => setDownloadShowPopup(false)}
                dialogClassName="modal-40w"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Download Template
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DownloadRateForm
                        onDownloadClick={onChangeDownloadFileHandler}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-md-w" variant="secondary" onClick={() => (setDownloadShowPopup(false))}>
                        Cancel
                    </Button>
                    <Button className="btn-md-w" variant="primary" onClick={exportFile}>
                        Download
                    </Button>
                </Modal.Footer>
            </Modal>
            {deletePopup && (
                <DeleteModal
                    show={deletePopup}
                    handleClose={() => setDeletePopup(false)}
                    onDeleteData={onDeleteRatesData}
                />
            )}
        </>
    );
};

export default Rates;