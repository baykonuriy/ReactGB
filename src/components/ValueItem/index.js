import React from "react";

export const ValueItem = (props) => {
    const {value} = props
    return(
        <li><p>{value}</p></li>
    )
}