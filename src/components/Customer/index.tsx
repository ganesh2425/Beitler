import React, { useEffect, useState } from "react";
import CollapseLayout from "./CollaspseLayout";
import { history } from "../../config/history";
import {
  BoxBody,
  BoxHead, commonAzureFileUpload, convertErrorObj,
  customerData,
  entityTypes,
  getQueryParams,
  PageContent,
  pageTitle, SearchContent,
  seFormValues,
  sendNotificationToContacts,
} from "../../utilities/common";
import { useDispatch, useSelector } from "react-redux";
import { getConfigDetails } from "../../reducers/configReducer";
import {
  addCustomersRequest,
  fetchCustomersRequest,
  updateCustomersRequest,
  addCarrierRequest,
  updateCarrierRequest,
  addBrokerRequest,
  updateBrokerRequest,
  addPoolRequest,
  updatePoolRequest,
  addStoreRequest,
  updateStoreRequest,
  addVendorRequest
} from "../../actions/customerActions";
import {
  getCustomerDetails,
  getCustomerFailure,
  getCustomerSuccess,
} from "../../reducers/customerReducer";
import { toast } from "react-toastify";
import CustomerListingColumns from "./columns/CustomerListingColumns";
import CustomTableContainer from "../../containers/CommonTableContainer";
import DeleteModal from "../common/DeleteModal";
import StoresListingColumns from "./columns/StoresListingColumns";
import { Button } from "react-bootstrap";
import * as BS from "react-bootstrap";
import { Formik, FormikProps } from "formik";
import { API_URLS } from "../../utilities/api_url_constants";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { ExportToExcel } from "../common/ExportToExcel";
import CarrierListinColumns from "./columns/CarrierListinColumns";
import {downloadTemplateFile} from "../../config/azureBlob";
import {fetchLookupRequest} from "../../actions/lookupDataActions";
import {zones} from "./Forms/CorporateOfficeForm";

// const storeData = [
//   {
//     'Store/Legal Name': '',
//     'Store #': '',
//     'Zone': '',
//     'City': '',
//     'State': '',
//     'Zipcode': '',
//     'Name': '',
//     'Phone': '',
//     'Mobile': '',
//     'Email': '',
//   }
// ];
// const fileName = 'StoreTemplate'

