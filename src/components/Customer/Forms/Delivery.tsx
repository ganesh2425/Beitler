import React, {useEffect, useState} from "react";
import { Col, Form, Row } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from "react-datepicker";
import { storesIProps } from "../../../interfaces/customerTypes";
import {API_SERVICE} from "../../../services/commonApi";
import {API_URLS} from "../../../utilities/api_url_constants";
import StorageService from "../../../services/Storage.service";
const token = StorageService.getCookies("token");
import {toast} from "react-toastify";

const Delivery = ({values, handleChange, handleBlur, errors, touched, onWeekUpdate, storesDeliveryData, edit}: storesIProps):JSX.Element => {
    const [data, setData] = useState([]);
    const [localData, setLocalData] = useState([]);
    // const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        fetchData();
    }, []);

    const constructWeekData = (values: any) => {
        const temp: any = []
        const sortedValues = values.length > 0 && values.reverse();
        sortedValues.length > 0 && sortedValues.map ((v: any) => {
            const newObj = {
                Id: new Date().valueOf(),
                Days_id: v.id,
                StartTime: null,
                EndTime: null
            };
            temp.push(newObj);
        });
        setLocalData(temp);
    }

    const fetchData = async () =>  {
        return  await API_SERVICE.get(API_URLS.WEEK_MASTER, {}, token)
            .then(async (r) => {
                await setData(JSON.parse(r.data));
                if (storesDeliveryData.length === 0)
                    await constructWeekData(JSON.parse(r.data));
                else {
                    const temp: any = []
                    const sortedValues = storesDeliveryData.length > 0 && storesDeliveryData.reverse();
                    sortedValues.length > 0 && sortedValues.map ((v: any) => {
                        const datetime = (v.StartTime);
                        const convertDateTime = new Date(datetime);
                        const hour = convertDateTime.getHours();
                        const newObj = {
                            Id: v.Id,
                            Days_id: v.Days_id,
                            StartTime: hour > 0 && edit ? v.StartTime : null,
                            EndTime: hour > 0 && edit ? v.EndTime : null
                        };
                        temp.push(newObj);
                    });

                    setLocalData(temp)
                }
            })
            .catch((e: any) => {
                console.log(e)
            })
    }

    const onChangeTime = (val: any, id: number, text='start') => {
        const changeArray: any =[];
        localData.map((v:any) => {
            if (v.Days_id === id) {
                if (text === 'end') {
                    if (v.StartTime < val) {
                        v.EndTime = val
                    } else {
                        toast.error('Please choose future time')
                    }
                } else if(text === 'start') v.StartTime = val

            }
            changeArray.push(v)
        });
        onWeekUpdate(changeArray);
        setLocalData(changeArray);
    }

    const onCommentChange = () => {
        onWeekUpdate(localData);
    }

    return (
        <div>
            <Row className="my-2 d-block-sm">
                <Col>
                    <Form>
                        <Row className="">
                            <div className="pl-0"><h5>Delivery Schedule</h5></div>
                            <table className="table table-bordered table_del-schedule mb-0">
                                <thead>
                                <tr>
                                    <th scope="col">Days</th>
                                    <th scope="col">Early Arrival</th>
                                    <th scope="col">Late Arrival</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    localData.length > 0 && localData.map((value: any, i: number) => {
                                        const days: any = data.find((v:any) => v.id === value.Days_id)
                                        return (
                                            <tr key={i}>
                                                <th style={{ width: '188px' }}>
                                                    <span className="content">{days.days}</span>
                                                </th>
                                                <td>
                                        <span className="content">
                                            <DatePicker
                                                selected={value.StartTime ? value.StartTime : null}
                                                onChange={(date: any) => {onChangeTime(date, days.id, 'start')}}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                dateFormat="HH:mm"
                                                timeFormat="HH:mm"
                                            />
                                        </span>
                                                </td>
                                                <td>
                                        <span className="content">
                                            <DatePicker
                                                selected={value.EndTime? value.EndTime : null}
                                                onChange={(date: any) => onChangeTime(date, days.id, 'end')}
                                                showTimeSelect
                                                dateFormat="HH:mm"
                                                timeFormat="HH:mm"
                                                showTimeSelectOnly
                                            />
                                        </span>
                                                </td>

                                            </tr>
                                        )
                                    })

                                }
                                </tbody>
                            </table>
                        </Row>
                    </Form>
                </Col>
                <Col>
                    <div><h5>Delivery Instruction (show on BOL)</h5></div>
                    <FloatingLabel controlId="DeliveryInstruction" label="">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            name='DeliveryInstruction'
                            style={{ height: '266px' }}
                            value={values.DeliveryInstruction}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyUp={onCommentChange}
                        />
                        <div className={!!(errors.DeliveryInstruction && touched.DeliveryInstruction) ? 'error-span show' : 'error-span'}>
                            {
                                errors.DeliveryInstruction && touched.DeliveryInstruction
                                    ? errors.DeliveryInstruction
                                    : 'Enter Delivery Instruction'
                            }</div>
                    </FloatingLabel>
                </Col>
            </Row>

        </div>
    )
}
export default Delivery;