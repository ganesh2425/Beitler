import React from "react";
import Rules from "../components/Rules";
import requireAuthentication from "../utilities/requireAuth";

class RulesContainer extends React.Component<any, any>{

    render(): JSX.Element {
        return (
            <div>
                <Rules />
            </div>
        )
    }
}

export default RulesContainer