export interface addTypesFormData {
    Id: number;
    type: string
    department: string
    name: string
    title: string
    phone: string
    ext: string
    mobile: string
    email: string
}

export interface IType {
    createdBy: number
    createdDt: Date
    displayText: string
    id: number
    isActive: boolean
    isDeleted: boolean
    modifiedBy: number
    modifiedDt: Date
    sequence: number
    type: string
    value: string
}

export interface Idept {
    createdBy: number
    createdDt: Date
    description: string
    entity_Id: number
    id: number
    isActive: boolean
    isDeleted: boolean
    modifiedBy: number
    modifiedDt: Date
    name: string
    permission_Group_Id: number

}

export interface addEventsFormData {
    id: number
    name: string
    description: string
    isActive: boolean
    IsDeleted: boolean
}

export interface addPermissionFormData {
    id: 0
    name: string
    description: string
    parent: number
}

export interface addPermissionGroupFormData {
    id: number
    name: string
    description: string
    parent: number
    mapped: []
    master: []
}

export interface IContact {
    createdBy: number
    createdDt: Date
    displayText: string
    id: number
    isActive: boolean
    isDeleted: boolean
    modifiedBy: number
    modifiedDt: Date
    sequence: number
    type: string
    value: string

}