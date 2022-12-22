import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import PerfectScrollbar from "react-perfect-scrollbar";
import {CustomerTableProps} from "../../interfaces/customerTypes";

const tableHeader = [
  {
    "title": "Legal Name",
    "type": "string"
  },
  {
    "title": "MC#",
    "type": "number"
  },
  {
    "title": "Fed Tax ID",
    "type": "number"
  },
  {
    "title": "DOT#",
    "type": "string"
  },
  {
    "title": "SCAC",
    "type": "string"
  },
  {
    "title": "City",
    "type": "string"
  },
  {
    "title": "IsActive",
    "type": "string"
  },
  {
    "title": "Action"
  }
]

const CustomerTable = ({ data, templateData, type, editData}: CustomerTableProps): JSX.Element => {

  const [listingData, setListingData] = useState(data);
  const [templatesData, setTemplateData] = useState(templateData);
  const [currentData, setCurrentData] = useState([]);
  const [editMode, setEditMode] = useState({
    status: false,
    rowKey: 0
  });

  useEffect(() => {
    type === 'notification_template' ? setCurrentData(templateData) : setCurrentData(data)
  }, [data, templateData, type]);

  const handleChange = (index: number, dataType: string, value: any) => {
    const newState = (value.length > 0) && listingData.map((item: any, i: number) => {
      if (i == index) {
        return {...item, [dataType]: value};
      }
      return item;
    });
    if (newState)
      setListingData(newState)
  }

  const onGetData = async (data: any, id: number) => {
    setCurrentData(data);
    setEditMode({
      status: true,
      rowKey: id
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  const updateTableData = async (data: any, id?: number) => {
    setCurrentData(data);
    setEditMode({
      status: false,
      rowKey: 0
    });
  }

  return (
      <div>
        <PerfectScrollbar>
          <table className="table table-bordered">
            <thead>
            <tr>
              {
                tableHeader.map((column: any, i: number) => { return <th key={i}>{column.title}</th> })
              }
            </tr>
            </thead>
            <tbody>
            {
              currentData && currentData.length > 0 && currentData.map((v: any, i: number) => {
                  return(
                      <tr key={i}>
                        <td>
                          {v.corporateoffice.LegalName}
                        </td>
                        <td>
                          { v.corporateoffice.MC_Number }
                        </td>
                        <td>
                          { v.corporateoffice.Federal_Tax_ID}
                        </td>
                        <td>
                          {v.corporateoffice.DOT_Number}
                        </td>
                        <td>
                          {v.corporateoffice.SCAC}
                        </td>
                        <td>
                          { v.corporateoffice.Address_Id ? v.corporateoffice.Address_Id[0].City : ''}
                        </td>
                        <td>
                          {/*<input type={'checkbox'} disabled={true} checked={v.corporateoffice.IsW9_YN ? true: false}/>*/}
                          {v.corporateoffice.IsW9_YN ? 'true': 'false'}
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {
                              editMode.status && editMode.rowKey === v.id  ? (
                                  <div
                                      onClick={() => updateTableData(v, v.id)}
                                      className="bg-transparent border-0"
                                  >
                                    <FontAwesomeIcon icon={faSave} className={'mx-2 crp-edit color-highlight cursor'}/>
                                  </div>
                              ) : (
                                  <div
                                      onClick={() => editData ? editData(v, false) : null}
                                      className="bg-transparent border-0"
                                  >
                                    <FontAwesomeIcon
                                        icon={faPencilAlt}
                                        className='mx-2 color-highlight'
                                    />
                                  </div>
                              )
                            }
                            <div
                                onClick={() => editData ? editData(v, true) : null}
                            >
                              <FontAwesomeIcon icon={faTrash} className='mx-2 color-red' />
                            </div>
                          </div>
                        </td>
                      </tr>
                  )
                })
            }
            </tbody>
          </table>
        </PerfectScrollbar>
      </div>
  )
}

export default CustomerTable;