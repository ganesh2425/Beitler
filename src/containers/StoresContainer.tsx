import React from "react";
import Stores from "../components/Stores";

class StoresContainer extends React.Component<any, any>{

    render(): JSX.Element {
        return (
            <div>
                <Stores />
            </div>
        )
    }
}

export default StoresContainer