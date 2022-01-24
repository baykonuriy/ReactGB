import React from "react";
import styled from './NavBar.module.scss'


export const AppNavHeader = (props) => {
    return(
            <ul className={styled.navbar}>
                <li className={styled.navbar__item}>
                   Chat
                </li>
            </ul>
    )
}