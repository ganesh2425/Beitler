export type IInvoiceProps = {
  text: string;
  stores: any;
  carriers: any;
};

export type invoiceBasicIProps = {
  errors: any;
  touched: any;
  handleBlur: any;
  values: any;
  handleChange: any;
  edit: any;
};

export type InvoiceFormProps = {
  header: string;
  editData: any;
  edit: boolean;
  isDelete: boolean;
  onDeleteRecord: any;
  formData: any;
  setInvoiceFormData: any;
  isSubmit: any;
  isLoading: boolean;
  onCancel: () => void;
  stores: any;
  carriers: any;
  view: boolean;
  pathName: string;
};

export type invoiceFormState = {
  setLgShow: boolean;
  corporateOfficeData: any;
  billToData: any;
  DCInfoData: any;
  corporateContacts: any;
  dcInfoContacts: any;
  editData: any;
  currentValue: string;
  commonValidation: any;
  commonInitialValues: any;
  formData: any;
};

export type invoiceFormValues = {
  ConsigneeName: string;
  Consignee_Address: [{ IInvoiceAddressInfo: any }];
  Consignee_Address_Id: string;
  CreatedBy: string;
  CreatedDt: string;
  CustomerName: string;
  Customer_Address: [{ IInvoiceAddressInfo: any }];
  Customer_Address_Id: string;
  DeliveryDate: any;
  DueDate: any;
  HasExtraPickNStop: string;
  InvoiceDate: any;
  InvoiceStatus: string;
  IsActive: boolean;
  IsDeleted: boolean;
  MilesClass: string;
  Note: string;
  PickUpName: string;
  Pickup_Address: [{ IInvoiceAddressInfo: any }];
  Pickup_Address_Id: string;
  ProNumber: string;
  References_Number: string;
  ShipDate?: any;
  ShipmentType: string;
  TotalAmount: string;
  TrailerNumber: string;
  id: string;
  PickUp_Address: string;
  PickUp_City: string;
  PickUp_State: string;
  PickUp_Invoice_Id: string;
  PickUp_ZipCode: string;
  PickUp_ExtraSequence: string;
  PickUp_ReferenceNumber: string;
  PickUp_Id: string;
  Charges_Invoice_Id: string;
  Charges_Amount: string;
  Charges_Charge_Id: string;
  Charges_Id: string;
  Charges_Invoice_Description: string;
  Charges_Quantity: string;
  Charges_Rate_Type_Id: string;
  Charges_UOM: string;
};

export interface IInvoiceChargesEntry {
  Amount: number;
  Charge_Id: number;
  Invoice_Description: string;
  Quantity: number;
  Rate_Type_Id: number;
  UOM: string;
  Invoice_Charged_Min_Rate: number;
  Invoice_Charged_Max_Rate: number;
  Charged_Per_Rate: number;
  Invoice_Calculate_Price: number;
}

export interface IInvoicePickUpEntryStop {
  Address: string;
  City: string;
  State: string;
  ZipCode: number;
  //pickStop: number;
  ExtraSequence: number;
  ReferenceNumber: string;
}
