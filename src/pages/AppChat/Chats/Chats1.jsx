import React, { useRef, useEffect, useState} from "react";
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { FirebaseContext } from "../../../context";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import moment from "moment";
import { Message } from "../../../components/Message";
import { SendMessagePanel } from "../../../components";
import { useFetchingChats } from "../../../hooks/useFethingChats";
import classed from "./AppChat.module.scss"

export const Chats = () =>{
    const messages = useSelector(state => state.chats.messages)
    const messagePage = useRef()
    const [countMessage, setCountMessage] = useState(0)
    const [currentMessageCounter, setCurrentMessageCounter] = useState(0)
    const [iii, elementActionHandler, sendMessage, fireMess] = useFetchingChats()
    const id = Object.values(useParams())

    useEffect(() =>{
        let updateMessageCounter = 0
        messages.forEach(mess => {
            if(mess.chat_id === Number(id[0]))
                updateMessageCounter += 1
        })
        setCurrentMessageCounter(updateMessageCounter)
    }, [id, messages])

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
                            currentMessageCounter > 0
                            ?   messages.sort((a, b) => a.id - b.id).map(mess => {
                                    if(mess.chat_id === Number(id[0])){
                                        return(
                                            <Message
                                                key={mess.id}
                                                message={mess}
                                                removeMessage={mess=> {
                                                    elementActionHandler('messages', mess, 'remove')
                                                }}
                                            />
                                        )
                                    }
                                })
                            :   <div className="coldPage"><h2>No message</h2></div>

                        }
                    </div>
                    <SendMessagePanel
                        sendMessage={(message) => elementActionHandler(
                            'messages',
                            {
                                chat_id: Number(id[0]),
                                id: Date.now(),
                                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                                text: message,
                                user: 'Ivanov. I'
                            },
                            'add'
                        )}/>
                </div>
            </div>
    )
}