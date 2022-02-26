import React from "react";
import { Link } from "react-router-dom";
import styled from "./Registration.module.scss"
import { Alert } from "..";
import { withRegistration } from "../../HOCs/withRegistration";
import { connect } from "react-redux";
import { getUsers } from "../../store/chats/selectors";
import { addUserAction } from "../../store/chats";
//-------


export const Registration = (
    {
        users,
        addUser,
        registrationUser,
        showAlert,
        addingValuesInStates,
        createUser,
        addPass,
        addLogin
    }) => {

    return(
        <div className={styled.Registration}>
            <h2>Registration</h2>
            <form
                onSubmit={(e) => {
                    registrationUser(e)
                }}
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
                        placeholder="Last name, First name, Patronim"
                        onInput={e => {
                            addingValuesInStates('name', e.target.value)
                        }}
                        />
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
                        placeholder="example@domain.com"
                        onInput={e => {
                            addingValuesInStates('login', e.target.value)
                        }}
                        />
                    <div style={
                        showAlert === true
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
                        type="password"
                        className="InputText"
                        placeholder="*****"
                        onInput={e => {
                            addingValuesInStates('pass', e.target.value)
                        }}
                    />
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
    users: getUsers(state)
})

const mapDispatchToProps = {
    addUser: addUserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(withRegistration(Registration))