import React from "react";
import styled from './Alert.module.scss'

export const Alert = ({text, type}) => {

    return(
        <div
            className=
            {
                type === 'error'
                ? styled.Alert + ' ' + styled.error
                : type === 'warning'
                ? styled.Alert + ' ' + styled.warning
                : styled.Alert
            }>
                <p>{text}</p>
        </div>
    )
}