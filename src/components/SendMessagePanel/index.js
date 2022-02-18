import React from "react";
import { InputText, Icon } from "..";
import styled from './SendMessPanel.module.scss'

export const SendMessagePanel = ({sendMessage}) =>{

    function createEndSendMessage(e){
        if(e !== ''){
            sendMessage(e)
        }
    }
    
    return(
        <div className={styled.MessagePanel}>
            <InputText
                iconTitle="Отправить"
                action={createEndSendMessage}
            >
                    <Icon
                        name="send"
                        size={16}
                        color="#101828"
                        viewBox="0 0 24 24"/>
            </InputText>
        </div>
    )
}