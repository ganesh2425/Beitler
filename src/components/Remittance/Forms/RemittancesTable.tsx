import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class RemittancesTable extends React.Component<any, any> {
    render(): JSX.Element {
        const { columnData, data }: any = this.props;
        return (
            <div>

                <table className="table table-bordered m-0">
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
                                        <td>{v.invoice_number}</td>
                                        <td>{v.invoice_amount}</td>
                                        <td>{v.paid_amount}</td>
                                        <td>{v.pending_amount}</td>
                                        <td>{v.ref_number}</td>
                                        <td>{v.paid_status}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <FontAwesomeIcon icon={faPencilAlt} className='mx-2 cnn color-highlight' />
                                                <FontAwesomeIcon icon={faTrashAlt} className='mx-2 color-red' />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default RemittancesTable;