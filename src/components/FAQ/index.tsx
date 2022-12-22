import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import CustomerTable from "./Table";
import Paginate from "../common/Pagination";
import CustomerSearch from "../common/Search";

const columns = [
    {
        title: 'Question'
    },
    {
        title: 'Answer'
    },
    {
        title: 'Category'
    },
    {
        title: 'Sequence',
        type: 'string'
    },
    {
        title: 'Is Active',
        type: 'string'
    },
    {
        title: 'Action'
    }
];

const data = [
    {
        sequence: '1'
    },
    {
        sequence: '6'
    }
]

type Props = {
    text: any
}

type State = {
    accordion: boolean
}

class EDI extends React.Component {

    public readonly state: State = {
        accordion: false
    }

    showAccordion = () => {
        console.log('inininin')
        this.setState({ accordion: true })
    }

    render(): JSX.Element {
        return (
            <>
                <div className="content-wrapper inner-pages">
                    <div className="page-content fade-in-up">
                        <div className="row">
                            <div className="col-lg">
                                <div className="ibox">
                                    <div className="ibox-head">
                                        <div className="ibox-title">FAQ</div>
                                        <div className="ibox-tools">
                                            <a className="ibox-collapse">
                                                <FontAwesomeIcon icon={faMinus} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="ibox-body">
                                        <div className="inbound-table position-relative">
                                            <div className="expensens-table">
                                                <CustomerSearch showAccordion={this.showAccordion} title={'FAQ'} />
                                                <CustomerTable columns={columns} data={data} />
                                                <Paginate />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default EDI;