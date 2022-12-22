import React from "react";
import { IEvent, IType } from "./TemplateInterface";
import * as Yup from "yup";
import * as BS from "react-bootstrap";
import { Form, Formik, FormikProps } from "formik";
import { INotificationTemplateEntryForm } from "../../../interfaces/types";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
type Props = {
  NotinTempTypeLookUp?: any;
  NotinTempEventLookUp?: any;
  showPopup?: any;
  NotinEditRecord?: any;
  setFormData: any;
};

const validationShape = {
  NotinTempSubject: Yup.string().required("Subject is requied"),
  NotinTempBody: Yup.string().required("Body is required"),
  NotinTempType: Yup.string().required("Notification Type is required"),
  NotinTempEvent: Yup.string().required("Notification Event is required"),
};

const onFormSubmit = (
  props: any,
  values: INotificationTemplateEntryForm,
  resetForm: () => void
) => {
  let isEdit = false;
  if (
    props.NotinEditRecord.id !== undefined &&
    props.NotinEditRecord.id !== ""
  ) {
    Object.assign(values, { id: props.NotinEditRecord.id });
    isEdit = true;
  } else {
    if (values.isActive === undefined) {
      Object.assign(values, { isActive: false });
    }
    Object.assign(values, { id: 0 });
  }
  props.setFormData(values, isEdit);
  props.showPopup(false);
};

const onSelectChangeVal = (e: React.FormEvent, setFieldValue: any) => {
  const target = e.target as HTMLSelectElement;
  const intVal: string = target.value;
  const intName: string = target.name;
  setFieldValue(intName, intVal);
  // onSelectValue(intVal);
};

