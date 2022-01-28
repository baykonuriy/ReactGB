import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const Layout = () =>{
    return(
        <>
            <ul>
                <li>
                    <NavLink to="/" >
                        <p>Main</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/one" >
                        <p>LewOne</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/two">
                        <p>LewTwo</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/two/one1">
                        <p>LewTwoOne1</p>
                    </NavLink>
                </li>
            </ul>
            <Outlet/>
        </>
    )
}