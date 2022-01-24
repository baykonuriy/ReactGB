import React, {Fragment, useRef, useEffect, useState} from "react";
import moment from "moment";
import { Message } from "../../components/Message";
import
    {
        SendMessagePanel,
        FilterBar,
        Button,
        ChatList
    } from "../../components";
import classed from "./AppChat.module.scss"

export const AppChat = (props) =>{
    const 
        {
            chats,
            coldPage,
            messages,
            create,
            addFilter,
            currFilters,
            filterValue,
            clearFilters,
            addValueInCurrFilter,
            loadMessages,
            removeChips,
            removeMessage,
            loading
        } = props
    
    useEffect(()=>{
        console.log(loading)
    },[loading])

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

    function sendFilter(filter){
        addFilter(filter)
    }

    function removeThisChips(e){
        removeChips(e)
    }

    const messagePage = useRef()
    const [countMessage, setCountMessage] = useState(0)

    useEffect(()=>{
        if(countMessage < messages.length){
            messagePage.current.scrollTop = messagePage.current.scrollHeight - messagePage.current.clientHeight
            setCountMessage(messages.length)
        }
    }, [messagePage, messages])
    
    return(
            <div className={classed.AppChat}>
                <ChatList
                    chats={chats}>
                </ChatList>
                <div className={classed.AppChat__Wrapper}>
                    <FilterBar
                            disabledFilter=
                            {
                                messages.length === 0?
                                    true :
                                    false
                            }
                            filterValue={filterValue}
                            currFilters={currFilters}
                            addFilter={sendFilter}
                            clear={clearFilters}
                            addValueFilter={addValueInCurrFilter}
                            removeChips={removeThisChips}
                    />
                    <div
                        className="page"
                        ref={messagePage}>
                        {
                            coldPage === false?
                                messages.map(item=>{
                                    return  <Message
                                                removeMessage={removeMessage}
                                                message={item}
                                                key={item.id}/>
                                })
                                :
                                loading === true?
                                <div className="coldPage">
                                    <p>Loading...</p>
                                </div>
                                :
                                coldPage === 'NotMessages'?
                                <div className="coldPage">
                                    <div className="coldPage__text">
                                        <h2>Нет сообщений</h2>
                                        <p>
                                            Напишите сообщение и нажмите кнопку отправить.<br/>
                                            Или восстановите удаленные сообщения
                                        </p>
                                    </div>
                                    <Button
                                        action={loadMessages}>
                                        <p>Восстановить</p>
                                    </Button>
                                </div>
                                :
                                <div className="coldPage">
                                    <div className="coldPage__text">
                                        <h2>Ничего не найдено</h2>
                                    </div>
                                </div>

                        }
                    </div>
                    <SendMessagePanel
                    sendMessage={sendMessage}/>
                </div>
            </div>
    )
}