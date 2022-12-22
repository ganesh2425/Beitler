import React from "react";
import { Redirect } from "react-router-dom";
import StorageService from "../services/Storage.service";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const withAuth = ({Component} : any) => {
    function AuthRoute (): JSX.Element {
        const authenticated = JSON.parse(StorageService.getCookies('user'));
        if (authenticated.token) {
            return <Component />;
        } else {
            return <Redirect to="/login" />;
        }
    }

    return AuthRoute;
};

export default withAuth;