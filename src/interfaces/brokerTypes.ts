import {brokerTypes} from "../constants/actionTypes";
import {FetchPermissionsFailurePayload} from "./types";

export interface BrokersState {
    pending: boolean;
    brokers: IBrokers[];
    error: string | null;
}

export interface FetchBrokersSuccessPayload {
    brokers: IBrokers[];
}

export interface FetchBrokersFailurePayload {
    error: string;
}

export interface FetchBrokersRequest {
    type: typeof brokerTypes.FETCH_BROKER_REQUEST;
    payload: any
}

export interface AddBrokers {
    type: typeof brokerTypes.CREATE_BROKER;
    payload: any
}

export interface UpdateBrokers {
    type: typeof brokerTypes.UPDATE_BROKER;
    payload: any
}

export type FetchBrokersSuccess = {
    type: typeof brokerTypes.FETCH_BROKER_SUCCESS;
    payload: FetchBrokersSuccessPayload;
};

export type FetchBrokersFailure = {
    type: typeof brokerTypes.FETCH_BROKER_FAILURE;
    payload: FetchPermissionsFailurePayload;
};

export type BrokersActions =
    | FetchBrokersRequest
    | AddBrokers
    | UpdateBrokers
    | FetchBrokersSuccess
    | FetchBrokersFailure;


export interface IBrokers {
    corporateoffice: CorporateOfficeData,
    InvoiceTo: invoiceToData,
    BillingTo: billToData
}

export interface billToData {
    Id: number,
    Entity_Id: number,
    Type: string,
    Address_Id: number,
    ContactName: string,
    ContactEmail: string,
    ContactPhone: string,
    Phone: string,
    Comments: string,
    Terms: string
}

export interface invoiceToData {
    Id: number,
    Entity_Id: number,
    Type: string,
    Address_Id: number,
    ContactName: string,
    ContactEmail: string,
    ContactPhone: string,
    Phone: string,
    Comments: string,
    Terms: string
}

export interface CorporateOfficeData {
    Id: number,
    LegalName: string,
    dbaName: string,
    MC_Number: string,
    Federal_Tax_ID: string,
    DOT_Number: string,
    IsW9_YN: string,
    IsCarrier: string,
    SCAC: string,
    DUNS_Number: string,
    IsDeleted: string,
    Type: string
    Contacts: ContactsData[]
    Rules: RulesData[]
}

export interface ContactsData {
    Id: number,
    Entity_Id: number,
    Entity_Type: string,
    Type: string,
    Name: string,
    Title: string,
    Phone: string,
    Extension: string,
    Mobile: string,
    Email: string,
    Department: number
}

export interface RulesData {
    Id: number,
    EntityID: number,
    RuleId: number,
    EventId: number,
    TemplateId: number,
    IsActive: boolean
}