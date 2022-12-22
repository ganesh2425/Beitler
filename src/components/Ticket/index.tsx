import React from 'react';
import AccordionLayout from "./Accordion";
import ListingTable from "./Table";
import Paginate from "../common/Pagination";
import ListingSearch from "../common/Search";
import { PageContent, BoxHead, BoxBody } from '../../utilities/common';

const columns = [
    {
        title: 'Ticket ID',
        type: 'string'
    },
    {
        title: 'Subject',
        type: 'number'
    },
    {
        title: 'Contact Name',
        type: 'string'
    },
    {
        title: 'Email',
        type: 'string'
    },
    {
        title: 'Phone Number',
        type: 'number'
    },
    {
        title: 'Event Name',
        type: 'string'
    },
    {
        title: 'Impact',
        type: 'number'
    },
    {
        title: 'Priority',
        type: 'string'
    },
    {
        title: 'Last Modified Date',
        type: 'string'
    },
    {
        title: 'Action'
    }
];

const data = [
    {
        ticket_id: 'Bl-7456',
        subject: 'sub',
        contact_name: 'name',
        email: 'a@gmail.com',
        phone_number: '9876543210',
        event_name: 'name',
        impact: 'Text',
        priority: 'Text',
        lst_modified_date: '12/05/2021'
    },
    {
        ticket_id: 'Bl-7456',
        subject: 'sub',
        contact_name: 'name',
        email: 'a@gmail.com',
        phone_number: '9876543211',
        event_name: 'name',
        impact: 'Text',
        priority: 'Text',
        lst_modified_date: '12/05/2021'
    }
]

// type Props = {
//     text: any
// }

type State = {
    accordion: boolean,
    showPopup: boolean
}

class Ticket extends React.Component {

    public readonly state: State = {
        accordion: false,
        showPopup: false
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
                            title={'Ticket Listing'}
                        ></BoxHead>
                        <BoxBody>
                            <ListingSearch
                                showAccordion={this.showAccordion}
                                title={'Ticket'}
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
                        <AccordionLayout
                            header={'Ticket Entry'}
                        />
                    )
                }

            </>

        );
    }
}


export default Ticket;