
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye, faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

type Props = {
    showRecipients: () => void,
    columnData: any,
    data: any
}


const RuleEntrytable = ({ columnData, data, showRecipients }: Props) => {

    return (
        <div className="w-overflow position-relative">
            <div className="rule-sch position-absolute">
                <h5>Rules Schedule</h5>
            </div>
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
                                    <td>{v.schtime}</td>
                                    <td>{v.intervals}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faPencilAlt} className='mx-2 color-highlight' />
                                        <FontAwesomeIcon icon={faTrashAlt} className='mx-2 color-red' />
                                        {/* <div className="d-flex align-items-center" onClick={showRecipients}> */}
                                            <FontAwesomeIcon icon={faArrowRight}  onClick={showRecipients} className='mx-2 color-highlight cursor' />
                                        {/* </div> */}
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

export default RuleEntrytable;