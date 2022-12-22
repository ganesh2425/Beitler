import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

type IColumn = {
    title?: string,
    type?: string
}

type IProps = {
    columnData: IColumn[],
    data: any
}


class CustomerTable extends React.Component<IProps, any> {

    render(): JSX.Element {
        const { columnData, data }: any = this.props;
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            {
                                columnData.map((column: any, i: number) => { return <th key={i}>{column.title}</th> })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((v: any, i: number) => {
                                return (
                                    <tr key={i}>
                                        <td>{v.articles_des}</td>
                                        <td>{v.articles_quantity}</td>
                                        <td>{v.damage_details}</td>
                                        <td>{v.consignee_name}</td>
                                        <td>{v.amount_claim}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <FontAwesomeIcon icon={faPencilAlt} className='mx-2 color-highlight' />
                                                <FontAwesomeIcon icon={faTrashAlt} className='mx-2 color-red' />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot className="bg-secondary inv-charges">
                        <tr>
                            <th colSpan={5}>Total Claim Amount</th>
                            <th scope="col"> $200</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }

}
export default CustomerTable;