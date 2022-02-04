import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "./Auth.module.scss"
import { AuthContext } from "../../context";

export const Auth = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    function login(e){
        e.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', true)
    }
    return(
        <div 
            className={styled.Auth}
            onSubmit={login}>
            <h2>Autorization</h2>
            <form className={styled.Auth__form}>
                <label
                    className={styled.Auth__form__field}
                    >
                    <span
                        className={styled.Auth__form__field__label}>
                        Name
                    </span>
                    <input id="user_name" type="text"/>
                </label>
                <label
                    className={styled.Auth__form__field}
                    >
                    <span
                        className={styled.Auth__form__field__label}>
                        Password
                    </span>
                    <input id="user_pass" type="text"/>
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