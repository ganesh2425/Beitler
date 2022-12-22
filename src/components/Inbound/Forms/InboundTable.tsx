import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

type IColumn = {
    title? : string,
    type? : string
}

type IProps = {
    columnData: IColumn[],
    data: any
}


class InboundTable extends React.Component <IProps, any> {
    render(): JSX.Element {
        const { columnData, data }: any = this.props;
        return(
            <div className="w-overflow">
                <table className="table table-bordered table-inbound-entry">
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
                            return(
                                <tr key={i}>
                                    <td>{v.shipper_num}</td>
                                    <td>{v.exp_pallets}</td>
                                    <td>{v.over}</td>
                                    <td>{v.short}</td>
                                    <td>{v.actual_pallets}</td>
                                    <td>{v.actual_weight}</td>
                                    <td>{v.damaged}</td>
                                    <td>{v.show_damaged}</td>
                                    <td>
                                        <div className="text-center">
                                            <FontAwesomeIcon icon={faPencilAlt} className='mx-2 color-highlight' />
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

export default InboundTable;