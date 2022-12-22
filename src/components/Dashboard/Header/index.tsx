import React, { useEffect, useState } from "react";
import Switch  from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBars,
  faBell,
  faBolt,
  faCheck,
  faClock,
  faCog,
  faEnvelope,
  faPowerOff,
  faSearch,
  faShoppingBasket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/images/logo.png";
import user from "../../../assets/images/u4.jpg";
import adminAvatar from "../../../assets/images/admin-avatar.png";
import { faSupple } from "@fortawesome/free-brands-svg-icons";
import StorageService from "../../../services/Storage.service";

const userNameStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "75ch",
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Header = ({ setSideBar }: any): JSX.Element => {
  const [dropdown, setDropdown] = useState(false);
  const [notifyDropdown, setNotifyDropdown] = useState(false);
  const [inboxDropdown, setInboxDropdown] = useState(false);
  const [inboxDropdownclock, setInboxDropdownclock] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [timeZone, setTimeZone] = useState([
    { label: 'EST', value: false },
    { label: 'CST', value: false },
    { label: 'MST', value: false },
    { label: 'PST', value: false }
  ])

  const showDropDown = (): void => {
    setDropdown(!dropdown);
  };

  const showNotification = (): void => {
    setNotifyDropdown(!notifyDropdown);
  };

  const showInbox = (): void => {
    setInboxDropdown(!inboxDropdown);
  };
  const showInboxclock = (): void => {
    setInboxDropdownclock(!inboxDropdownclock);
  };

  const logout = (): void => {
    StorageService.clearCookies();
    StorageService.setCookies("token", "");
    window.location.assign("/login");
  };

  useEffect(() => {
    const userDetails = StorageService.getCookies("userData");
    if (userDetails) {
      setUserDetails(JSON.parse(userDetails));
    }
  }, []);

  const onChangeTimeZone = (value: any) => {
    const newTimeZone: any = [];

    timeZone.map((v) => {
      v.value = v.label === value;
      newTimeZone.push(v)
    });
    setTimeZone(newTimeZone)
  };



  return (
    <header className="header">
      <div className="page-brand">
        <div
          className="link nav-link sidebar-toggler js-sidebar-toggler color-white"
          onClick={setSideBar}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className="flexbox flex-1">
        <ul className="nav navbar-toolbar">
          <li className="menu-toggle">
            <a className="link py-0" href={"/dashboard"}>
              {/*<img*/}
              {/*    className="max-height50 max-height10-mobile img-responsive img-logo-desktop"*/}
              {/*    src={LogisticLogo} />*/}
              <img
                className="max-height50 max-height10-mobile img-responsive img-logo-mobile"
                src={logo}
                alt={""}
              />
            </a>
          </li>
        </ul>
        <ul className="nav navbar-toolbar">
          <li>
            <form className="navbar-search">
              <div className="rel">
                <span className="search-icon">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <input className="form-control" placeholder="Search here..." />
              </div>
            </form>
          </li>
          <li
            className={`dropdown dropdown-inbox ${inboxDropdown ? "show" : ""}`}
          >
            <a
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              onClick={showInbox}
              aria-expanded={inboxDropdown}
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="badge badge-primary envelope-badge">9</span>
            </a>
            <ul
              className={`dropdown-menu dropdown-menu-right dropdown-menu-media ${inboxDropdown ? "show" : ""
                } `}
            >
              <li className="dropdown-menu-header">
                <div>
                  <span>
                    <strong>9 New</strong> Messages
                  </span>
                  <a className="pull-right" href="!#">
                    view all
                  </a>
                </div>
              </li>
              <li
                className="list-group list-group-divider scroller"
                data-height="180px"
                data-color="#71808f"
              >
                <div>
                  <a className="list-group-item" href="!#">
                    <div className="media">
                      <div className="media-img">
                        <img src={user} alt={""} />
                      </div>
                      <div className="media-body">
                        <div className="font-strong" />
                        Jeanne Gonzalez
                        <small className="text-muted float-right">
                          Just now
                        </small>
                        <div className="font-13">
                          Your proposal interested me.
                        </div>
                      </div>
                    </div>
                  </a>
                  <a className="list-group-item" href="!#">
                    <div className="media">
                      <div className="media-img">
                        <img src={user} alt={""} />
                      </div>
                      <div className="media-body">
                        <div className="font-strong" />
                        Becky Brooks
                        <small className="text-muted float-right">
                          18 mins
                        </small>
                        <div className="font-13">Lorem Ipsum is simply.</div>
                      </div>
                    </div>
                  </a>
                  <a className="list-group-item" href="!#">
                    <div className="media">
                      <div className="media-img">
                        <img src={user} alt={""} />
                      </div>
                      <div className="media-body">
                        <div className="font-strong" />
                        Frank Cruz
                        <small className="text-muted float-right">
                          18 mins
                        </small>
                        <div className="font-13">Lorem Ipsum is simply.</div>
                      </div>
                    </div>
                  </a>
                  <a className="list-group-item" href="!#">
                    <div className="media">
                      <div className="media-img">
                        <img src={user} alt={""} />
                      </div>
                      <div className="media-body">
                        <div className="font-strong" />
                        Rose Pearson
                        <small className="text-muted float-right">3 hrs</small>
                        <div className="font-13">Lorem Ipsum is simply.</div>
                      </div>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
          </li>
          <li
            className={`dropdown dropdown-inbox ${inboxDropdownclock ? "show" : ""}`}
          >
            <a
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              onClick={showInboxclock}
              aria-expanded={inboxDropdownclock}
            >
              <FontAwesomeIcon icon={faClock} />
              <span className="badge badge-primary envelope-badge badge-time">Est</span>

            </a>
            <ul
              className={`dropdown-menu dropdown-menu-right dropdown-menu-media dropdown-clock ${inboxDropdownclock ? "show" : ""
                } `}
            >
              <li className="dropdown-menu-header">
                <div>
                  <span>
                    <strong>Time Zone</strong>
                  </span>
                  {/* <a className="pull-right" href="!#">
                    view all
                  </a> */}
                </div>
              </li>
              <li
                className="list-group list-group-divider scroller"
                data-height="180px"
                data-color="#71808f"
              >
                <div>
                  {
                    timeZone.map((zone: any) => {
                      return (
                        <div className="media" key={zone.label}>
                          <div className="media-body d-flex justify-content-between">
                            <div className="">
                              {zone.label}
                            </div>
                            <div className="timezone">
                              <Switch checked={zone.value} onChange={() => onChangeTimeZone(zone.label)}/>
                            </div>
                          </div>

                        </div>
                      )
                    })
                  }
                </div>
              </li>
            </ul>
          </li>
          <li
            className={`dropdown dropdown-notification ${notifyDropdown ? "show" : ""
              }`}
          >
            <a
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              onClick={showNotification}
              aria-expanded={notifyDropdown}
            >
              <FontAwesomeIcon icon={faBell} />
              <span className="notify-signal" />
            </a>
            <ul
              className={`dropdown-menu dropdown-menu-right dropdown-menu-media ${notifyDropdown ? "show" : ""
                }`}
            >
              <li className="dropdown-menu-header">
                <div>
                  <span>
                    <strong>5 New</strong> Notifications
                  </span>
                  <a className="pull-right" href="!#">
                    view all
                  </a>
                </div>
              </li>
              <li
                className="list-group list-group-divider scroller"
                data-height="180px"
                data-color="#71808f"
              >
                <div>
                  <a className="list-group-item" href="!#">
                    <div className="media">
                      <div className="media-img">
                        <span className="badge badge-success badge-big">
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                      </div>
                      <div className="media-body">
                        <div className="font-13">4 task compiled</div>
                        <small className="text-muted">22 mins</small>
                      </div>
                    </div>
                  </a>
                  <a className="list-group-item" href="!#">
                    <div className="media">
                      <div className="media-img">
                        <span className="badge badge-default badge-big">
                          <FontAwesomeIcon icon={faShoppingBasket} />
                        </span>
                      </div>
                      <div className="media-body">
                        <div className="font-13">You have 12 new orders</div>
                        <small className="text-muted">40 mins</small>
                      </div>
                    </div>
                  </a>
                  <a className="list-group-item" href="!#">
                    <div className="media">
                      <div className="media-img">
                        <span className="badge badge-danger badge-big">
                          <FontAwesomeIcon icon={faBolt} />
                        </span>
                      </div>
                      <div className="media-body">
                        <div className="font-13">Server #7 rebooted</div>
                        <small className="text-muted">2 hrs</small>
                      </div>
                    </div>
                  </a>
                  <a className="list-group-item" href="!#">
                    <div className="media">
                      <div className="media-img">
                        <span className="badge badge-success badge-big">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                      </div>
                      <div className="media-body">
                        <div className="font-13">New user registered</div>
                        <small className="text-muted">2 hrs</small>
                      </div>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
          </li>
          <li className={`dropdown dropdown-user ${dropdown ? "show" : ""}`}>
            <a
              className="nav-link dropdown-toggle link"
              data-toggle="dropdown"
              onClick={showDropDown}
              aria-expanded={dropdown}
            >
              <img src={adminAvatar} alt={""} />
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "12ch",
                }}
              >
                Admin
              </span>
              <FontAwesomeIcon icon={faAngleDown} className="m-l-5" />
            </a>
            <ul
              className={`dropdown-menu dropdown-menu-right settings ${dropdown ? "show" : ""
                }`}
            >
              <a className="dropdown-item" href="!#">
                <FontAwesomeIcon icon={faUser} />
                Profile
              </a>
              <a className="dropdown-item" href="!#">
                <FontAwesomeIcon icon={faCog} />
                Settings
              </a>
              <a className="dropdown-item" href="!#">
                <FontAwesomeIcon icon={faSupple} />
                Support
              </a>
              <li className="dropdown-divider" />
              <a className="dropdown-item" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} />
                Logout
              </a>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
