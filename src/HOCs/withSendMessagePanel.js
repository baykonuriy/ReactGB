import React, { useState, useRef, useCallback } from "react";

export const withSendMessagePanel = (Component) => {

    return({action}) => {
        const [value, setValue] = useState('')
        const inp = useRef()
        // const sendValue = useCallback((e) =>
        // { 
        //     if(e.code === 'Enter'){
        //         action(value)
        //         setValue('')}
        // })
        const sendValue = e =>
        { 
            if(e.code === 'Enter')
            {
                action(value)
                setValue('')
            }
        }
        
        return (
            <Component
                ref={inp}
                value={value}
                sendValue={sendValue}
                />) 
       
    }
   
}