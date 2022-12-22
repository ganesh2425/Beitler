import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus} from "@fortawesome/free-solid-svg-icons";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BulletList } from 'react-content-loader'
// import MyMap from '../Dashboard/common/Map'

class ProviderLayout extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <div className={'form-row'}>
                    <div className="col-md-6">
                        <div className="ibox">
                            <div className="ibox-head">
                                <div className="ibox-title">Pool Providers Presence</div>
                                <div className="ibox-tools">
                                    <a className="ibox-collapse">
                                        <FontAwesomeIcon icon={faMinus} />
                                    </a>
                                </div>
                            </div>
                            <div className="ibox-body poolprovider-blk">
                                <div className="row">
                                    {/*<MyMap />*/}
                                    <BulletList />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 state-display-count">
                        <div className="ibox">
                            <div className="ibox-head">
                                <div className="ibox-title">Statewise Oubound Finalized</div>
                                <div className="ibox-tools">
                                    <a className="ibox-collapse">
                                        <FontAwesomeIcon icon={faMinus} />
                                    </a>
                                </div>
                            </div>
                            <PerfectScrollbar>
                                <div className="ibox-body">
                                    <div className="col-lg-12">
                                        <table className="table table-striped m-t-0 visitors-table">
                                            <thead>
                                            <tr>
                                                <th>State</th>
                                                <th>Visits</th>
                                                <th>Data</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    A
                                                </td>
                                                <td>755</td>
                                                <td>
                                                    <div className="progress">
                                                        <div
                                                            className="progress-bar progress-bar-success"
                                                            role="progressbar"
                                                            style={{width: '52%', height: '5px'}}
                                                        >
                                                        </div>
                                                    </div>
                                                    <span className="progress-parcent">52%</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    B
                                                </td>
                                                <td>700</td>
                                                <td>
                                                    <div className="progress">
                                                        <div
                                                            className="progress-bar progress-bar-warning"
                                                            role="progressbar"
                                                            style={{width: '48%', height: '5px'}}
                                                        >
                                                        </div>
                                                    </div>
                                                    <span className="progress-parcent">48%</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    C
                                                </td>
                                                <td>410</td>
                                                <td>
                                                    <div className="progress">
                                                        <div
                                                            className="progress-bar progress-bar-danger"
                                                            role="progressbar"
                                                            style={{width: '37%', height: '5px'}}
                                                        >
                                                        </div>
                                                    </div>
                                                    <span className="progress-parcent">37%</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    D
                                                </td>
                                                <td>304</td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-info"
                                                             role="progressbar"
                                                             style={{width: '36%', height: '5px'}}
                                                        >
                                                        </div>
                                                    </div>
                                                    <span className="progress-parcent">36%</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    E
                                                </td>
                                                <td>203</td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar"
                                                             role="progressbar"
                                                             style={{width: '35%', height: '5px'}}
                                                        >
                                                        </div>
                                                    </div>
                                                    <span className="progress-parcent">35%</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    F
                                                </td>
                                                <td>202</td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-info"
                                                             role="progressbar"
                                                             style={{width: '35%', height: '5px'}}
                                                             >

                                                        </div>
                                                    </div>
                                                    <span className="progress-parcent">35%</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    G
                                                </td>
                                                <td>180</td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-warning"
                                                             role="progressbar"
                                                             style={{width: '35%', height: '5px'}}
                                                             >
                                                        </div>
                                                    </div>
                                                    <span className="progress-parcent">30%</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    H
                                                </td>
                                                <td>180</td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-warning"
                                                             role="progressbar"
                                                             style={{width: '35%', height: '5px'}}
                                                             >
                                                        </div>
                                                    </div>
                                                    <span className="progress-parcent">30%</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    I
                                                </td>
                                                <td>180</td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-warning"
                                                             role="progressbar"
                                                             style={{width: '35%', height: '5px'}}
                                                             >
                                                        </div>
                                                    </div>
                                                    <span className="progress-parcent">30%</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    J
                                                </td>
                                                <td>180</td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-warning"
                                                             role="progressbar"
                                                             style={{width: '35%', height: '5px'}}
                                                             >
                                                        </div>
                                                    </div>
                                                    <span className="progress-parcent">30%</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    K
                                                </td>
                                                <td>180</td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-warning"
                                                             role="progressbar"
                                                             style={{width: '35%', height: '5px'}}
                                                             >
                                                        </div>
                                                    </div>
                                                    <span className="progress-parcent">30%</span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </PerfectScrollbar>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProviderLayout;