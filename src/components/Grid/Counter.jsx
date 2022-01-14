import React, {useContext} from "react";
import { CounterContext } from "../../context/counterContext";

export const TestCounter = () =>{
    
    const value = useContext(CounterContext)
    return(
        <div className="">{value.number}</div>
    )
}