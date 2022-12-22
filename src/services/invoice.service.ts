import { INotificationTemplateEntryFormPayload } from "../interfaces/types";
import { API_URLS } from "../utilities/api_url_constants";
import RestDataSource from "../utilities/restDataSource";

/**
 * This Api is for GET of the Notification Template
 * It accepts the payload
 * @param payload
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const FetchInvoiceDetailsByIdnType = (payload: any) => {
  //API URL Call from Constant

  const url = API_URLS.BASE_URL + API_URLS.GET_INVOICE_LIST;
  const params =
    "Id=" + payload.payload.Id + "&InvoiceType=" + payload.payload.Type;
  let responseData = [];
  //New Promise Call

  return new Promise((resolve, reject) => {
    //Rest Datasource call
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .GetOneByParam(params, (res: any) => {
        responseData = res;

        resolve(responseData);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const CreateInvoice = (payload: any) => {
  //API URL Call from Constant

  const url = API_URLS.BASE_URL + API_URLS.CREATE_INVOICE;
  let responseData = [];
  //New Promise Call

  return new Promise((resolve, reject) => {
    //Rest Datasource call
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .Store(payload.payload, (res: any) => {
        responseData = res;
        resolve(responseData);
      })
      .catch((err: any) => {
        console.log(err);
        reject(err);
      });
  });
};

export const AddEdiRequest = (payload: any) => {
  //API URL Call from Constant

  const url = API_URLS.BASE_URL + API_URLS.ADD_EDI;
  let responseData = [];
  //New Promise Call

  return new Promise((resolve, reject) => {
    //Rest Datasource call
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .Store(payload.payload, (res: any) => {
        responseData = res;
        resolve(responseData);
      })
      .catch((err: any) => {
        console.log(err);
        reject(err);
      });
  });
};

export const UpdateInvoice = (payload: any) => {
  //API URL Call from Constant

  const url = API_URLS.BASE_URL + API_URLS.UPDATE_INVOICE;
  let responseData = [];
  //New Promise Call

  return new Promise((resolve, reject) => {
    //Rest Datasource call
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .Update(payload.payload, (res: any) => {
        responseData = res;
        resolve(responseData);
      })
      .catch((err: any) => {
        console.log(err);
        reject(err);
      });
  });
};

/**
 *
 * @param payload
 * @returns
 */
export const CreatePurchaseJournal = (payload: any) => {
  //API URL Call from Constant

  const url = API_URLS.BASE_URL + API_URLS.CREATE_PURCHASE_JOURNAL_INVOICE;
  let responseData = [];
  //New Promise Call

  return new Promise((resolve, reject) => {
    //Rest Datasource call
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .Store(payload.payload, (res: any) => {
        responseData = res;
        resolve(responseData);
      })
      .catch((err: any) => {
        console.log(err);
        reject(err);
      });
  });
};

/**
 *
 * @param payload
 * @returns
 */
export const UpdatePurchaseJournal = (payload: any) => {
  //API URL Call from Constant

  const url = API_URLS.BASE_URL + API_URLS.UPDATE_PURCHASE_JOURNAL_INVOICE;
  let responseData = [];
  //New Promise Call

  return new Promise((resolve, reject) => {
    //Rest Datasource call
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .Update(payload.payload, (res: any) => {
        responseData = res;
        resolve(responseData);
      })
      .catch((err: any) => {
        console.log(err);
        reject(err);
      });
  });
};

/**
 * This Api is for GET of the Notification Template
 * It accepts the payload
 * @param payload
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const FetchPurchaseJournalDetailsById = (payload: any) => {
  //API URL Call from Constant

  const url = API_URLS.BASE_URL + API_URLS.GET_PURCHASE_JOURNAL_LIST;
  const params =
    "Id=" + payload.payload.Id + "&PurchaseJournalType=" + payload.payload.Type;
  let responseData = [];
  //New Promise Call

  return new Promise((resolve, reject) => {
    //Rest Datasource call
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .GetOneByParam(params, (res: any) => {
        responseData = res;

        resolve(responseData);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

/**
 *
 * @param payload
 * @returns
 */
export const UpdateLastUsedNumber = (payload: any) => {
  //API URL Call from Constant

  const url = API_URLS.BASE_URL + API_URLS.UPDATE_LAST_INVOICE_NUMBER;
  let responseData = [];
  //New Promise Call

  return new Promise((resolve, reject) => {
    //Rest Datasource call
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .Update(payload, (res: any) => {
        responseData = res;
        resolve(responseData);
      })
      .catch((err: any) => {
        console.log(err);
        reject(err);
      });
  });
};