const Customer = (): JSX.Element => {
  const dispatch = useDispatch();
  const [accordion, setAccordion] = useState(false);
  const [editData, setEditData] = useState({
    corporateoffice: {},
  });
  const [edit, setEdit] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [corporateContacts, setCorporateContacts] = useState([]);
  const [dcInfoData, setDcInfoData] = useState([]);
  const [storesData, setStoresData] = useState([]);
  const [storeTableData, setStoresTableData] = useState([]);
  const [rules, setRules] = useState([]);
  const [deleteId, setDeleteId] = useState(0);
  const [pathName, setPathName] = useState("");
  const [pathEntityType, setPathEntityType] = useState(0);
  const [formData, setFormData] = useState({
    DCInfoData: [],
  });
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showBT, setShowBT] = useState(false);
  const [fileSelected, setFileSelected] = useState<any>(null);
  const schema = Yup.object().shape({
    file: Yup.mixed().required('A file is required')
  })

  const showAccordion = (): void => {
    setAccordion(!accordion);
    setEdit(false);
    setDelete(false);
    setCorporateContacts([]);
    setRules([]);
    setDcInfoData([]);
    setFormData({
      DCInfoData: [],
    });
  };

  const setContacts = (data: any) => {
    setCorporateContacts(data);
  };

  const setAllDcInfoData = (data: any) => {
    setDcInfoData(data);
  };
  const setRulesData = (data: any) => {
    setRules(data);
  };
  const setAllFormData = (data: any) => {
   // console.log(data)
    setFormData(data);
  };

  useEffect(() => {
    const { hash } = window.location
    if(window.location.hash==="#add"){
      setAccordion(true)
    }
    if (history.location.pathname) {
      const pathNameReplace = history.location.pathname.replace(/\\|\//g, "");
      setPathName(pathNameReplace);
      setPathEntityType(entityTypes[pathNameReplace]);
    }
    if (history.location && history.location.search) {
      const queryParams = getQueryParams(history.location.search);
      if (queryParams.type === "entity_admin") {
        showAccordion();
      }
    }
    getCustomers();
    getLookups();
  }, []);

  const getLookups = () => {
    dispatch(fetchLookupRequest({}));
  }

  useEffect(() => {
    if (
      Object.keys(editData).length != 0 &&
      Object.keys(editData.corporateoffice).length != 0
    )
      setEditDataInfo(editData);
  }, [editData]);

  const customersList: any = useSelector(getCustomerDetails);
  const customerSuccess: any = useSelector(getCustomerSuccess);
  const customerFailure: any = useSelector(getCustomerFailure);
  useEffect(() => {
    const tempData: any = [];
    if (customersList) {
      customersList.length > 0 &&
        customersList.map((customer: any) => {
          tempData.push(customer.corporateoffice);
        });
      setCustomers(tempData);
    }
  }, [customersList]);

  useEffect(() => {
    const storeData : any = [];
    customers.length > 0 && customers.filter((c: any) => (c.IsActive === 1 || c.IsActive === true) ).map((cdata: any) => {
      cdata.IsActive === 1 ? cdata.IsActive = 'Active' : cdata.IsActive = 'InActive';
      cdata.Zipcode = cdata.Address_Id && cdata.Address_Id[0].Zipcode ? cdata.Address_Id[0].Zipcode : '';
      storeData.push(cdata)
    })
    setStoresTableData(storeData);
  }, [customers])

  useEffect(() => {
    if (customerFailure !== null) {
      // console.log(customerFailure);
      if (customerFailure === "Network Error") {
        window.location.assign("/login");
      }
    }
  }, [customerFailure]);
  // console.log(customerSuccess)
  useEffect(() => {
    if (
      customerSuccess &&
      customerSuccess.Message === "Success" &&
      isDelete &&
      success != ""
    ) {
      toast.success(`${success} Successfully`);
      setDeleteId(customerSuccess.Id);
    } else if (
      customerSuccess &&
      customerSuccess.Message === "Success" &&
      !isDelete &&
      success != ""
    ) {
      toast.success(`${success} Successfully`);
      setDeleteId(customerSuccess.Id);
    }
    getCustomers();
  }, [customerSuccess]);

  const getCustomers = () => {
    if (history.location.pathname) {
      const pathNameReplace = history.location.pathname.replace(/\\|\//g, "");
      setPathName(pathNameReplace);
 
      if (entityTypes[pathNameReplace])
        dispatch(
          fetchCustomersRequest({ entity_type: entityTypes[pathNameReplace] })
        );
    }
  };

  const setEditDataInfo = (id: any) => {
    const editData: any =
      customers &&
      customers.length > 0 &&
      customers.find((v: any) => v.id === id);

    const setEditFormData = seFormValues(editData, pathEntityType);
    const storesDataArray: any = [];
    editData.StoreDelivery &&
      editData.StoreDelivery.length > 0 &&
      editData.StoreDelivery.map((v: any) => {
        if (v.StartTime) {
          const a = {
            Days_id: v.Days_id,
            StartTime: new Date((new Date(v.StartTime.replace(/\s+/g, 'T'))).toISOString()),
            EndTime: new Date((new Date(v.EndTime.replace(/\s+/g, 'T'))).toISOString()),
            Id: v.Id,
          };
          storesDataArray.push(a);
        }
      });

    const coContacts: any = [];
    const dcContacts: any = [];
    editData.contacts &&
      editData.contacts.length > 0 &&
      editData.contacts.map((v: any) => {
        const a = {
          type: v.Type,
          name: v.Name,
          department: v.Department_Id,
          title: v.Title,
          phone: v.Phone ? v.Phone : '',
          ext: v.Extension,
          mobile: v.Mobile ? v.Mobile : '',
          email: v.Email,
          Id: v.Id,
        };
        if (v.Entity_Type === 54) dcContacts.push(a);
        else coContacts.push(a);
      });

    const rulesArray: any = [];
    editData &&
      editData.Rules &&
      editData.Rules.length > 0 &&
      editData.Rules.map((value: any) => {
        const data = {
          Entity_Id: value.Entity_Id,
          Event_Id: value.Event_Id,
          Id: value.Id,
          IsActive: value.IsActive,
          IsDeleted: value.IsDeleted,
          Rule_Id: value.Rule_Id,
          Template_Id: value.Template_Id,
        };
        rulesArray.push(data);
      });

    const dcArray: any = [];
    editData &&
      editData.DCInfo &&
      editData.DCInfo.length > 0 &&
      editData.DCInfo.map((value: any) => {
        const data = {
          DC_name: value.Address_Id[0].Name ? value.Address_Id[0].Name : "",
          DC_address2: value.Address_Id[0].Address2
            ? value.Address_Id[0].Address2
            : "",
          DC_address: value.Address_Id[0].Address1
            ? value.Address_Id[0].Address1
            : "",
          DC_city: value.Address_Id[0].City ? value.Address_Id[0].City : "",
          DC_state: value.Address_Id[0].State ? value.Address_Id[0].State : "",
          DC_zipCode: value.Address_Id[0].Zipcode
            ? value.Address_Id[0].Zipcode
            : "",
          DC_fax: value.Address_Id[0].Fax ? value.Address_Id[0].Fax : "",
          DC_phone: value.Address_Id[0].Phone ? value.Address_Id[0].Phone : "",
          DC_freightDescription: value.FreightDesc ? value.FreightDesc : "",
          DC_locationNumber: value.LocationNumber ? value.LocationNumber : "",
          DC_GroupNumber: value.GroupNumber ? value.GroupNumber : "",
          DC_mobile: value.Phone ? value.Phone : "",
          DC_comments: value.Comments ? value.Comments : "",
          DC_directions: value.Directions ? value.Directions : "",
          Id: value.Id ? value.Id : "",
          DC_address_id: value.Address_Id[0].Id ? value.Address_Id[0].Id : "",
          Contacts: dcContacts,
        };
        dcArray.push(data);
      });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.assign(setEditFormData);
    Object.assign(setEditFormData, { stores: storesDataArray });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setCorporateContacts(coContacts);
    setRules(rulesArray);
    setDcInfoData(dcArray);
    setStoresData(storesDataArray);
    // console.log("-===============================")
    // console.log(setEditFormData)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    setFormData(setEditFormData);
  };

  const showData = (data: any, isDelete = false): void => {
    if (isDelete) {
      setDelete(isDelete);
      setDeletePopup(true);
      setEditDataInfo(data);
    } else {
      setAccordion(true);
      setEdit(true);
      setDelete(isDelete);
      setEditDataInfo(data);
    }
  };

  const onDeleteRecord = (data: any, isDelete: false): void => {
    setDelete(isDelete);
    setEditData(data);
  };

  const onDeleteCoContacts = (id: number) => {
    setCorporateContacts(
      corporateContacts.filter((item: any) => item.Id !== id)
    );
    toast.success("Contact Deleted");
  };

  const onDeleteDcInfo = (id: number) => {
    const index = dcInfoData.findIndex(function (o: any) {
      return o.Id === id;
    });
    if (index !== -1) dcInfoData.splice(index, 1);
    setDcInfoData(dcInfoData);
  };

  const onDeleteCustomerData = async () => {
    await setDeletePopup(false);
    const data = customerData(
      formData,
      dcInfoData,
      corporateContacts,
      rules,
      true,
      isDelete,
      pathEntityType
    );
    if (pathEntityType === 1) {
      await dispatch(updateCustomersRequest(data));
    } else if (pathEntityType === 3 || pathEntityType === 50) {
      await dispatch(updateBrokerRequest(data));
    } else if (pathEntityType === 5) {
      await dispatch(updateStoreRequest(data));
    } else if (pathEntityType === 4) {
      await dispatch(updatePoolRequest(data));
    } else if (pathEntityType === 2) {
      await dispatch(updateCarrierRequest(data));
    }
    setSuccess("Deleted");
    await getCustomers();
  };

  const onSubmitFormData = async (update = false, formValues: any) => {

    showAccordion();

    const data = customerData(
      formValues,
      dcInfoData,
      corporateContacts,
      rules,
      update,
      false,
      pathEntityType
    );

    // console.log(data)
    
    if (update) {
      if (pathEntityType === 1) {
        await dispatch(updateCustomersRequest(data));
      } else if (pathEntityType === 3 || pathEntityType === 50) {
        await dispatch(updateBrokerRequest(data));
      } else if (pathEntityType === 2) {
        
        await dispatch(updateCarrierRequest(data));
      } else if (pathEntityType === 4) {
        await dispatch(updatePoolRequest(data));
      } else if (pathEntityType === 5) {
        await dispatch(updateStoreRequest(data));
      } else if (pathEntityType === 91) {
        await dispatch(updateStoreRequest(data));
      }
      setSuccess("Updated");
    } else {
      if (pathEntityType === 1) {
        await dispatch(addCustomersRequest(data));
      } else if (pathEntityType === 3 || pathEntityType === 50) {
        await dispatch(addBrokerRequest(data));
      } else if (pathEntityType === 2) {
        await dispatch(addCarrierRequest(data));
      } else if (pathEntityType === 4) {
        await dispatch(addPoolRequest(data));
      } else if (pathEntityType === 5) {
        await dispatch(addStoreRequest(data));
      } else if (pathEntityType === 91) {
        await dispatch(addVendorRequest(data));
      }
      setSuccess("Added");
    }

    if (
      pathEntityType === 1 ||
      pathEntityType === 2 ||
      pathEntityType === 3 ||
      pathEntityType === 50 ||
      pathEntityType === 91
    ) {
      corporateContacts.length > 0 &&
        corporateContacts.map((value: any) => {
          sendNotificationToContacts(value.email, value.name).then((r) =>
            console.log(r)
          );
        });
    }
  };

  const entityAdminDetails = useSelector(getConfigDetails);

  useEffect(() => {
    if (history.location && history.location.search) {
      const queryParams = getQueryParams(history.location.search);
      if (
        queryParams.type === "entity_admin" &&
        entityAdminDetails.entity_admin
      ) {
        showAccordion();
      }
    }
  }, [entityAdminDetails]);

  let customerCols: any = [];
  customerCols = CustomerListingColumns({
    showData,
  });

  if (pathEntityType === 2 || pathEntityType === 3) {
    customerCols = CarrierListinColumns({ showData });
  }

  if (pathEntityType === 5) {
    customerCols = StoresListingColumns({ showData });
  }

  const modalShowClose = () => {
    setDeletePopup(false);
  };

  const downloadTemplate = () => {
    downloadTemplateFile('StoreTemplate.xlsx')
  }

  const DisplayForm = () => (
    <div>

      {/*<ExportToExcel apiData={storeData} fileName={fileName} />*/}
      <Button
          className="btn-md-w mr-2"
          variant="secondary"
          onClick={downloadTemplate}
      >
        Download Template
      </Button>

      <Button
        onClick={onShowModal}
        className={'btn-md-w'}
        variant="primary"
      >
        Upload
      </Button>
    </div>
  );
  const onShowModal = () => {
    setShowModal(true)
  }

  const onFileUpload = async (values: any, _resetForm: () => void) => {
    const apiUrl = API_URLS.STORE_UPLOAD;
    if (values.file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {

      const filePath = `${API_URLS.AZURE_FILE_UPLOAD_URL}testing/${values.file.name}`;
      const payload = {
        "azureFileURL": filePath,
        "azureAccountKey": "",
        "azureContainerName": "",
        "defaultEndpointsProtocol": "",
        "accountName": "",
        "endpointSuffix": ""
      }

      commonAzureFileUpload(values, fileSelected, apiUrl, payload).then((responseData: any) => {
        if (responseData) {
          if (responseData.Message === 'Store uploaded successfully') {
            toast.success('Data uploaded successfully');
            setShowModal(false);
            _resetForm();
            getCustomers();
            return
          } else {
            let stringVal: any = '';
            if ( responseData.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
              const errors = convertErrorObj(responseData.errors);
              for (const [key, value] of Object.entries(errors)) {
                if (key === 'undefined') {
                  stringVal = stringVal + value + '\n'
                  stringVal += '</br>'
                }
                else {
                  stringVal = stringVal + '\n Row '+ key + ': ' + value + '\n '
                  stringVal += '</br>'
                }
              }
            } else {
              stringVal = responseData.Errors;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            toast.error(<div className={'toastErrors'} dangerouslySetInnerHTML={{ __html: stringVal }} />, {
              position: "top-right",
              autoClose: false,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            setShowModal(false)
          }
        } else {
          toast.error(responseData) ,{
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
        }
        }
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
  };


  const onFileChange = (event: any) => {
    setFileSelected(event.target.files[0]);
  };

  return (
    <>
      {!accordion ? (
        <PageContent>
          <BoxHead title={`${pageTitle[pathName]} Listing`} />
          <BoxBody>
            <SearchContent>
              {
                pathName === 'stores' && <> {DisplayForm()} &nbsp;</>
              }
              <div className="addelement" onClick={showAccordion}>
                <FontAwesomeIcon icon={faPlus} />
                <span>&nbsp;Add {pageTitle[pathName]}</span>
              </div>
            </SearchContent>
            <CustomTableContainer
              columns={customerCols}
              data={pathEntityType === 5 ? storeTableData : customers.length > 0 ? customers : []}
              // options={
              //   !(queryParamsValue && queryParamsValue.type === "entity_admin")
              // }
              options={true}
              downloadFileName={pathName + ".csv"}
            />
            {deletePopup && (
              <DeleteModal
                show={deletePopup}
                handleClose={modalShowClose}
                onDeleteData={onDeleteCustomerData}
              />
            )}
          </BoxBody>
        </PageContent>
      ) : null}

      {accordion && (
        <CollapseLayout
          header={`${pageTitle[pathName]} Entry`}
          editData={editData}
          edit={edit}
          isDelete={isDelete}
          onCancel={showAccordion}
          onDeleteRecord={onDeleteRecord}
          setCorporateContacts={setContacts}
          corporateContacts={corporateContacts}
          storesDeliveryData={storesData}
          setAllDcInfoData={setAllDcInfoData}
          dcInfoData={dcInfoData}
          onDeleteCoContact={onDeleteCoContacts}
          onDeleteDcData={onDeleteDcInfo}
          setRules={setRulesData}
          rules={rules}
          formData={formData}
          setFormData={setAllFormData}
          isSubmit={onSubmitFormData}
          pathName={pathName}
          pathEntityType={pathEntityType}
        />
      )}


      <BS.Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="modal-40w"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <BS.Modal.Header closeButton>
          <BS.Modal.Title id="example-modal-sizes-title-lg">
            Stores File upload
          </BS.Modal.Title>
        </BS.Modal.Header>
        <BS.Modal.Body>
          <Formik
            validationSchema={schema}
            initialValues={{ file: null }}
            onSubmit={(values: any, actions) => {
              onFileUpload(values, actions.resetForm);
            }}
          >
            {(props: FormikProps<any>) => {
              const {
                values,
                touched,
                errors,
                setFieldValue,
                isValid,
                dirty,
                handleSubmit
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <BS.Form.Group controlId="formFileSm" className="mb-3">
                    {/*<BS.Form.Label>Choose the file from your local</BS.Form.Label>*/}
                    <input
                      type="file"
                      name="file"
                      onChange={(event: any) => {
                        setFieldValue("file", event.currentTarget.files[0]);
                        onFileChange(event)
                      }}
                      className={
                        errors.file && touched.file
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                      accept=".xlsx"
                    />
                  </BS.Form.Group>
                  <div className="listing crp-table mt-3">
                    <div className="add-lease d-flex justify-content-end mb-2 BS.Color-highlight">
                      <BS.Button
                        // onClick={onFileUpload}
                        disabled={!(dirty && isValid)}
                        className={'btn-md-w'}
                        variant="primary"
                        type="submit"
                      > Upload
                      </BS.Button>
                    </div>
                  </div>
                </form>
              );
            }}

          </Formik>
        </BS.Modal.Body>
      </BS.Modal>
    </>
  );
};
export default Customer;
