import React from "react";
import Order from "../components/Order";
import requireAuthentication from "../utilities/requireAuth";

const OrderContainer = (): JSX.Element => {

    return (
        <div>
            <Order />
        </div>
    )
}

export default requireAuthentication(OrderContainer)