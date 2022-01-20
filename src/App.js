import React,{ useState, useEffect, useMemo } from 'react';
import './App.scss';
import { AppChat } from './pages/AppChat';
import moment from 'moment'
import axios from "axios";


function App() {

//-------messages

  const [messages, setMessages] = useState([])
  const [removedMessages, setRemovedMessages] = useState([])

  const url = 'https://chat-messages-2-default-rtdb.firebaseio.com/chat.json'

  function createMessage(newMessage){
    setMessages([...messages, newMessage])
  }

  async function filterServerMessages(url, removedMess){
    let serverMessages = []
    await axios.get(url)
    .then(result=>{
      serverMessages = [...result.data, ...messages, ...removedMess]
      .filter(
        (mes => currMess => !mes.has(currMess.id) && mes.add(currMess.id))(new Set))
      .filter(item => item.user !== 'Robot')
    })
    axios.put(url, [...serverMessages])
  }

  useEffect(()=>{
    if(messages.length > 0){
      filterServerMessages(url, removedMessages)
    }
  }, [messages, removedMessages])

  async function loadMessages(){
    const response = await axios.get('https://chat-messages-2-default-rtdb.firebaseio.com/chat.json')
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

function recursiveFilter(filtArr, messArr){
  let currMessArr = []
  if(filtArr.length === 0){
      return messArr
  } else{
      currMessArr = messArr.filter(mess=>{
        return  mess[String(filtArr[0].name.toLocaleLowerCase())].toLocaleLowerCase().includes(filtArr[0].value.toLocaleLowerCase())
      })
     return recursiveFilter(filtArr.slice(1), currMessArr)
  }
} 

const filtredMessage = useMemo(()=>{
  
  if(currFilters.length === 0){
    return messages
  }
  else{
    return recursiveFilter(currFilters, messages)
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
