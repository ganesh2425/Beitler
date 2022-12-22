import React from "react";
import {Form} from "react-bootstrap";


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const DeliveryStatus = ({value, index, change}: any):JSX.Element => {
  return (
      <Form.Control
          as="select"
          className="delivery-status-dropdown"
          onChange={event => change(event.target.value, index)}
      >
          <option key={0} value={""}>
              {"Select"}
          </option>
          {
              value && value.length > 0 && value.map((status: any, i: number) => {
                  return (<option value={status.displayText} key={i} selected={status.activeStatus === true }>{status.displayText}</option>)
              })
          }
      </Form.Control>
  )
}

export default DeliveryStatus;