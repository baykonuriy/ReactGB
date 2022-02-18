import React, { useState } from "react";
import { sendMessageMiddleWare } from "../MiddlewaresThunk/messages";
import { useDispatch } from "react-redux";
import moment from "moment";

export const withChats = (Component) => {
    return ({
        user,
        messages,
        currentChat,
        setMessages,
    }) => {
        const dispatch = useDispatch()
        const [lastText, setLastText] = useState('')

        function addMessage(text){
            const message = {
                chat_id: currentChat,
                id: Date.now(),
                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                text: text,
                user: user.id
            }
            setLastText(text)
            dispatch(sendMessageMiddleWare(text, currentChat, user.id))
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