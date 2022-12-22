import React, {useEffect, useState} from 'react';
import AccordionLayout from "./Accordion";
import ListingSearch from "../common/Search";
import {
    PageContent,
    BoxHead,
    BoxBody,
    SearchContent,
    getLookupDataByType, constructRatesData, constructRulesPayload
} from '../../utilities/common';
import CustomTableContainer from '../../containers/CommonTableContainer';
import PerfectScrollbar from "react-perfect-scrollbar";
import RuleColumns from "./RuleColumns";
import {fetchRulesRequest, updateRulesRequest} from "../../actions/rulesActions";
import {useDispatch, useSelector} from "react-redux";
import {getRulesDetails, getRulesSuccess} from "../../reducers/rulesReducer";
import {fetchEventsRequest} from "../../actions/eventsActions";
import {fetchLookupRequest} from "../../actions/lookupDataActions";
import {getEventDetails} from "../../reducers/eventsReducer";
import {getLookupDetails} from "../../reducers/lookupReducer";
import {toast} from "react-toastify";
import DeleteModal from "../common/DeleteModal";
import {updateRatesRequest} from "../../actions/rateActions";

const Rules = (): JSX.Element => {
    const dispatch = useDispatch();
    const [accordion, setAccordion] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [allEntities, setEntities] = useState([]);
    const [eventsData, setEventsData] = useState([]);
    const [editRulesData, setEditRuleData] = useState<any>({});
    const [intervalList, setIntervalData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [view, setView] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);

    const eventsList = useSelector(getEventDetails);
    const lookupData = useSelector(getLookupDetails);
    const success = useSelector(getRulesSuccess);
    const rulesList = useSelector(getRulesDetails);

    useEffect(() => {
        if (eventsList && eventsList.length > 0) {
            setEventsData(eventsList)
        }
        if (lookupData) {
            const entities = getLookupDataByType(lookupData, 'Entity_Type');
            const intervalData = getLookupDataByType(lookupData, 'Interval_Data');
            setIntervalData(intervalData)
            setEntities(entities)
        }
        if (success && success.Message === "Success" && !isEdit) {
            toast.success(`Added Successfully`);
            getRulesList();
        }
        if (success && success.Message === "Success" && isEdit) {
            toast.success(`Updated Successfully`);
            setIsEdit(false)
            getRulesList();
        }
    }, [eventsList, lookupData, success]);

    const showAccordion = (isNew = false) => {
        if (isNew)
            setEditRuleData({})
        setAccordion(true);
    }
    const closeAccordion = () => {
        setAccordion(false);
        setIsEdit(false)
    }

    useEffect(() => {
        getRulesList();
        getEventsList();
        getLookups();
    }, []);

    const getLookups = () => {
        dispatch(fetchLookupRequest({}));
    }

    const getRulesList = () => {
        dispatch(fetchRulesRequest({offset: 1, limit: 10}));
    }
    const getEventsList = () => {
        dispatch(fetchEventsRequest({}));
    }

    const showData = (id: any, isDelete = false): void => {
        setView(false)
        const data = rulesList.find((f: any) => f.id === id);
        setEditRuleData(data);
        setIsEdit(true)
        showAccordion();
        document.body.classList.add("api-loading");
    };

    useEffect(() => {
        if (rulesList && rulesList.length > 0) {
            const temp: any = [];
            rulesList.filter((f: any) => f.isDeleted !== true).map((v: any) => {
               const entity: any =  allEntities.find((h: any) => h.id === v.entity_Id)
               const event: any =  eventsData.find((h: any) => h.id === v.event_Id);
                Object.assign(v, { entityName: entity ? entity.displayText : '', eventName: event.name});

               temp.push(v)
            })
            setTableData(temp)
        }
    }, [rulesList]);

    const onGetData = (id: number) => {
        const data = rulesList.find((f: any) => f.id === id);
        setEditRuleData(data);
        showAccordion();
        setView(true)
    }

    const onDeleteData = (id: number) => {
        const data = rulesList.find((f: any) => f.id === id);
        setEditRuleData(data)
        setDeletePopup(true);
    }

    const onDeleteRatesData = async () => {
        // let payload: any = {}
        if (Object.keys(editRulesData).length > 0) {
            editRulesData.isDeleted = true;
            editRulesData.rulesSchedules.length > 0 && editRulesData.rulesSchedules.map((v: any) => {
                v.isDeleted = true;
                v.rulesRecipients.length > 0 && v.rulesRecipients.map((e: any) => {
                    e.isDeleted = true
                })
            });
            dispatch(updateRulesRequest(editRulesData));
            setEditRuleData([]);
            setDeletePopup(false)
        }
    }


    let cols: any = [];
    if (rulesList.length > 0) {
        cols = RuleColumns({
            showData,
            onGetData,
            onDeleteData
        });
    }

    return (
        <>
            {!accordion ?
                <PageContent>
                    <BoxHead
                        title={'Rules Listing'}
                    />
                    <BoxBody>
                        <SearchContent>
                            {/* {DisplayForm()} */}
                        </SearchContent>
                        <ListingSearch
                            showAccordion={() => showAccordion(true)}
                            title={'Rules'}
                        />
                        <PerfectScrollbar>
                            <CustomTableContainer
                                columns={cols}
                                data={tableData}
                                options={true}
                            />
                        </PerfectScrollbar>

                        {/* <Paginate /> */}
                    </BoxBody>
                </PageContent>

                :
                (
                    <AccordionLayout
                        header={'Rules Entry'}
                        allEntities={allEntities}
                        intervalList={intervalList}
                        editRulesData={editRulesData}
                        view={view}
                        onCloseAccordion={closeAccordion}
                    />
                )
            }

            {deletePopup && (
                <DeleteModal
                    show={deletePopup}
                    handleClose={() => setDeletePopup(false)}
                    onDeleteData={onDeleteRatesData}
                />
            )}
        </>

    );
}

export default Rules;