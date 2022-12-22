import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventsRequest,
  createEventsRequest,
  updateEventsRequest,
  deleteEventsRequest,
} from "../../actions/eventsActions";
import { Modal } from "react-bootstrap";
import * as BS from "react-bootstrap";
import { BoxBody, BoxHead, PageContent } from "../../utilities/common";
import {
  getEventDetails,
  getEventFailure,
  getEventSuccess,
} from "../../reducers/eventsReducer";
import { toast } from "react-toastify";
import EventsColumn from "../../columns/EventsColumn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CustomTableContainer from "../../containers/CommonTableContainer";
import CreateEventsForm from "./CreateEvents";
import DeleteModal from "../common/DeleteModal";

const Events = ({ text }: any): JSX.Element => {
  //#region Constant
  const dispatch = useDispatch();
  const [eventsListing, setEventsListing] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editDataInfo, setEditDataInfo] = useState([]);
  const [deletePopup, setDeletePopup] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [rowId, setRowId] = useState(0);
  const [toasterRaised, setToasterRaised] = useState(true);
  const [formData, setFormData] = useState({});
  const [tempData, setTempData] = useState([]);
  const [selectedDeliveryIndexList, setSelectedDeliveryIndexList] = useState([]);
  //#endregion
  /**
   *
   */
  useEffect(() => {
    getEventsListingHandler();
  }, []);

  /**
   *
   */
  const getEventsListingHandler = () => {
    dispatch(fetchEventsRequest({}));
  };

  /**
   * Use Selector for fetching the Events List
   */
  const eventsListings: any = useSelector(getEventDetails);

  /**
   * Use Selector for fetching the Notification Success
   */
  let eventsSuccess: any = useSelector(getEventSuccess);

  /**
   *
   */
  // eslint-disable-next-line prefer-const
  let eventsFailure: any = useSelector(getEventFailure);

  /**
   *  UseEffect for fetching the Notification List
   */
  useEffect(() => {
    if (eventsListings) setEventsListing(eventsListings);
  }, [eventsListings]);

  /**
   *
   */
  useEffect(() => {
    if (eventsFailure !== null) {
      if (eventsFailure === "Network Error") {
        window.location.assign("/login");
      }
    }
  }, [eventsFailure]);

  /**
   * Use Effect for Success Toaster
   */
  useEffect(() => {
    if (
      eventsSuccess &&
      eventsSuccess.Message === "Success" &&
      eventsSuccess.Id === rowId &&
      isDelete &&
      !toasterRaised
    ) {
      toast.success("Deleted Successfully");
      setRowId(eventsSuccess.Id);
      setToasterRaised(true);
      document.body.classList.remove("api-loading");
      setTimeout(() => {
        getEventsListingHandler();
      }, 1000);
      eventsSuccess = null;
    } else if (
      eventsSuccess &&
      eventsSuccess.Message === "Success" &&
      eventsSuccess.Id === rowId &&
      edit &&
      !toasterRaised
    ) {
      toast.success("Updated Successfully");
      setRowId(eventsSuccess.Id);
      setToasterRaised(true);
      setEdit(false);
      document.body.classList.remove("api-loading");
      setTimeout(() => {
        getEventsListingHandler();
      }, 1000);
      eventsSuccess = null;
    } else if (
      eventsSuccess &&
      eventsSuccess.Message === "Success" &&
      eventsSuccess.Id != rowId &&
      !edit &&
      !toasterRaised
    ) {
      toast.success("Added Successfully");
      setRowId(eventsSuccess.Id);
      setToasterRaised(true);
      setEdit(false);
      document.body.classList.remove("api-loading");
      setTimeout(() => {
        getEventsListingHandler();
      }, 1000);
      eventsSuccess = null;
    }
  }, [eventsSuccess]);

  /**
   * Fetching the Data of the row selected and isDeleted flag is mainted
   * @param data
   * @param isDeleted
   */
  const showData = (data: any, isDeleted = false): void => {
    setRowId(data);
    setToasterRaised(false);
    setDeletePopup(isDeleted);
    setIsDelete(isDeleted);
    setEdit(!isDeleted);
    setShowPopup(!isDeleted);
    eventsListing.map((record: any) => {
      if (record.id === data) {
        setEditDataInfo(record);
      }
    });
  };
  /**
   *
   */
  const addRecordHandler = () => {
    setShowPopup(true);
    const record: any = [];
    setEditDataInfo(record);
  };

  /**
   *  setting up Popup method for Showing the Popup
   * @param showpopup
   */
  const EventsShowPopup = (showpopup: boolean): void => {
    setShowPopup(showpopup);
  };

  /**
   * Method is called from Popup to set the data and various paramters
   * @param data
   * @param isUpdate
   */
  const setAllFormDataHandler = (data: any, isUpdate = false) => {
    setFormData(data);
    setToasterRaised(false);
    setIsDelete(!isUpdate);
    setEdit(isUpdate);
    document.body.classList.add("api-loading");
    if (!isUpdate) {
      setRowId(0);
      dispatch(createEventsRequest(data));
    } else if (isUpdate) {
      dispatch(updateEventsRequest(data));
    }
  };

  /**
   * Delete Notification Template Record
   */
  const onDeleteEventsHandler = () => {
    //calling Dispatch method
    document.body.classList.add("api-loading");
    dispatch(deleteEventsRequest(editDataInfo));
    setDeletePopup(false);
  };

  const modalShowClose = () => {
    setDeletePopup(false);
  };

  // Subscribe






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

  // const onFormSubmit = (props: any,value: any ) => {

  //   let isEdit = false;
  //   if (
  //     props.NotinEditRecord.id !== undefined &&
  //     props.NotinEditRecord.id !== ""
  //   ) {
  //     Object.assign(value, { id: props.NotinEditRecord.id });
  //     isEdit = true;
  //   } else {
  //     if (value.isActive === undefined) {
  //       Object.assign(value, { isActive: false });
  //     }
  //     Object.assign(value, { id: 0 });
  //   }
  //   props.setFormData(value, isEdit);
  //   props.showPopup(false);
  // };

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
        {/* <BS.Row> */}
        <CustomTableContainer
          title={""}
          columns={EventsColumn({
            showData,
            edit,
            rowId,
            options: true
          })}
          // checkbox={true}
          data={eventsListing}
          downloadFileName={text + ".csv"}

          selectedDeliveryIndex={_selectedDeliveryIndex_}
        />
        <div className="d-flex justify-content-end pb-3 btn-events">
          <BS.Button
            className="btn-md-w"
            disabled={(selectedDeliveryIndexList?.length > 0) ? false : true}
            variant="primary"
            // disabled={!(dirty && isValid)}
            type="submit"
            // onClick={() => onFormSubmit}
          >
            Bulk Save
          </BS.Button>
        </div>
        {/* </BS.Row> */}

      </BoxBody>

    </PageContent>
    <Modal
      size="lg"
      fullscreen={"md-down"}
      show={showPopup}
      onHide={() => setShowPopup(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Add Events
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateEventsForm
          showPopup={EventsShowPopup}
          NotinEditRecord={editDataInfo}
          setFormData={setAllFormDataHandler}
        />
      </Modal.Body>
    </Modal>
    {deletePopup && (
      <DeleteModal
        show={deletePopup}
        handleClose={modalShowClose}
        onDeleteData={onDeleteEventsHandler}
      />
    )}
  </>
);
};
export default Events;
