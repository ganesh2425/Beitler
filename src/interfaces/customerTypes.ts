import { addTypesFormData } from "./forms";

// export type ICustomerProps = {
//     onSelectValue: any
// }

// export type ICustomerState = {
//   accordion: boolean;
//   editData: any;
//   edit: boolean;
// };

export type CustomerTableProps = {
  data: any;
  templateData: any;
  type: string
  showAccordion?: () => void;
  editData?: (data: any, isDelete: boolean) => void;
};

export type customerTempData = {
  id: number;
  type: string
  subject: string
  body: string
  isActive: boolean;
  eventName: string
};

export type dcInfoFormValues ={
    DC_address: string
    DC_address2: string
    DC_city: string
    DC_state: string
    DC_zipCode: string
    DC_fax: string
    DC_phone: string
    DC_freightDescription: string
    DC_locationNumber: string
    DC_GroupNumber: string
    DC_mobile: string
    DC_comments: string
    DC_directions: string
}

export type customerFormValues = {
  legalName: string
  address: string
  address2: string
  city: string
  state: string
  zipCode: string
  fax: string
  phone: string
  comments: string
  dbaName: string
  MC_Number: string
  IsCarrier: string
  Federal_Tax_ID: string
  DOT_Number: string
  IsW9_YN: string
  SCAC: string
  DUNS_Number: string
    StoreNumber: string
    FreightDescription: string
    FirstDeliveryDate: string
    DeliveryInstruction: string
  billTo_address2: string
  billTo_address: string
  billTo_city: string
  billTo_terms: string
  billTo_state: string
  billTo_zipCode: string
  billTo_fax: string
  billTo_phone: string
  billTo_contactName: string
  billTo_contactPhone: string
  billTo_contactEmail: string
  billTo_comments: string
  DC_name: string
  DC_address: string
  DC_address2: string
  DC_city: string
  DC_state: string
  DC_zipCode: string
  DC_fax: string
  DC_phone: string
  DC_freightDescription: string
  DC_locationNumber: string
  DC_GroupNumber: string
  DC_mobile: string
  DC_comments: string
  DC_directions: string
    invoiceTo_address2:  string
    invoiceTo_address:  string
    invoiceTo_terms:  string
    invoiceTo_city:  string
    invoiceTo_state:  string
    invoiceTo_zipCode:  string
    invoiceTo_fax:  string
    invoiceTo_phone:  string
    invoiceTo_contactName:  string
    invoiceTo_contactEmail:  string
    invoiceTo_contactPhone:  string
    invoiceTo_comments:  string
    pool_address2:  string
    pool_address:  string
    pool_city:  string
    pool_state:  string
    pool_zipCode:  string
    pool_phone:  string
    pool_PoolLocationNumber:  string
    pool_DockSize:  string
    pool_DockDoorNumbers:  string
    pool_Federal_Tax_ID:  string
    pool_DUNS_Number:  string
    pool_HasSecuritySystem:  string
    pool_SecuritySys_Comments:  string
    pool_IsNewOrExisting:  string
    pool_YearsOfOperation:  string
    pool_IsFencedYard:  string
    pool_Yard_Comments:  string
    pool_IsAllDayReceiving:  string
    pool_IsYardOnOrOffsite:  string
    pool_IsEquipmentOwned:  string
    pool_DriverDesignation:  string
    pool_Equipment_Comments:  string
    pool_ModesOfComm:  string
    pool_IsGPS:  string
    pool_IsTrailerGPS:  string
    pool_GPS_Comments:  string
    pool_IsTrailerHardSided:  string
    pool_IsEquipls5yrs:  string
    pool_Trailer_Comments:  string
    pool_IsPCS:  string
    pool_OtherSystems:  string
    pool_SystemID:  string
    pool_ScanningComments:  string
};

export type customerFormProps = {
    header: string
    editData: any
    edit: boolean
    isDelete: boolean
    onDeleteRecord: any
    corporateContacts: any
    storesDeliveryData: any
    setCorporateContacts: any
    onDeleteCoContact: any
    rules: any
    setRules: any
    formData: any
    setFormData: any
    isSubmit: any
    pathName: any
    pathEntityType: any
    onDeleteDcData: any
    setAllDcInfoData: any
    dcInfoData: any
    onCancel: () => void
}

export type customerFormState = {
  setLgShow: boolean;
  corporateOfficeData: any;
  billToData: any;
  DCInfoData: any;
  corporateContacts: any;
  dcInfoContacts: any;
  editData: any;
  currentValue: string
  commonValidation: any;
  commonInitialValues: any;
  formData: any;
};

export type distributedFormProps = {
    corporateOfficeContact: ((data: addTypesFormData, isEdit: boolean) => void) | undefined,
    contactsData?: any,
    type?: string
    departments: any
    onSelectValue: any
    contacts: any
    errors: any
    touched: any
    handleBlur: any
    values: any
    handleChange: any,
    onDeleteDcContact:  (id: number) => void
}

export type billToIProps = {
    errors: any
    touched: any
    handleBlur: any
    values: any
    handleChange: any
    edit: any
}

export type invoiceToIProps = {
  errors: any
  touched: any
  handleBlur: any
  values: any
  handleChange: any
  edit: any
}

export type terminalIProps = {
  errors: any
  touched: any
  handleBlur: any
  values: any
  handleChange: any
  edit: any
    years: any
}

export type storesIProps = {
  errors: any
  touched: any
  handleBlur: any
  values: any
  handleChange: any
    onWeekUpdate: any
    storesDeliveryData: any
    edit: any
}

export type corporateOfficeProps =  {
    corporateOfficeContact?: ((data: addTypesFormData, isEdit: boolean) => void) | undefined,
    contactsData?: any,
    type?: string
    contacts: any
    errors: any
    touched: any
    handleBlur: any
    setFieldValue: any
    values: any
    handleChange: any
    edit: any
    onDeleteCoContact: (id: number) => void
    pathEntityType: any
    changeDeliveryDate: any
    toggleShowHide: any
}