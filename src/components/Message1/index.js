import React, {useState} from "react";
import styled from './Message.module.scss'
import { FunctionButton } from "..";
import {ActionBar} from './ActionBar/ActionBar'

export const Message1 = (
    {
        message,
        removeMessage
    }) =>{
        
    const [messageHover, setMessageHover] = useState(false)

    function removeThisMessage(){
        removeMessage(message)
    }

    return(
        <div
            className={styled.messageCard}
            onMouseOver={()=>{setMessageHover(true)}}
            onMouseOut={()=>{setMessageHover(false)}}
            style={{alignItems: "start"}}
            >
            <div 
                className={styled.messageCard__wrapper}
                style=
                    {   message.role === 'sender'?
                        {borderRadius: '0 12px 12px 12px'}
                        :
                        {borderRadius: '12px 0 12px 12px'}
                    }>
                    <div
                        className={styled.messageCard__userpic}
                        style=
                        {
                            message.role === 'sender'?
                                {
                                    top: -12,
                                    left: -40
                                }
                            :
                                {
                                    top: -12,
                                    right: -40
                                }
                        }>
                        <img 
                            src={message.userpic}
                            className=
                            {
                                styled.messageCard__userpic__img
                            }
                            />
                    </div>
                        <div className={styled.messageCard__wrapper__content}>
                            <p className={styled.messageCard__p}>{message.text}</p>
                            <span className="description">{message.user + ', ' + message.date}</span>
                        </div>
                        <ActionBar
                            openActions={messageHover}>
                            <FunctionButton
                                title={'Удалить'}
                                action={removeThisMessage}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="#101828"/>
                                </svg>
                            </FunctionButton>
                        </ActionBar>
                </div>
        </div>
    )
    
    
}