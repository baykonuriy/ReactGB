import React,{ useState } from "react";
import { InputText } from "..";
import styled from './SendMessPanel.module.scss'
import { IconButton } from "..";

export const SendMessagePanel = (props) =>{
    const {sendMessage} = props
    const [myMessage, setMyMessage] = useState('')
    const [emptyInput, setEmptyInput] = useState(true)

    function createMessage(e){
        setMyMessage(e)
        setEmptyInput(false)
    }

    function sendMyMessage(){
        sendMessage(myMessage)
        setMyMessage('')
        setEmptyInput(true)
    }

    return(
        <div className={styled.MessagePanel}>
            <InputText
                send_value={createMessage}
                emptyInput={emptyInput}/>
            <IconButton
                disabled={emptyInput}
                action={sendMyMessage}/>
        </div>
    )
}