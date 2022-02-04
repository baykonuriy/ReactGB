import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "./Auth.module.scss"
import { AuthContext } from "../../context";

const Auth = ({users}) => {
    const { isAuth, setIsAuth } = useContext(AuthContext)

    function autorization(e){
        e.preventDefault()
        //console.log('users[e.target.login]', )
        if(users[e.target.login.value] && users[e.target.login.value].pass === e.target.user_pass.value){
            setIsAuth(true)
            localStorage.setItem('auth', true)
        }
        
    }

    useEffect(() => {
        console.log('users', users)
    }, [users])
    return(
        <div 
            className={styled.Auth}
            onSubmit={autorization}>
            <h2>Autorization</h2>
            <form className={styled.Auth__form}>
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
    users: state.chats.users
})

export default connect(mapStateToProps)(Auth)