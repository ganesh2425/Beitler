import React from "react";
import * as Yup from "yup";
import * as BS from "react-bootstrap";
import { Form, Formik, FormikProps } from "formik";
import { IEventsEntryForm } from "../../interfaces/types";
import { toast } from "react-toastify";

type Props = {
  showPopup?: any;
  NotinEditRecord?: any;
  setFormData: any;
};

type State = {
  editorState: any;
};
const validationShape = {
  NotinEventName: Yup.string()
    .required("Please enter Name")
    .matches(
      /^[0-9a-zA-Z&,@ !]*$/,
      "Name with Alphabets, Numbers and special characters such as space & @!, are allowed "
    )
    .min(2, "Length should be in 2 characters")
    .max(50, "Length should not Exceed 50 characters"),
  NotinEventDescription: Yup.string()
    .required("Please enter Description")
    .matches(
      /^[0-9a-zA-Z.&,@ !]*$/,
      " Description with Alphabets, Numbers and special characters such as dot, space & @!, are allowed"
    )
    .min(2, "Length should be in 2 characters")
    .max(150, "Length should not Exceed 150 characters"),
};

const onFormSubmit = (
  props: any,
  values: IEventsEntryForm,
  resetForm: () => void
) => {

  if (
    values.NotinEventName.trim() !== "" &&
    values.NotinEventDescription.trim() !== ""
  ) {
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
  } else {
    toast.warn("Either Name/Description is blank, which is not allowed");
  }
};

class CreateEventsForm extends React.Component<Props, State> {
  render(): JSX.Element {
    const { NotinEditRecord } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            NotinEventName: NotinEditRecord ? NotinEditRecord.name : "",
            NotinEventDescription: NotinEditRecord
              ? NotinEditRecord.description
              : "",
            isActive: NotinEditRecord ? NotinEditRecord.isActive : false,
          }}
          onSubmit={(values: IEventsEntryForm, actions) => {
            onFormSubmit(this.props, values, actions.resetForm);
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape(validationShape)}
        >
          {(props: FormikProps<IEventsEntryForm>) => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              setFieldValue,
              dirty,
              isValid,
            } = props;
            return (
              <Form>
                <BS.Row className="d-block-sm mb-2">
                  <BS.Form.Group as={BS.Col} controlId="NotinEventName">
                    <BS.Form.Label>
                      Name <span className="required">*</span>
                    </BS.Form.Label>
                    <BS.Form.Control
                      type="text"
                      placeholder="Enter Name"
                      name="NotinEventName"
                      value={values.NotinEventName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div
                      className={
                        !!(errors.NotinEventName && touched.NotinEventName)
                          ? "error-span show"
                          : "error-span"
                      }
                    >
                      {errors.NotinEventName && touched.NotinEventName
                        ? errors.NotinEventName
                        : "Enter Name"}
                    </div>
                  </BS.Form.Group>
                  <BS.Form.Group as={BS.Col} controlId="NotinEventDescription">
                    <BS.Form.Label>
                      Description <span className="required">*</span>
                    </BS.Form.Label>
                    <BS.Form.Control
                      type="text"
                      placeholder="Enter Description"
                      name="NotinEventDescription"
                      value={values.NotinEventDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div
                      className={
                        !!(
                          errors.NotinEventDescription &&
                          touched.NotinEventDescription
                        )
                          ? "error-span show"
                          : "error-span"
                      }
                    >
                      {errors.NotinEventDescription &&
                        touched.NotinEventDescription
                        ? errors.NotinEventDescription
                        : "Enter Description"}
                    </div>
                  </BS.Form.Group>
                </BS.Row>
                <BS.Row className="mb-2">
                  <BS.Form.Group as={BS.Col} controlId="isActive">
                    <BS.Form.Label className="w-auto">
                      Status&nbsp;&nbsp;
                    </BS.Form.Label>
                    <BS.Form.Check
                      type="checkbox"
                      className="status d-inline-flex align-middle"
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
                <BS.Form.Group>
                  <BS.Row>
                    {/* <div style={{ height: "50px" }}></div> */}
                  </BS.Row>
                </BS.Form.Group>
                <BS.Row className="mt-4">
                  <div className="d-flex justify-content-end">
                    <BS.Button
                      className="mr-2 btn-md-w"
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
                      type="submit"
                      disabled={!(dirty && isValid)}
                    //onClick={() => this.setState({ showPopup: false })}
                    >
                      Save
                    </BS.Button>
                  </div>
                </BS.Row>
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
}

export default CreateEventsForm;
