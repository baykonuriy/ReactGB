import React, { useEffect, useState, useContext } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { FirebaseContext, AuthContext } from "../context";
import { addCurrentUserAction, getUsersAction } from "../store/chats";
import { addUser, updateUsers, fetchingUsers } from "../asyncActions/users";
import { useFirebaseChats } from "./useFirebaseChats";

export const useFarebaseUsers = () => {
    const user = useSelector(state => state.chats.user)
    const dispatch = useDispatch()
    const { _, firestore } = useContext(FirebaseContext)
    const navigate = useNavigate()
    const goToAuth = ()  => navigate('/auth')
    const [showAlert, setShowAlert] = useState(false)
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const [fireUsers, fireUsersLoading] = useCollectionData(
        firestore.collection('state')
    )

    const [usersOnline] = useCollectionData(
        firestore.collection('usersOnline')
    )
    const [chatList, setChatlist] = useState([])

    const
    [
        chats,
        createDefaultChat,
        getCurrentChat,
        createChat,
        addMessage
    ] = useFirebaseChats()

    function getChatList(obj){
        return Object.keys(obj)
             .filter(str => str !== user.id)
             .map(elem => {
                 return{
                     name: elem,
                     id: elem
                 }
             })
    }

    function registrationUser(e){
        e.preventDefault()
        if(!fireUsers[0][e.target.login.value]){
            const nameArr = e.target.user_name.value.split(' ')
            const newUser =
            {
                [e.target.login.value]:
                {
                    first_name: nameArr[1]? nameArr[1] : null,
                    last_name: nameArr[0],
                    patronim: nameArr[2]? nameArr[2] : null,
                    nickname: e.target.login.value,
                    login: e.target.login.value,
                    pass: e.target.user_pass.value,
                    online: false,
                    chats:
                    {
                        [`default_${e.target.login.value}`]:
                        {
                            first_name: 'Robot',
                            last_name: 'Robot',
                            patronim: 'Robot',
                            nickname: `default_${e.target.login.value}`,
                            login: `default_${e.target.login.value}`,
                            pass: `default_${e.target.login.value}`,
                            online: true,
                            chats:[],
                            id: `default_${e.target.login.value}`,
                            removable: false
                        }
                    },
                    id: e.target.login.value,
                    removable: true
                }
            }
            const message = `Hey ${e.target.login.value}! In this space you can store your files`
            const updateState = {...fireUsers[0], ...newUser}
            dispatch(updateUsers(updateState))
            firestore
            .collection('state')
            .doc('users')
            .set({...updateState})
            goToAuth()
            setShowAlert(false)
            createDefaultChat(e.target.login.value, message)
        } else{
            setShowAlert(true)
        }
    }

    function updateUserChatList(updatedUsers, updatedUser){
        firestore
        .collection('state')
        .doc('users')
        .set({...updatedUsers})
        dispatch(addCurrentUserAction(updatedUser))
        dispatch(updateUsers(updatedUsers))
        localStorage.setItem('user', JSON.stringify(updatedUser))
        localStorage.setItem('users', JSON.stringify(updatedUsers))
    }

    function autorization(e){
        if (fireUsers[0][e.target.login.value] && fireUsers[0][e.target.login.value].pass === e.target.user_pass.value)
        {
            const user = {...fireUsers[0][e.target.login.value]}
            const users = {...fireUsers[0]}
            const updateUsersOnline = {...usersOnline[0], ...user}
            firestore
            .collection('usersOnline')
            .doc(e.target.login.value)
            .set({...updateUsersOnline})
            setShowAlert(false)
            setIsAuth(true)

            localStorage.setItem('auth', true)
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('users', JSON.stringify(users))
            dispatch(addCurrentUserAction(user))
            dispatch(getUsersAction(users))
            console.log('auth users', users)
        } else{
            setShowAlert(true)
        }
    }

    function exit(){
        localStorage.removeItem('auth')
        localStorage.removeItem('user')
        localStorage.removeItem('users')
        dispatch(addCurrentUserAction({}))
        dispatch(getUsersAction({}))
        setIsAuth(false)
        goToAuth()
        setShowAlert(true)

        firestore
        .collection('usersOnline')
        .doc(user.id)
        .delete(user.id)
        
    }

    return[
        showAlert,
        fireUsers,
        usersOnline,
        registrationUser,
        autorization,
        exit,
        getChatList,
        updateUserChatList,
        fireUsersLoading
    ]
}

