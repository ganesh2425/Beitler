import React, {useEffect, useRef, useState} from "react";
import Modal from 'react-bootstrap/Modal'
import { Accordion, Button } from 'react-bootstrap';
import BasicDetails from "./Forms/BasicDetails";
import ListingSearch from "../common/Search";
import {PageContent, BoxBody, getLookupDataByType, constructRulesPayload} from "../../utilities/common";
import RecipientsForm from "../Rules/Forms/Recipients";
import Schedule from "./Forms/Schedule";
import {useDispatch, useSelector} from "react-redux";
import {getEventDetails} from "../../reducers/eventsReducer";
import CustomTableContainer from "../../containers/CommonTableContainer";
import ScheduleColumn from "./scheduleColumn";
import {getLookupDetails} from "../../reducers/lookupReducer";
import {createRulesRequest, updateRulesRequest} from "../../actions/rulesActions";
import moment from "moment/moment";
const date = moment();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AccordionLayout = ({header, allEntities, intervalList, onCloseAccordion, editRulesData, view}: any): JSX.Element => {
    const basicFrom : any = useRef();
    const dispatch = useDispatch();
    const [accordion, setAccordion] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [showPopupSchedule, setShowPopupSchedule] = useState(false)
    const [eventsData, setEventsData] = useState([]);
    const [rulesVal, setRulesVal] = useState([])
    const [tableData, setTableData] = useState([])
    const [contacts, setContacts] = useState([])
    const [contactsData, setContactsData] = useState([]);
    const [editData, setEditData] = useState({});
    const [isUpdate, setUpdate] = useState(false);
    const [currentContactId, setCurrentContactId] = useState(0);
    const [editRulesEntryData, setEditRuleEntryData] = useState<any>({});

    const eventsList = useSelector(getEventDetails);
    const lookupData = useSelector(getLookupDetails);

    const showAccordion = () => {
        setAccordion(true)
    }

    const onShowRulesSchedule = () => {
        setShowPopupSchedule(true);
        setCurrentContactId(0);
        setEditData([])
    }

    useEffect(() => {
        if (lookupData){
            const contacts = getLookupDataByType(lookupData, 'Contact_Type');
            setContacts(contacts)
        }
    }, [lookupData]);

    useEffect(() => {
        if (eventsList && eventsList.length > 0) {
            setEventsData(eventsList)
        }
        if (Object.keys(editRulesData).length > 0) {
            setTimeout(() => {
                setUpdate(true)
                onSetEditData(editRulesData)
            }, 500)
        } else {
            setUpdate(false)
        }
    }, [eventsList, editRulesData]);

    const onSetEditData = (data: any) => {
        console.log(data)
        setEditRuleEntryData(data);
        const temp: any = []
        if (data.rulesSchedules.length > 0) {
            data.rulesSchedules.map((rs: any) => {
                const checkData: any = intervalList.find((v: any) => v.id === parseInt(rs.intervals));
                const convertTime = rs.scheduleTime.split(":");
                date.set({
                    hour: convertTime[0],
                    minute:convertTime[1],
                    second:convertTime[2],
                    millisecond:0
                });
                const tempContacts: any = []
                rs.rulesRecipients && rs.rulesRecipients.length > 0 && rs.rulesRecipients.filter((e: any) => e.isDelete !== true).map((rr: any) => {
                    const newObj = {
                        id: rr.id,
                        RulesScheduleId: rr.rulesSchedule_Id,
                        ContactTypes: rr.contactTypes.toString(),
                        isDelete: rr.isDelete
                    };
                    tempContacts.push(newObj)
                })
                const obj = {
                    id: rs.id,
                    interval: rs.intervals.toString(),
                    scheduleTime: date.toDate(),
                    time: `${date.toDate().toLocaleTimeString("en-US", {
                        hour:   '2-digit',
                        minute: '2-digit',
                    })}`,
                    intervalData: checkData.displayText,
                    isDelete: false,
                    rule_Id: rs.rule_Id,
                    RulesRecipients: tempContacts,
                }
                temp.push(obj)
            });
            setTableData(temp);
            setRulesVal(temp);
            document.body.classList.remove("api-loading");
        }
    }

    const onScheduleSubmit = (values: any, edit = false) => {
        const checkData: any = intervalList.find((v: any) => v.id === parseInt(values.interval))
        if (edit) {
            rulesVal.map((v: any) => {
                if (v.id === currentContactId) {
                    v.interval = values.interval;
                    v.scheduleTime = values.scheduleTime;
                    v.time = `${new Date(values.scheduleTime).toLocaleTimeString("en-US", {
                        hour:   '2-digit',
                        minute: '2-digit',
                    })}`;
                    v.intervalData = checkData.displayText
                }
            });
        } else {
            Object.assign(values, {
                time: `${new Date(values.scheduleTime).toLocaleTimeString("en-US", {
                    hour:   '2-digit',
                    minute: '2-digit',
                })}`,
                intervalData: checkData.displayText,
                id: new Date().valueOf(),
                isDelete: false
            })
            const temp: any = [...rulesVal,values]
            setRulesVal(temp);
            setTableData(temp)
        }

        setShowPopupSchedule(false)
    }

    useEffect(() => {
        if (rulesVal.length > 0) {
            const newVal = rulesVal.filter((v: any) => v.isDeleted !== true);
            setTableData(newVal)
        }
    }, [rulesVal])

    const showData = (id: any, isDelete = false) => {
        if (isDelete) {
            if (isUpdate) {
                const temp : any = []
                rulesVal.map((v: any) => {
                    if (v.id === id) {
                        v.isDeleted ? v.isDeleted = true : Object.assign(v, {isDeleted: true})
                    }
                    temp.push(v)
                });
                setRulesVal(temp);
                setTableData(temp)
            } else {
                const checkData: any = rulesVal.filter((v: any) => v.id !== id);
                setRulesVal(checkData)
                setTableData(checkData)
            }
        } else {
            const checkData: any = rulesVal.find((v: any) => v.id === id);
            setEditData(checkData)
            setCurrentContactId(id)
            setShowPopupSchedule(true)
        }
    }
    const onSubmitAllContacts = (values: any, edit = false) => {
        if (currentContactId){
            rulesVal.length > 0 && rulesVal.map((v: any) => {
                if (v.id === currentContactId) {
                    if (edit) {
                        v.RulesRecipients = v.RulesRecipients.concat(values);
                    }
                    else if (v.RulesRecipients) {
                        const cValues: any = []
                        values.map((c: any, index: number) => {
                            const obj = {
                                id: new Date().valueOf() + index,
                                RulesScheduleId: v.id,
                                ContactTypes: c
                            }
                            cValues.push(obj);
                        });
                        v.RulesRecipients = v.RulesRecipients.concat(cValues);
                    } else {
                        const cValues: any = []
                        values.map((c: any, index: number) => {
                            const obj = {
                                id: new Date().valueOf() + index,
                                RulesScheduleId: v.id,
                                ContactTypes: c
                            }
                            cValues.push(obj);
                        });
                        Object.assign(v, {RulesRecipients: cValues} );
                    }
                }
            })
        }
        setShowPopup(false);
        setCurrentContactId(0)
    }

    const showRecipients = (id: any) => {
        setCurrentContactId(id);
        const checkData: any = rulesVal.find((v: any) => v.id === id);
        setContactsData(checkData.RulesRecipients ? checkData.RulesRecipients : [])
        setShowPopup(true)
    }
    let cols: any = [];
    if (rulesVal.length > 0) {
        cols = ScheduleColumn({
            showData,
            showRecipients,
            view
        });
    }

    const onSaveRules = () => {
        basicFrom.current && basicFrom.current.click();
    }
    const onRulesSubmit = (values: any, isEdit = false) => {
        let payload: any = {}
        if (isUpdate) {
            payload = constructRulesPayload(values, rulesVal);
            dispatch(updateRulesRequest(payload))
        } else {
            Object.assign(values, {id: new Date().valueOf()})
            payload = constructRulesPayload(values, rulesVal);
            dispatch(createRulesRequest(payload));
        }
        onCloseAccordion();
    }

    return (
        <>
            <PageContent>
                <BoxBody>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="main-head">{header}</Accordion.Header>
                            <Accordion.Body>
                                <BasicDetails
                                    basicFrom = {basicFrom}
                                    eventsData = {eventsData}
                                    allEntities = {allEntities}
                                    view = {view}
                                    onRulesSubmit = {onRulesSubmit}
                                    editRulesEntryData = {editRulesEntryData}
                                />
                                <div className="mt-3 rule-schedule">
                                    {!view && (
                                        <ListingSearch
                                            showAccordion={showAccordion}
                                            title={'Schedule'}
                                            showschedule={onShowRulesSchedule}
                                        />
                                    )}
                                    <CustomTableContainer
                                        columns={cols}
                                        data={tableData}
                                        options={false}
                                    />
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div className="mt-4">
                        <div className="d-flex justify-content-end">
                            <Button
                                type="button"
                                className="btn btn-secondary btn-md-w mr-2"
                                onClick={onCloseAccordion}
                            >
                                Cancel
                            </Button>
                            {
                                view ? null :
                                    <Button
                                        type="button"
                                        className="btn btn-primary btn-md-w"
                                        onClick={onSaveRules}
                                        disabled={rulesVal.length === 0}
                                    >
                                        Save
                                    </Button>
                            }

                        </div>
                    </div>
                </BoxBody>
            </PageContent>

            <Modal id=""
                   size="lg"
                   show={showPopupSchedule}
                   onHide={() => setShowPopupSchedule(false)}
                   dialogClassName="modal-50w"
                   aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Add Rules Schedule
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'rules-time-picker'}>
                    <Schedule
                        onScheduleSubmit={onScheduleSubmit}
                        intervalList={intervalList}
                        editData={editData}
                        view={view}
                    />
                </Modal.Body>
            </Modal>

            <Modal id=""
                   size="lg"
                   show={showPopup}
                   onHide={() => setShowPopup(false)}
                   dialogClassName="modal-50w"
                   aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Recipients
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RecipientsForm
                        contacts={contacts}
                        contactsData={contactsData}
                        onSubmitAllContacts={onSubmitAllContacts}
                        onCloseRecipients={() => setShowPopup(false)}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AccordionLayout;