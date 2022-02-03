import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import MessageService from '../API/MessageService';
import moment from 'moment'

export const useFetchingMessages = () =>{

    const dispatch = useDispatch()
    const chats = useSelector(state => state.chats)
    const [messages, setMessages] = useState([])
    const [removedMessages, setRemovedMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    async function getChats(){
      const result = await MessageService.getChats()
      let json = await result.json()
      dispatch({type: 'GET_CHATS', payload: [...json]})
    }

    async function addChat(chatName){
      const addedChat = await MessageService.setChat(chatName, chats.chats)
      dispatch({type: 'ADD_CHAT', payload: addedChat})
    }

    async function removeChat(chatId){
      const modifiedArrChats = await MessageService.removeChat(chatId, chats.chats)
      dispatch({type: 'REMOVE_CHAT', payload: [...modifiedArrChats]})
    }

    useEffect(()=>{
      if(chats.chats.length === 0)
      getChats()
    }, [chats])

    const loadMessages = async (id) =>{
      try{
          setLoading(true)
          const response = await MessageService.getOldMessages(id)
          setMessages([...messages, ...response])
      } catch(e){
          setLoading(false)
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
        loading,
        error,
        chats,
        addChat,
        removeChat
      ]
}