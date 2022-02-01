import React from "react";
import { Outlet } from "react-router-dom";
import styled from './Layout.module.scss'
import { NavChat } from "../../components";

const LayOutChat = () => {

    return(
        <div className={styled.Layout}>
            <NavChat></NavChat>
            <Outlet/>
        </div>
    )
}

export {LayOutChat}