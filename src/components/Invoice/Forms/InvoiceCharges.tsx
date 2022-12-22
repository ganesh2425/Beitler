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
    chargesData: any
}


class InvoiceCharges extends React.Component<IProps, any> {
    render(): JSX.Element {
        const { columnData, chargesData }: any = this.props;
        return (
            <div className="table-invoice-charges">
                <CustomTableContainer
                    title={""}
                    columns={columnData}
                    data={chargesData}
                    options={false}
                    
                />
            </div>
        )
    }
}

export default InvoiceCharges;