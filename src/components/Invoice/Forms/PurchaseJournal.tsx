import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons'
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import {addDays, addMonths, subMonths, subWeeks} from 'date-fns';
import NumberFormat from 'react-number-format';
import Autosuggest from "react-autosuggest"
import { eventsTypes } from "../../../constants/actionTypes";
import "../../../styles/autosuggest.scss"
import {
    fetchCustomersRequest,
  } from "../../../actions/customerActions";
  import {
    getCustomerDetails,
    getCustomerFailure,
    getCustomerSuccess,
  } from "../../../reducers/customerReducer";
// import  {customerDetails}  from "../../../services/customerApi";
  import { useDispatch, useSelector } from "react-redux";
import { Note } from "@material-ui/icons";
let suggestions = [] as any;
let suggestionsPt = [] as any;
const customers = [] as any;
const PurchaseJournalForm = (props: any) => {
    const dispatch = useDispatch();
    const {
        proNumberDataList,
        values,
        isEdit,
        isView,
        editId,
        onChangeInputData,
        pjfor,
        LastNumber,
        disabled,
        vendorNames,
        payToNames,
        pathName
    } = props;
    const [isTheAmountValid, setIsTheAmountValid] = useState(true);
    const [val, SetVal] = useState('')
    const [payToVal, SetPayToVal] = useState('')
    const [addVendor, SetAddVendor] = useState(false)
    const [addPayTo, SetAddPayTo] = useState(false)
    const [Vendor_Name, setVendor_Name] = useState(isEdit ? values.Vendor_Name : '');
    const [Amount, setAmount] = useState(isEdit ? values.Amount : '');
    const [PayTo, setPayTo] = useState(isEdit ? values.PayTo : '');
    const [PJ_Note, setNote] = useState(isEdit ? values.Note : '');
    const [Invoice_Number, setInvoice_Number] = useState(isEdit ? values.Invoice_Number : '');
    const [Status, setStatus] = useState(isEdit ? values.Status : 'Pending');
    const [PurchaseJournal_Number, setPurchaseJournal_Number] = useState(isEdit ? values.PurchaseJournal_Number : '');
    const [Id, setId] = useState(isEdit ? values.Id : 0);
    const [date, setDate] = useState(isEdit ? new Date(values.Date) : new Date());
    const [Carrier_PRO, setCPro] = useState(isEdit ? values.Carrier_Pro : '');
    const [labelName, setLabelName] = useState(pathName === 'accounts_payable' ? 'Purchase' : 'Invoice');
    const [disablePro, setDisablePro] = useState(pathName === 'accounts_payable' ? false : true);
    const [yesChecked, setYesChecked] = useState(false);
    const [noChecked, setNoChecked] = useState(true);
    const maximumAmountAllowed = 99999.99;
    const inputMaximumLength = 25;

    useEffect(() => {
        const payload: any = {
            Vendor_Name,
            Amount,
            PayTo,
            Invoice_Number,
            Date: date.toISOString(),
            Status,
            PurchaseJournal_Number,
            Id,
            PJ_Note,
            Carrier_PRO
        };

        onVendorNameChange(Vendor_Name,true)
        if (payload['Amount']) {
            payload['Amount'] = parseFloat(parseFloat(payload['Amount']).toFixed(2));
        }
        if (payload['Invoice_Number']) {
            payload['Invoice_Number'] = parseInt(payload['Invoice_Number']);
        }
        if (Vendor_Name && Amount && isTheAmountValid && PayTo && Invoice_Number && date && Status && PurchaseJournal_Number) {
            onChangeInputData(payload, true)
        } else {
            onChangeInputData(payload, false)
        }

        payload['PJ_Note'] = PJ_Note
        payload['Carrier_PRO'] = Carrier_PRO

    }, [Vendor_Name, Amount, isTheAmountValid, PayTo, Invoice_Number, date, Status, PJ_Note]);

    const validateAmount = (e: any) => {
        const num = e.target.value;
        const amount = num.replace("$", "");
        const value = parseFloat(amount)
        const regExp: any = new RegExp(/^(\d{0,5}\.\d{1,2}|\d{1,5})$/);
        if (regExp.test(value)) {
            return true;
        } else {
            return true;
        }
    }

    const setNoteVal = (e:any)=>{
        setNote(e.target.value)
    }
    const setCarrierPro = (e:any)=>{
        setCPro(e.target.value)
    }
    const onAmountChange = (e: any) => {
        const _isItValidAmount_ = validateAmount(e);
        const amount: any = e.target.value;
        const replaceAmt = amount.replace("$", "");
        const value: any = parseFloat(replaceAmt)
        if (e.target.value) {
            if (_isItValidAmount_ && (value <= maximumAmountAllowed)) {
                setIsTheAmountValid(true);
                const amt: any = parseFloat(value).toFixed(2);
                setAmount(amt);
            } else {
                setIsTheAmountValid(false)
            }
        } else {
            setIsTheAmountValid(true);
            setAmount(undefined);
        }

    }

    const onVendorNameChange = (name:any, isNameChanged = false) => {
        if (isNameChanged) {
            // const Name: any = e.target.value;
            setVendor_Name(name);
            //onChange({newValue:e.target.value})
            
            if (/* !isEdit && */ name.length > 3) {
                const PJNum = (labelName === 'Purchase' ? "PJ-" : "IJ-" )+ pjfor + '-' + name.toString().substring(0, 3).toUpperCase() + "-" + new Date().getFullYear().toString() + "-" + (parseInt(LastNumber[0].value) + 1).toString().padStart(3, '0');
                setPurchaseJournal_Number(PJNum);
            }
        }
    }

    //Auto suggest start
    const escapeRegexCharacters = (str:string):string => { 
        return str.toString().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const getSuggestions = (value:any) => {
        const escapedValue = escapeRegexCharacters(value.value);
        if (escapedValue === '') {
            return [];
        }
        const regex = new RegExp('^' + escapedValue, 'i');
        const res= vendorNames.filter((customerName:any) => regex.test(customerName.name));
        if(res.length === 0){
            SetAddVendor(true)
        }
        else
        {
            SetAddVendor(false)   
        }
        return res
 
    };
    const getSuggestionsPt = (value:any) => {
        const escapedValue = escapeRegexCharacters(value.value);
        if (escapedValue === '') {
            return [];
        }
        const regex = new RegExp('^' + escapedValue, 'i');
        const res= payToNames.filter((customerName:any) => regex.test(customerName.name));
        if(res.length === 0){
            SetAddPayTo(true)
        }
        else
        {
            SetAddPayTo(false)   
        }
        return res
 
    };

    const getSuggestionValue = (suggestion:any) => { SetPayToVal(suggestion.remitToName); return suggestion.name};
    const getSuggestionValuePt = (suggestion:any) => suggestion.name;

    const renderSuggestion = (suggestion:any) => {
        return suggestion.name
    };
    
    const renderSuggestionPt = (suggestion:any) => {
        // console.log("rendersuggestion")
        return suggestion.name
    };

    const onChange = ( e:any, newValue : any) => {
        SetVal(newValue.newValue)
        onVendorNameChange(newValue.newValue, true)
      };
      
    const onChangePt = ( e:any, newValue : any) => {
        SetPayToVal(newValue.newValue)
        //onVendorNameChange(newValue.newValue, true)
    };
    
    const onSuggestionsFetchRequested = ( value:any ) => {
        suggestions = getSuggestions(value)
    };
    
    const onSuggestionsFetchRequestedPt = ( value:any ) => {
        suggestionsPt = getSuggestionsPt(value)
        if(suggestionsPt.length === 0){
            SetAddPayTo(true)
        }
    };
    
    const onSuggestionsClearRequested = () => {
        suggestions = []
    };
    
    const onSuggestionsClearRequestedPt = () => {
        suggestionsPt = []
    };

    const setProEnable = (e:any) =>{
        if(e.target.checked && e.target.value==='yes'){
            setDisablePro(false)
        }
        else{
            setDisablePro(true)
        }
    }

    const inputProps = {
        //value:val,
       // onChange: onChange,
        className: 'form-control',
        name:"Vendor_Name",
        value:Vendor_Name ? Vendor_Name : val,
        maxLength:inputMaximumLength,
        onChange:onChange,
        // onChange:(e: any) => onVendorNameChange(e, true),
        disabled:isView,
        placeholder:"Name"
      };
    const inputPropsPt = {
        className: 'form-control',
        name:"PayTo",
        value: PayTo ? PayTo : payToVal,
        maxLength:inputMaximumLength,
        onChange:onChangePt,
        disabled:isView,
        placeholder: labelName==='Purchase' ? 'Pay To' : 'Bill To'
      };
    //Auto suggest end
    return (
        <div className={`${disabled ? `disabled` : ``}`}>
            <Form>
                <Row className="d-block-sm">
                    <Form.Group as={Row} className="mb-3" controlId="VendorName">
                        <Form.Label column sm="3">{labelName} Journal # </Form.Label>
                        <Col sm="9">
                            <Form.Control name="PJ_Number" maxLength={inputMaximumLength}
                                value={PurchaseJournal_Number}
                                //onChange={(e: any) => setPurchaseJournal_Number(e.target.value)}
                                type="text"
                                placeholder={labelName+ " Journal"}
                                disabled={true}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="VendorName">
                        <Form.Label column sm="3">{labelName==='Purchase' ? 'Vendor' : 'Customer'} Name</Form.Label>
                        <Col sm="9">
                                <Autosuggest // eslint-disable-line react/jsx-no-undef
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={onSuggestionsClearRequested}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                            />
                            {
                                addVendor ?
                                <a href ='/customers#add'>Add {labelName==='Purchase' ? 'Vendor' : 'Customer'}</a>
                                : 
                               ''
                            }
                        </Col>
                        <Col sm="9">
                        
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="Amount">
                        <Form.Label column sm="3">Amount</Form.Label>
                        <Col sm="9">
                            <NumberFormat
                                thousandSeparator={false}
                                prefix={'$'}
                                decimalSeparator="."
                                displayType="input"
                                type="text"
                                placeholder="Amount"
                                className="text-right form-control"
                                name='Amount'
                                disabled={isView}
                                fixedDecimalScale={true}
                                value={Amount ? Amount : ''}
                                onChange={(e: any) => { onAmountChange(e) }}
                            />
                            {
                                !isTheAmountValid &&
                                <div style={{ "color": "red", "fontSize": "12px", "fontWeight": 700 }}>Enter valid amount less than 100000 upto 2 decimal</div>
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="PayTo">
                        <Form.Label column sm="3">{labelName==='Purchase' ? 'Pay' : 'Bill'} To</Form.Label>
                        <Col sm="9">
                             <Form.Control
                                name="PayTo"
                                value={PayTo ? PayTo : payToVal}
                                maxLength={inputMaximumLength}
                                onChange={(e: any) => setPayTo(e.target.value)}
                                type="text"
                                disabled={isView}
                                placeholder="Pay To" /> 

                           {/*  <Autosuggest // eslint-disable-line react/jsx-no-undef
                                suggestions={suggestionsPt}
                                onSuggestionsFetchRequested={onSuggestionsFetchRequestedPt}
                                onSuggestionsClearRequested={onSuggestionsClearRequestedPt}
                                getSuggestionValue={getSuggestionValuePt}
                                renderSuggestion={renderSuggestionPt}
                                inputProps={inputPropsPt}
                            />
                            {
                                addPayTo === true ?
                                <a href ='/carriers#add'>Add {labelName==='Purchase' ? 'Pay' : 'Bill'}  To</a>
                                : 
                               ''
                            } */}
                        </Col>
                    </Form.Group>
                    {labelName==='Invoice' ?
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Link to Pro/Invoice # ?</Form.Label>
                        <Col sm="9">
                            <Form.Check
                                inline
                                label="Yes"
                                name="has_invoice"
                                type="radio"
                                value="yes"    
                                onClick={(e: any) => { setYesChecked(true);setNoChecked(false);  setProEnable(e) }}
                                checked={yesChecked}
                               >
                            </Form.Check>
                            
                            <Form.Check
                                    inline
                                    label="No"
                                    name="has_invoice"
                                    type="radio"
                                    value="no"    
                                    onClick={(e: any) => { setYesChecked(false); setNoChecked(true);setProEnable(e) }}
                                    checked={noChecked}
                               >
                            </Form.Check>
                           
                        </Col>

                    </Form.Group>
                    :
                    ''
                            }
                    <Form.Group as={Row} className="mb-3">
                        {/* <Form.Label column sm="3">Pro/Invoice#</Form.Label> */}
                        <Form.Label column sm="3">BLS Pro Number</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                as="select"
                                className="form-select"
                                value={Invoice_Number}
                                disabled={disablePro}
                                placeholder="Select Pro/Invoice Number"
                                onChange={(e: any) => {
                                    setInvoice_Number(e.target.value)
                                }}>
                                <option value="" key="pronumber" disabled selected={true}>Select</option>
                                {
                                    proNumberDataList?.length > 0 && proNumberDataList.map((data: any) => {
                                        return (<option value={data.Id} key={data.Id}>{data.ProNumber}</option>)
                                    })
                                }
                            </Form.Control>
                        </Col>

                    </Form.Group> 
                    {labelName==='Purchase' ?
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Carrier Pro #</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                className="form-control"
                                // value={Invoice_Number}
                                name="carrier_pro"
                                disabled={isView}
                                placeholder="Carrier PPO #"
                                onChange={(e: any) => { setCarrierPro(e) }}
                               >
                            </Form.Control>
                        </Col>

                    </Form.Group>
                    :
                    ''
                            }
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Invoice Date</Form.Label>
                        {/* <Form.Label column sm="3">Date</Form.Label> */}
                        <Col sm="9">
                            <InputGroup className="mb-2">
                                <div className="datepicker-block">
                                    <DatePicker
                                        selected={date}
                                        onChange={(date: any) => setDate(date)}
                                        minDate={subWeeks(new Date(), 1)}
                                        maxDate={addDays(new Date(), 30)}
                                        placeholderText={labelName+" Journal Entry date"}
                                        disabled={isView}
                                        className={"datepicker-input"}
                                    />
                                </div>
                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                            </InputGroup>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="Status">
                        <Form.Label column sm="3">Status</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                as="select"
                                value={Status}
                                className="form-select"
                                disabled={isView}
                                onChange={(e: any) => setStatus(e.target.value)}
                            >
                                <option value="" key="status" selected={true}>Select</option>
                                <option value="Approve" key="Approve">Approve</option>
                                <option value="Adjust" key="Adjust">Adjust</option>
                                <option value="Hold" key="Hold">Hold</option>
                                <option value="Decline" key="Decline">Decline</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>  
                    
                    <Form.Group as={Row} className="mb-3" controlId="Status">
                        <Form.Label column sm="3">Description / Note: </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                as="textarea"
                                name="pj_note"
                                value={PJ_Note}
                                className="form-control"
                                disabled={isView}
                                onChange={(e: any) => { setNoteVal(e) }}
                            >
                              
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Row>
            </Form>
        </div>
    )
}

export default PurchaseJournalForm;
