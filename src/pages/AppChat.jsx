import React, {Fragment, useRef} from "react";
import { Message } from "../components/Message";
import { AppNavHeader } from "../components"
import { SendMessagePanel } from "../components";
import moment from "moment";

export const AppChat = (props) =>{
    const {messages} = props
    const {create} = props
    const chat = useRef()
    
    function sendMessage(e){
        create(
            {
                id: Date.now(),
                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                text: e,
                user: 'Ivanov. I'
            }
        )
    }
    return(
        <Fragment>
            <AppNavHeader/>
            <div
                onScroll={event => console.log(event.target.scrollHeight)}
                className="page"
                ref={chat}>
                {
                    messages.map(item=>{
                        return  <Message
                                    message={item}
                                    key={item.id}
                                />
                    })
                }
            </div>
            <SendMessagePanel
                sendMessage={sendMessage}/>
        </Fragment>
    )
}