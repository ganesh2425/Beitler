import React from "react";

const CustomerTable = ({columns, data}: any): JSX.Element => {
    return (
        <div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    {
                        columns.map((column: any, i: number) => { return <th key={i}>{column.title}</th> })
                    }
                </tr>
                </thead>
                <tbody>
                {
                    data.map((v: any, i: number) => {
                        return(
                            <tr key={i}>
                                <td>{v.shipper_name}</td>
                                <td>{v.carrier_id}</td>
                                <td>{v.edi_processed}</td>
                                <td>{v.processedDate}</td>
                                <td>{v.lmsdb}</td>
                                <td>{v.ftp_processed}</td>
                                <td>{v.comments}</td>
                                <td>{v.msg_type}</td>
                                {/* <td>
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <FontAwesomeIcon icon={faPencilAlt} className='mx-2 color-highlight cursor' />
                                        </div>
                                        <FontAwesomeIcon icon={faTrashAlt} className='mx-2 color-red cursor' />
                                    </div>
                                </td> */}
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default CustomerTable;