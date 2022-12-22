import React, { useState } from 'react';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from '@fortawesome/fontawesome-common-types';
import {
    IconProp
} from '@fortawesome/fontawesome-svg-core';
import { useSelector } from "react-redux";
import { history } from "../../../config/history";
import { getConfigDetails } from "../../../reducers/configReducer";
import {withRouter} from "react-router-dom";

interface IMenu {
    id: number,
    name: string,
    code: string,
    value: string,
    display_text: string,
    active: boolean,
    IsParentSet: number,
    ParentSetId: number,
    icon?: IconName | string,
    sub_menu?: Array<ISMenu>
}

interface ISMenu {
    id: number,
    name: string,
    code: string,
    value: string,
    display_text: string,
    active: boolean,
    IsParentSet: number,
    ParentSetId: number,
    icon?: any,
    sub_menu?: Array<IMenu>
}

interface IMenus {
    lists: Array<IMenu>
}

const List = ({ lists }: IMenus): JSX.Element => {

    const [activeIndex, setActiveIndex] = useState(-2);
    const [subActiveIndex, setSubActiveIndex] = useState(1);

    const onMenuClick = (index: number) => {
        console.log(index);
        setSubActiveIndex(1);
        if (activeIndex === index) {
            setActiveIndex(-2);
        }
        else
            setActiveIndex(index);
    }

    const onSubMenuClick = (i: number) => {
        console.log(i)
        if (subActiveIndex === i)
            setSubActiveIndex(1);
        else
            setSubActiveIndex(i);
    }

    const checkValue = useSelector(getConfigDetails)


    const onPageClick = (page: string) => {
        if (checkValue.token) {
            history.push('/' + page.toLowerCase())
        } else {
            window.location.replace(page.toLowerCase());
        }
        // history.push('/'+page.toLowerCase())
    }

    const menuList = lists.map((list: IMenu, index: number): JSX.Element => {
        const active = index === activeIndex ? 'active' : '';
        const ifExpandMenuIcon = list.sub_menu ? list.sub_menu : '';
        const icon = ['fas', list.icon ? list.icon : 'inbox']
        return (
            <li className={`${active}`} key={list.value}>
                <div
                    onClick={() => ifExpandMenuIcon.length > 0 ? onMenuClick(index) : onPageClick(list.value)}
                >
                    <FontAwesomeIcon className="sidebar-item-icon" icon={icon as unknown as IconName} />
                    <span className="nav-label">{list.display_text}</span>
                    <FontAwesomeIcon className="arrow" icon={faAngleRight} 
                    />
                </div>
                {
                    ifExpandMenuIcon.length > 0 && (
                        <ul
                            className={`nav-2-level collapse ${active ? 'in' : ''}`}
                        >
                            {
                                list.sub_menu && list.sub_menu.map((sm: ISMenu, i: number) => {
                                    const ifExpandSubMenuIcon = sm.sub_menu ? sm.sub_menu : '';
                                    const subActive = i === subActiveIndex ? 'active' : '';
                                    const small_icon = ['fas', sm.icon]
                                    return (
                                        <li className={`${subActive}`} key={sm.value}>
                                            <div
                                                onClick={() => ifExpandSubMenuIcon.length > 0 ? onSubMenuClick(i) : onPageClick(sm.value)}
                                            >
                                                <FontAwesomeIcon className="sidebar-item-icon" icon={small_icon as unknown as IconName} />
                                                <span className="nav-label">{sm.display_text}</span>
                                                {ifExpandSubMenuIcon.length > 0 &&
                                                    <FontAwesomeIcon className="sidebar-item-icon arrow"
                                                        icon={faAngleRight} />
                                                }
                                            </div>
                                            {
                                                sm.sub_menu && (
                                                    <ul
                                                        className={`nav-3-level collapse ${subActive ? 'in' : ''}`}
                                                    >
                                                        {
                                                            sm.sub_menu && sm.sub_menu.map((ssm: ISMenu, i: number) => {
                                                                // const ifExpandinnerSubMenuIcon = sm.sub_menu ? sm.sub_menu : '';
                                                                const ssmall_icon = ['fas', ssm.icon]
                                                                return (
                                                                    <li className={`${subActive}`} key={ssm.value}>
                                                                        <div onClick={() => onPageClick(ssm.value)}>
                                                                            <FontAwesomeIcon className="sidebar-item-icon" icon={ssmall_icon as unknown as IconName} />
                                                                            <span>{ssm.display_text}</span>

                                                                        </div>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </li>
        )
    });
    return <>{menuList}</>
}

export default withRouter(List);