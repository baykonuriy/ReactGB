import React, { useEffect, useState } from "react";
import { botResponse } from "../MiddlewaresThunk/messages";
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

        function addMessage(text, currentUser){
            const message = {
                chat_id: currentChat,
                id: Date.now(),
                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                text: text,
                user: user.id
            }
            setLastText(text)
            setMessages(message)
        }

        const botMessage = {
            wait: () => 
                setTimeout(() => {
                    dispatch(botResponse(lastText, currentChat))
                }, 500)
        }

        useEffect(() => {
            if( Object.values(messages).length > 0 &&
                Object.values(messages)[Object.values(messages).length - 1].user !== 'Bot')
                botMessage.wait()
            return () => {
                clearTimeout(botMessage.wait)
            }
        }, [messages])

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