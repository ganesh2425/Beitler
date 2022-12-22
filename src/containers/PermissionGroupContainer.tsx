import React, { Component } from "react";
import PermissionGroup from "../components/Permission/PermissionGroup";
import requireAuthentication from "../utilities/requireAuth";

class PermissionGroupContainer extends Component {

    render():JSX.Element {
        return <div ><PermissionGroup /></div>
    }
}



export default requireAuthentication(PermissionGroupContainer);