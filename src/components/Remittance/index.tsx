import React from 'react';
import RemittancesForm from "./RemittancesForm";
import ListingTable from "./Table";
import Paginate from "../common/Pagination";
import ListingSearch from "../common/Search";
import { PageContent, BoxHead, BoxBody } from '../../utilities/common';

const columns = [
    {
        title: 'Cheque Number',
        type: 'string'
    },
    {
        title: 'Cheque Amount',
        type: 'string'
    },
    {
        title: 'Cheque Date',
        type: 'string'
    },
    {
        title: 'Payee Name',
        type: 'string'
    },
    {
        title: 'Bank Name',
        type: 'number'
    },
    {
        title: 'Action'
    }
];

const data = [
    {
        cheque_number: '12345',
        cheque_amount: '400',
        cheque_date: '14/05/2021',
        payee_name: 'Name',
        bank_name: 'Name',
    },
    {
        cheque_number: '12346',
        cheque_amount: '500',
        cheque_date: '16/05/2021',
        payee_name: 'Name',
        bank_name: 'Name',
    }
]

// type Props = {
//     text: any
// }

type State = {
    Remittance: boolean
}

class Remittance extends React.Component {

    public readonly state: State = {
        Remittance: false
    }

    showRatesEntry = () => {
        console.log('inininin')
        this.setState({ Remittance: true })
    }

    render(): JSX.Element {
        const { Remittance } = this.state;
        return (
            <>
                {!Remittance ?
                    <PageContent>
                        <BoxHead
                            title={'Remittances Listing'}
                        ></BoxHead>
                        <BoxBody>
                            <ListingSearch
                                showAccordion={this.showRatesEntry}
                                title={'Remittance'}
                            />
                            <ListingTable
                                columns={columns}
                                data={data}
                            />
                            <Paginate />
                        </BoxBody>
                    </PageContent>
                    :
                    (
                        <RemittancesForm
                        />
                    )
                }

            </>

        );
    }
}


export default Remittance;