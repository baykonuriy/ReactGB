import React, { useEffect, useState, useContext } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFirebaseChats } from "../../hooks/useFirebaseChats";
import styled from "./Registration.module.scss"
import { addUser, fetchingUsers } from "../../asyncActions/users";
import { Alert } from "..";

const Registration = ({users}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [viewAlert, setViewAlert] = useState(false)
    const goToAuth = ()  => navigate('/auth')
    const [fireMessages, createDefaultChat] = useFirebaseChats()
    const state = useSelector(state => state.chats)
    console.log('reg state', state)

    function registrationUser(e){
        e.preventDefault()
        const nameArr = e.target.user_name.value.split(' ')
        const user = 
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
        if(users === null){
            userCreator(e.target.login.value, user, `default_${e.target.login.value}`)
        }
        else if(users[e.target.login.value]){
            setViewAlert(true)
        }
        else{
            userCreator(e.target.login.value, user, `default_${e.target.login.value}`) 
        }
    }

    function userCreator(login, user, collName){
        const first_message = `Hey ${login}! I am the new messenger! Choose a chat and enjoy chatting`
        dispatch(addUser(user))
        createDefaultChat(`default_${login}`, 'Robot', first_message, collName)
        setViewAlert(false)
        goToAuth()
    }

    return(
        <div
            onSubmit={registrationUser}
            className={styled.Registration}>
            <h2>Registration</h2>
            <form
                id="reg"
                className={styled.Registration__form}>
                <label
                    className={styled.Registration__form__field}
                    >
                    <span
                        className={styled.Registration__form__field__label}>
                        Name
                    </span>
                    <input
                        name="user_name"
                        id="user_name"
                        type="text"
                        placeholder="Last name, First name, Patronim"/>
                    <span className="description">Use space to separate words</span>
                </label>
                <label
                    className={styled.Registration__form__field}
                    >
                    <span
                        className={styled.Registration__form__field__label}>
                        Login
                    </span>
                    <input
                        name="login"
                        id="login"
                        type="text"
                        placeholder="example@domain.com"/>
                    <div style={
                        viewAlert === true
                        ? {display: "block", marginTop: 8}
                        : {display: "none"}
                        }>
                        <Alert
                            text="Such a login is already in the system"
                            type="error"/>
                    </div>
                </label>
                <label
                    className={styled.Registration__form__field}
                    >
                    <span
                        className={styled.Registration__form__field__label}>
                        Password
                    </span>
                    <input
                        name="user_pass"
                        id="user_pass"
                        type="text"
                        placeholder="*****"/>
                </label>
                <button
                    style={{marginRight: 8}}
                    className="Button primary">
                    Save
                </button>
                <button className="Button secondary">
                    Cancel
                </button>
            </form>
            <div className={styled.Registration__link}>
                <Link to="/auth">Autorization</Link>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.chats.users
})

export default connect(mapStateToProps)(Registration)