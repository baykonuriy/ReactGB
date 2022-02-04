import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "./Registration.module.scss"
import { addUserAction } from "../../store/chatsReducer";

const Registration = ({users}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goToAuth = ()  => navigate('/auth')

    function registrationUser(e){
        e.preventDefault()
        const nameArr = e.target.user_name.value.split(' ')
        const user =
        {
            first_name: nameArr[1]? nameArr[1] : null,
            last_name: nameArr[0],
            patronim: nameArr[2]? nameArr[2] : null,
            nickname: e.target.login.value,
            pass: e.target.user_pass.value,
            online: false,
            chats:[],
            id: 0
        }
        user.id = user.nickname
        const updateUsers = {...users, [user.nickname]: user}
        dispatch(addUserAction(updateUsers))
        goToAuth()
    }

    useEffect(() => {
        console.log('users', users)
    }, [users])

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