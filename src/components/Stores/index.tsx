import React from "react";
import AccordionLayout from "./Accordion";
import CustomerTable from "./Table";
import Paginate from "../common/Pagination";
import CustomerSearch from "../common/Search";
import { PageContent, BoxHead, BoxBody } from '../../utilities/common';

const columns = [
    {
        title: 'Company Name',
        type: 'string'
    },
    {
        title: 'Store#',
        type: 'number'
    },
    {
        title: 'Type'
    },
    {
        title: 'First Del Date',
        type: 'string'
    },
    {
        title: 'City',
        type: 'string'
    },
    {
        title: 'Zipcode',
        type: 'string'
    },
    {
        title: 'Phone#',
        type: 'number'
    },
    {
        title: 'PrimaryContact#',
        type: 'string'
    },
    {
        title: 'Action'
    }
];

const data = [
    {
        company_name: 'Name',
        store_id: '13245',
        Fdd: '13/05/2021',
        city: 'New york',
        zipcode: '2658974',
        phone: '7987945646',
        primary_contact: 'Alex Daniel',
    },
    {
        company_name: 'Name 2',
        store_id: '13246',
        Fdd: '16/05/2021',
        city: 'New york',
        zipcode: '2658974',
        phone: '7987945640',
        primary_contact: 'Alex Daniel',
    }
]

type State = {
    accordion: boolean
}
class Carrier extends React.Component {

    public readonly state: State = {
        accordion: false
    }

    showAccordion = () => {
        console.log('inininin')
        this.setState({ accordion: true })
    }



    render(): JSX.Element {
        const { accordion } = this.state;
        return (
            <>
                {!accordion ?
                    <PageContent>
                        <BoxHead
                            title={'Store Listing'}
                        ></BoxHead>
                        <BoxBody>
                            <CustomerSearch showAccordion={this.showAccordion} title={'Store'} />
                            <CustomerTable columns={columns} data={data} />
                            <Paginate />
                        </BoxBody>
                    </PageContent>
                    :
                    (
                        <AccordionLayout
                            header={'Store Entry'}
                        />
                    )
                }
            </>
        )
    }
}

export default Carrier;