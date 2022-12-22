import React from "react";
import {
    faChartBar,
    faLevelDownAlt,
    faLevelUpAlt,
    faMoneyBill,
    faShoppingCart,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const data = [
    {
        count: '201',
        text: 'Inbounds Received',
        icon: <FontAwesomeIcon className="sidebar-item-icon widget-stat-icon" icon={faShoppingCart} />,
        percentage: '25% higher',
        smallIcon: <FontAwesomeIcon className="sidebar-item-icon m-r-5" icon={faLevelUpAlt} />
    },
    {
        count: '1250',
        text: 'Inbounds Finalized',
        icon: <FontAwesomeIcon className="sidebar-item-icon widget-stat-icon" icon={faChartBar} />,
        percentage: '17% higher',
        smallIcon: <FontAwesomeIcon className="sidebar-item-icon m-r-5" icon={faLevelUpAlt} />
    },
    {
        count: '1570',
        text: 'Outbound  Finalized',
        icon: <FontAwesomeIcon className="sidebar-item-icon widget-stat-icon" icon={faMoneyBill} />,
        percentage: '22% higher',
        smallIcon: <FontAwesomeIcon className="sidebar-item-icon m-r-5" icon={faLevelUpAlt} />
    },
    {
        count: '08',
        text: 'Delivery Complete',
        icon: <FontAwesomeIcon className="sidebar-item-icon widget-stat-icon" icon={faUser} />,
        percentage: '-12% Lower',
        smallIcon: <FontAwesomeIcon className="sidebar-item-icon m-r-5" icon={faLevelDownAlt} />
    }
]

interface IData {
    count: string,
    text: string,
    icon: React.AllHTMLAttributes<never>,
    percentage: string,
    smallIcon: React.AllHTMLAttributes<never>
}

const Cards = (): JSX.Element => {
    const cardView = data.map((v: IData, key : number) => {
        const status = v.text === 'Delivery Complete';
        return (
            <div className="col-lg-3 col-md-6" key={key}>
                <div className={`ibox ${status ? 'btn-primary' : 'bg-secondary'} color-white widget-stat`}>
                    <div className="ibox-body">
                        <h2 className="m-b-5 font-strong">{v.count}</h2>
                        <div className="m-b-5">{v.text}</div>
                        {v.icon}
                        <div>
                            {v.smallIcon}
                            <small>{v.percentage}</small>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className="form-row">
            {cardView}
        </div>
    );
}

export default Cards;