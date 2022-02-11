import React, { useRef, useEffect, useState, useContext} from "react";
import { connect } from "react-redux";
import { Message } from "../../../components/Message";
import { SendMessagePanel } from "../../../components";
import classed from "./AppChat.module.scss"
import { useFirebaseChats } from "../../../hooks/useFirebaseChats";
import { useParams, useNavigate } from 'react-router-dom';

const Chat = ({users, user}) =>{
    const messagePage = useRef()
    const [countMessage, setCountMessage] = useState(0)
    const [currentMessageCounter, setCurrentMessageCounter] = useState(0)
    const navigate = useNavigate()
    const goFirstChat = () => navigate(`default_${user.id}`)
    const id = Object.values(useParams())
    const 
    [
        chat,_,
        getCurrentChat,__,
        addMessage,
        loading
    ] = useFirebaseChats()

    useEffect(() => {
        if(!loading && chat){
            getCurrentChat(id[0])
        }
    }, [id, loading, chat])

    useEffect(() => {
        if(!loading && chat){
           if(countMessage < chat.length){
               messagePage.current.scrollTop = 
               messagePage.current.scrollHeight - 
               messagePage.current.clientHeight
           }
        }
    }, [chat, loading, messagePage])
    
    return(
            <div className={classed.AppChat}>
                <div className={classed.AppChat__Wrapper}>
                    <div
                        className="page"
                        ref={messagePage}>
                        {   
                            // loading
                            // ?   <div className="coldPage"><h2>Loading...</h2></div>
                            // :   chat.map(mess => {
                            //         return(
                            //             <Message
                            //                 key={mess.id}
                            //                 message={mess}
                            //                 // removeMessage={mess=> {
                            //                 //     elementActionHandler('messages', mess, 'remove')
                            //                 // }}
                            //             />
                            //         )
                            //     })
                            loading
                            ?   <div className="coldPage"><h2>Loading...</h2></div>
                            :   chat
                            ?   chat.map(mess => {
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
                            :   <div className="coldPage"><h2>Choice the chat</h2></div>
                           
                            
                        }
                    </div>
                    <SendMessagePanel
                        // sendMessage={(message) => elementActionHandler(
                        //     'messages',
                        //     {
                        //         chat_id: Number(id[0]),
                        //         id: Date.now(),
                        //         date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                        //         text: message,
                        //         user: 'Ivanov. I'
                        //     },
                        //     'add'
                        // )}
                        sendMessage={message => addMessage(id[0].split('_')[0], user.id, message)}
                        />
                </div>
            </div>
    )
}

const mapStateToProps = state => ({
    users: state.chats.users,
    user: state.chats.user
})

export default connect(mapStateToProps)(Chat)