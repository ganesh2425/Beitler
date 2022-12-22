import React, { useEffect, useState } from "react";
import * as BS from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import EntryForm from "./EntryForm";
import { BoxBody, BoxHead, PageContent } from "../../../utilities/common";
import CustomTableContainer from "../../../containers/CommonTableContainer";
import { INotificationTemplateProps } from "../../../interfaces/notificationTemplateType";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotificationTemplateRequest,
  fetchNotificationTemplateRequest,
  updateNotificationTemplateRequest,
  deleteNotificationTemplateRequest,
} from "../../../actions/templateActions";
import {
  getNotificationTemplateDetails,
  getNotificationTemplateFailure,
  getNotificationTemplateSuccess,
} from "../../../reducers/templateReducer";
import { toast } from "react-toastify";
import NotificationColumn from "../../../columns/NotificationTemplateColumn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../../common/DeleteModal";

/**
 *
 * @param Props for INotificationTemplateProps
 * @returns
 */
const Notification = ({
  text,
  NotinTempTypeLookUp,
  NotinTempEventLookUp,
}: INotificationTemplateProps): JSX.Element => {
  //#region Constant
  const dispatch = useDispatch();
  const [notifications, setnotifications] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editDataInfo, setEditDataInfo] = useState([]);
  const [deletePopup, setDeletePopup] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [toasterRaised, setToasterRaised] = useState(true);
  const [formData, setFormData] = useState({});
  //#endregion

  useEffect(() => {
    getNotificationTemplatesHandler();
  }, []);

  /**
   * Get Notification
   */
  const getNotificationTemplatesHandler = async () => {
    dispatch(await fetchNotificationTemplateRequest({}));
  };

  /**
   * Use Selector for fetching the Notification List
   */
  const notificationTemplateList: any = useSelector(
    getNotificationTemplateDetails
  );
  let notificationTemplateSuccess: any = useSelector(
    getNotificationTemplateSuccess
  );
  // eslint-disable-next-line prefer-const
  let notificationTemplateFailure: any = useSelector(
    getNotificationTemplateFailure
  );
  /**
   *  UseEffect for fetching the Notification List
   */
  useEffect(() => {
    if (notificationTemplateList) setnotifications(notificationTemplateList);
  }, [notificationTemplateList]);

  useEffect(() => {
    if (notificationTemplateFailure !== null) {
      if (notificationTemplateFailure === "Network Error") {
        window.location.assign("/login");
      }
    }
  }, [notificationTemplateFailure]);

  /**
   * Use Effect for Success Toaster
   */
  useEffect(() => {
    if (
      notificationTemplateSuccess &&
      notificationTemplateSuccess.Message === "Success" &&
      notificationTemplateSuccess.Id != deleteId &&
      isDelete &&
      !toasterRaised
    ) {
      toast.success("Deleted Successfully");
      setDeleteId(notificationTemplateSuccess.Id);
      setToasterRaised(true);
      document.body.classList.remove("api-loading");
      setTimeout(() => {
        getNotificationTemplatesHandler();
      }, 1000);
      notificationTemplateSuccess = null;
    } else if (
      notificationTemplateSuccess &&
      notificationTemplateSuccess.Message === "Success" &&
      notificationTemplateSuccess.Id != deleteId &&
      edit &&
      !toasterRaised
    ) {
      toast.success("Updated Successfully");
      setDeleteId(notificationTemplateSuccess.Id);
      setToasterRaised(true);
      setEdit(false);
      document.body.classList.remove("api-loading");
      setTimeout(() => {
        getNotificationTemplatesHandler();
      }, 1000);
      notificationTemplateSuccess = null;
    } else if (
      notificationTemplateSuccess &&
      notificationTemplateSuccess.Message === "Success" &&
      notificationTemplateSuccess.Id != deleteId &&
      !edit &&
      !toasterRaised
    ) {
      toast.success("Added Successfully");
      setDeleteId(notificationTemplateSuccess.Id);
      setToasterRaised(true);
      setEdit(false);
      document.body.classList.remove("api-loading");
      setTimeout(() => {
        getNotificationTemplatesHandler();
      }, 1000);
      notificationTemplateSuccess = null;
    }
  }, [notificationTemplateSuccess]);

  /**
   * Delete Notification Template Record
   */
  const onDeleteNotificationTemplateHandler = () => {
    //calling Dispatch method
    document.body.classList.add("api-loading");
    dispatch(deleteNotificationTemplateRequest(editDataInfo));
    setDeletePopup(false);
  };

  /**
   * Fetching the Data of the row selected and isDeleted flag is mainted
   * @param data
   * @param isDeleted
   */
  const showData = (data: any, isDeleted = false): void => {
    setDeleteId(0);
    setToasterRaised(false);
    setDeletePopup(isDeleted);
    setIsDelete(isDeleted);
    setEdit(!isDeleted);
    setShowPopup(!isDeleted);
    notificationTemplateList.map((record: any) => {
      if (record.id === data) {
        setEditDataInfo(record);
      }
    });
  };

  /**
   *  setting up Popup method for Showing the Popup
   * @param showpopup
   */
  const NotificationShowPopup = (showpopup: boolean): void => {
    setShowPopup(showpopup);
  };

  /**
   * Method is called from Popup to set the data and various paramters
   * @param data
   * @param isUpdate
   */
  const setAllFormDataHandler = (data: any, isUpdate = false) => {
    setFormData(data);
    setDeleteId(0);
    setToasterRaised(false);
    setIsDelete(false);
    setEdit(isUpdate);
    document.body.classList.add("api-loading");
    if (!isUpdate) {
      dispatch(addNotificationTemplateRequest(data));
    } else if (isUpdate) {
      dispatch(updateNotificationTemplateRequest(data));
    }
  };

  /**
   * Add Record for Seting up of the Method
   */
  const addRecordHandler = () => {
    setShowPopup(true);
    const record: any = [];
    setEditDataInfo(record);
  };

  /**
   * Initailisation of the Columns for showing in the Grid and
   * calling the Notification Column Template also passing the Lookup value
   * showData Method
   */
  let cols: any = [];
  if (NotinTempTypeLookUp.length > 0) {
    cols = NotificationColumn({
      NotinTempTypeLookUp,
      showData,
    });
  }

  const modalShowClose = () => {
    setDeletePopup(false);
  };

  /**
   * returning of JSX Element
   * Decl. of Modal for Add and Delete Confirmation
   */
  return (
    <>
      <PageContent>
        <BoxHead title={text + " Listing"} />
        <BoxBody>
          <BS.Row className="text-right mb-3">
            <div className="col-sm text-right color-highlight">
              <FontAwesomeIcon
                icon={faPlus}
                onClick={() => addRecordHandler()}
              />
              <span onClick={() => addRecordHandler()}>&nbsp;Add {text}</span>
            </div>
          </BS.Row>
          <CustomTableContainer
            title={""}
            columns={cols}
            data={notifications}
            options={true}
            downloadFileName={text + ".csv"}
          />
        </BoxBody>

        <Modal
          size="lg"
          fullscreen={"md-down"}
          show={showPopup}
          onHide={() => setShowPopup(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Notification Entry
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EntryForm
              NotinTempTypeLookUp={NotinTempTypeLookUp}
              NotinTempEventLookUp={NotinTempEventLookUp}
              showPopup={NotificationShowPopup}
              NotinEditRecord={editDataInfo}
              setFormData={setAllFormDataHandler}
            />
          </Modal.Body>
        </Modal>
        {deletePopup && (
          <DeleteModal
            show={deletePopup}
            handleClose={modalShowClose}
            onDeleteData={onDeleteNotificationTemplateHandler}
          />
        )}
      </PageContent>
    </>
  );
};

export default Notification;
