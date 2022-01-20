import React,{ useState, useEffect, useMemo } from 'react';
import './App.scss';
import { AppChat } from './pages/AppChat';
import moment from 'moment'
import { useFiltredMessage } from './hooks/useFiltredMessage';
import { useColdPage } from './hooks/useColdPage';
import { useFetchingMessages } from './hooks/useFetchingMessages';
import MessageService from './API/MessageService';


function App() {

//-------messages

  const [messages, setMessages] = useState([])
  const [removedMessages, setRemovedMessages] = useState([])
  const [loadMessages, createMessage, loading, error] = useFetchingMessages(
    async ()=> {
    const response = await MessageService.getOldMessages()
    setMessages([...messages, ...response])
    },
    newMessage =>{
      setMessages([...messages, newMessage])
  })

  useEffect(()=>{
    if(messages.length > 0){
      MessageService.filterServerMessages(messages, removedMessages)
    }
  }, [messages, removedMessages])

  useEffect(()=>{
    if(messages.length !== 0 && messages[messages.length - 1].user !== 'Robot'){
      setTimeout(()=>{
        setMessages(
          [
            ...messages,
            {
              id: Date.now(),
              date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
              text: `Привет! Я робот. Я отвечаю на последнее ваше сообщение
                «${messages[messages.length - 1].text}»`,
              user: 'Robot',
              role: 'recipient',
              userpic:'https://findicons.com/files/icons/1291/quickpix_2005/128/marvin_the_paranoid_android.png'
            }
          ])
      }, 500)
    }
  }, [messages])

  function removeMessage(message){
    setRemovedMessages([...removedMessages, message])
    const updateMessages = messages.filter(item=>{
      return item.id !== message.id
    })
    setMessages([...updateMessages])
  }

const
  [
    currFilters,
    filterValue,
    addFilter,
    addValueInCurrFilter,
    clearFilters,
    removeThisChips,
    filtredMessage
  ] = useFiltredMessage(messages)

const ColdPage = useColdPage(filtredMessage, messages)

  return (
    <div className="App">
      <AppChat
        coldPage={ColdPage}
        removeMessage={(filter)=>removeMessage(filter)}
        removeChips={removeThisChips}
        filterValue={filterValue}
        currFilters={currFilters}
        loadMessages={loadMessages}
        clearFilters={clearFilters}
        addFilter={(filter)=>addFilter(filter)}
        addValueInCurrFilter={(valFilt)=>addValueInCurrFilter(valFilt)}
        create={createMessage}
        messages={filtredMessage}/>
    </div>
  );
}

export default App;
