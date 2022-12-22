import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import CustomTableContainer from "../../../containers/CommonTableContainer";

type IColumn = {
    title?: string,
    type?: string
}

type IProps = {
    columnData: IColumn[],
    pickUpData: any
}


class InvoicePickup extends React.Component<IProps, any> {
    render(): JSX.Element {
        const { columnData, pickUpData }: any = this.props;
        return (
            <div className="table-invoice-pick">
                <CustomTableContainer
                    title={""}
                    columns={columnData}
                    data={pickUpData}
                    options={false}
                    
                />
            </div>
        )
    }
}

export default InvoicePickup;