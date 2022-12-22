// Type Decl. for Notification Template
export type INotificationTemplate = {
  Info: INotificationTemplateInfo;
  //Recipients: INotificationTemplateRecipients;
};

//Interface for Notification Template Info
export type INotificationTemplateInfo = {
  id: number;
  type: number;
  type_Desc: string;
  subject: string;
  bodyText: string;
  isActive: string;
  isDeleted: boolean;
  eventName: string;
};
