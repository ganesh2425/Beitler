import { API_URLS } from "../utilities/api_url_constants";
import RestDataSource from "../utilities/restDataSource";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getLookupData = (lookupType: string) => {
  const url = API_URLS.BASE_URL + API_URLS.lookup;
  let lookUpResponseData = [];
  return new Promise((resolve, reject) => {
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .GetOneByParam(lookupType, (res: any) => {
        lookUpResponseData = res;
        resolve(lookUpResponseData);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

//
export const getNotificationEvents = (lookupType: string) => {
  const url = API_URLS.BASE_URL + API_URLS.GET_NOTIFICATION_EVENT;
  let lookUpResponseData = [];
  return new Promise((resolve, reject) => {
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .GetOneByParam(lookupType, (res: any) => {
        lookUpResponseData = JSON.parse(res.data);
        const updte = lookUpResponseData.filter(
          (item: any) => item.isActive === true && item.name !== ""
        );
        resolve(updte);
      })
      .catch((reason: any) => {
        if (reason["message"] === "Network Error") {
          throw reason["message"];
        } else {
          console.log(reason);
          reject(reason);
        }
      });
  });
};

export const getInvoiceRatesByCustId = (CustId: any) => {
  const url = API_URLS.BASE_URL + API_URLS.GET_RATE_MASTER_BY_CUSTID;
  let CustRateslookUpResponseData = [];

  const rateByCustId = "Id=" + CustId;
  return new Promise((resolve, reject) => {
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .GetOneByParam(rateByCustId, (res: any) => {
        CustRateslookUpResponseData = JSON.parse(JSON.parse(res.data));

        const updte = CustRateslookUpResponseData.filter(
          (item: any) =>
            Boolean(item.ratesMaster.IsActive) === true &&
            item.ratesMaster.customerId === parseInt(CustId)
        );

        resolve(updte);
      })
      .catch((reason: any) => {
        if (reason["message"] === "Network Error") {
          throw reason["message"];
        } else {
          console.log(reason);
          reject(reason);
        }
      });
  });
};

export const getFuelPriceHistory = () => {
  const url = API_URLS.BASE_URL + API_URLS.GET_FUELPRICE_HISTORY_LIST;
  let FuelPriceHistoryResponseData = [];

  return new Promise((resolve, reject) => {
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .GetData((res: any) => {
        FuelPriceHistoryResponseData = JSON.parse(JSON.parse(res.data));
        resolve(FuelPriceHistoryResponseData);
      })
      .catch((reason: any) => {
        if (reason["message"] === "Network Error") {
          throw reason["message"];
        } else {
          console.log(reason);
          reject(reason);
        }
      });
  });
};

export const getFuelSurchargeAdjustment = (fuelPrice: any) => {
  const url = API_URLS.BASE_URL + API_URLS.FUEL_SURCHARGE_LIST;
  let FuelPriceHistoryResponseData = [];

  const fuelSurchargeAdjustment = "fuelPrice = " + fuelPrice;
  return new Promise((resolve, reject) => {
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .GetOneByParam(fuelSurchargeAdjustment, (res: any) => {
        FuelPriceHistoryResponseData = JSON.parse(res.data);
        resolve(FuelPriceHistoryResponseData);
      })
      .catch((reason: any) => {
        if (reason["message"] === "Network Error") {
          throw reason["message"];
        } else {
          console.log(reason);
          reject(reason);
        }
      });
  });
};
