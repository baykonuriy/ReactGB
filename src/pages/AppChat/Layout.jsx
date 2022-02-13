import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from './Layout.module.scss'
import { NavChat } from "../../components";

const LayOutChat = () => {
    const navigate = useNavigate()
    const goToMain = () => navigate('/')

    useEffect(() => {
        goToMain()
    }, [])
    return(
        <div className={styled.Layout}>
            <NavChat></NavChat>
            <Outlet/>
        </div>
    )
}

export {LayOutChat}