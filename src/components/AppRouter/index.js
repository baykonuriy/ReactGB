import React from "react"
import { Route, Routes } from "react-router-dom"
import {LayOutChat } from "../../pages/Layout"
import { Main } from "../../pages/Main/Main"
import { Profile } from "../../pages/Profile/Profile"
import { AppChat } from "../../pages/AppChat/AppChat"
import Auth from '../Auth/index'
import { connect } from "react-redux"
import { getAuth } from "../../store/chats/selectors"
import Registration from "../Registration/index"
import { GistsPage } from "../../pages/Gists/GistsPage"
import { GistPageEndReducer } from "../../pages/Gists/GistsPage"

const AppRouter = ({auth}) =>{
    return(
        auth === true
        ?   <Routes>
                <Route path="/" element={<LayOutChat/>}>
                    <Route index element={<Main/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="chats/*" element={<AppChat/>}/>
                    <Route path="/gists" element={<GistPageEndReducer/>}/>
                    <Route path="*" element={<Main/>}/>
                </Route>
            </Routes>
        :   <Routes>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/reg" element={<Registration/>}/>
                <Route path="*" element={<Auth/>}/>
            </Routes>
    )
}

const mapStateToProps = state => ({
   auth: getAuth(state)
})

export default connect(mapStateToProps)(AppRouter)
