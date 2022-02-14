import React, { useState, useRef, useCallback, useMemo } from "react";

export const withSendMessagePanel = (Component) => {

    return(props) => {
        const [value, setValue] = useState('')
        const inp = useRef()
        
        function sendValueInButtonClick(){
            props.action(value)
            setValue('')
            inp.current.focus()
        }
        
        const disabledButton = useMemo(() => {
            return value === ''? true : false
        })

        const sendValue = e =>
        { 
            if(e.code === 'Enter')
            {
                props.action(value)
                setValue('')
            }
        }

        function changeValueInInput(e){
            setValue(e.target.value)
        }
        function preventClick(e){
            e.stopPropagation()
        }
        
        return (
            <Component
                ref={inp}
                value={value}
                sendValue={sendValue}
                changeValueInInput={changeValueInInput}
                preventClick={preventClick}
                disabledButton={disabledButton}
                sendValueInButtonClick={sendValueInButtonClick}
                {...props}
                />) 
       
    }
   
}