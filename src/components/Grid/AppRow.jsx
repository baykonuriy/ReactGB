import React from "react";
import { AppCell } from "./AppCell";

export const AppRow = (props) =>{
    const {number, addNum} = props
    return(
        <div className="">
            <h2>{number}</h2>
           <AppCell></AppCell>
           <button onClick={()=> addNum(number)}>button</button>
        </div>
    )
}