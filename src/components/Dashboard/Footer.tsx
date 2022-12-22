import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleUp} from "@fortawesome/free-solid-svg-icons";

const Footer = (): JSX.Element => {
    return (
        <footer className="page-footer text-center">
            <div className="font-13 w-100">2021 © <b>Beitler Logistics Services, Inc.</b></div>
            <div className="to-top">
                <FontAwesomeIcon icon={faAngleDoubleUp} />
            </div>
        </footer>
    )
};

export default Footer;