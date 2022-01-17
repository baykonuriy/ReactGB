import React,{ useState, useEffect, useMemo } from 'react';
import './App.scss';
import { AppChat } from './pages/AppChat';
import moment from 'moment'
import axios from "axios";


function App() {



//-------messages

  const [messages, setMessages] = useState([])
  
  function createMessage(newMessage){
    setMessages([...messages, newMessage])
  }

  async function loadMessages(){
    const response = await axios.get('https://posts-for-chat-default-rtdb.firebaseio.com/chat.json')
    setMessages([...messages, ...response.data])
  }

  useEffect(()=>{
    if(messages.length !== 0 && messages[messages.length - 1].user !== 'Robot'){
      setTimeout(()=>{
        setMessages(
          [
            ...messages,
            {
              id: Date.now(),
              date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
              text: `Ваше сообщение
                «${messages[messages.length - 1].text}»
                отправлено и скоро будет обработано оператором. Ждите`,
              user: 'Robot'
            }
          ])
      }, 500)
    }
  }, [messages])

  function removeMessage(message){
      const updateMessages = messages.filter(item=>{
        return item.id !== message.id
      })
      setMessages([...updateMessages])
  }

//-------filter

const [currFilters, setCurrFilters] = useState([])
const [filterValue, setFilterVAlue] = useState(
  [
      {
          id: 'filter1',
          name: 'Text',
          value:''
      },
      {
          id: 'filter2',
          name: 'User',
          value:''
      }
  ]
)

function addValueInCurrFilter(valFilt){
    const updateFilter = currFilters.map(item=>{
        if(item.id === valFilt.id){
            return {...item, value: valFilt.value}
        }
        return item
    })
    setCurrFilters([...updateFilter])
}

function addFilter(filter){
    setFilterVAlue(filterValue.filter(item=>{
        return item.id !== filter.id
    }))
    setCurrFilters([...currFilters, filter])
}

function clearFilters(){
    const updateFilter = currFilters.map(item=>{
        return {...item, value: ''}
    })
    setFilterVAlue([...filterValue, ...updateFilter])
    setCurrFilters([])
}

const filtredMessage = useMemo(()=>{
  if(currFilters.length > 0){
    return messages.filter(item=>{
      for(let i = 0; i < currFilters.length; i++){
        switch(currFilters[i].name){
          case 'Text': 
            if(item.text.toLowerCase().includes(currFilters[i].value)){
              return item
            }
            break
          case 'User': 
            if(item.user.toLowerCase().includes(currFilters[i].value)){
              return item
            }
            break
        }
      }
    })
  } else{
    return messages
  }
  
}, [currFilters, messages])

function removeThisChips(filter){
  filter.value = ''
  setFilterVAlue([...filterValue, filter])
  const updateFilter = currFilters.filter(item=>{
      return item.id !== filter.id
  })
  setCurrFilters([...updateFilter])
}

//-------ColdPage

const ColdPage = useMemo(()=>{
  if
  ( messages.length === 0 ||
    messages.length === 0 && filtredMessage.length === 0)
  { return 'NotMessages'}
  if
  ( messages.length > 0 && filtredMessage.length === 0)
  {return 'NotFound'}
  else
  {return false}

}, [filtredMessage, messages])

  return (
    <div className="App">
      <AppChat
        coldPage={ColdPage}
        removeMessage={removeMessage}
        removeChips={removeThisChips}
        filterValue={filterValue}
        currFilters={currFilters}
        loadMessages={loadMessages}
        clearFilters={clearFilters}
        addFilter={addFilter}
        addValueInCurrFilter={addValueInCurrFilter}
        create={createMessage}
        messages={filtredMessage}/>
        
    </div>
    
  );
}

export default App;
