import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageService from '../API/MessageService';
import { updateChatsAction, updateCurrentAction } from "../store/chatsReducer";
import moment from "moment";

export const useFetchingChats = () => {
  const dispatch = useDispatch()
  const chats = useSelector(state => state.chats.chats)
  const current = useSelector(state => state.chats.current)

  async function getChats(){
      const result = await MessageService.getChats()
      dispatch({type: 'UPDATE_CHATS', payload: result.data.sort((a, b) => b.id - a.id)})
  }

  function addChat(chatName){
    let newChat = {
      chatName: chatName,
      user: "Robot",
      status: "Online",
      userpic: "",
      id: '',
      chat:
        [
          {
            id: Date.now(),
            date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
            text: 'В этом чате пока пусто',
            user: 'Robot'
          }
        ]
    }
    newChat.id = String(Number(chats[0].id) + 1)
    dispatch(updateChatsAction([newChat, ...chats]))
    addChatOnServer(newChat)
  }

  async function addChatOnServer(newChat){
    await MessageService.setChat(newChat, chats)
  }
  
  async function removeChat(chatId){
    const tempoChats = chats
    .filter(chat => chat.id !== chatId)
    .sort((a, b) => b.id - a.id)
    dispatch(updateChatsAction(tempoChats))
    await MessageService.removeChat(tempoChats)
  }

  function getCurrChat(id){
    const curr = chats.find(ch => ch.id === id)
    dispatch(updateCurrentAction(curr))
  }

  useEffect(()=>{
    let updateChats = [...chats]
    updateChats.forEach(chat => {
        if(chat.id == current.id){
            chat.chat = current.chat
        }
    }, [current])

    updateChats = updateChats.sort((a, b) => b.id - a.id)

    dispatch(
    {
        type: 'UPDATE_CHATS',
        payload: updateChats
    })
    }, [current])
      
  return[
      getChats,
      addChat,
      removeChat,
      getCurrChat
  ]

}