class EntryForm extends React.Component<Props> {
  render(): JSX.Element {
    const { NotinTempTypeLookUp, NotinTempEventLookUp, NotinEditRecord } =
      this.props;
    return (
      <>
        <Formik
          initialValues={{
            NotinTempType: NotinEditRecord ? NotinEditRecord.type : 0,
            NotinTempEvent: NotinEditRecord ? NotinEditRecord.eventId : 0,
            NotinTempSubject: NotinEditRecord ? NotinEditRecord.subject : "",
            NotinTempBody: NotinEditRecord ? NotinEditRecord.bodyText : "",
            isActive: NotinEditRecord ? NotinEditRecord.isActive : false,
          }}
          onSubmit={(values: INotificationTemplateEntryForm, actions) => {
            onFormSubmit(this.props, values, actions.resetForm);
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape(validationShape)}
        >
          {(props: FormikProps<INotificationTemplateEntryForm>) => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              setFieldValue,
              isValid,
              dirty,
            } = props;
            return (
              <Form>
                <BS.Row className="mb-2 d-block-sm">
                  <BS.Form.Group as={BS.Col} controlId="NotinTempType">
                    <BS.Form.Label>
                      Type <span className="required">*</span>
                    </BS.Form.Label>
                    <BS.Form.Control
                      as={"select"}
                      placeholder="Enter type"
                      name="NotinTempType"
                      value={values.NotinTempType}
                      onChange={(e) => onSelectChangeVal(e, setFieldValue)}
                      onBlur={handleBlur}
                      className="select-option form-control"
                    >
                      <option key={0} value={0}>
                        --Select Type--
                      </option>
                      {NotinTempTypeLookUp &&
                        NotinTempTypeLookUp.length > 0 &&
                        NotinTempTypeLookUp.map((type: IType, i: number) => {
                          return (
                            <option key={i} value={type.id}>
                              {type.displayText}
                            </option>
                          );
                        })}
                    </BS.Form.Control>
                    <div
                      className={
                        !!(errors.NotinTempType && touched.NotinTempType)
                          ? "error-span show"
                          : "error-span"
                      }
                    >
                      {errors.NotinTempType && touched.NotinTempType
                        ? errors.NotinTempType
                        : "Enter Notification Type"}
                    </div>
                  </BS.Form.Group>
                  <BS.Form.Group as={BS.Col} controlId="NotinTempEvent">
                    <BS.Form.Label>
                      Event <span className="required">*</span>
                    </BS.Form.Label>
                    <BS.Form.Control
                      as={"select"}
                      placeholder="Enter Event"
                      name="NotinTempEvent"
                      value={values.NotinTempEvent}
                      onChange={(e) => onSelectChangeVal(e, setFieldValue)}
                      onBlur={handleBlur}
                      className="select-option form-control"
                    >
                      <option key={0} value={0}>
                        --Select Event--
                      </option>
                      {NotinTempEventLookUp &&
                        NotinTempEventLookUp.length > 0 &&
                        NotinTempEventLookUp.map((event: IEvent, i: number) => {
                          return (
                            <option key={i} value={event.id}>
                              {event.name}
                            </option>
                          );
                        })}
                    </BS.Form.Control>
                    <div
                      className={
                        !!(errors.NotinTempEvent && touched.NotinTempEvent)
                          ? "error-span show"
                          : "error-span"
                      }
                    >
                      {errors.NotinTempEvent && touched.NotinTempEvent
                        ? errors.NotinTempEvent
                        : "Enter Notification Event"}
                    </div>
                  </BS.Form.Group>
                </BS.Row>
                <BS.Row className="mb-2 d-block-sm">
                  <BS.Form.Group as={BS.Col} controlId="NotinTempSubject">
                    <BS.Form.Label>
                      Subject <span className="required">*</span>
                    </BS.Form.Label>
                    <BS.Form.Control
                      type="text"
                      placeholder="Enter Subject"
                      name="NotinTempSubject"
                      value={values.NotinTempSubject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div
                      className={
                        !!(errors.NotinTempSubject && touched.NotinTempSubject)
                          ? "error-span show"
                          : "error-span"
                      }
                    >
                      {errors.NotinTempSubject && touched.NotinTempSubject
                        ? errors.NotinTempSubject
                        : "Enter Subject"}
                    </div>
                  </BS.Form.Group>
                </BS.Row>
                <BS.Row className="mb-2 d-block-sm">
                  <BS.Form.Group as={BS.Col} controlId="isActive">
                    <BS.Form.Label className="w-auto">
                      Status&nbsp;&nbsp;
                    </BS.Form.Label>
                    <BS.Form.Check
                      className="status d-inline-flex align-middle"
                      type="checkbox"
                      autoComplete="nope"
                      name="isActive"
                      value={values.isActive}
                      onChange={() =>
                        setFieldValue("isActive", !values.isActive)
                      }
                      onBlur={handleBlur}
                      checked={values.isActive}
                    />
                  </BS.Form.Group>
                </BS.Row>
                <BS.Row className="mb-2 d-block-sm">
                  <BS.Form.Group as={BS.Col} controlId="NotinTempBody">
                    <BS.Form.Label>
                      Body <span className="required">*</span>
                    </BS.Form.Label>
                    <CKEditor
                      name="NotinTempBody"
                      className="inputText"
                      editor={ClassicEditor}
                      onChange={(event: any, editor: any) => {
                        console.log("Blur.", editor.getData());
                        setFieldValue("NotinTempBody", editor.getData());
                      }}
                      //onChange={handleChange}
                      data={values.NotinTempBody}
                    />
                    <div
                      className={
                        !!(errors.NotinTempBody && touched.NotinTempBody)
                          ? "error-span show"
                          : "error-span"
                      }
                    >
                      {errors.NotinTempBody && touched.NotinTempBody
                        ? errors.NotinTempBody
                        : "Enter Body"}
                    </div>
                  </BS.Form.Group>
                </BS.Row>
                <BS.Row></BS.Row>
                <BS.Form.Group>
                  {/* <BS.Row>
                    <div style={{ height: "50px" }}></div>
                  </BS.Row> */}
                </BS.Form.Group>
                <div className="d-flex justify-content-end mt-2">
                  {/* <BS.Button
                    className="ml-auto btn-md-w"
                    variant="secondary"
                    onClick={() => {
                      alert("Comming Soon");
                    }}
                  >
                    Subscribe
                  </BS.Button> */}
                  <div className="d-flex">
                    <BS.Button
                      className="btn-md-w mr-2"
                      variant="secondary"
                      onClick={() => {
                        this.props.showPopup(false);
                      }}
                    >
                      Cancel
                    </BS.Button>
                    <BS.Button
                      className="btn-md-w"
                      variant="primary"
                      disabled={!(dirty && isValid)}
                      type="submit"
                    >
                      Save
                    </BS.Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
}

export default EntryForm;
