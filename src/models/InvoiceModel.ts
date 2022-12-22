// Type Decl. for Notification Template
export type IInvoiceData = {
  InvoiceHeader: IInvoiceHeaderInfo;
  InvoiceCharges: IInvoiceChargesInfo[];
  InvoicePickupStops: IInvoicePickupStopsInfo[];
};

//Interface for Notification Template Info
export type IInvoiceHeaderInfo = {
  ConsigneeName: string;
  Consignee_Address: [{ IInvoiceAddressInfo: any }];
  Consignee_Address_Id: string;
  CreatedBy: number;
  CreatedDt: Date;
  CustomerName: string;
  Customer_Address: [{ IInvoiceAddressInfo: any }];
  Customer_Address_Id: string;
  DeliveryDate: Date;
  DueDate: Date;
  HasExtraPickNStop: number;
  InvoiceDate: Date;
  InvoiceStatus: number;
  IsActive: boolean;
  IsDeleted: boolean;
  MilesClass: string;
  Note: string;
  PickUpName: string;
  Pickup_Address: [{ IInvoiceAddressInfo: any }];
  Pickup_Address_Id: string;
  ProNumber: string;
  References_Number: string;
  ShipDate: Date;
  ShipmentType: string;
  TotalAmount: number;
  TrailerNumber: string;
  id: number;
};

export type IInvoiceAddressInfo = {
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  id: number;
  zipcode: number;
};

export type IInvoicePickupStopsInfo = {
  Address: string;
  City: string;
  State: string;
  Invoice_Id: number;
  ZipCode: number;
  ExtraSequence: string;
  ReferenceNumber: string;
  id: number;
};

export type IInvoiceChargesInfo = {
  Invoice_Id: number;
  Amount: number;
  Charge_Id: number;
  Id: number;
  Invoice_Description: string;
  Quantity: number;
  Rate_Type_Id: number;
  UOM: string;
};

export type IPurchaseJournalInfo = {
  Id: number;
  Vendor_Name: string;
  Invoice_Number: number;
  Amount: number;
  PayTo: string;
  Date: Date;
  Status: string;
};
