import React, { Component } from "react";
import Permission from "../components/Permission";
import requireAuthentication from "../utilities/requireAuth";
import {withRouter} from "react-router-dom";

class PermissionContainer extends Component {

    render(): JSX.Element {
        return <div>
            <Permission />
        </div>
    }
}



export default requireAuthentication(withRouter(PermissionContainer));