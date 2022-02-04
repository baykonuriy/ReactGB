import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from './ChatList.module.scss';
import { useSelector } from "react-redux";
import { useFetchingChats } from '../../hooks/useFethingChats';
import { InputText, ChatListItem } from "..";

export const ChatList1 = () => {
    const chats = useSelector(state => state.chats.chats)
    const [getCurrChat, elementActionHandler] = useFetchingChats()
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const goFirstChat = () => navigate('0')

    useEffect(() => {
        goFirstChat()
    }, [])

    return(
        <div className={styled.chatList}>
            <div className={styled.chatList__addChat}>
                <InputText
                    action={name => elementActionHandler(
                        'chats',
                        {
                            chatName: name,
                            removable: true,
                            user: "Robot",
                            status: "Online",
                            userpic: "",
                            id: String(Number(chats[0].id) + 1)
                        },
                        'add')}
                    placeholder='Chat name'
                    iconTitle='Add chat'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.25 8.75V14H8.75V8.75H14V7.25H8.75V2H7.25V7.25H2V8.75H7.25Z" fill="#101828" fillOpacity="0.5"/>
                    </svg>
                </InputText>
            </div>
            {
                chats.length > 0
                ?   chats.sort((a, b) => b.id - a.id).map(chat => {
                        return(
                            <ChatListItem
                                chat={chat}
                                key={chat.id}
                                action={(chat) => {
                                    goBack()
                                    elementActionHandler('chats', chat, 'remove')
                                }}
                                clickHandler={(id) => getCurrChat(id)}/>
                        )
                    })
                :   <p>Not chats</p>
            }
        </div>
    )
}