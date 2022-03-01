import React from "react";
import { Link } from "react-router-dom";
import styled from "./Auth.module.scss";
import { connect } from "react-redux";
import { addCurrentUserAction, setAuthAction } from "../../store/chats";
import { getUsers } from "../../store/chats/selectors";
import { withAuth } from "../../HOCs/withAuth";
import { Alert } from "..";

export const Auth = (
    {
        users,
        addUser,
        setAuth,
        autorization,
        showAlert,
        addLogin,
        addPass
    }) => {
    
    return(
        <div 
            className={styled.Auth}
            >
            <h2>Autorization</h2>
            <form
                onSubmit={(e) => autorization(e)}
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
                        type="text"
                        onInput={e => addLogin(e.target.value)}/>
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
                        type="password"
                        className="InputText"
                        onInput={e => addPass(e.target.value)}/>
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

const mapStateToProps = state => ({
    users: getUsers(state),
})

const mapDispatchToProps = {
    addUser: addCurrentUserAction,
    setAuth: setAuthAction
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Auth))