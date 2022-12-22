import React, {useState} from 'react';
import ListingSearch from "../common/Search";
import { PageContent, BoxHead, BoxBody } from '../../utilities/common';
import InboundProjectionColumn from "./InboundProjectionColumn";
import data from '../../services/json/inboudProjection.json'
import CustomTableContainer from "../../containers/CommonTableContainer";
import PerfectScrollbar from "react-perfect-scrollbar";

const InboundProjection = (): JSX.Element => {

    const [inboundVariable, setInboundVariable] = useState(false)

    const showInboundPro = () => {
        setInboundVariable(true)
    }

    const onUploadData = () => {
        console.log('')
    }

    let cols: any = [];
    if (data.length > 0) {
        cols = InboundProjectionColumn({
            onUploadData
        });
    }

    return (
        <>
            <PageContent>
                <BoxHead
                    title={'Inbound Projection'}
                />
                <BoxBody>
                    <ListingSearch
                        Inboundprojection={showInboundPro}
                        title={''}
                        enableButtons={true}
                    />
                    <PerfectScrollbar>
                        <CustomTableContainer
                            columns={cols}
                            data={data}
                        />
                    </PerfectScrollbar>

                </BoxBody>
            </PageContent>
        </>
    );
}

export default InboundProjection;