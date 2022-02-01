import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import MessageService from '../API/MessageService';
import moment from 'moment'

export const useFetchingMessages = () =>{

    // const dispathc = useDispatch()
    // const 

    const [chats, setChats] = useState([])
    const [messages, setMessages] = useState([])
    const [removedMessages, setRemovedMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
  
    const loadMessages = async () =>{
        try{
            setLoading(true)
            const response = await MessageService.getOldMessages()
            setMessages([...messages, ...response])
        } catch(e){
            setLoading(false)
            setError(true)
        } finally{
            setLoading(false)
        }
    }

    async function getChats(){
      const result = await MessageService.getChats()
      let json = await result.json()
      setChats([...json])
    }

    async function addChat(chatName){
      const addedChat = await MessageService.setChat(chatName, chats)
      setChats([...chats, addedChat])
    }

    async function removeChat(chatId){
      const modifiedArrChats = await MessageService.removeChat(chatId, chats)
      console.log('modifiedArrChats', modifiedArrChats)
      setChats([...modifiedArrChats])
      console.log('chats', chats)
     
    }

    useEffect(()=>{
      getChats()
    }, [])

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
        loading,
        error,
        chats,
        addChat,
        removeChat
      ]
}