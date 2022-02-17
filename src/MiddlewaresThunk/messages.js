// import React, { useEffect } from "react"
import moment from "moment"
import { setMessagesAction } from "../store/chats"

export const botResponse = (text, currentChat) => {
    return (dispath) => {
        const botMessage = {
            wait: (message) => 
                setTimeout(() => {
                    setMessagesAction(message)
                }, 500)
        }
        const message = {
            chat_id: currentChat,
            id: Date.now(),
            date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
            text: `Bot reply to your message: "${text}"`,
            user: 'Bot'
        }
        // useEffect(() => {
        //     return () =>{
        //         clearTimeout(botMessage.wait)
        //     }
        // }, [])
        return dispath(botMessage.wait(message))
    }
}

