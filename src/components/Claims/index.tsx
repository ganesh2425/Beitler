import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMinus
} from '@fortawesome/free-solid-svg-icons'
import AccordionLayout from "./Accordion";
import ListingTable from "./Table";
import Paginate from "../common/Pagination";
import ListingSearch from "../common/Search";
import { BoxBody, BoxHead, PageContent } from "../../utilities/common";

const columns = [
    {
        title: 'Claim Number',
        type: 'string'
    },
    {
        title: 'Carrier Name',
        type: 'number'
    },
    {
        title: 'Claim Date',
        type: 'string'
    },
    {
        title: 'Consignee Name',
        type: 'string'
    },
    {
        title: 'Invoice Number',
        type: 'number'
    },
    {
        title: 'Amount to claim',
        type: 'number'
    },
    {
        title: 'Action'
    }
];

const data = [
    {
        claim_num: 'Bl-74567',
        carrier_name: 'Linehaul',
        claim_date: '12/05/2021',
        consignee_name: 'name',
        invoice_num: 'Bl-123',
        amount_claim: '$200'
    },
    {
        claim_num: 'Bl-74565',
        carrier_name: 'Linehaul',
        claim_date: '14/05/2021',
        consignee_name: 'name',
        invoice_num: 'Bl-124',
        amount_claim: '$2300'
    }
]

// type Props = {
//     text: any
// }

type State = {
    accordion: boolean
}

class claims extends React.Component {

    public readonly state: State = {
        accordion: false
    }

    showAccordion = () => {
        console.log('inininin')
        this.setState({ accordion: true })
    }

    showPurchase = () => {
        console.log('inininin')
        this.setState({ showPopup: true })
    }

    render(): JSX.Element {
        const { accordion } = this.state;
        return (
            <>
                {!accordion ?
                    <>
                        <PageContent>
                            <BoxHead
                                title={'Claim'}
                            ></BoxHead>
                            <BoxBody>
                                <ListingSearch
                                    showAccordion={this.showAccordion}
                                    showPurchase={this.showPurchase}
                                    title={'Claim'} />
                                <ListingTable
                                    columns={columns}
                                    data={data} />
                                <Paginate />
                            </BoxBody>
                        </PageContent>
                    </>
                    :
                    (
                        <AccordionLayout
                            header={'Claim Register'}
                        />
                    )
                }

            </>

        );
    }
}


export default claims;