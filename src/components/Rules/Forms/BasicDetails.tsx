import React, {useEffect, useState} from 'react';
import * as BS from "react-bootstrap";
import {Formik, Form, FormikProps} from "formik";
import * as Yup from "yup";


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const BasicDetailsForm = ({eventsData, allEntities, basicFrom, onRulesSubmit, editRulesEntryData, view}: any):JSX.Element => {
    const [initialValues, setInitialValues] = useState<any>({
        EventId: '',
        EntityId: '',
        ruleName: '',
        id: 0
    });

    useEffect(() => {
        if (Object.keys(editRulesEntryData).length > 0){
            setInitialValues({
                EventId: editRulesEntryData.event_Id.toString(),
                EntityId: editRulesEntryData.entity_Id.toString(),
                ruleName: editRulesEntryData.description,
                id: editRulesEntryData.id
            })
        }
    }, [editRulesEntryData])

    const validationShape = {
        EventId: Yup.string().required("Please choose event type"),
        EntityId: Yup.string().required("Please choose entity type"),
    };

    const onFormSubmit = (values: any, resetForm: any) => {
        onRulesSubmit(values, false)
        console.log(values)
    }


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values: any, actions: any) => {
                onFormSubmit(values, actions.resetForm);
                setTimeout(() => {
                    actions.setSubmitting(false);
                }, 500);
            }}
            validationSchema={Yup.object().shape(validationShape)}
            enableReinitialize
        >
            {(props: FormikProps<any>) => {
                const {
                    values,
                    touched,
                    errors,
                    handleBlur,
                    handleChange,
                    isValid,
                    dirty
                } = props;
                return (

                    <Form className="inbound-basicdetails">
                        <BS.Row className="mt-0 d-block-sm">
                            <BS.Form.Group as={BS.Col} controlId="rule name">
                                <BS.Form.Label>Rules Name</BS.Form.Label>
                                <BS.Form.Control
                                    type="text"
                                    placeholder="Rule name"
                                    name={'ruleName'}
                                    value={values.ruleName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={view}
                                />
                            </BS.Form.Group>
                            <BS.Form.Group as={BS.Col}>
                                <BS.Form.Label htmlFor="inlineFormInputGroup">Events</BS.Form.Label>
                                <BS.Form.Control
                                    as="select"
                                    className="select-option"
                                    name="EventId"
                                    value={values.EventId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={view}
                                >
                                    <option key={0} value={""}>
                                        {"Select"}
                                    </option>
                                    {eventsData &&
                                    eventsData.length > 0 &&
                                    eventsData.map((event: any, i: number) => {
                                        return (
                                            <option key={i} value={event.id}>
                                                {event.name}
                                            </option>
                                        );
                                    })}
                                </BS.Form.Control>
                                <div
                                    className={
                                        !!(errors.EventId && touched.EventId)
                                            ? "error-span show"
                                            : "error-span"
                                    }
                                >
                                    {errors.EventId && touched.EventId
                                        ? errors.EventId
                                        : "Please choose events"}
                                </div>
                            </BS.Form.Group>
                            <BS.Form.Group as={BS.Col} controlId="formGridState" sm="3" className="w-sm-100">
                                <BS.Form.Label>Entity</BS.Form.Label>
                                <BS.Form.Control
                                    as="select"
                                    className="select-option"
                                    name="EntityId"
                                    value={values.EntityId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={view}
                                >
                                    <option key={0} value={""}>
                                        {"Select"}
                                    </option>
                                    {allEntities &&
                                    allEntities.length > 0 &&
                                    allEntities.map((entity: any, i: number) => {
                                        return (
                                            <option key={i} value={entity.id}>
                                                {entity.value}
                                            </option>
                                        );
                                    })}
                                </BS.Form.Control>
                                <div
                                    className={
                                        !!(errors.EntityId && touched.EntityId)
                                            ? "error-span show"
                                            : "error-span"
                                    }
                                >
                                    {errors.EntityId && touched.EntityId
                                        ? errors.EntityId
                                        : "Please choose entity"}
                                </div>
                            </BS.Form.Group>
                            <BS.Form.Group as={BS.Col} className="invisible">
                                <BS.Form.Label htmlFor="inlineFormInputGroup" >Notification Count</BS.Form.Label>
                                <BS.InputGroup className="mb-2">
                                    <BS.FormControl id="inlineFormInputGroup" placeholder="Notification Count" />
                                    {/* <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text> */}
                                </BS.InputGroup>
                            </BS.Form.Group>
                        </BS.Row>
                        <button ref={basicFrom} type={'submit'} style={{opacity: 0}}>submit</button>
                    </Form>
                );
            }}
        </Formik>
    );
}



export default BasicDetailsForm;