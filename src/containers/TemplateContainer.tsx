import React, { useEffect, useState } from "react";
import Template from "../components/Notifications/Template";
import StorageService from "../services/Storage.service";
import {
  getLookupData,
  getNotificationEvents,
} from "../services/common.service";
import { toast } from "react-toastify";

/**
 *
 * @returns  Functional Notification Container
 */
const NotificationTemplate = (): JSX.Element => {
  //#region Hooks Declaration
  const [notinTempTypeLookUp, setNotinTempTypeLookUp] = useState([]);
  const [token, setToken] = useState("");
  const [notinTempEventLookUp, setNotinTempEventLookUp] = useState([]);
  //#endregion

  //#region UseEffect
  useEffect(() => {
    const authToken = StorageService.getCookies("token");
    setToken(authToken);
    getNotinTempType();
    getNotinTempEvents();
    // eslint-disable-next-line
  }, []);
  //#endregion

  //#region Methods
  const getNotinTempType = async () => {
    document.body.classList.add("api-loading");
    await getLookupData(`type=Notfn_Type`)
      .then((templateResponse: any) => {
        document.body.classList.remove("api-loading");
        setNotinTempTypeLookUp(JSON.parse(templateResponse.data));
      })
      .catch((err) => {
        document.body.classList.remove("api-loading");
        toast.error(err + " Error in Fetching Template Type");
        return false;
      });
  };

  const getNotinTempEvents = async () => {
    document.body.classList.add("api-loading");
    await getNotificationEvents(``)
      .then((templateEventResponse: any) => {
        document.body.classList.remove("api-loading");
        setNotinTempEventLookUp(templateEventResponse);
      })
      .catch((err) => {
        document.body.classList.remove("api-loading");
        toast.error(err + " Error in Fetching Template Type");
        return false;
      });
  };
  //#endregion

  //#region JSX Element
  return (
    <>
      <Template
        text={"Notification"}
        NotinTempTypeLookUp={notinTempTypeLookUp}
        NotinTempEventLookUp={notinTempEventLookUp}
      />
    </>
  );
  //#endregion
};

export default NotificationTemplate;
