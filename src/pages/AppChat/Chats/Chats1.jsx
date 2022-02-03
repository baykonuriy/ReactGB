import React, {Fragment, useRef, useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useFetchingMessages } from "../../../hooks/useFetchingMessages1";
import moment from "moment";
import { Message } from "../../../components/Message";
import { SendMessagePanel } from "../../../components";
import classed from "./AppChat.module.scss"

export const Chats = (props) =>{
    
    const messages = useSelector(state => state.chats.current.chat)
    const [createMessage, removeMessage] = useFetchingMessages()
    const messagePage = useRef()
    const [countMessage, setCountMessage] = useState(0)

    useEffect(()=>{
        if(messages){
            if(countMessage < messages.length)
                messagePage.current.scrollTop = messagePage.current.scrollHeight - messagePage.current.clientHeight
                setCountMessage(messages.length)
        } 
    }, [messagePage, messages])
    
    return(
            <div className={classed.AppChat}>
                <div className={classed.AppChat__Wrapper}>
                    <div
                        className="page"
                        ref={messagePage}>
                        {
                            messages ?
                                messages.map(mess => {
                                    return(
                                        <Message
                                            key={mess.id}
                                            message={mess}
                                            removeMessage={removeMessage}
                                        />
                                    )
                                })
                            :
                            <div className="coldPage">
                                <h2>Выберите чат</h2>
                            </div>
                        }
                    </div>
                    <SendMessagePanel
                        sendMessage={(message) => createMessage(
                            {
                                id: Date.now(),
                                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                                text: message,
                                user: 'Ivanov. I'
                            }
                        )}/>
                </div>
            </div>
    )
}