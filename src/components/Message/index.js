import React, {useState} from "react";
import styled from './Message.module.scss'
import { FunctionButton } from "..";
import {ActionBar} from './ActionBar/ActionBar'

export const Message = (
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
                onMouseOut={()=>{setMessageHover(false)}}>
                <header
                    className={styled.messageCard__header}>
                    <p className=
                    {
                        message.user === 'Robot'?
                        styled.messageCard__header__user + ' ' +
                        styled.messageCard__header__user__robot :
                        styled.messageCard__header__user + ' ' +
                        styled.messageCard__header__user__human

                    }>{message.user}</p>
                    
                    <ActionBar
                        openActions={messageHover}>
                        {/* <FunctionButton
                            title={'Редактировать'}>
                            <svg
                                width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                style={{marginLeft: '8px'}}>
                                <path 
                                    d="M18.2407 5.8699L17.2857 4.82791C16.9165 4.4251 16.2924 4.39317 15.884 4.75621L14.3213 6.14559L16.6194 8.68265L18.1714 7.28976C18.5854 6.91815 18.6166 6.28005 18.2407 5.8699ZM5.5 13.9881L13.2002 7.14227L15.5031 9.68456L7.90674 16.5024H5.5V13.9881ZM19.3465 4.85642L18.3915 3.81443C17.4686 2.80741 15.9083 2.72759 14.8874 3.63518L4.33557 13.0162C4.12212 13.206 4 13.478 4 13.7636V17.0024C4 17.5546 4.44772 18.0024 5 18.0024H8.09822C8.34478 18.0024 8.58266 17.9113 8.76616 17.7466L19.1733 8.40609C20.2084 7.47706 20.2863 5.88181 19.3465 4.85642ZM20 19.4998H4V20.9998H20V19.4998Z"
                                    fill="#101828"
                                />
                            </svg>
                        </FunctionButton> */}
                        <FunctionButton
                            title={'Удалить'}
                            action={removeThisMessage}
                            >
                            <svg 
                                width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                style={{marginLeft: '8px'}}>
                                <path d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="#101828"/>
                            </svg>
                        </FunctionButton>
                    </ActionBar>
                </header>
                <p className={styled.messageCard__p}>{message.text}</p>
                <span className="description">{message.date}</span>
            </div>
   
    )
}