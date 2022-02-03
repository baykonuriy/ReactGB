import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MessageService from '../API/MessageService';
import { updateCurrentAction } from "../store/chatsReducer";

export const useFetchingMessages = () =>{
  const chats = useSelector(state => state.chats.chats)
  const current = useSelector(state => state.chats.current)
  const id = Object.values(useParams())

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const dispatch = useDispatch()
  
  const createMessage = (newMessage)=>{
      newMessage.role = 'sender'
      let updateCurrentMessages = [...current.chat, newMessage]
      let updateCurrent = {...current, chat: [...updateCurrentMessages]}
      dispatch(updateCurrentAction(updateCurrent))
  }

  function removeMessage(message){
    let updateMessages = current.chat.filter(item=>{
      return item.id !== message.id
    })
    const updateCurrentChat = {...current, chat: [...updateMessages]}
    dispatch(updateCurrentAction(updateCurrentChat))
  }

  useEffect(()=>{
    if(current.chat){
      MessageService.setMessages(chats)
    }
  }, [current])

    // useEffect(()=>{
    //     if(messages.length > 0){
    //       MessageService.filterServerMessages(messages, removedMessages)
    //     }
    //   }, [messages, removedMessages])
    
      // useEffect(()=>{
      //   if(messages.length !== 0 && messages[messages.length - 1].user !== 'Robot'){
      //     setTimeout(()=>{
      //       setMessages(
      //         [
      //           ...messages,
      //           {
      //             id: Date.now(),
      //             date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
      //             text: `Привет! Я робот. Я отвечаю на последнее ваше сообщение
      //               «${messages[messages.length - 1].text}»`,
      //             user: 'Robot',
      //             role: 'recipient',
      //             userpic:'https://findicons.com/files/icons/1291/quickpix_2005/128/marvin_the_paranoid_android.png'
      //           }
      //         ])
      //     }, 500)
      //   }
      // }, [messages])
    
  

   return[
        createMessage,
        removeMessage,
        loading,
        error
      ]
}