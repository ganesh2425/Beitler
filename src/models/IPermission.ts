export interface IPermission {
    "id": number,
    "permission_Id": number,
    "name": string,
    "description": string,
    "isParentSet": boolean,
    "parentSetId": number,
    "isActive": boolean,
    "isDeleted": boolean,
    "createdBy": number,
    "createdDt": Date,
    "modifiedBy": number,
    "modifiedDt": Date
}

export interface ICustomer {
    "CorporateOffice": CorporateOffice,
    "BillTo": any,
    "DCInfo": any
}

export interface CorporateOffice {
    "LegalName": string,
    "dbaName": string
    "MC_Number": string
    "Federal_Tax_ID": string
    "DOT_Number": string
    "IsW9_YN": boolean,
    "IsCarrier": boolean,
    "SCAC": string
    "DUNS_Number": string
    "IsDeleted": boolean,
    "Type": string
    "Comments": string
    "CorporateID": number,
    "Contacts": [],
    "Rules": []
}