import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";


type IProps = {
    title: any,
    enableButtons?: boolean,
    buttonPlus?: boolean,
    buttonPlusrates?: boolean,
    showAccordion?: () => void,
    showPurchase?: () => void,
    showschedule?: () => void,
    RatesEntry?: () => void,
    Inboundprojection?: () => void,
    mds?: () => void,
    handleShow?: () => void,
    ShowAddeventsdata?: any
    queryParams? : any
    rateupload?: () => void,
    ratedownload?: () => void

}

// eslint-disable-next-line react/display-name
const CustomerSearch = React.memo(({
                            title,
                            enableButtons,
                            buttonPlus,
                            buttonPlusrates,
                            showAccordion,
                            showPurchase,
                            showschedule,
                            RatesEntry,
                            Inboundprojection,
                            mds,
                            ShowAddeventsdata,
                            rateupload,
                            ratedownload
                        }: IProps) => {
    return (
        <div>
            <div className="w-100 d-flex justify-content-end">
                <ul className="list-unstyled table-search mb-2">
                    <li>
                        <div className=" purchasejournal add-lease d-flex align-items-center justify-content-end mx-2 my-sm-1 btn-add cursor">
                            {
                                title === 'Event' ? (
                                    <div className="addEvent" onClick={ShowAddeventsdata}>
                                        <FontAwesomeIcon icon={faPlus} />&nbsp;
                                        <span>Add Event&nbsp;&nbsp;&nbsp;</span>

                                    </div>
                                ) : null
                            }
                            {
                                title === 'Invoice' ? (
                                    <div onClick={showPurchase}>
                                        <FontAwesomeIcon icon={faPlus} />&nbsp;
                                        <span>Purchase Journal&nbsp;&nbsp;&nbsp;</span>

                                    </div>
                                ) : null
                            }
                            {
                                enableButtons === true ? (
                                    <div onClick={Inboundprojection}>
                                        <Button className="btn-md-w mr-2" variant="secondary">
                                            Download Template
                                        </Button>
                                        <Button className="btn-md-w" variant="primary">
                                            Upload
                                        </Button>
                                    </div>
                                ) : null
                            }
                            {
                                buttonPlus === true ? (
                                    <div onClick={mds}>
                                        <Button className="btn-md-w mr-3" variant="secondary">
                                            Download Template
                                        </Button>
                                    </div>
                                ) : null
                            }
                            {
                                title ?
                                    <div className="addelement" onClick={showAccordion}>
                                        <FontAwesomeIcon icon={faPlus} />
                                        <span>&nbsp;Add {title}</span>
                                    </div> : null
                            }
                             {
                                title === 'Schedule' ?
                                    <div className="addrule" onClick={showschedule}>
                                        <FontAwesomeIcon icon={faPlus} />
                                        <span>&nbsp;Add {title}</span>
                                    </div> : null
                            }
                            {
                                buttonPlusrates === true ? (
                                    <div onClick={RatesEntry} className="rates">
                                        <Button className="btn-md-w mr-2" variant="primary" onClick={rateupload}>
                                            Upload
                                        </Button>
                                        <Button className="btn-md-w mr-2" variant="secondary" onClick={ratedownload}>
                                            Download Template
                                        </Button>
                                        </div>
                                ) : null
                            }



                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
})

export default CustomerSearch;