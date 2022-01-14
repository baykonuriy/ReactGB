import React,{ useState, useEffect } from 'react';
import './App.scss';
import { AppChat } from './pages/AppChat';
import moment from 'moment'


function App() {
 
  const [messages, setMessages] = useState(
    [
      {
        id: 1,
        date: 'January 11th 2022, 09:18 pm',
        text: 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так.',
        user: 'Ivanov. I'
      }
    ])

  function createMessage(newMessage){
    setMessages([...messages, newMessage])
  }

  useEffect(()=>{
    if(messages[messages.length - 1].user !== 'Robot'){
      setMessages(
        [
          ...messages,
          {
            id: Date.now(),
            date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
            text: `Ваше сообщение «${messages[messages.length - 1].text}» отправлено и скоро будет обработано оператором. Ждите`,
            user: 'Robot'
          }
        ])
    }
  }, [messages])

  return (
    <div className="App">
      <AppChat
        create={createMessage}
        messages={messages}/>
    </div>
    
  );
}

export default App;
