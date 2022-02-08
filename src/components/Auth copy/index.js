import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import styled from "./Auth.module.scss";
import { AuthContext } from "../../context";
import { addCurrentUserAction } from "../../store/chatsReducer";
import { fetchingUsers } from "../../asyncActions/users";
import { Alert } from "..";

const Auth = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const [viewAlert, setViewAlert] = useState(false)
    const dispatch = useDispatch()
    const users = useSelector(state => state.chats.users)
    const state = useSelector(state => state.chats)
   

    async function autorization(e){
        dispatch(fetchingUsers())
        e.preventDefault()

        if(users[e.target.login.value] && String(users[e.target.login.value].pass) == String(e.target.user_pass.value)){
            setIsAuth(true)
            localStorage.setItem('auth', true)
            localStorage.setItem('user', JSON.stringify(users[e.target.login.value]))
            dispatch(addCurrentUserAction(users[e.target.login.value]))
            setViewAlert(false)
        }
        else{
            setViewAlert(true)
        }
    }

    return(
        <div 
            className={styled.Auth}
            >
            <h2>Autorization</h2>
            <form
                onSubmit={autorization}
                className={styled.Auth__form}>
                <label
                    className={styled.Auth__form__field}
                    >
                    <span
                        className={styled.Auth__form__field__label}>
                        Login
                    </span>
                    <input
                        name="login"
                        id="login"
                        type="text"/>
                </label>
                <label
                    className={styled.Auth__form__field}
                    >
                    <span
                        className={styled.Auth__form__field__label}>
                        Password
                    </span>
                    <input
                        name="user_pass"
                        id="user_pass"
                        type="text"/>
                </label>
                <div style={
                        viewAlert === true
                        ? {display: "block", marginTop: 8, marginBottom: 8}
                        : {display: "none"}
                        }>
                        <Alert
                            text="Wrong login or password"
                            type="error"/>
                    </div>
                <button
                    style={{marginRight: 8}}
                    className="Button primary">
                    Enter
                </button>
                <button className="Button secondary">
                    Cancel
                </button>
            </form>
            <div className={styled.Auth__link}>
                <Link to="/reg">Registration</Link>
            </div>
        </div>
    )
}

// const mapStateToProps = state => ({
//     users: state.chats.users
// })

export default Auth
//connect(mapStateToProps)(Auth)