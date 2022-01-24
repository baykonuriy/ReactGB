import React from "react";
import styled from "./PopOver.module.scss"

export const PopOver = ({children}) =>{

    return(
        <div className={styled.PopOver}>
            {
                children
            }
        </div>
    )
}