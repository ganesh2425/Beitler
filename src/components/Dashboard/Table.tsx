import React from "react";

type IProps = {
    data: IValue[]
}

interface IValue {
    name: string,
    date: string
}

const Table = ({data} : IProps): JSX.Element => {
    const values = data.map((v , key: number) => {
        return(
            <div className="card_details" key={key}>
                <h6>{v.name}</h6><span>{v.date}</span>
            </div>
        )
    })
    return(
        <div className="ibox-body">
            <div className="w-100">
                {values}
            </div>
        </div>
    )
}

export default Table;