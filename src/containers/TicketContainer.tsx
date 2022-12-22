import React from "react";
import Ticket from "../components/Ticket";

class TicketContainer extends React.Component<any, any>{

    render(): JSX.Element {
        return (
            <div>
                <Ticket />
            </div>
        )
    }
}

export default TicketContainer