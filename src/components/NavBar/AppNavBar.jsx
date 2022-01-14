import React from "react";
import styled from './NavBar.module.scss'
import {NavLink, Link, Router, BrowserRouter, Routes, Route} from 'react-router-dom'

export const AppNavBar = (props) => {
    return(
            <ul className={styled.navbar}>
                <li className={styled.navbar__item}>
                    <NavLink exact="true" to="/">Main</NavLink>
                </li>
                <li className={styled.navbar__item}>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li className={styled.navbar__item}>
                    <NavLink to="/grid">Grid</NavLink>
                </li>
                {/* <li className={styled.navbar__item}>
                    <Link to="/profile">Profile</Link>
                </li> */}
            </ul>
    )
}