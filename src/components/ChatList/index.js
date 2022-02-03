import React, {useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from './ChatList.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { useFetchingChats } from '../../hooks/useFethingChats';
import { InputText, ChatListItem } from "..";

export const ChatList1 = () => {
    const dispatch = useDispatch()
    const current = useSelector(state => state.chats.current)
    const chats = useSelector(state => state.chats.chats)

    const params = Object.values(useParams())

    useEffect(() => {
        console.log('params', params)
    }, [params])

    const
    [
      getChats,
      addChat,
      removeChat,
      getCurrChat
    ] = useFetchingChats()
  
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const goFirstChat = () => navigate('0')

    useEffect(()=>{
        getChats()
        // goFirstChat()
      }, [])

    useEffect(() => {
        if(Object.keys(current).length === 0)
        setTimeout(() => {
            // getCurrChat('0')
            // goFirstChat()
        }, 300)
     }, [current])


    function removeCurrentChat(chat){
        removeChat(chat)
        goBack()
    }


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
                chats.length > 0
                ?   chats.sort((a, b) => b.id - a.id).map(chat => {
                        return(
                            <ChatListItem
                                chat={chat}
                                key={chat.id}
                                action={removeCurrentChat}
                                clickHandler={(id) => getCurrChat(id)}/>
                        )
                    })
                :   <p>Not chats</p>
            }
        </div>
    )
}