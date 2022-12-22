import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { Tooltip } from "@material-ui/core";
import * as BS from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";

const EventsColumn = ({
  showData,
  isEdit = false,
  rowId,
  handleBlur,
  // setFieldValue,
}: any): MUIDataTableColumnDef[] => {
  return [
    {
      name: "name",
      label: "Event Name",
      options: {
        // eslint-disable-next-line react/display-name
        customBodyRender: (value, tableMeta, updateValue): any => {
          return isEdit ? (
            <BS.Form.Control
              type="text"
              placeholder="Event Name"
              name="NotinTempSubject"
              value={value}
              onChange={(event) => {
                console.log(event);
              }}
            />
          ) : (
            <div>{value}</div>
          );
        },
      },
    },
    {
      name: "description",
      label: "Event Description",
      //field: "Subject",
      options: {
        // eslint-disable-next-line react/display-name
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value ? value : ''}</div>;
        },
      },
    },
    {
      name: "isActive",
      label: "Status",
      //field: "bodyText",
      options: {
        filter: true,
        filterOptions: {
          names: ["Active", "InActive"],
          logic(isActive: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Active") >= 0 &&
                (isActive === true || isActive === true)) ||
              (filterVal.indexOf("InActive") >= 0 &&
                (isActive === false || isActive === false));
            return !show;
          },
        },
        // eslint-disable-next-line react/display-name
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              {value.toString() === "true"
                ? "Active"
                : value.toString() === "false"
                  ? "InActive"
                  : "InActive"}
            </div>
          );
        },
      },
    },

    {
      name: "Subscribe",
      label: "Subscribe",
      //field: "Subject",
      options: {
        // eslint-disable-next-line react/display-name
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div className="">
            <BS.Form.Check
              type="checkbox"
              // onClick={() => addRecordHandler()}

              className="status"
              autoComplete="nope"
              name="Subscribe"
                      // value={value.isActive}
                      // onChange={() =>
                      //   setFieldValue("isActive", !value.isActive)
                      // }
                      onBlur={handleBlur}
                      // checked={value.isActive}
            />
          
          </div>;
        },
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        print: false,
        download: false,
        filter: false,
        // eslint-disable-next-line react/display-name
        customBodyRender: (value, tableMeta, updateValue) => {
          const codeTypeId = value;
          return (
            <div>
              <i className="iconMargin" title="Edit">
                <Tooltip title="Edit Events">
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className="mx-2 color-highlight"
                    onClick={() => {
                      showData(value, false);
                    }}
                  />
                </Tooltip>
              </i>
              <i className="iconMargin" title="Delete">
                <Tooltip title="Edit Events">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="mx-2 color-red"
                    onClick={() => {
                      showData(value, true);
                    }}
                  />
                </Tooltip>
              </i>
            </div>
          );
        },
      },
    },

  ];
};

export default EventsColumn;
