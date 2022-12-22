import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { history } from "./history";
import Routes from "./routes";
import Header from "../components/Dashboard/Header";
import SideBar from "../components/Dashboard/SideBar";
import Footer from "../components/Dashboard/Footer";
import StorageService from "../services/Storage.service";
import { checkTokenExpiration } from "../utilities/checkTokenExpiry";
import { useSelector } from "react-redux";
import { getConfigDetails } from "../reducers/configReducer";

const checkPath = ["/login", "/register", "/authorization"];

const Layouts = (): JSX.Element => {
  const [sidebarClass, setSidebarClass] = useState(false);

  useEffect(() => {
    const authenticated = StorageService.getCookies("token");
    if (authenticated) {
      if (authenticated && checkTokenExpiration()) {
        if (history.location.pathname === "/login") {
          history.push("/dashboard");
        }
      } else {
        StorageService.clearCookies();
        window.location.assign("/login");
      }
    }
  }, []);

  const setSideBar = (): void => {
    setSidebarClass(!sidebarClass);
  };

  const checkValue = useSelector(getConfigDetails);

  return (
    <React.Fragment>
      {checkPath.includes(history.location.pathname) ? (
        <Routes />
      ) : (
        <PerfectScrollbar>
          <div
            className={`fixed-navbar has-animation ${
              sidebarClass ? "sidebar-mini" : ""
            }`}
          >
            <div className="page-wrapper">
              <Header setSideBar={setSideBar} />
              <SideBar />
              <Routes />
              <Footer />
            </div>
          </div>
        </PerfectScrollbar>
      )}
    </React.Fragment>
  );
};

export default Layouts;
