import React, { useEffect, useState } from "react";
import { API_SERVICE } from "../../services/commonApi";
import StorageService from "../../services/Storage.service";
import { history } from "../../config/history";
import { getQueryParams } from "../../utilities/common";
import requireAuthentication from "../../utilities/requireAuth";
import { API_URLS } from "../../utilities/api_url_constants";

interface IQuery {
  authcode: string;
}

const CheckAuthorization = (): JSX.Element => {
  // const [queryParams, setQueryParams] = useState<IQuery>({authcode: ''});

  useEffect(() => {
    checkAuthCode();
  }, []);

  const checkAuthCode = async (): Promise<void> => {
    if (history.location && history.location.search) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const queryParams: IQuery = getQueryParams(history.location.search);
      const token = StorageService.getCookies("token");
      const payload = {
        type: "customer",
        code: queryParams?.authcode,
      };
      const response = await API_SERVICE.post(
        API_URLS.validate_link,
        payload,
        token
      );
      console.log(response);
    }
  };

  return (
    <>
      <div className={"static-page"}>sample page</div>
    </>
  );
};

export default requireAuthentication(CheckAuthorization);
