import React from "react";
import styled from './ChatList.module.scss';
import { InputText, ChatListItem } from "..";
import { useFetchingMessages } from "../../hooks/useFetchingMessages";

export const ChatList1 = () => {
    const
        [
            loadMessages,
            createMessage,
            removeMessage,
            messages,
            loading,
            error,
            chats,
            addChat,
            removeChat
        ] = useFetchingMessages()
    return(
        <div className={styled.chatList}>
            <div className={styled.chatList__addChat}>
                <InputText
                    action={(chatName)=>{addChat(chatName)}}
                    placeholder='Chat name'
                    iconTitle='Add chat'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.25 8.75V14H8.75V8.75H14V7.25H8.75V2H7.25V7.25H2V8.75H7.25Z" fill="#101828" fillOpacity="0.5"/>
                    </svg>
                </InputText>
            </div>
            {
                chats.sort((a, b) => b.id - a.id).map(chat => {
                   
                    return(
                        <ChatListItem chat={chat} key={chat.id}/>
                    )
                })
            }
        </div>
    )
}