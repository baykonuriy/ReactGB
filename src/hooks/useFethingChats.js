import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import MessageService from '../API/MessageService';
import
  {
    updateChatsAction,
    updateCurrentAction,
    updateMessagesAction
  }
from "../store/chatsReducer";

export const useFetchingChats = () => {
  const dispatch = useDispatch()
  const messanger = useSelector(state => state.chats)
  const chats = useSelector(state => state.chats.chats)

  async function getChats(){
      const response = await MessageService.getChats()
      const resultChats = [...response.chats]
      
      dispatch(updateChatsAction(resultChats.sort((a, b) => b.id - a.id)))
      const resultMessages = [...response.messages]
      dispatch(updateMessagesAction(resultMessages))
  }

  useEffect(()=>{
      getChats()
  }, [])

  function elementActionHandler(type, elem, action){
    const updateMessanger = {...messanger}
    switch(action){
      case 'add':
        updateMessanger[type] = [elem, ...updateMessanger[type]]
        break
      case 'remove':
        updateMessanger[type] = updateMessanger[type].filter(element => 
          {
            if(type === 'chats'){
              elementActionHandler('messages', elem, 'removeChatMessages')
              return element.id !== elem.id
            }else{
              return element.id !== elem.id
            }
          })
        break
      case 'removeChatMessages':
        updateMessanger[type] = updateMessanger[type].filter(mess => mess.chat_id !== elem.id)
        break
    }
    switch(type){
      case 'chats':
        dispatch(updateChatsAction(updateMessanger[type]))
        break
      case 'messages':
        dispatch( updateMessagesAction(updateMessanger[type]))
        break
    }
    updateAll(updateMessanger)
  }

  async function updateAll(all){
    await MessageService.setMessages(all)
  }

  function getCurrChat(id){
    const curr = chats.find(ch => ch.id === id)
    dispatch(updateCurrentAction(curr))
  }

  return[
    getCurrChat,
    elementActionHandler
  ]

}