import React, {useContext} from "react";
import { CounterContext } from "../../context/counterContext";
import { AppRow } from "./AppRow";
import styled from './grid.module.scss'

export const AppGrid = () =>{
    
    const value = useContext(CounterContext)

    return(
            <div className="">
                <AppRow addNum={value.addNum} number={1}/>
                <AppRow addNum={value.addNum} number={4}/>
                <AppRow addNum={value.addNum} number={3}/>
            </div>
    )
}