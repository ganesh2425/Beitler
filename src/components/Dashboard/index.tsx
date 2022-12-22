import React from "react";
import Filter from "../Dashboard/Filter";
import Cards from "./Cards";
import ChartLayout from "./ChartLayout";
import ProviderLayout from "./ProviderLayout";
import TableLayout from "./TableLayout";
import PerfectScrollbar from "react-perfect-scrollbar";
import StorageService from "../../services/Storage.service";

class Home extends React.Component {
  componentDidMount() {
    const authToken = StorageService.getCookies("token");
    if (authToken === undefined) {
      window.location.assign("/login");
    }
  }

  render(): JSX.Element {
    return (
      <>
        <div className="content-wrapper">
          {/* <PerfectScrollbar> */}
          <Filter />
          <div className="page-content fade-in-up">
            <Cards />
            <ChartLayout />
            <ProviderLayout />
            <TableLayout />
          </div>
          {/* </PerfectScrollbar> */}
        </div>
      </>
    );
  }
}

export default Home;
