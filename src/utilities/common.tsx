import React from "react";
import {API_SERVICE} from "../services/commonApi";
import {API_URLS} from "./api_url_constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus} from "@fortawesome/free-solid-svg-icons";
import StorageService from "../services/Storage.service";
import {addTypesFormData} from "../interfaces/forms";
import {downloadTemplateFile, uploadFileToBlob} from "../config/azureBlob";

const token = StorageService.getCookies("token");
export const getQueryParams = (search: string): any => {
  const hashes = search.slice(search.indexOf("?") + 1).split("&");
  return hashes.reduce((params, hash) => {
    const split = hash.indexOf("=");

    if (split < 0) {
      return Object.assign(params, {
        [hash]: null,
      });
    }

    const key = hash.slice(0, split);
    const val = hash.slice(split + 1);

    return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
};

export const getAllEntities = async (token: string): Promise<void> => {
  const url = API_URLS.lookup + `?type=Entity_Type`;
  const response = await API_SERVICE.get(url, {}, token);
  return JSON.parse(response.data);
};

export const getAllDepartments = async (
    id: number,
    token: string
): Promise<void> => {
  const url = API_URLS.departments + `?Entity_Id=` + id;
  const response = await API_SERVICE.get(url, {}, token);
  return JSON.parse(response.data);
};

export const getAllContacts = async (token: string): Promise<void> => {
  const url = API_URLS.contactType;
  const response = await API_SERVICE.get(url, {}, token);
  return JSON.parse(response.data);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getValues = (values: any, id: number, dept = false) => {
  const name: string =
      values &&
      values.length > 0 &&
      values.map((v: any) => {
        if (id == v.id) return dept ? v.name : v.value;
      });
  return name ? name : "test";
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const sendNotificationToContacts = async (
    email: any,
    name: any
): Promise<void> => {
  const response = await API_SERVICE.get(
      API_URLS.notification_event,
      {},
      token
  );
  // console.log(JSON.parse(response.data))
  const notificationResponse = JSON.parse(response.data);
  if (notificationResponse.length > 0) {
    const templateResponse = await API_SERVICE.get(
        API_URLS.notification_template,
        {},
        token
    );
    await checkEmailTemplate(JSON.parse(templateResponse.data), email, name);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const checkEmailTemplate = async (
    data: any,
    email: any,
    name: any
): Promise<void> => {
  const templateData = data.find((e: { id: any }) => e.id === 1);
  const payload = {
    Event_Id: 1,
    Subject: templateData.subject
        .replace("/~/g", "")
        .replace("~Username~", name),
    Body: templateData.bodyText.replaceAll("~UserName~", name),
    Recipients: [
      {
        Recipient: email,
      },
    ],
    Status: 0,
  };
  const response = await API_SERVICE.post(
      API_URLS.notification_create,
      payload,
      token
  );
  // if(response.status === 200) {
  // 	history.push('/dashboard');
  // }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getDcInfoContacts = (contacts: any, edit: boolean) => {
  const dcContactsArray: any = [];
  contacts.length > 0 &&
  contacts.forEach((v: any) => {
    const data = {
      Entity_Type: 54,
      Type: v.type,
      Name: v.name,
      Department_Id: v.department ? parseInt(v.department) : 0,
      Title: v.title.toString(),
      Phone: v.phone.toString(),
      Extension: v.ext.toString() != "" ? v.ext.toString() : 0 ,
      Mobile: v.mobile.toString(),
      Email: v.email,
    };
    const checkId = v.Id && v.Id;
    if (edit)
      Object.assign(data, { Id: checkId.toString().length > 10 ? 0 : v.Id});
    dcContactsArray.push(data);
  });
  return dcContactsArray;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getDcInfoFC = (
    dcInfoData: any,
    edit: boolean,
    isDelete: boolean
) => {
  const dcArray: any = [];
  dcInfoData &&
  dcInfoData.length > 0 &&
  dcInfoData.forEach((value: any) => {
    const data = {
      DC_Address_Id: [],
      Comments: value.DC_comments ? value.DC_comments : "",
      FreightDesc: value.DC_freightDescription
          ? value.DC_freightDescription
          : "",
      LocationNumber: value.DC_locationNumber
          ? value.DC_locationNumber.toString()
          : "",
      GroupNumber: value.DC_GroupNumber
          ? value.DC_GroupNumber.toString()
          : "",
      Directions: value.DC_directions ? value.DC_directions : "",
      Phone: value.DC_mobile ? value.DC_mobile.toString() : "0",
      Fax: value.DC_fax ? value.DC_fax.toString() : "0",
      IsDeleted: isDelete,
      Id: value.Id ? value.Id : 0,
    };
    const dcAddress = {
      Type: 15,
      Address1: value.DC_address ? value.DC_address : "",
      Address2: value.DC_address2 ? value.DC_address2 : "",
      City: value.DC_city ? value.DC_city : "",
      State: value.DC_state ? value.DC_state : "",
      Zipcode: value.DC_zipCode ? value.DC_zipCode.toString() : "",
      Phone: value.DC_phone ? value.DC_phone.toString() : "0",
      Fax: value.DC_fax ? value.DC_fax.toString() : "0",
    };
    const getDcContacts = getDcInfoContacts(value.Contacts, edit);
    if (edit) {
      Object.assign(data, { Id: value.Id ? value.Id : 0 });
      Object.assign(dcAddress, {
        Id: value.DC_address_id ? value.DC_address_id : 0,
      });
    } else delete data.Id;
    Object.assign(data, {
      DC_Address_Id: dcAddress,
      Contacts: getDcContacts,
    });
    dcArray.push(data);
  });
  return dcArray;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const customerData = (
    formData: any,
    dcInfoData: any,
    corporateContacts: any,
    rules: any,
    edit = false,
    isDelete = false,
    pathEntityType: any
) => {

  const DCData =
      pathEntityType === 1 ? getDcInfoFC(dcInfoData, edit, isDelete) : [];
  const entityTypeId = pathEntityType === 2 && !formData.IsCarrier ? 91 : pathEntityType
  const corporateContactsArray: any = [];
  corporateContacts.length > 0 &&
  corporateContacts.forEach((v: any) => {
    const data = {
      Entity_Type: pathEntityType,
      Type: v.type,
      Name: v.name ? v.name : "",
      Department_Id: v.department ? parseInt(v.department) : 0,
      Title: v.title ? v.title.toString() : "1",
      Phone: v.phone ? v.phone.toString() : "0",
      Extension: v.ext ? v.ext.toString() : "0",
      Mobile: v.mobile ? v.mobile.toString() : "0",
      Email: v.email ? v.email : "",
    };

    if (edit)
      Object.assign(data, { Id: v.Id.toString().length > 10 ? -1 : v.Id });
    corporateContactsArray.push(data);
  });

  const rulesArray: {
    Event_Id: any;
    Id: any;
    IsActive: any;
    Rule_Id: any;
    Template_Id: any;
  }[] = [];
  rules.length > 0 &&
  rules.forEach((value: any) => {
    const data = {
      Event_Id: value.Event_Id,
      Id: value.Id,
      IsActive: !!value.IsActive,
      Rule_Id: value.Rule_Id,
      Template_Id: value.Template_Id,
    };
    rulesArray.push(data);
  });
  const staticArray: any = [
    {
      Rule_Id: 1,
      Event_Id: 1,
      Template_Id: 1,
      IsActive: true,
    },
  ];
  const payload = {};

  const corporateOffice = {
    Entity_Type_Id: entityTypeId,
    // Entity_Type_Id: pathEntityType === 2 && !formData.IsCarrier ? 91 : pathEntityType,
    LegalName: formData.legalName ? formData.legalName : "",
    dbaName: formData.dbaName ? formData.dbaName : "",
    MC_Number: formData.MC_Number ? formData.MC_Number : "",
    Federal_Tax_ID: formData.Federal_Tax_ID ? formData.Federal_Tax_ID : "",
    DOT_Number: formData.DOT_Number ? formData.DOT_Number : "",
    IsW9_YN: true,
    IsEdi: formData.IsEdi ? true : false,

    IsCarrier: formData.IsCarrier ? true : false,
    SCAC: formData.SCAC ? formData.SCAC : "",
    DUNS_Number: formData.DUNS_Number ? formData.DUNS_Number : "",
    IsDeleted: isDelete,
    Comments: formData.comments ? formData.comments : "",
    CorporateID: 1,
    Type: "Test Type t1",
    Address_Id: {
      Type: 14,
      Address1: formData.address ? formData.address : "",
      Address2: formData.address2 ? formData.address2 : "",
      City: formData.city ? formData.city : "",
      State: formData.state ? formData.state : "",
      Zipcode: formData.zipCode ? formData.zipCode.toString() : "",
      Phone: formData.phone ? formData.phone.toString() : "0",
      Fax: formData.fax ? formData.fax.toString() : "0",
    },
    IsActive: true,
    Contacts: corporateContactsArray,
    Rules: edit ? rulesArray : staticArray,
  };


  const invoiceTo =
      pathEntityType === 3 || pathEntityType === 50 || pathEntityType === 2 || pathEntityType === 91
          ? {
            Type: pathEntityType === 3 ? 21 : 20,
            Bill_Address_Id: {
              Type: pathEntityType === 3 ? 17 : 17,
              Address1: formData.invoiceTo_address
                  ? formData.invoiceTo_address
                  : "",
              Address2: formData.invoiceTo_address2
                  ? formData.invoiceTo_address2
                  : "",
              City: formData.invoiceTo_city ? formData.invoiceTo_city : "",
              State: formData.invoiceTo_state ? formData.invoiceTo_state : "",
              Zipcode: formData.invoiceTo_zipCode
                  ? formData.invoiceTo_zipCode.toString()
                  : "",
              Phone: formData.invoiceTo_phone
                  ? formData.invoiceTo_phone.toString()
                  : "0",
              Fax: formData.invoiceTo_fax
                  ? formData.invoiceTo_fax.toString()
                  : "0",
            },
            ContactName: formData.invoiceTo_contactName
                ? formData.invoiceTo_contactName.toString()
                : "",
            ContactEmail: formData.invoiceTo_contactEmail
                ? formData.invoiceTo_contactEmail.toString()
                : "",
            ContactPhone: formData.invoiceTo_contactPhone
                ? formData.invoiceTo_contactPhone.toString()
                : "",
            Phone: formData.invoiceTo_phone
                ? formData.invoiceTo_phone.toString()
                : "0",
            Comments: formData.invoiceTo_comments
                ? formData.invoiceTo_comments
                : "",
            Terms: formData.invoiceTo_terms ? formData.invoiceTo_terms : "",
          }
          : {};
  const billTo = {
    Type:
        pathEntityType === 1 || pathEntityType === 50 || pathEntityType === 3
            ? 19
            : 51,
    Bill_Address_Id: {
      Type:
          pathEntityType === 1 || pathEntityType === 50 || pathEntityType === 3
              ? 16
              : 52,
      Address1: formData.billTo_address ? formData.billTo_address : "",
      Address2: formData.billTo_address2 ? formData.billTo_address2 : "",
      City: formData.billTo_city ? formData.billTo_city : "",
      State: formData.billTo_state ? formData.billTo_state : "",
      Zipcode: formData.billTo_zipCode
          ? formData.billTo_zipCode.toString()
          : "",
      Phone: formData.billTo_phone ? formData.billTo_phone.toString() : "0",
      Fax: formData.billTo_fax ? formData.billTo_fax.toString() : "0",
    },
    ContactName: formData.billTo_contactName
        ? formData.billTo_contactName.toString()
        : "",
    ContactEmail: formData.billTo_contactEmail
        ? formData.billTo_contactEmail.toString()
        : "",
    ContactPhone: formData.billTo_contactPhone
        ? formData.billTo_contactPhone.toString()
        : "",
    Phone: formData.billTo_phone ? formData.billTo_phone.toString() : "0",
    Comments: formData.billTo_comments ? formData.billTo_comments : "",
    Terms: formData.billTo_terms ? formData.billTo_terms : "",
  };

  const terminalInfo = {
    Terminal_Address_Id: {
      Type: 18,
      Address1: formData.pool_address ? formData.pool_address : "",
      Address2: formData.pool_address2 ? formData.pool_address2 : "",
      City: formData.pool_city ? formData.pool_city : "",
      State: formData.pool_state ? formData.pool_state : "",
      Zipcode: formData.pool_zipCode ? formData.pool_zipCode.toString() : "",
      Phone: formData.pool_phone ? formData.pool_phone.toString() : "0",
    },
    PoolLocationNumber: formData.pool_PoolLocationNumber
        ? formData.pool_PoolLocationNumber.toString()
        : "",
    DockSize: formData.pool_DockSize ? formData.pool_DockSize.toString() : "",
    DockDoorNumbers: formData.pool_DockDoorNumbers
        ? formData.pool_DockDoorNumbers.toString()
        : "",
    YearsOfOperation: formData.pool_YearsOfOperation
        ? formData.pool_YearsOfOperation.toString()
        : "",
    SystemID: formData.pool_SystemID ? formData.pool_SystemID.toString() : "",
    Federal_Tax_ID: formData.pool_Federal_Tax_ID
        ? formData.pool_Federal_Tax_ID.toString()
        : "",
    DUNS_Number: formData.pool_DUNS_Number
        ? formData.pool_DUNS_Number.toString()
        : "",
    SecuritySys_Comments: formData.pool_SecuritySys_Comments
        ? formData.pool_SecuritySys_Comments.toString()
        : "",
    Yard_Comments: formData.pool_Yard_Comments
        ? formData.pool_Yard_Comments.toString()
        : "",
    DriverDesignation: formData.pool_DriverDesignation
        ? formData.pool_DriverDesignation.toString()
        : "",
    Equipment_Comments: formData.pool_Equipment_Comments
        ? formData.pool_Equipment_Comments.toString()
        : "",
    ModesOfComm: formData.pool_ModesOfComm
        ? formData.pool_ModesOfComm.toString()
        : "",
    GPS_Comments: formData.pool_GPS_Comments
        ? formData.pool_GPS_Comments.toString()
        : "",
    Trailer_Comments: formData.pool_Trailer_Comments
        ? formData.pool_Trailer_Comments.toString()
        : "",
    OtherSystems: formData.pool_OtherSystems
        ? formData.pool_OtherSystems.toString()
        : "",
    ScanningComments: formData.pool_ScanningComments
        ? formData.pool_ScanningComments.toString()
        : "",
    HasSecuritySystem: formData.pool_HasSecuritySystem
        ? formData.pool_HasSecuritySystem.toString() === "1"
        : false,
    IsNewOrExisting: formData.pool_IsNewOrExisting
        ? formData.pool_IsNewOrExisting.toString() === "1"
        : false,
    IsFencedYard: formData.pool_IsFencedYard
        ? formData.pool_IsFencedYard.toString() === "1"
        : false,
    IsAllDayReceiving: formData.pool_IsAllDayReceiving
        ? formData.pool_IsAllDayReceiving.toString() === "1"
        : false,
    IsYardOnOrOffsite: formData.pool_IsYardOnOrOffsite
        ? formData.pool_IsYardOnOrOffsite.toString() === "1"
        : false,
    IsEquipmentOwned: formData.pool_IsEquipmentOwned
        ? formData.pool_IsEquipmentOwned.toString() === "1"
        : false,
    IsGPS: formData.pool_IsGPS ? formData.pool_IsGPS.toString() === "1" : false,
    IsTrailerGPS: formData.pool_IsTrailerGPS
        ? formData.pool_IsTrailerGPS.toString() === "1"
        : false,
    IsTrailerHardSided: formData.pool_IsTrailerHardSided
        ? formData.pool_IsTrailerHardSided.toString() === "1"
        : false,
    IsEquipls5yrs: formData.pool_IsEquipls5yrs
        ? formData.pool_IsEquipls5yrs.toString() === "1"
        : false,
    IsPCS: formData.pool_IsPCS ? formData.pool_IsPCS.toString() === "1" : false,
  };

  const storesArray: any = [];
  formData.stores && formData.stores.length > 0 &&
  formData.stores.map((value: any) => {
    const emptyTime = new Date();
    emptyTime.setHours(0,0,0,0);
    const checkId = value.Id && value.Id;
    const data = {
      Day_id: value.Days_id,
      Time_Start: value.StartTime? new Date(fixTimezoneOffset(value.StartTime)) : new Date(fixTimezoneOffset(emptyTime)),
      Time_End: value.EndTime ? new Date(fixTimezoneOffset(value.EndTime)) : new Date(fixTimezoneOffset(emptyTime)),
    };
    if (edit) Object.assign(data, { Id: checkId.toString().length > 10 ? 0 : value.Id });
    storesArray.push(data);
  });

  const storeInfo = {
    StoreDelivery: storesArray,
  };

  if (pathEntityType === 5 && !edit) {
    Object.assign(corporateOffice, {
      DeliveryInstruction: formData.DeliveryInstruction ? formData.DeliveryInstruction : "",
      FreightDescription: formData.FreightDescription ? formData.FreightDescription : "",
      StoreNumber: formData.StoreNumber ? formData.StoreNumber : "",
      Zone: formData.Zone ? formData.Zone : "",
    });
    if (formData.FirstDeliveryDate) {
      Object.assign(corporateOffice, { FirstDeliveryDate: new Date(fixTimezoneOffset(formData.FirstDeliveryDate)) })
    }
  }

  if (edit) {
    Object.assign(corporateOffice, { Id: formData.id ? formData.id : 0 });
    Object.assign(corporateOffice.Address_Id, {
      Id: formData.address_id ? formData.address_id : 0,
    });
    Object.assign(billTo, { Id: formData.billTo_id ? formData.billTo_id : 0 });
    Object.assign(billTo.Bill_Address_Id, {
      Id: formData.billTo_address_id ? formData.billTo_address_id : 0,
    });
    if (pathEntityType === 3 || pathEntityType === 50 || pathEntityType === 2 || pathEntityType === 91 ) {
      Object.assign(invoiceTo, {
        Id: formData.invoiceTo_id ? formData.invoiceTo_id : 0,
      });
      Object.assign(invoiceTo.Bill_Address_Id, {
        Id: formData.invoiceTo_address_id ? formData.invoiceTo_address_id : 0,
      });
    }
    if (pathEntityType === 4) {
      Object.assign(terminalInfo, {
        Id: formData.terminal_id ? formData.terminal_id : 0,
      });
      Object.assign(terminalInfo.Terminal_Address_Id, {
        Id: formData.Terminal_Address_Id.Id
            ? formData.Terminal_Address_Id.Id
            : 0,
      });
    }
    if (pathEntityType === 5) {
      Object.assign(storeInfo, {
        Id: formData.stores_id ? formData.stores_id : 0,
      });
      Object.assign(corporateOffice, {
        DeliveryInstruction: formData.DeliveryInstruction ? formData.DeliveryInstruction : "",
        FreightDescription: formData.FreightDescription ? formData.FreightDescription : "",
        StoreNumber: formData.StoreNumber ? formData.StoreNumber : "",
        Zone: formData.Zone ? formData.Zone : ""
      })
      if (formData.FirstDeliveryDate) {
        Object.assign(corporateOffice, { FirstDeliveryDate: new Date(fixTimezoneOffset(formData.FirstDeliveryDate)) })
      }
    }
  }
  Object.assign(
      payload,
      pathEntityType === 1
          ? {
            CorporateOffice: corporateOffice,
            BillTo: billTo,
            DCInfo: DCData,
          }
          : entityTypeId === 2 || entityTypeId === 91
              ? {
                CorporateOffice: corporateOffice,
                Insurance: billTo,
                InvoiceTo:invoiceTo
              }
              :entityTypeId === 91
              ? {
                CorporateOffice: corporateOffice,

              }
              : pathEntityType === 3 || pathEntityType === 50
                  ? {
                    CorporateOffice: corporateOffice,
                    BillTo: billTo,
                    InvoiceTo: invoiceTo,
                  }
                  : pathEntityType === 4
                      ? {
                        CorporateOffice: corporateOffice,
                        Terminal: terminalInfo,
                      }
                      : pathEntityType === 5
                          ? {
                            CorporateOffice: corporateOffice,
                            StoreDelivery: storesArray,
                          }
                          : {}
  );
  return payload;
};

export const fixTimezoneOffset = (date: Date): string => {
  const dateTime = new Date(date);
  if (!date) return "";
  return new Date(dateTime.getTime() - (dateTime.getTimezoneOffset() * 60000)).toJSON();
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getLookupDataByType = (data: any, type = "") => {
  return (
      type &&
      data.filter((v: any) => {
        return v.type === type;
      })
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PageContent = ({ children }: any) => (
    <div className="content-wrapper inner-pages">
      <div className="page-content fade-in-up">
        <div className="row">
          <div className="col-lg">
            <div className="ibox">{children}</div>
          </div>
        </div>
      </div>
    </div>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const BoxHead = ({ title }: any) => (
    <div className="ibox-head">
      <div className="ibox-title">{title}</div>
      <div className="ibox-tools">
        <a className="ibox-collapse">
          <FontAwesomeIcon icon={faMinus} />
        </a>
      </div>
    </div>
);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const BoxBody = ({ children }: any) => (
    <div className="ibox-body">
      <div className="inbound-table position-relative">
        <div className="expensens-table">{children}</div>
      </div>
    </div>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SearchContent = ({ children }: any) => (
    <div className="w-100 d-flex justify-content-end">
      <ul className="list-unstyled table-search mb-2">
        <li>
          <div className=" purchasejournal add-lease d-flex align-items-center justify-content-end mx-2 my-sm-1 btn-add cursor">
            {children}
          </div>
        </li>
      </ul>
    </div>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isEmailExists = (contactsData: any, values: addTypesFormData) => {
  const currentEmailValues: any = values.email && values.email.split(',').map(item => item.trim());
  const findValues =  contactsData.length > 0 && contactsData.filter((r: any) => r.Id !== values.Id);
  if(findValues) {
    let str: any = '';
    findValues.length > 0 && findValues.map((c: any) => {
      const emailArray = c.email.split(',').map((item: any) => item.trim());
      const found : any = []
      currentEmailValues.map((r: string)=> {
        if(emailArray.includes(r)) { found.push(r) }
      });
      if (found.length > 0) {
        found.map((v: any) => {
          if (str === '')
            str = str + v
          else
            str = str + ',' + v
        })
      }
    })
    return str;
  } else {
    return false
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isMobileExists = (contactsData: any, values: addTypesFormData) => {
  return (
      values.mobile && contactsData.length > 0 &&
      contactsData.find(
          (cdata: { Id: number; mobile: string }) =>
              cdata.mobile === values.mobile && cdata.Id != values.Id
      )
  );
};

export const isAddRatesExists = (ratesData: any, values: any) => {
  return (
      ratesData.length > 0 &&
      ratesData.find(
          (rdata: { Id: number; rangeFrom: number; rangeTo: number }) =>
              (rdata.rangeFrom === values.rangeFrom) && (rdata.rangeTo === values.rangeTo) && rdata.Id != values.Id
      )
  );
};

export const entityTypes: any = {
  customers: 1,
  carriers: 2,
  brokers: 3,
  pool_provider: 4,
  stores: 5,
  corporate_bls: 50,
  accounts_payable: 51,
  accounts_receivables: 52,
  vendors: 91,
};


export const getEntityText: any = {
  1: "customers",
  2: "carriers",
  3: "brokers",
  4: "pool_provider",
  5: "stores",
  50: "corporate_bls",
  91: "vendor"
};

export const pageTitle: any = {
  customers: "Customers",
  carriers: "Carriers / Vendors",
  stores: "Stores",
  pool_provider: "Pool Provider",
  corporate_bls: "Corporate(BLS)",
  brokers: "Brokers",
  accounts_payable: "Accounts Payable",
  accounts_receivables: "Accounts Receivable",
  // vendors: "Vendors"
};

const corporateOfficeInitialValue = {
  legalName: "",
  address: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  fax: "",
  phone: "",
  comments: "",
  dbaName: "",
  MC_Number: "",
  Federal_Tax_ID: "",
  DOT_Number: "",
  IsW9_YN: "",
  IsCarrier: "",
  SCAC: "",
  DUNS_Number: "",
  StoreNumber: '',
  FreightDescription: "",
  FirstDeliveryDate: '',
  DeliveryInstruction: '',
  Zone: ''
};

const billToInitialValues = {
  billTo_address2: "",
  billTo_address: "",
  billTo_terms: "",
  billTo_city: "",
  billTo_state: "",
  billTo_zipCode: "",
  billTo_fax: "",
  billTo_phone: "",
  billTo_contactName: "",
  billTo_contactEmail: "",
  billTo_contactPhone: "",
  billTo_comments: "",
};

const invoiceInitialValues = {
  invoiceTo_address2: "",
  invoiceTo_address: "",
  invoiceTo_terms: "",
  invoiceTo_city: "",
  invoiceTo_state: "",
  invoiceTo_zipCode: "",
  invoiceTo_fax: "",
  invoiceTo_phone: "",
  invoiceTo_contactName: "",
  invoiceTo_contactEmail: "",
  invoiceTo_contactPhone: "",
  invoiceTo_comments: "",
};

const terminalInitialValues = {
  terminal_id: "",
  Terminal_Address_Id: "",
  pool_address2: "",
  pool_address: "",
  pool_city: "",
  pool_state: "",
  pool_zipCode: "",
  pool_phone: "",
  pool_PoolLocationNumber: "",
  pool_DockSize: "",
  pool_DockDoorNumbers: "",
  pool_Federal_Tax_ID: "",
  pool_DUNS_Number: "",
  pool_HasSecuritySystem: "",
  pool_SecuritySys_Comments: "",
  pool_IsNewOrExisting: "",
  pool_YearsOfOperation: "",
  pool_IsFencedYard: "",
  pool_Yard_Comments: "",
  pool_IsAllDayReceiving: "",
  pool_IsYardOnOrOffsite: "",
  pool_IsEquipmentOwned: "",
  pool_DriverDesignation: "",
  pool_Equipment_Comments: "",
  pool_ModesOfComm: "",
  pool_IsGPS: "",
  pool_IsTrailerGPS: "",
  pool_GPS_Comments: "",
  pool_IsTrailerHardSided: "",
  pool_IsEquipls5yrs: "",
  pool_Trailer_Comments: "",
  pool_IsPCS: "",
  pool_OtherSystems: "",
  pool_SystemID: "",
  pool_ScanningComments: "",
};

export const entityInitialValues: any = {
  1: Object.assign(corporateOfficeInitialValue, billToInitialValues),
  2: Object.assign(corporateOfficeInitialValue, billToInitialValues),
  3: Object.assign(
      corporateOfficeInitialValue,
      billToInitialValues,
      invoiceInitialValues
  ),
  4: Object.assign(corporateOfficeInitialValue, terminalInitialValues),
  5: Object.assign(corporateOfficeInitialValue, { DeliveryInstruction: "", Zone: '' }),
  50: Object.assign(
      corporateOfficeInitialValue,
      billToInitialValues,
      invoiceInitialValues
  ),
};

export const defaultInitialValues = Object.assign(
    corporateOfficeInitialValue,
    billToInitialValues,
    invoiceInitialValues,
    terminalInitialValues,
    { DeliveryInstruction: "" }
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const seFormValues = (editData: any, pathEntityType: any) => {
  const corporateOffice = {
    id: editData ? editData.id : "",
    legalName: editData ? editData.LegalName : "",
    address_id: editData.Address_Id ? editData.Address_Id[0].Id : "",
    address: editData.Address_Id ? editData.Address_Id[0].Address1 : "",
    address2: editData.Address_Id ? editData.Address_Id[0].Address2 : "",
    city: editData.Address_Id ? editData.Address_Id[0].City : "",
    state: editData.Address_Id ? editData.Address_Id[0].State : "",
    zipCode: editData.Address_Id ? editData.Address_Id[0].Zipcode : "",
    fax: editData.Address_Id
        ? editData.Address_Id[0].Fax && editData.Address_Id[0].Fax != 0
            ? editData.Address_Id[0].Fax
            : ""
        : "",
    phone: editData.Address_Id
        ? editData.Address_Id[0].Phone && editData.Address_Id[0].Phone != 0
            ? editData.Address_Id[0].Phone
            : ""
        : "",
    comments: editData ? editData.Comments : "",
    dbaName: editData ? editData.dbaName : "",
    MC_Number: editData ? editData.MC_Number : "",
    Federal_Tax_ID: editData ? editData.Federal_Tax_ID : "",
    DOT_Number: editData ? editData.DOT_Number : "",
    IsW9_YN: editData ? editData.IsW9_YN : "",
    IsCarrier: editData ? editData.IsCarrier : "",
    SCAC: editData ? editData.SCAC : "",
    DUNS_Number: editData ? editData.DUNS_Number : "",
    Entity_Type_Id: editData.Entity_Type_Id
  };
  let billToData = {};
  if (
      (pathEntityType === 1 || pathEntityType === 3 || pathEntityType === 50) &&
      editData.BillTo &&
      editData.BillTo.length > 0
  )
    billToData = {
      billTo_address_id: editData.BillTo[0].Address_Id
          ? editData.BillTo[0].Address_Id[0].Id
          : "",
      billTo_address2: editData.BillTo[0].Address_Id
          ? editData.BillTo[0].Address_Id[0].Address2
          : "",
      billTo_address: editData.BillTo[0].Address_Id
          ? editData.BillTo[0].Address_Id[0].Address1
          : "",
      billTo_terms: editData.BillTo[0].Terms ? editData.BillTo[0].Terms : "",
      billTo_city: editData.BillTo[0].Address_Id
          ? editData.BillTo[0].Address_Id[0].City
          : "",
      billTo_state: editData.BillTo[0].Address_Id
          ? editData.BillTo[0].Address_Id[0].State
          : "",
      billTo_zipCode: editData.BillTo[0].Address_Id
          ? editData.BillTo[0].Address_Id[0].Zipcode
          : "",
      billTo_fax: editData.BillTo[0].Address_Id[0].Fax
          ? editData.BillTo[0].Address_Id[0].Fax &&
          editData.BillTo[0].Address_Id[0].Fax != 0
              ? editData.BillTo[0].Address_Id[0].Fax
              : ""
          : "",
      billTo_phone: editData.BillTo[0].Phone
          ? editData.BillTo[0].Phone && editData.BillTo[0].Phone != 0
              ? editData.BillTo[0].Phone
              : ""
          : "",
      billTo_contactName: editData.BillTo[0].ContactName
          ? editData.BillTo[0].ContactName
          : "",
      billTo_contactEmail: editData.BillTo[0].ContactEmail
          ? editData.BillTo[0].ContactEmail
          : "",
      billTo_contactPhone: editData.BillTo[0].ContactPhone
          ? editData.BillTo[0].ContactPhone
          : "",
      billTo_comments: editData.BillTo[0].Comments
          ? editData.BillTo[0].Comments
          : "",
      billTo_id: editData.BillTo[0].Id ? editData.BillTo[0].Id : "",
    };

  if (pathEntityType === 1) {
    return Object.assign(corporateOffice, billToData);
  } else if (pathEntityType === 2) {
    let insuranceData = {};
    if (editData.Insurance && editData.Insurance.length > 0) {
      insuranceData = {
        billTo_address_id: editData.Insurance[0].Address_Id
            ? editData.Insurance[0].Address_Id[0].Id
            : "",
        billTo_address2: editData.Insurance[0].Address_Id
            ? editData.Insurance[0].Address_Id[0].Address2
            : "",
        billTo_address: editData.Insurance[0].Address_Id
            ? editData.Insurance[0].Address_Id[0].Address1
            : "",
        billTo_terms: editData.Insurance[0].Terms
            ? editData.Insurance[0].Terms
            : "",
        billTo_city: editData.Insurance[0].Address_Id
            ? editData.Insurance[0].Address_Id[0].City
            : "",
        billTo_state: editData.Insurance[0].Address_Id
            ? editData.Insurance[0].Address_Id[0].State
            : "",
        billTo_zipCode: editData.Insurance[0].Address_Id
            ? editData.Insurance[0].Address_Id[0].Zipcode
            : "",
        billTo_fax: editData.Insurance[0].Address_Id[0].Fax
            ? editData.Insurance[0].Address_Id[0].Fax &&
            editData.Insurance[0].Address_Id[0].Fax != 0
                ? editData.Insurance[0].Address_Id[0].Fax
                : ""
            : "",
        billTo_phone: editData.Insurance[0].Phone
            ? editData.Insurance[0].Phone && editData.Insurance[0].Phone != 0
                ? editData.Insurance[0].Phone
                : ""
            : "",
        billTo_contactName: editData.Insurance[0].ContactName
            ? editData.Insurance[0].ContactName
            : "",
        billTo_contactEmail: editData.Insurance[0].ContactEmail
            ? editData.Insurance[0].ContactEmail
            : "",
        billTo_contactPhone: editData.Insurance[0].ContactPhone
            ? editData.Insurance[0].ContactPhone
            : "",
        billTo_comments: editData.Insurance[0].Comments
            ? editData.Insurance[0].Comments
            : "",
        billTo_id: editData.Insurance[0].Id ? editData.Insurance[0].Id : "",
      };
    }
    return Object.assign(corporateOffice, insuranceData);
  } else if (pathEntityType === 3 || pathEntityType === 50) {
    let invoiceData = {};
    if (editData.InvoiceTo && editData.InvoiceTo.length > 0) {
      invoiceData = {
        invoiceTo_address_id: editData.InvoiceTo[0].Address_Id
            ? editData.InvoiceTo[0].Address_Id[0].Id
            : "",
        invoiceTo_address2: editData.InvoiceTo[0].Address_Id
            ? editData.InvoiceTo[0].Address_Id[0].Address2
            : "",
        invoiceTo_address: editData.InvoiceTo[0].Address_Id
            ? editData.InvoiceTo[0].Address_Id[0].Address1
            : "",
        invoiceTo_city: editData.InvoiceTo[0].Address_Id
            ? editData.InvoiceTo[0].Address_Id[0].City
            : "",
        invoiceTo_state: editData.InvoiceTo[0].Address_Id
            ? editData.InvoiceTo[0].Address_Id[0].State
            : "",
        invoiceTo_zipCode: editData.InvoiceTo[0].Address_Id
            ? editData.InvoiceTo[0].Address_Id[0].Zipcode
            : "",
        invoiceTo_fax: editData.InvoiceTo[0].Address_Id[0].Fax
            ? editData.InvoiceTo[0].Address_Id[0].Fax &&
            editData.InvoiceTo[0].Address_Id[0].Fax != 0
                ? editData.InvoiceTo[0].Address_Id[0].Fax
                : ""
            : "",
        invoiceTo_phone: editData.InvoiceTo[0].Phone
            ? editData.InvoiceTo[0].Phone && editData.InvoiceTo[0].Phone != 0
                ? editData.InvoiceTo[0].Phone
                : ""
            : "",
        invoiceTo_terms: editData.InvoiceTo[0].Terms
            ? editData.InvoiceTo[0].Terms
            : "",
        invoiceTo_contactName: editData.InvoiceTo[0].ContactName
            ? editData.InvoiceTo[0].ContactName
            : "",
        invoiceTo_contactPhone: editData.InvoiceTo[0].ContactPhone
            ? editData.InvoiceTo[0].ContactPhone
            : "",
        invoiceTo_contactEmail: editData.InvoiceTo[0].ContactEmail
            ? editData.InvoiceTo[0].ContactEmail
            : "",
        invoiceTo_comments: editData.InvoiceTo[0].Comments
            ? editData.InvoiceTo[0].Comments
            : "",
        invoiceTo_id: editData.InvoiceTo[0].Id ? editData.InvoiceTo[0].Id : "",
      };
    }
    return Object.assign(corporateOffice, billToData, invoiceData);
  } else if (pathEntityType === 4) {
    let terminalData = {};
    if (editData.Terminal && editData.Terminal.length > 0) {
      terminalData = {
        terminal_id: editData.Terminal[0].Id ? editData.Terminal[0].Id : "",
        Terminal_Address_Id: editData.Terminal[0].Address_Id.Id
            ? editData.Terminal[0].Address_Id.Id
            : "",
        pool_PoolLocationNumber: editData.Terminal[0].PoolLocationNumber
            ? editData.Terminal[0].PoolLocationNumber.toString()
            : "",
        pool_DockSize: editData.Terminal[0].DockSize
            ? editData.Terminal[0].DockSize.toString()
            : "",
        pool_DockDoorNumbers: editData.Terminal[0].DockDoorNumbers
            ? editData.Terminal[0].DockDoorNumbers.toString()
            : "",
        pool_YearsOfOperation: editData.Terminal[0].YearsOfOperation
            ? editData.Terminal[0].YearsOfOperation.toString()
            : "",
        pool_SystemID: editData.Terminal[0].SystemID
            ? editData.Terminal[0].SystemID.toString()
            : "",
        pool_Federal_Tax_ID: editData.Terminal[0].Federal_Tax_ID
            ? editData.Terminal[0].Federal_Tax_ID.toString()
            : "",
        pool_DUNS_Number: editData.Terminal[0].DUNS_Number
            ? editData.Terminal[0].DUNS_Number.toString()
            : "",
        pool_SecuritySys_Comments: editData.Terminal[0].SecuritySys_Comments
            ? editData.Terminal[0].SecuritySys_Comments.toString()
            : "",
        pool_Yard_Comments: editData.Terminal[0].Yard_Comments
            ? editData.Terminal[0].Yard_Comments.toString()
            : "",
        pool_DriverDesignation: editData.Terminal[0].DriverDesignation
            ? editData.Terminal[0].DriverDesignation.toString()
            : "",
        pool_Equipment_Comments: editData.Terminal[0].Equipment_Comments
            ? editData.Terminal[0].Equipment_Comments.toString()
            : "",
        pool_ModesOfComm: editData.Terminal[0].ModesOfComm
            ? editData.Terminal[0].ModesOfComm.toString()
            : "",
        pool_GPS_Comments: editData.Terminal[0].GPS_Comments
            ? editData.Terminal[0].GPS_Comments.toString()
            : "",
        pool_Trailer_Comments: editData.Terminal[0].Trailer_Comments
            ? editData.Terminal[0].Trailer_Comments.toString()
            : "",
        pool_OtherSystems: editData.Terminal[0].OtherSystems
            ? editData.Terminal[0].OtherSystems.toString()
            : "",
        pool_ScanningComments: editData.Terminal[0].ScanningComments
            ? editData.Terminal[0].ScanningComments.toString()
            : "",
        pool_HasSecuritySystem: editData.Terminal[0].HasSecuritySystem
            ? editData.Terminal[0].HasSecuritySystem.toString()
            : "0",
        pool_IsNewOrExisting: editData.Terminal[0].IsNewOrExisting
            ? editData.Terminal[0].IsNewOrExisting.toString()
            : "0",
        pool_IsFencedYard: editData.Terminal[0].IsFencedYard
            ? editData.Terminal[0].IsFencedYard.toString()
            : "0",
        pool_IsAllDayReceiving: editData.Terminal[0].IsAllDayReceiving
            ? editData.Terminal[0].IsAllDayReceiving.toString()
            : "0",
        pool_IsYardOnOrOffsite: editData.Terminal[0].IsYardOnOrOffsite
            ? editData.Terminal[0].IsYardOnOrOffsite.toString()
            : "0",
        pool_IsEquipmentOwned: editData.Terminal[0].IsEquipmentOwned
            ? editData.Terminal[0].IsEquipmentOwned.toString()
            : "0",
        pool_IsGPS: editData.Terminal[0].IsGPS
            ? editData.Terminal[0].IsGPS.toString()
            : "0",
        pool_IsTrailerGPS: editData.Terminal[0].IsTrailerGPS
            ? editData.Terminal[0].IsTrailerGPS.toString()
            : "0",
        pool_IsTrailerHardSided: editData.Terminal[0].IsTrailerHardSided
            ? editData.Terminal[0].IsTrailerHardSided.toString()
            : "0",
        pool_IsEquipls5yrs: editData.Terminal[0].IsEquipls5yrs
            ? editData.Terminal[0].IsEquipls5yrs.toString()
            : "0",
        pool_IsPCS: editData.Terminal[0].IsPCS
            ? editData.Terminal[0].IsPCS.toString()
            : "0",
        pool_address2: editData.Terminal[0].Address_Id
            ? editData.Terminal[0].Address_Id[0].Address2
            : "",
        pool_address: editData.Terminal[0].Address_Id
            ? editData.Terminal[0].Address_Id[0].Address1
            : "",
        pool_city: editData.Terminal[0].Address_Id
            ? editData.Terminal[0].Address_Id[0].City
            : "",
        pool_state: editData.Terminal[0].Address_Id
            ? editData.Terminal[0].Address_Id[0].State
            : "",
        pool_zipCode: editData.Terminal[0].Address_Id
            ? editData.Terminal[0].Address_Id[0].Zipcode
            : "",
        pool_phone: editData.Terminal[0].Address_Id
            ? editData.Terminal[0].Address_Id[0].Phone &&
            editData.Terminal[0].Address_Id[0].Phone != 0
                ? editData.Terminal[0].Address_Id[0].Phone
                : ""
            : "",
      };
    }
    return Object.assign(corporateOffice, terminalData);
  } else if (pathEntityType === 5) {
    Object.assign(corporateOffice, {
      StoreNumber: editData.StoreNumber ? editData.StoreNumber : "",
      FreightDescription: editData.FreightDescription ? editData.FreightDescription : "",
      DeliveryInstruction: editData.DeliveryInstruction ? editData.DeliveryInstruction : "",
      Zone: editData.Zone ? editData.Zone : ""
    });
    if (editData.FirstDeliveryDate) {
      const convertDateTime = new Date(editData.FirstDeliveryDate.replace(/\s+/g, 'T'));
      const year = convertDateTime.getFullYear();
      if (year != 2001)
        Object.assign(corporateOffice, { FirstDeliveryDate: editData.FirstDeliveryDate })
    }

    return corporateOffice;
  }
};

export const downloadfile = async(filename:any, containerName: string) =>{
  const response =  await downloadTemplateFile(filename, containerName)
  return response
}
export const commonAzureFileUpload = async (values: any, fileSelected: any, apiUrl: string, payload: any, byPass=false): Promise<any> => {
  document.body.classList.add("api-loading");

  // *** UPLOAD TO AZURE STORAGE ***
  const blobsInContainer: any = await uploadFileToBlob(fileSelected);
  const localUploadFileName = values.file.name;
  // debugger;
  // const latestRecord = blobsInContainer.at(-1);
  const latestRecord = blobsInContainer.slice(-1)[0];

  const urlParser = new URL(latestRecord);
  const fileName = urlParser.pathname.split('/')[2];
  if(byPass)
  return {Message:"Store uploaded successfully"}

  if (!byPass && (latestRecord.includes(fileName) || blobsInContainer.some((substring: any) => substring.includes(localUploadFileName)))) {

    return API_SERVICE.post(
        apiUrl,
        payload,
        ''
    )
        .then((r) => {
          if (r.status === 200) {
            const result = testJSON(r.data)
            if (typeof result === 'object') {
              return result
            }
          } else {
            return testJSON(r.data)
          }
        })
        .catch((e) => {
          return e
        });
  }

}

function testJSON(text: any){
  if (typeof text!=="string"){
    return false;
  }
  try{
    const result = JSON.parse(text);
    if (typeof result === 'string' && result.includes('Message')) {
      return  JSON.parse(result)
    }
    if (typeof result === 'object') {
      return  result
    } else {
      return JSON.parse(result)
    }
  }
  catch (error){
    return false;
  }
}

/**
 * Invoice Related Changes
 */

const InvoiceAddressInitialValues = {
  Address1: "",
  Address2: "",
  City: "",
  State: "",
  id: 0,
  zipcode: 0,
}

const InvoiceHeader = {
  Id: '',
  ProNumber: "",
  ShipDate: '',
  DeliveryDate: '',
  InvoiceDate: '',
  DueDate: '',
  ShipmentType: "",
  TrailerNumber: "",
  MilesClass: "",
  References_Number: "",
  HasExtraPickNStop: '',
  CustomerName: "",
  Customer_Address_Id: "",
  Customer_Address: [{
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    Id: 0,
    zipcode: 0,
  }],
  PickUpName: "",
  Pickup_Address_Id: "",
  Pickup_Address: [{
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    Id: 0,
    zipcode: 0,
  }],
  ConsigneeName: "",
  Consignee_Address_Id: "",
  Consignee_Address: [{
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    Id: 0,
    zipcode: 0,
  }],
  Note: "",
  InvoiceStatus: '',
  IsActive: 1,
  IsDeleted: '',
  TotalAmount: '',
  CreatedBy: '',
  CreatedDt: '',
  UpdatedBy: '',
  UpdatedDt: '',
}

const InvoicePickupStopsInitalValues = {
  PickUp_Address: "",
  PickUp_City: "",
  PickUp_State: "",
  PickUp_Invoice_Id: '',
  PickUp_ZipCode: '',
  PickUp_ExtraSequence: "",
  PickUp_ReferenceNumber: "",
  PickUp_Id: '',
}

const InvoiceChargesInitalValues = {
  Charges_Invoice_Id: '',
  Charges_Amount: '',
  Charges_Charge_Id: '',
  Charges_Id: '',
  Charges_Invoice_Description: "",
  Charges_Quantity: '',
  Charges_Rate_Type_Id: '',
  Charges_UOM: "",
  Charge_Name: "",
  UOM_Name: "",
  Invoice_Charged_Min_Rate: 0,
  Invoice_Charged_Max_Rate: 0,
  Invoice_Charged_Rate: 0,
  Invoice_Calculate_Price: 0,
}


export const invoiceDefaultInitialValues = Object.assign(
    InvoiceHeader,
);

export const InvoicePickupStopsInitalValue = Object.assign(
    InvoicePickupStopsInitalValues,
);

export const InvoiceChargesInitalValue = Object.assign(
    InvoiceChargesInitalValues,
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const constructRatesData = (formData: any, ratesEntry: any, edit = false, isDelete = false) => {
  const localData: any = []
  console.log("construct ",ratesEntry)
  ratesEntry && ratesEntry.length > 0 && ratesEntry.map((rateList: any) => {
    const tempData: any = []
    const ratelistId = rateList.id && rateList.id;
    rateList.ratesList && rateList.ratesList.length > 0 && rateList.ratesList.map((v: any) => {
      const values = {
        rangeFrom: v.rangeFrom,
        rangeTo: v.rangeTo,
        rate: v.rate,
        isActive: true,
        isDeleted: v.IsDeleted === true || v.IsDeleted === '1' ? true : false,
      }
      const checkId = v.Id && v.Id;
      if (edit)
        Object.assign(values, { id: checkId.toString().length > 10 ? -1 :  checkId, rateTypesId: ratelistId.toString().length > 10 ? -1 : ratelistId});
      tempData.push(values)
    })
    const rateEntryData = {
      defaultValue: rateList.DefaultValue ? parseInt(rateList.DefaultValue) : 0,
      destinationZip: rateList.DestinationZip.toString(),
      isActive: !!rateList.isActive,
      isDeleted: !!rateList.isDeleted,
      max_Value: rateList.MaxValue ? parseInt(rateList.MaxValue) : 0,
      min_Value: rateList.MinValue ? parseInt(rateList.MinValue) : 0,
      originZip: '',
      uom: rateList.UOM ? rateList.UOM : '',
      rateType: parseInt(rateList.rateType),
      storeId: parseInt(rateList.storeType),
      transactionType: parseInt(rateList.transType),
      ratesList: tempData
    }

    if (edit)
      Object.assign(rateEntryData, { id: ratelistId.toString().length > 10 ? -1 : ratelistId, ratesMasterId: formData.id });
    localData.push(rateEntryData);
  });
  const payload = {
    sectionTypeId: parseInt(formData.sectionType),
    customerId: parseInt(formData.customer),
    carrierId: parseInt(formData.carrier),
    effectiveStartDate: new Date(fixTimezoneOffset(formData.effective_start_date)),
    effectiveEndDate: new Date(fixTimezoneOffset(formData.effective_end_date)),
    ediCode: formData.ediCode ? formData.ediCode : '',
    fscId: formData.FSC ? formData.FSC : '',
    isActive: !!formData.status,
    isDeleted: isDelete,
    tariffNumber: formData.tariffNumber,
    rateTypesList: localData
  };
  if (edit)
    Object.assign(payload, { id: formData.id })
  return payload
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function setRatesFormData(data: any) {
  const localData: any = []
  data && data.rateTypesList && data.rateTypesList.length > 0 && data.rateTypesList.map((rateTypesList: any) => {
    const rateEntryData = {
      id: rateTypesList.Id,
      DefaultValue: rateTypesList.defaultValue,
      DestinationZip: rateTypesList.destinationZip,
      isActive: rateTypesList.isActive,
      isDeleted: rateTypesList.isDeleted,
      MaxValue: rateTypesList.max_Value,
      MinValue: rateTypesList.min_Value,
      originZip: rateTypesList.originZip,
      UOM: rateTypesList.uom,
      rateType: rateTypesList.rateType,
      storeType: rateTypesList.storeId,
      transType: rateTypesList.transactionType,
      ratesList: rateTypesList.ratesList && rateTypesList.ratesList.length > 0 ? rateTypesList.ratesList : []
    }
    localData.push(rateEntryData);
  });
  return {
    id: data.id,
    sectionType: data.sectionTypeId ? data.sectionTypeId : '',
    customer: data.customerId ? parseInt(data.customerId) : 0,
    carrier: data.carrierId ? data.carrierId : 0,
    effective_start_date: new Date(data.effectiveStartDate.replace(/\s+/g, 'T')),
    effective_end_date: new Date(data.effectiveEndDate.replace(/\s+/g, 'T')),
    ediCode: data.ediCode ? data.ediCode : '',
    FSC: data.fscId,
    status: data.IsActive === '1',
    tariffNumber: data.tariffNumber,
    rateTypesList: localData,
  }
}

export const convertErrorObj = (errors: any) => {
  const obj: any = {};
  errors.forEach((string: any) => {
    const [key, value] = string.split("in Row ");
    if(Object.keys(obj).length > 0 && obj[value])
    {
      if (value in obj) {
        obj[value] = obj[value] + ', ' + key
      } else {
        obj[value] = key;
      }
    } else {
      obj[value] = key;
    }
  });
  return obj
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const constructRulesPayload = (values: any, rulesArray: any, isDelete = false) => {
  const tempVals: any = [];
  const rulesID = values.id && values.id.toString().length > 10 ? 0 : values.id;
  rulesArray.length > 0 && rulesArray.map((v: any) => {
    const ruleRecipientsArray: any = []
    const rulesScheduleId = v.id && v.id.toString().length > 10 ? 0 : v.id;
    v.RulesRecipients && v.RulesRecipients.length > 0 && v.RulesRecipients.map((rr: any) => {
      const rulesRecipientsId = rr.id && rr.id.toString().length > 10 ? 0 : rr.id;
      const rulesRecipientObj = {
        ContactTypes: rr.ContactTypes ? parseInt(rr.ContactTypes) : 0,
        isDeleted: isDelete,
        isActive: true
      }
      Object.assign(rulesRecipientObj, {id: rulesRecipientsId, rulesSchedule_Id: rulesScheduleId});
      ruleRecipientsArray.push(rulesRecipientObj)
    })
    const obj = {
      ScheduleTime: dateToTime(new Date(v.scheduleTime)),
      Intervals: parseInt(v.interval), //int
      isDeleted: isDelete,
      isActive: true,
      RulesRecipients: ruleRecipientsArray
    }
    Object.assign(obj, {id: rulesScheduleId, rule_Id: rulesID});
    tempVals.push(obj)
  })
  return {
    id: rulesID,
    Event_Id: values.EventId ? values.EventId : 0,
    Entity_Id: values.EntityId ? values.EntityId : 0,
    Description: values?.ruleName,
    NotificationCount: 0,
    isActive: true,
    isDeleted: isDelete,
    rulesSchedules: tempVals
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function dateToTime (date: any) {
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
}