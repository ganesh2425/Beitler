import React from "react";
import EDI from "../components/EDIQueue";

class EDIContainer extends React.Component<any, any>{

    render(): JSX.Element {
        return (
            <div>
                <EDI />
            </div>
        )
    }
}

export default EDIContainer