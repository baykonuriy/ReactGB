import React from "react";
import {IconsCollection} from "../IconsCollection"

export const Icon = (props) => {
    const
    { 
        size,
        name,
        color,
        viewBox
    } = props
    return(
        <svg
            width={size}
            height={size}
            viewBox={viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <IconsCollection
                color={color}
                name={name}/>
        </svg>
    )
   
}