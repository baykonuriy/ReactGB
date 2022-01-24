import React from "react";
import styled from "./Button.module.scss"

export const Button = (
    {
        children,
        action,
        type
    }) => {

    return(
       <button
        onClick={action}
        className={styled.Button}>
           {children}
       </button>
    )
}