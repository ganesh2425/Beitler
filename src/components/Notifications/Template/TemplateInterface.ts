//Notification Type Decl.
export interface IType {
  id: number;
  Name: string;
  Type: number;
  Type_Desc: string;
  Description: string;
  IsActive: string;
  displayText: string;
}

//Interface Dept. Decl.
export interface Idept {
  Id: number;
  Organisation_Id: number;
  Name: string;
  Description: string;
  IsActive: boolean;
  Permission_Group_Id: number;
}

//Interace Event Decl.
export interface IEvent {
  id: number;
  name: string;
  description: string;
  IsActive: string;
}
