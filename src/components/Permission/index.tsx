import React, { useEffect, useState } from "react";
import ListingSearch from "../common/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPermissionsRequest,
  createPermissionRequest,
  updatePermissionRequest,
} from "../../actions/permissionActions";
import StorageService from "../../services/Storage.service";
import { PageContent, BoxHead, BoxBody } from "../../utilities/common";
import { Col, Modal } from "react-bootstrap";
import * as Yup from "yup";
import * as BS from "react-bootstrap";
import { Formik, Form, FormikProps } from "formik";
import { addPermissionFormData } from "../../interfaces/forms";
import CustomTableContainer from "../../containers/CommonTableContainer";
import {
  getPermissionDetails,
  getPermissionSuccess,
} from "../../reducers/permissionReducer";
import { toast } from "react-toastify";
import PermissionTableColumn from "./Columns/PermissionTableColumn";
import DeleteModal from "../common/DeleteModal";

const Permission = (): JSX.Element => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const [showModal, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [removeId, setRemoveId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState("");
  const [localInitialValues, setLocalInitialValues] =
    useState<addPermissionFormData>({
      id: 0,
      name: "",
      description: "",
      parent: 0,
    });
  //////////
  const onFormSubmit = (
    values: addPermissionFormData,
    _resetForm: () => void
  ) => {
    wrapperFunction(values);
  };

  const validationShape = {
    name: Yup.string().required("Please enter name"),
    // description: Yup.string().required('Please enter the description')
  };
  //////////
  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = () => {
    const token = StorageService.getCookies("token");
    dispatch(fetchPermissionsRequest({ token: token }));
  };

  const getAllPermissions = useSelector(getPermissionDetails);
  const permission_success = useSelector(getPermissionSuccess);

  useEffect(() => {
    if (getAllPermissions.length > 0) {
      setData(getAllPermissions);
    }
  }, [getAllPermissions]);

  useEffect(() => {
    if (
      permission_success &&
      permission_success.Message === "Success" &&
      removeId === 0 &&
      success != ""
    ) {
      toast.success(`${success} Successfully`);
    } else if (
      permission_success &&
      permission_success.Message === "Success" &&
      removeId != 0 &&
      success != ""
    ) {
      toast.success(`${success} Successfully`);
    }
    getPermissions();
  }, [permission_success]);

  //For edit
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  const onGetData = (id: number): void => {
    const permissionData =
      data && data.length > 0 && data.find((v: any) => v.id === id);
    if (permissionData) {
      setLocalInitialValues({
        id: permissionData.id,
        name: permissionData.name,
        description: permissionData.description,
        parent: permissionData.parentSetId,
      });
      setEdit(true);
      handleShow();
    }
  };

  const onDeleteData = (id: number): void => {
    setDeleteModal(true);
    setRemoveId(id);
  };

  const onDeletePermission = async (id: number) => {
    const values =
      data && data.length > 0 && data.find((v: any) => v.id === id);
    const updatePermission = {
      Id: values.id,
      Name: values.name,
      Description: values.description,
      IsActive: true,
      IsDeleted: true,
      IsParentSet: values.isParentSet,
      ParentSetId: values.parentSetId,
    };
    setSuccess("Deleted");
    await dispatch(updatePermissionRequest({ updatePermission }));
    await getPermissions();
  };

  //////
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowAccordion = () => {
    setLocalInitialValues({
      id: 0,
      name: "",
      description: "",
      parent: 0,
    });
    setShow(true);
    setEdit(false);
  };

  const wrapperFunction = async (values: addPermissionFormData) => {
    handleClose();
    if (values.id !== undefined && values.id != 0) {
      const updatePermission = {
        Id: values.id,
        Name: values.name,
        Description: values.description,
        IsActive: true,
        IsParentSet: false,
        ParentSetId: values.parent,
        IsDeleted: false,
      };
      setSuccess("Updated");
      await dispatch(updatePermissionRequest({ updatePermission }));
    } else {
      const addPermission = {
        Name: values.name,
        Description: values.description,
        IsActive: true,
        IsParentSet: false,
        ParentSetId: values.parent,
      };
      setSuccess("Added");
      await dispatch(createPermissionRequest({ addPermission }));
    }
    setRemoveId(0);
    await getPermissions();
  };

  let permissionTableCols: any = [];
  permissionTableCols = PermissionTableColumn({
    onGetData,
    onDeleteData,
  });
  //////

  const modalShowClose = () => {
    setDeleteModal(false);
  };
  const onDeleteRecord = () => {
    onDeletePermission(removeId);
  };

  return (
    <div>
      <PageContent>
        <BoxHead title={"Permissions"} />
        <BoxBody>
          <ListingSearch
            title={"Permission"}
            showAccordion={handleShowAccordion}
          />
          <CustomTableContainer
            columns={permissionTableCols}
            data={Object.keys(data).length != 0 ? data : []}
            downloadFileName={"Permission.csv"}
            options={true}
          />
        </BoxBody>
      </PageContent>
      <Modal
        id="event"
        size="lg"
        show={showModal}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {edit ? "Update " : "Add "} Permissions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize
            initialValues={localInitialValues}
            onSubmit={(values: addPermissionFormData, actions) => {
              onFormSubmit(values, actions.resetForm);
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape(validationShape)}
          >
            {(props: FormikProps<addPermissionFormData>) => {
              const {
                values,
                touched,
                errors,
                handleBlur,
                handleChange,
                isValid,
                dirty,
              } = props;
              return (
                <Form autoComplete="off">
                  <BS.Row className="d-block-sm">
                    <BS.Form.Group as={Col} className="mb-3" controlId="name">
                      <BS.Form.Label column sm="4">
                        Name <span className="required">*</span>
                      </BS.Form.Label>
                      <BS.Form.Control
                        type="text"
                        placeholder="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        className={
                          !!(errors.name && touched.name)
                            ? "error-span show"
                            : "error-span"
                        }
                      >
                        {errors.name && touched.name
                          ? errors.name
                          : "Enter name"}
                      </div>
                      {/* </Col> */}
                    </BS.Form.Group>

                    <BS.Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="description"
                    >
                      <BS.Form.Label column sm="3">
                        Description
                      </BS.Form.Label>
                      {/* <Col sm="12"> */}
                      <BS.Form.Control
                        type="text"
                        placeholder="description"
                        //onChange={e => setDesc(e.target.value)}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div
                        className={
                          !!(errors.description && touched.description)
                            ? "error-span show"
                            : "error-span"
                        }
                      >
                        {errors.description && touched.description
                          ? errors.description
                          : "Enter description"}
                      </div>

                      {/* </Col> */}
                    </BS.Form.Group>
                    <BS.Form.Group as={Col} className="mb-3" controlId="parent">
                      <BS.Form.Label column sm="3">
                        Parent
                      </BS.Form.Label>
                      <BS.Form.Control
                        as={"select"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="select-option form-control"
                        name="parent"
                        value={values.parent}
                      >
                        <option key={0} value={"0"}>
                          {"Select"}
                        </option>
                        {data &&
                          data.length > 0 &&
                          data.map((p: any, i: number) => {
                            return (
                              <option key={i} value={p.id}>
                                {p.name}
                              </option>
                            );
                          })}
                      </BS.Form.Control>
                    </BS.Form.Group>
                  </BS.Row>
                  <div className="listing crp-table mt-3">
                    <div className="add-lease d-flex justify-content-end mb-2 BS.Color-highlight">
                      <BS.Row>
                        <BS.Form.Group
                          as={Col}
                          className="mb-3"
                          controlId="parent"
                        >
                          <BS.Button
                            className="btn-md-w"
                            variant="secondary"
                            onClick={() => setShow(false)}
                          >
                            Cancel
                          </BS.Button>
                          &nbsp;
                          <BS.Button
                            className="btn-md-w"
                            variant="primary"
                            type="submit"
                            disabled={!(dirty && isValid)}
                          >
                            {edit ? "Update" : "Save"}
                          </BS.Button>
                        </BS.Form.Group>
                      </BS.Row>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
      {deleteModal && removeId && (
        <DeleteModal
          show={deleteModal}
          handleClose={modalShowClose}
          onDeleteData={onDeleteRecord}
        />
      )}
    </div>
  );
};
export default Permission;
