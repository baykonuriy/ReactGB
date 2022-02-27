import React, { useRef, useEffect, useState, useContext} from "react";
import { connect } from "react-redux";
import { Message } from "../../../components/Message";
import { SendMessagePanel } from "../../../components";
import classed from "./AppChat.module.scss"
import { withChats } from "../../../HOCs/withChats";

import
{ 
    setMessagesAction,
    getMessages,
    getUser,
    getCurrentChat
} from "../../../store/chats";

const Chat = (
    {
        user,
        messages,
        currentChat,
        setMessages,
        addMessage
    }) =>{
    const messagePage = useRef()
    const [countMessage, setCountMessage] = useState(0)
    const [currentMessageCounter, setCurrentMessageCounter] = useState(0)

    useEffect(() => {
        messagePage.current.scrollTop = 
        messagePage.current.scrollHeight - 
        messagePage.current.clientHeight
    }, [messages])
    
    return(
            <div className={classed.AppChat}>
                <div className={classed.AppChat__Wrapper}>
                    <div
                        className="page"
                        ref={messagePage}>
                        {   
                            Object
                            .values(messages)
                            .filter(elem => elem.chat_id === currentChat)
                            .length > 0?
                            Object
                            .values(messages)
                            .filter(elem => elem.chat_id === currentChat)
                            .map(mess => {
                                    return(
                                        <Message
                                            key={mess.id}
                                            message={mess}
                                            // removeMessage={mess=> {
                                            //     elementActionHandler('messages', mess, 'remove')
                                            // }}
                                        />
                                    )
                                })
                            :   <div className="coldPage"><h2>No messages</h2></div>
                           
                            
                        }
                    </div>
                    <SendMessagePanel
                        sendMessage={text => addMessage(text, user)}
                        />
                </div>
            </div>
    )
}

const mapStateToProps = state => ({
    user: getUser(state),
    messages: getMessages(state),
    currentChat: getCurrentChat(state)
})

const mapDispatchToProps = {
    setMessages: setMessagesAction
}

export default connect(mapStateToProps, mapDispatchToProps)(withChats(Chat))