import React from "react";
import Home from "../components/Dashboard";
import requireAuthentication from "../utilities/requireAuth";

class DashboardContainer extends React.Component{
    render(): JSX.Element {
        return <div>
            <Home />
        </div>;
    }
}

export default requireAuthentication(DashboardContainer);