import React, { useState, useCallback } from "react";
import { sendMessageMiddleWare } from "../MiddlewaresThunk/messages";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, set, onValue } from 'firebase/database'
import { getCurrentChat, getUser } from "../store/chats";
import moment from "moment";

export const withChats = (Component) => {
    return () => {
        const dispatch = useDispatch()
        const [lastText, setLastText] = useState('')
        const db = getDatabase()
        const [messages, setMessages] = useState()
        const messagesFromDB = ref(db, 'messages')
        const user = useSelector(state => state.chats.user)
        const currentChat = useSelector(state => state.chats.currentChat)

        const getMessages = useCallback((chat_name) =>{
            return onValue((db, 'messages/' + chat_name), snapshot => {
                setMessages(snapshot.val())
            })
        })

        const updateMessageInCurrentChat = async(sender, recipient, message) =>{
            try{
                await set(ref(db, 'messages' + sender + '_' + recipient), message)
                await set(ref(db, 'messages' + recipient + '_' + sender), message)
            } catch(err){
                console.log(err)
            }
        }

        function addMessage(text){
            const message = {
                chat_id: currentChat,
                id: Date.now(),
                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                text: text,
                user: user.id
            }
            updateMessageInCurrentChat(user.id, currentChat, message)
            // setLastText(text)
            // dispatch(sendMessageMiddleWare(text, currentChat, user.id))
        }
        return (
            <Component
                user={user}
                messages={messages}
                currentChat={currentChat}
                setMessages={setMessages}
                addMessage={addMessage}
            />)
    }
}