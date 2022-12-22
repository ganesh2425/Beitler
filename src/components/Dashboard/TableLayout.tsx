import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus} from "@fortawesome/free-solid-svg-icons";
import Table from "./Table";

const Claims = [
    {
        name: 'Linehaul',
        date: '189765 - 12/05/2021'
    },
    {
        name: 'Linehaul',
        date: '189765 - 12/05/2021'
    },
    {
        name: 'Linehaul',
        date: '189765 - 12/05/2021'
    },
    {
        name: 'Linehaul',
        date: '189765 - 12/05/2021'
    }
];
const Invoice = [
    {
        name: 'Bl-74567',
        date: '12/05/2021'
    },
    {
        name: 'Bl-74567',
        date: '12/05/2021'
    },
    {
        name: 'Bl-74567',
        date: '12/05/2021'
    },
    {
        name: 'Bl-74567',
        date: '12/05/2021'
    }
]

const Queues = [
    {
        name: 'AT2584',
        date: '12/05/2021'
    },
    {
        name: 'AT2584',
        date: '12/05/2021'
    },
    {
        name: 'AT2584',
        date: '12/05/2021'
    },
    {
        name: 'AT2584',
        date: '12/05/2021'
    }
];

const commonTitles = [
    {
        title: 'Claims',
        data: Claims
    },
    {
        title: 'Invoices',
        data: Invoice
    },
    {
        title: 'EDI Queue',
        data: Queues
    }
]

class TableLayout extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <div className="form-row">
                    {
                        commonTitles.map((value, i) => {
                            return(
                                <div className="col-md-4" key={i}>
                                    <div className="ibox mb-3 da_card_body budget show_all">
                                        <div className="ibox-head">
                                            <div className="ibox-title"> Top 5 {value.title}</div>
                                            <div className="ibox-tools">
                                                <div className="ibox-collapse">
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </div>
                                            </div>
                                        </div>
                                        <Table data={value.data}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default TableLayout;