import React from "react";
import styled from './CheckBox.module.scss'

export const CheckBox = (props) => {
    const
        {
            label,
            getChecked
        } = props
    return(
        <label
            className={styled.CheckBox}>
            <input 
                onClick={getChecked}
                type="checkbox"/>
            {label}
        </label>
    )
}