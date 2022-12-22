import React from "react";
import { connect } from "react-redux";
import StorageService from "../services/Storage.service";
import NotificationQueue from "../components/NotificationQueue";

class NotificationQueueContainer extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <div>
        <NotificationQueue />
      </div>
    );
  }
}

export default NotificationQueueContainer;
