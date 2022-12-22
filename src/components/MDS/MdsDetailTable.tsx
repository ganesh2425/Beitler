import React from 'react';

const MdsDetailTable = ({ columns, data }: any) => {

    return (
        <>
            <div className="listing">
                <table className="table table-bordered inbound-list">
                    <thead>
                        <tr>
                            {columns.map((column: any, i: number) => { return <th key={i}>{column.title}</th>; })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((v: any, i: number) => {
                            return (
                                <tr key={i}>
                                    <td>{v.StoreNumber}</td>
                                    <td>{v.address}</td>
                                    <td>{v.city}</td>
                                    <td>{v.state}</td>
                                    <td>{v.zipcode}</td>
                                    <td>{v.day}</td>
                                    <td>{v.startTime}</td>
                                    <td>{v.endTime}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MdsDetailTable;