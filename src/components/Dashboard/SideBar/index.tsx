import React, {Component} from 'react';
import adminAvatar from "../../../assets/images/admin-avatar.png";
import List from "./List";
import Menus from '../../../services/menu.json'

class SideBar extends Component {

    render(): JSX.Element {
        return (
            <div>
                <nav className="page-sidebar">
                    <div id="sidebar-collapse">
                        <div className="admin-block d-flex">
                            <div>
                                <img src={adminAvatar} width="45px" alt={''}/>
                            </div>
                            <div className="admin-info">
                                <div className="font-strong">James Brown</div>
                                <small>Administrator</small>
                            </div>
                        </div>
                        <ul className="side-menu metismenu">
                            <List lists={Menus} />
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default SideBar;