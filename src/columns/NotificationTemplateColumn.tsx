import { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { IType } from "../interfaces/types";
import { Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const NotificationColumn = ({
  NotinTempTypeLookUp,
  showData,
}: any): MUIDataTableColumnDef[] => {
  return [
    {
      name: "type",
      label: "Event Type",
      options: {
        filter: true,
        filterOptions: {
          names: ["sms", "email"],
          logic(type: any, filterVal: any) {
            const show =
              (filterVal.indexOf("email") >= 0 &&
                (type === 48 || type === "48")) ||
              (filterVal.indexOf("sms") >= 0 && (type === 49 || type === "49"));
            return !show;
          },
        },
        // eslint-disable-next-line react/display-name
        customBodyRender: (value, tableMeta, updateValue): any => {
          return (
            NotinTempTypeLookUp &&
            NotinTempTypeLookUp.map((type: IType) => {
              if (type.id === value) {
                return <div>{type.displayText}</div>;
              }
            })
          );
        },
      },
    },
    {
      name: "subject",
      label: "Subject",
      //field: "Subject",
      options: {
        // eslint-disable-next-line react/display-name
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
        },
      },
    },
    {
      name: "bodyText",
      label: "Body",
      //field: "bodyText",
      options: {
        filter: false,
        setCellProps: () => ({ style: { whiteSpace: "wrap", width: "60px" } }),
        // eslint-disable-next-line react/display-name
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div dangerouslySetInnerHTML={{ __html: value }} />;
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
      name: "eventName",
      label: "Event Name",
      //field: "EventName",
      options: {
        // eslint-disable-next-line react/display-name
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div>{value}</div>;
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
        viewColumns: false,
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

export default NotificationColumn;
