import React, { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { AuthContext } from "../../context"
import {LayOutChat } from "../../pages/AppChat/Layout"
import { Main } from "../../pages/AppChat/Main/Main"
import { Profile } from "../../pages/AppChat/Profile/Profile"
import { AppChat } from "../../pages/AppChat/AppChat"
import Auth from '../Auth/index'
import Registration from "../Registration/index"
import { Temporary } from "../../pages/AppChat/Temporary"

export const AppRouter = () =>{
    const {isAuth, setIsAuth} = useContext(AuthContext)
    return(
        isAuth
        ?   <Routes>
                <Route path="/" element={<LayOutChat/>}>
                    <Route index element={<Main/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="chats/*" element={<AppChat/>}/>
                    <Route path="*" element={<Main/>}/>
                </Route>
            </Routes>
        :   <Routes>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/reg" element={<Registration/>}/>
                <Route path="*" element={<Auth/>}/>
                <Route path="/about" element={<Temporary/>}/>
            </Routes>
    )
}