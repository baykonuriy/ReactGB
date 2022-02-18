import React from "react";
import { useNavigate } from "react-router-dom";

export const useNavChat = (
    {
        user,
        users,
        styled,
        setAuth,
        setCurrentUser,
        returnUserToList
    }) => {
    const activeLink = ({isActive})=> isActive? styled.activeLink : ''
    const navigate = useNavigate()
    const goToAuth = ()  => navigate('/auth')
    
    function exit(){
        setAuth(false)
        const updateUsers = {...users, ...user.chats}
        updateUsers[user.id].chats = {...user.chats}
        returnUserToList(updateUsers)
        setCurrentUser({})
        goToAuth()
    }
    return[
        exit,
        activeLink
    ]
}