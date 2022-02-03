import React from "react"
import { Route, Routes } from "react-router-dom"
import {LayOutChat } from "../../pages/AppChat/Layout"
import { Main } from "../../pages/AppChat/Main/Main"
import { Profile } from "../../pages/AppChat/Profile/Profile"
import { AppChat } from "../../pages/AppChat/AppChat"
import { Chats } from "../../pages/AppChat/Chats/Chats1"


export const AppRouter = () =>{

    return(
        <Routes>
            <Route path="/" element={<LayOutChat/>}>
                <Route index element={<Main/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="chats/*" element={<AppChat/>}/>
            </Route>
      </Routes>
    )
}