import React, {useEffect, useState} from "react";
import CustomerSearch from "../common/Search";
import { PageContent, BoxHead, BoxBody } from "../../utilities/common";
import EdiQueueColumns from "./Columns/EdiQueueColumns";
import CustomTableContainer from "../../containers/CommonTableContainer";
import {fetchEdiQueueRequest} from "../../actions/ediQueueActions";
import {useDispatch, useSelector} from "react-redux";
import {getEdiQueueList} from "../../reducers/ediQueueReducer";

const EDI =(): JSX.Element => {
    const dispatch = useDispatch();
    const [accordion, setAccordion] = useState(false)
    const [ediData, setEdiData] = useState([])
    const [tableData, setTableData] = useState([])

    const list = useSelector(getEdiQueueList);

    const showAccordion = (): void => {
        setAccordion(true)
    }

    useEffect(() => {
        getList();
    }, []);

    useEffect(() => {
        if (list && list.length > 0) {
            setEdiData(list)
        }
    }, [list])

    const getList = () => {
        // API Calls here
        dispatch(fetchEdiQueueRequest({}))
    }

    const showData = () => {
        // setEdiData(EdiData)
    }

    useEffect(() => {
        if (ediData.length > 0) {
            const tempData: any = []
            ediData.filter((c: any) => (c.IsDeleted != true || c.IsDeleted != 1)).map((v: any) => {
                Object.assign(v,
                    {
                        EDIProcessedDt:  ` ${new Date(v.EDIProcessedDt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        })} `,
                        LMSDbUpdatedDt:  ` ${new Date(v.LMSDbUpdatedDt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        })} `
                    })
                tempData.push(v)
            });
            setTableData(tempData)
        }
        if (ediData.length === 0) {
            setTableData([])
        }
    }, [ediData])

    let ediQueueCols: any = [];
    ediQueueCols = EdiQueueColumns({
        showData,
    });

    return (
        <>
            <PageContent>
                <BoxHead
                    title={'EDI Queue'}
                />
                <BoxBody>
                    <CustomerSearch showAccordion={showAccordion} title={''} />
                    <CustomTableContainer
                        columns={ediQueueCols}
                        data={tableData}
                        options={true}
                        downloadFileName={'ediQueue.csv'}
                    />
                </BoxBody>
            </PageContent>
        </>
    )
}

export default EDI;