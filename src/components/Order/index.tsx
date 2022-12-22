import React, { useEffect, useState } from 'react';
import { Row, Col, InputGroup } from "react-bootstrap";
import * as BS from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'
import CustomTableContainer from "../../containers/CommonTableContainer";
import { PageContent, BoxHead, BoxBody, fixTimezoneOffset } from '../../utilities/common';
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersRequest } from "../../actions/orderActions";
import { getOrderList } from "../../reducers/orderReducer";
import OrderTableColumn from "./Columns/OrderTableColumn";
import { history } from "../../config/history";
import { fetchDeliveryRequest, updateDeliveryRequest } from "../../actions/deliveryAction";
import { getDeliveryList, updateDeliveryList } from "../../reducers/deliveryReducer";
import DeliveryTableColumn from "./Columns/deliveryTableColumn";
import { fetchLookupRequest } from "../../actions/lookupDataActions";
import { getLookupDetails } from "../../reducers/lookupReducer";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
//
import MUIDataTable from "mui-datatables";
import {
  checkboxEnableGrid,
  optionsDisableGrid,
  optionsOtherGrid,
} from "../../styles/responsive/MuiTable";
import { title } from 'process';

let data = [] as any
let totalRecords = 0
let rpp = 10
let op:any
const Delivery = (): JSX.Element => {
    const dispatch = useDispatch();
    const [data2, setData] = useState([]);
    const [deliveryData, setDeliveryData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [pathName, setPathName] = useState('');
    const [text, setText] = useState('');
    const [tempData, setTempData] = useState([]);
    const [deliveryStatusLookupList, setDeliveryStatusLookupList] = useState([]);
    const [selectedDeliveryIndexList, setSelectedDeliveryIndexList] = useState([]);
    const [flag, setFlag] = useState(true);
    const [lateModal, setLateModal] = useState(false);
    const [reasonCodes, setLateReasonCode] = useState([]);
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const [lateReasonValue, setLateReasonValue] = useState('0');
    const [error, setError] = useState('');
    const [deliveryObject, setDeliveryObject] = useState<any>({});
    // const [lateReasonInitialValues, setLateReasonInitialValues] = useState<any>({
    //     lateReason: "",
    // });

    useEffect(() => {
        rpp = 10
        if (history.location) {
            const pathNameReplace = history.location.pathname.replace(/\\|\//g, "");
            setPathName(pathNameReplace);
            setText(pathNameReplace === 'delivery_listing' ? 'Delivery' : 'Orders Received')
            if (pathNameReplace === 'delivery_listing') {
                const payload = {
                    offset:1
                }
                getLookups();
                getDeliveryDetails(payload);
            }
            else if (pathNameReplace === 'order_outbound_listing'){
                getOrderDetails({offset:1});
            }
                
        }
    }, []);

    const getLookups = () => {
        dispatch(fetchLookupRequest({}));
    }

    const getOrderDetails = (payload = {}) => {
        dispatch(fetchOrdersRequest(payload))
    }

    const getDeliveryDetails = (payload = {}) => {

        dispatch(fetchDeliveryRequest(payload))
    }

    const ordersList = useSelector(getOrderList);
    const deliveryList = useSelector(getDeliveryList);let updateDeliveryStatusList = useSelector(updateDeliveryList);
    const allLookupsList = useSelector(getLookupDetails);

    useEffect(() => {
        if (ordersList && ordersList.data && ordersList.data.length > 0 && pathName === 'order_outbound_listing') {
            const temp: any = [];
            totalRecords = ordersList.totalRecords
            ordersList.data.map((order: any) => {
                temp.push(order)
            });
            data = temp
            setData(temp);
        }
        
        if (deliveryList && deliveryList.data && deliveryList.data.length > 0 && pathName === 'delivery_listing') {
            const temp: any = [];
            totalRecords = deliveryList.totalRecords
            deliveryList.data.map((delivery: any) => {
                temp.push(delivery)
            });
            setData(temp);
            data = temp
            setFlag(true);
        }
        else if (deliveryList.length === 0)
            setData([])
    }, [ordersList, deliveryList]);

    useEffect(() => {
        if (flag && data && data.length > 0 && allLookupsList && allLookupsList.length > 0) {
            const deliveryStatusList: any = [];
            if (allLookupsList && allLookupsList.length > 0) {
                allLookupsList.forEach((lookup: any) => {
                    if (lookup.type === 'Delivery_Status') {
                        deliveryStatusList.push(lookup);
                    }
                });
            }
            setDeliveryStatusLookupList(deliveryStatusList);
            if (pathName === 'delivery_listing' && data && data.length > 0 && deliveryStatusList.length > 0) {
                const temp: any = [...data];
                temp.forEach((delivery: any) => {
                    const deliveryStatusID = delivery.statusID;
                    const tempDeliveryStatus: any = [];
                    deliveryStatusList.forEach((status: any) => {
                        const tempStatus = { ...status }
                        tempStatus.label = tempStatus.displayText
                        if (parseInt(tempStatus.value) === parseInt(deliveryStatusID)) {
                            tempStatus.activeStatus = true;
                        }
                        tempDeliveryStatus.push(tempStatus);

                    })
                    delivery.StatusDetail = tempDeliveryStatus;
                })
                setData(temp);
                data = temp
                setTempData(temp);
            }
            setFlag(false);
        }
        if (allLookupsList) {
            const lateReasonCodes = allLookupsList.filter((rate: any) => rate.type === "Late_Reason_Code");
            setLateReasonCode(lateReasonCodes);
        }
    }, [allLookupsList, data, flag]);

    useEffect(() => {
        tempData.length > 0 && tempData.map((v: any) => {
            v.StatusDetail.forEach( (stVal: any) => {
                if( stVal.activeStatus === true){
                    v.activeDelStatus = stVal.displayText
                }
            });
            reasonCodes.forEach((rc:any) => {
                if( rc.id === v.lateReasonCode){
                    v.lrcVal = rc.displayText
                }
            })
            const actualEndTime = new Date(v.actualDeliveryEndDatetime)
            const plannedEndTime = new Date(v.plannedDeliveryEndDatetime)
            if (v.statusID === 70 && (actualEndTime > plannedEndTime)) {
                Object.assign(v, {isLateReason: true})
            } else {
                Object.assign(v, {isLateReason: false})
            }
            const k = actualEndTime > plannedEndTime
            Object.assign(v, { plannedDeliveryStartDatetime: `${new Date(v.plannedDeliveryStartDatetime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                })}`, ActualDeliveryTime: `${new Date(v.actualDeliveryArrivalDatetime).toLocaleDateString("en-US", {
                    hour:   '2-digit',
                    minute: '2-digit',
                })}`,
                actualDeliveryEndDatetime: `${new Date(v.actualDeliveryEndDatetime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour:   '2-digit',
                    minute: '2-digit',
                })}`,
                plannedDeliveryStartTime: `${new Date(v.plannedDeliveryStartDatetime).toLocaleTimeString("en-US", {
                    hour:   '2-digit',
                    minute: '2-digit',
                })}`,
                plannedDeliveryEndDatetime: `${new Date(v.plannedDeliveryEndDatetime).toLocaleTimeString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour:   '2-digit',
                    minute: '2-digit',
                })}`,
            })
        });
        setDeliveryData(tempData)
    }, [tempData])

    useEffect(() => {
        
        if (updateDeliveryStatusList.toString() && updateDeliveryStatusList.toString().length > 0) {
            //dispatch(fetchDeliveryRequest({ token: '' }));
            // debugger;
            if (updateDeliveryStatusList && updateDeliveryStatusList.indexOf('Success') > -1 && updateDeliveryStatusList.indexOf('Id') > -1) {
                const index1 = updateDeliveryStatusList.indexOf('id');
                const index2 = updateDeliveryStatusList.indexOf('}');
                const IdsString = updateDeliveryStatusList.slice(index1 + 4, index2)
                const IdsArray = IdsString.split(",");
                toast.success(`Record${IdsArray?.length > 1 ? `s` : ``} updated successfully`);
                updateDeliveryStatusList = null;
                onSearchTable();
            } else {
                toast.error(<div dangerouslySetInnerHTML={{ __html: "Some error is there for update delivey record" }} />, {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
    }, [updateDeliveryStatusList]);

    useEffect(() => {
     const el: any = document.getElementsByClassName('delivery-status-dropdown');
        if (el?.length > 0) {
            for (let i = 0; i < el.length; i++) {
                el[i].classList.remove("form-control");
            }

        }
    });

    // useEffect(() => {
    //     if (selectedDeliveryIndexList.length > 0) {
    //         deliveryData.length > 0 && deliveryData.map((v: any, index) => {
    //             const actualEndTime = new Date(v.ActualDeliveryEndDatetime)
    //             const plannedEndTime = new Date(v.PlannedDeliveryEndDatetime)
    //             const selected: any = selectedDeliveryIndexList.find((l: any) => { return l.index == index })
    //             if (selected && selected.index === index) {
    //                 if (v.StatusID === 70 && (actualEndTime > plannedEndTime)) {
    //                     Object.assign(v, {isLateReason: true})
    //                 }
    //             }
    //         })
    //         setDeliveryData(deliveryData)
    //     }
    // }, [selectedDeliveryIndexList])

    const onStatusSelect = (event: any, columnData: any, type = '') => {
        const newStatus = event.target.value;
        const tempDeliveryLookupList = [...deliveryStatusLookupList];
        const selectedStatusLookupObject: any = tempDeliveryLookupList.filter((lookup: any) => {
            return newStatus === lookup.displayText;
        })
        const tempSelectedStatusData: any = [...tempData];
        const tempObject: any = tempData[columnData.rowIndex]
        const updatedStatusObject: any = { ...tempObject };
        // delete updatedStatusObject.StatusDetail;
        if (type === 'late') {
            Object.assign(updatedStatusObject, {LateReasonCode: newStatus})
        } else if (type === 'delivery') {
            updatedStatusObject['StatusID'] = parseInt(selectedStatusLookupObject[0].value);
        }
        tempSelectedStatusData[columnData.rowIndex] = updatedStatusObject;
        setTempData(tempSelectedStatusData);
    }


    let orderTableCols: any = [];
    orderTableCols = OrderTableColumn({ });

    if (pathName === 'delivery_listing') {
        orderTableCols = DeliveryTableColumn({ onStatusSelect, reasonCodes });
    }

    const _selectedDeliveryIndex_ = (data: any) => {
        const temp: any = [...selectedDeliveryIndexList];
        if (data?.length == 0) {
            setSelectedDeliveryIndexList([]);
        } else if (data?.length === 1) {
            let _index_: any;
            const filteredSelectedIndex: any = temp.filter((i: any, index: any) => {
                if (data[0].index === i.index) {
                    _index_ = index;
                    return true;
                }
            })
            if (filteredSelectedIndex?.length > 0) {
                temp.splice(_index_, 1);
            } else {
                temp.push({ ...data[0] })
            }
            setSelectedDeliveryIndexList(temp);

        } else if (data?.length > 1) {
            const tempData: any = [...data];
            setSelectedDeliveryIndexList(tempData);
        }
    }

    const deliveryStatusUpdate = async () => {
        const tempDeliveryList = [...tempData];
        
        tempDeliveryList.forEach((delivery: any) => {
            delivery['IsActive'] = delivery['IsActive'] === 1;
            delivery['IsDeleted'] = delivery['IsDeleted'] === 1;
            delivery['PlannedShipDatetime'] = delivery['PlannedShipDatetime'] ? new Date(delivery['PlannedShipDatetime']).toISOString() : null;
            delivery['ActualDeliveryEndDatetime'] = delivery['ActualDeliveryEndDatetime'] ? new Date(delivery['ActualDeliveryEndDatetime']).toISOString() : null;
            delivery['PlannedDeliveryTargetDate'] = delivery['PlannedDeliveryTargetDate'] ? new Date(delivery['PlannedDeliveryTargetDate']).toISOString() : null;
            delivery['PlannedDeliveryEndDatetime'] = delivery['PlannedDeliveryEndDatetime'] ? new Date(delivery['PlannedDeliveryEndDatetime']).toISOString() : null;
            delivery['ActualDeliveryStartDatetime'] = delivery['ActualDeliveryStartDatetime'] ? new Date(delivery['ActualDeliveryStartDatetime']).toISOString() : null;
            delivery['PlannedDeliveryStartDatetime'] = delivery['PlannedDeliveryStartDatetime'] ? new Date(delivery['PlannedDeliveryStartDatetime']).toISOString() : null;
            delivery['ActualDeliveryArrivalDatetime'] = delivery['ActualDeliveryArrivalDatetime'] ? new Date(delivery['ActualDeliveryArrivalDatetime']).toISOString() : null;
            delivery.DeliveryItems?.length > 0 && delivery.DeliveryItems.forEach((deliveryItem: any) => {
                deliveryItem['IsActive'] = deliveryItem['IsActive'] === 1;
                deliveryItem['IsDeleted'] = deliveryItem['IsDeleted'] === 1;
                deliveryItem.DeliveryOSD?.length > 0 && deliveryItem.DeliveryOSD.forEach((deliveryOSDItem: any) => {
                    deliveryOSDItem['IsActive'] = deliveryOSDItem['IsActive'] === 1;
                    deliveryOSDItem['IsDeleted'] = deliveryOSDItem['IsDeleted'] === 1;
                })
            })
        })
        const deliveryItems: any = [];
        const payload = {} as any
        Object.assign(payload,{models:[]})
        selectedDeliveryIndexList.forEach((i: any) => {
            let newStatusId = ''
            let newReasonCode = ''
            let pk = ''
            pk = tempDeliveryList[i.index]['id']
            newStatusId = tempDeliveryList[i.index]['StatusID'] ? tempDeliveryList[i.index]['StatusID'] : tempDeliveryList[i.index]['statusID']
            newReasonCode = tempDeliveryList[i.index]['LateReasonCode'] ? tempDeliveryList[i.index]['LateReasonCode'] : tempDeliveryList[i.index]['lateReasonCode']
            const deliveryUpdate = {
                tableName: "Delivery",
                primaryKey: "Id",
                primaryKeyValue: pk.toString(),
                operation: "string",
                fields: [
                  {
                    name: "StatusID",
                    value: newStatusId.toString()
                  },
                  {
                    name: "LateReasonCode",
                    value: newReasonCode.toString()
                  }
                ],
                linkTables: [
                  null
                ]
              }
              payload.models.push(deliveryUpdate)
        })
        
        /* selectedDeliveryIndexList.forEach((i: any) => {
            deliveryItems.push(tempDeliveryList[i.index]);
        })
        const payload = {
            deliveryItems: deliveryItems
        } */
        dispatch(updateDeliveryRequest(JSON.stringify(payload)));
        setSelectedDeliveryIndexList([]);
    }

    const onChangeDeliveryDate = (date: any, type = '') => {
        type === 'start' ? setStartDate(date) : setEndDate(date)
    }

    const onSearchTable = () => {
        const payload = {
            startdate: startDate ? fixTimezoneOffset(startDate) : '',
            enddate: endDate ? fixTimezoneOffset(endDate) : fixTimezoneOffset(new Date()),
        }
        getDeliveryDetails(payload)
    }
    const onResetTable = () => {
        if (startDate === null && endDate === null) {
            console.log('do nothing')
        } else {
            setStartDate(null)
            setEndDate(null)
            const payload = {
                startdate: '01-01-0001 00:00:00',
                enddate: '01-01-0001 00:00:00'
            }
            getDeliveryDetails(payload)
        }
    }

    function handleClose(b: boolean) {
        setLateModal(b)
    }

    const onReasonChange = (b: any) => {
        setLateReasonValue(b.target.value)
        if (b.target.value !== '0') {
            setError('')
            const tempValues: any = [];
            tempData.map((v: any) => {
                if (v.id === deliveryObject.id) {
                    tempValues.push(Object.assign(v, {LateReasonCode: b.target.value}))
                } else {
                    tempValues.push(v)
                }
            });
            setTempData(tempValues)
        }
    }

    const onFormSubmit = () => {
       if (lateReasonValue === '0') {
           setError('Please choose the late reason');
       } else {
           setLateReasonValue('0')
            handleClose(false)
        }
    }
    
    const sort = (column:any, order:any) => {
        const temp = {};
        Object.assign(temp,{column : column});
        Object.assign(temp,{order : order});
        // Object.assign(temp,{column : column});
        // temp.order = order;
        // temp.page = this.state.page;
    
        // this.xhrRequest(temp).then(data => {
        //   this.setState({
        //     data,
        //     sortOrder: {
        //       name: column,
        //       direction: order
        //     }
        //   });
        // });
      };

    const customOptions = {
        footerOnly: true,
        responsive: "standard",
        rowsPerPage: rpp,
        rowsPerPageOptions: [10,20,30],
        serverSide: false,
        count: totalRecords, // Unknown number of items
        onTableChange: (action:any, tableState:any) => {
            if (action === "changePage") {
                if( pathName === 'order_outbound_listing'){
                    const payload = {
                        offset:(tableState.page+1)
                    }
                    getOrderDetails(payload)
                }
                    
                else {
                    const payload = {
                        offset:(tableState.page+1),
                        limit: rpp
                    }
                    console.log(tableState)
                    getDeliveryDetails(payload); 
                }
            }
        },

        onChangeRowsPerPage:(pages:any, tableState:any) =>{
            rpp = pages
            if( pathName === 'order_outbound_listing'){
                const payload = {
                    limit: rpp
                }
                getOrderDetails(payload)
            }
            else {
                    const payload = {
                    limit:rpp,
                        offset: tableState.page
                }
                setDeliveryData([])
                getDeliveryDetails(payload); 
                
            }
        },

        onColumnSortChange: (changedColumn:any, direction:any) => {
            console.log("sorting changedColumn ", changedColumn)
            console.log("sorting direction ", direction)
            let order = 'desc';
            if (direction === 'asc') {
              order = 'asc';
            }
            sort(changedColumn, order);
          },
          
          onSearchChange: (txt:any) => {
            
            if( pathName === 'order_outbound_listing'){
                const payload = {
                    limit: rpp
                }
                getOrderDetails(payload)
            }
            else {
                    const payload = {
                    startdate: '01-01-0001 00:00:00',
                    enddate: '01-01-0001 00:00:00',
                    limit:999999
                }
                setDeliveryData([])
                getDeliveryDetails(payload); 
                
            }
          },
          onFilterChange: (v1:any, v2:any, v3:any,v4:any,v5:any,v6:any) => {
             if( pathName === 'order_outbound_listing'){
                const payload = {
                    limit: rpp
                }
                getOrderDetails(payload)
            }
            else {
                    const payload = {
                    startdate: '01-01-0001 00:00:00',
                    enddate: '01-01-0001 00:00:00',
                    limit:999999
                }
                setDeliveryData([])
                getDeliveryDetails(payload); 
                
            } 
          }
    };

    const tableOptions = {
        isCustom : true,
        options: customOptions
    }
    useEffect(()=>{
      op=checkboxEnableGrid(pathName === 'delivery_listing' ? "Delivery.csv" : "Order.csv", _selectedDeliveryIndex_) 
        Object.assign(op, {count: totalRecords}) 
        Object.assign(op, {onTableChange: customOptions.onTableChange}) 
        Object.assign(op, {rowsPerPage: rpp}) 
        Object.assign(op, {onChangeRowsPerPage: customOptions.onChangeRowsPerPage})
        Object.assign(op, {onSearchChange: customOptions.onSearchChange})
        Object.assign(op, {onFilterChange: customOptions.onFilterChange})
        Object.assign(op, {tableId: 'deliveryListingTable'}) 
        console.log("called op", op)

    },[deliveryData, data]);

    console.log(deliveryList)
    return (
        <>
            <PageContent>
                <Row className="p-3 align-items-end justify-content-between d-flex d-block-sm">
                    {/* <Col xs="auto"> */}
                    <BS.Form.Group as={Col} controlId="formGridEmail" sm="2" className="w-sm-100">
                        <BS.Form.Label htmlFor="formGridEmail" >Start Date</BS.Form.Label>
                        <BS.InputGroup className="d-date-picker">
                            <DatePicker
                                selected={startDate ? startDate : ''}
                                onChange={(date) => onChangeDeliveryDate(date, 'start')}
                                maxDate={addMonths(new Date(), 20)}
                                placeholderText="First Delivery Date"
                                dateFormat="MM/dd/yyyy"
                            />
                            <BS.InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></BS.InputGroup.Text>
                        </BS.InputGroup>

                    </BS.Form.Group>
                    <BS.Form.Group as={Col} controlId="inlineFormInputGroup" sm="2" className="w-sm-100">
                        <BS.Form.Label htmlFor="inlineFormInputGroup" >End Date</BS.Form.Label>
                        <BS.InputGroup className="d-date-picker">
                            <DatePicker
                                selected={endDate ? endDate : ''}
                                onChange={(date) => onChangeDeliveryDate(date, 'end')}
                                maxDate={addMonths(new Date(), 20)}
                                placeholderText="First Delivery Date"
                                dateFormat="MM/dd/yyyy"
                            />
                            <BS.InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></BS.InputGroup.Text>
                        </BS.InputGroup>
                    </BS.Form.Group>
                    <BS.Form.Group as={Col} id="formGridCheckbox" sm="3" className="w-sm-100">
                        <BS.Form.Label htmlFor="inlineFormInputGroup" className="invisible" />
                        <InputGroup className="">
                            <BS.Form.Check type="checkbox" label="Show Previous Deliveries" />
                        </InputGroup>
                    </BS.Form.Group>
                    {/* </Col> */}
                    <Col>
                        <div className="d-flex justify-content-end">
                            <BS.Button
                                type="button"
                                onClick={onSearchTable}
                                className="btn btn-primary btn-md-w mr-2">Apply Filters
                            </BS.Button>
                            <BS.Button
                                type="button"
                                onClick={onResetTable}
                                className="btn btn-secondary btn-md-w">Reset Filters
                            </BS.Button>
                        </div>
                    </Col>
                </Row>
                <BoxHead
                    title={text}
                />
                <BoxBody className="table-delivery-listings">
                    <div className={pathName === 'delivery_listing' ? 'hide-columns': ''}>
                    <div id="onlyTrick">
                    <MUIDataTable
                            columns={orderTableCols}
                            data={pathName === 'delivery_listing' ? deliveryData : data}
                            // downloadFileName={ pathName === 'delivery_listing' ? "Delivery.csv" : "Order.csv"}
                            options={op}
                            // selectedDeliveryIndex={_selectedDeliveryIndex_}
                            title={''}
                     />
                    </div>
                    
                     <CustomTableContainer
                        className="table-delivery-listings"
                        options={false}
                        checkbox={true}
                        selectedDeliveryIndex={_selectedDeliveryIndex_}
                        customOptions={tableOptions}
                        /> 
                       
                    </div>
                    <div className="mt-5">
                        <div className="d-flex justify-content-end">
                            {
                                pathName === 'order_outbound_listing' ? (
                                    <>
                                        <BS.Button type="button"
                                                   className="btn btn-primary btn-md-w">Finalize order
                                        </BS.Button>
                                    </>
                                ) : (
                                    <>
                                        <BS.Button type="button"
                                                   disabled={(selectedDeliveryIndexList?.length <= 0)}
                                                   className="btn btn-primary btn-md-w"
                                                   onClick={deliveryStatusUpdate}>Bulk Save
                                        </BS.Button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </BoxBody>

                <>

                    <BS.Modal
                        show={lateModal}
                        onHide={() => handleClose(false)}
                        dialogClassName="modal-40w delete-modal"
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <BS.Modal.Header closeButton>
                            <BS.Modal.Title id="example-modal-sizes-title-lg">
                                Choose late entry reason
                            </BS.Modal.Title>
                        </BS.Modal.Header>
                        <BS.Modal.Body>
                            <BS.Row className="mb-3 d-block-sm">
                                <BS.Form.Group as={BS.Col} controlId="lateReason">
                                    <BS.Form.Label>Type <span className="required">*</span></BS.Form.Label>
                                    <select
                                        className="form-select mb-3 form-control"
                                        onChange={(e) => onReasonChange(e)}
                                        name="lateReason"
                                        value={lateReasonValue}
                                    >
                                        <option key={0} value={0} >
                                            Choose late reason
                                        </option>
                                        {reasonCodes &&
                                        reasonCodes.length > 0 &&
                                        reasonCodes.map((reasonCode: any, i: number) => {
                                            return (
                                                <option key={i} value={reasonCode.id}>
                                                    {reasonCode.value}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {
                                        error && (
                                            <div className={"error-span show"}>
                                                {error}
                                            </div>
                                        )
                                    }
                                </BS.Form.Group>
                            </BS.Row>
                        </BS.Modal.Body>
                        <BS.Modal.Footer>
                            <BS.Button variant="secondary" className="btn-md-w" onClick={() => handleClose(false)}>
                                Cancel
                            </BS.Button>
                            <BS.Button
                                variant="primary"
                                className="btn-md-w"
                                onClick={onFormSubmit}
                            >
                                Yes
                            </BS.Button>
                        </BS.Modal.Footer>
                    </BS.Modal>

                </>

            </PageContent>
        </>
    );
}


export default Delivery;