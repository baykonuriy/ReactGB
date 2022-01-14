import React, { useState } from "react";
import { TestCounter } from "../components/Grid/Counter";
import {CounterContext} from '../context/counterContext'
import { AppGrid } from "../components/Grid/AppGrid";

export const TheGrid = () => {
    const [counter, setCounter] = useState(0)

    const addNumForCounter = num =>{
        return setCounter(counter + num)
    }

    const value = {
        number: counter,
        addNum: addNumForCounter
    }

    return(
        <CounterContext.Provider
            value={value}>
            <div className="">
                <h1>Grid</h1>
                <TestCounter/>
                <AppGrid/>
            </div>
        </CounterContext.Provider>
    )
}
