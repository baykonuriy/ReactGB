import React from "react";
import { Link } from "react-router-dom";
import styled from "./Auth.module.scss";
import { useFarebaseUsers } from "../../hooks/useFirebaseUsers";

import { Alert } from "..";

const Auth = () => {
    const
    [
        showAlert,
        _,
        __,
        ___,
        autorization
    ] = useFarebaseUsers()
    
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
                        showAlert === true
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