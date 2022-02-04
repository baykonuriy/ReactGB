import React from "react";
import { Link } from "react-router-dom";
import styled from "./Registration.module.scss"

export const Registration = () => {
    return(
        <div className={styled.Registration}>
            <h2>Registration</h2>
            <form
                className={styled.Registration__form}>
                <label
                    className={styled.Registration__form__field}
                    >
                    <span
                        className={styled.Registration__form__field__label}>
                        Name
                    </span>
                    <input id="user_name" type="text"/>
                </label>
                <label
                    className={styled.Registration__form__field}
                    >
                    <span
                        className={styled.Registration__form__field__label}>
                        Password
                    </span>
                    <input id="user_pass" type="text"/>
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