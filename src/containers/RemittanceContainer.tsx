import React from "react";
import Remittance from "../components/Remittance";

class RemittanceContainer extends React.Component<any, any>{

    render(): JSX.Element {
        return (
            <div>
                <Remittance />
            </div>
        )
    }
}

export default RemittanceContainer