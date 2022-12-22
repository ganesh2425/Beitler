import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLevelDownAlt, faLevelUpAlt, faMinus} from "@fortawesome/free-solid-svg-icons";
import BarChart from "./BarChart";

class ChartLayout extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <div className="form-row">
                    <div className="col-lg-8 col-md-12">
                        <div className="ibox">
                            <div className="ibox-body">
                                <div className="flexbox mb-4">
                                    <div>
                                        <h3 className="m-0">Ticketing Module</h3>
                                    </div>
                                    <div className="d-inline-flex">
                                        <div className="px-3" style={{borderRight: '1px solid rgba(0,0,0,.1)'}} >
                                            <div className="text-muted">Weekly</div>
                                            <div>
                                                <span className="h2 m-0">50</span>
                                                <span className="text-success ml-2">
                                                                <FontAwesomeIcon icon={faLevelUpAlt} />
                                                                +5%</span>
                                            </div>
                                        </div>
                                        <div className="px-3" style={{borderRight: '1px solid rgba(0,0,0,.1)'}}>
                                            <div className="text-muted">Month</div>
                                            <div>
                                                <span className="h2 m-0">40</span>
                                                <span className="text-warning ml-2">
                                                                <FontAwesomeIcon icon={faLevelUpAlt} />
                                                    +22%</span>
                                            </div>
                                        </div>
                                        <div className="px-3">
                                            <div className="text-muted">Quarterly</div>
                                            <div>
                                                <span className="h2 m-0">240</span>
                                                <span className="text-warning ml-2">
                                                                <FontAwesomeIcon icon={faLevelDownAlt} />
                                                    +12%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <BarChart
                                        left={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="ibox donut-chart">
                            <div className="ibox-head">
                                <div className="ibox-title">Per Document</div>
                                <div className="ibox-tools">
                                    <div className="ibox-collapse">
                                        <FontAwesomeIcon icon={faMinus} />
                                    </div>
                                </div>
                            </div>
                            <div className="ibox-body">
                                <div className="row">
                                    <BarChart left={true} />
                                </div>

                                <ul className="list-group list-group-divider list-group-full">
                                    <li className="list-group-item">On Time
                                        <span className="float-right text-success">
                                            <FontAwesomeIcon icon={faLevelUpAlt} />
                                            24%
                                        </span>
                                    </li>
                                    <li className="list-group-item">Late
                                        <span className="float-right text-success">
                                            <FontAwesomeIcon icon={faLevelUpAlt} />
                                            12%
                                        </span>
                                    </li>
                                    <li className="list-group-item">Less than 30 Min late
                                        <span className="float-right text-success">
                                            <FontAwesomeIcon icon={faLevelUpAlt} />
                                            12%
                                        </span>
                                    </li>
                                    <li className="list-group-item">30-60 minutes late
                                        <span className="float-right text-danger">
                                            <FontAwesomeIcon icon={faLevelDownAlt} />
                                            4%
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChartLayout;