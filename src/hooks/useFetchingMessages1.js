import { useState, useEffect } from "react"
import MessageService from '../API/MessageService';
import moment from 'moment'

export const useFetchingMessages1 = () =>{
    const [messages, setMessages] = useState([])
    const [removedMessages, setRemovedMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const loadMessages = async () =>{
        try{
            const response = await MessageService.getOldMessages()
            setMessages([...messages, ...response])
        } catch(e){
            setError(true)
        } finally{
            setLoading(false)
        }
    }

    const createMessage = newMessage =>{
        newMessage.role = 'sender'
        newMessage.userpic = 'https://ichef.bbci.co.uk/images/ic/256xn/p077b1km.jpg'
        setMessages([...messages, newMessage])
    }

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

   return[
        loadMessages,
        createMessage,
        removeMessage,
        messages,
        removedMessages,
        loading,
        error]
}