import React  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
    showRecipients: () => void,
    columns: any,
    data: any
}


const CustomerTable = ({ columns, data, showRecipients }: Props ) =>{
   
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
                            return (
                                <tr key={i}>
                                    <td>{v.event_name}</td>
                                    <td>{v.subject}</td>
                                    <td>{v.body}</td>
                                    <td>{v.datetime}</td>
                                    <td>
                                        <div className="d-flex align-items-center" onClick={showRecipients}>
                                            <FontAwesomeIcon icon={faArrowRight} className='mx-2 color-highlight cursor' />
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

export default CustomerTable;



