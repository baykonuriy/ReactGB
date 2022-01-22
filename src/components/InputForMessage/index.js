import React, { useState, useEffect } from "react"; 

export const InputText = (props) =>{
    const {send_value} = props
    const {emptyInput} = props
    const [myValue, setMyValue] = useState('')
    
    function sendValue(){
        send_value(myValue)
    }

    useEffect(()=>{
        if(emptyInput === true){
            setMyValue('')
        }
    }, [emptyInput])

    return(
        <input
            onChange={event => setMyValue(event.target.value)}
            onBlur={sendValue}
            value={myValue}
            className="InputText"
            type="text" name="" id="" />
    )
}