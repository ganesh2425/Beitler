import React, { Component } from "react";
import Events from "../components/Events";
import requireAuthentication from "../utilities/requireAuth";

class EventsContainer extends Component {
  render(): JSX.Element {
    return (
      <div>
        <Events text="Events" />
      </div>
    );
  }
}

export default requireAuthentication(EventsContainer);
