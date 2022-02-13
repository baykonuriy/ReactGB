import React from "react";
import {IconsCollection} from "../IconsCollection"

export const Icon = (props) => {
    const
    { 
        size,
        name
    } = props
    return(
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <IconsCollection
                name={name}/>
        </svg>
    )
   
}