import React, { useEffect, useState } from 'react';
import '../../App.scss';
import styled from './Layout.module.scss'
import { Route, Routes, useLocation, useParams, Outlet } from 'react-router-dom';
import { ChatList1 } from '../../components';
import { Chats } from './Chats/Chats';
import { useFiltredMessage } from '../../hooks/useFiltredMessage';
import { useColdPage } from '../../hooks/useColdPage';
import { useFetchingMessages } from '../../hooks/useFetchingMessages';

export const AppChat = () => {
  
  const
    [
      loadMessages,
      createMessage,
      removeMessage,
      messages,
      loading,
      error,
      chats
    ] = useFetchingMessages()

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
  const id = Object.values(useParams())

  useEffect(()=>{
    console.log('id ', chats)
  }, [chats])

  useEffect(()=>{
    console.log('loading', loading)
    console.log('error', error)
  }, [loading])

  return (
    <div className={styled.AppChat}>
      <ChatList1/>
       <Routes>
         <Route
            path={id[0]}
            element=
              {
                <Chats
                  chats={chats}
                  loading={loading}
                  coldPage={ColdPage}
                  removeMessage={(filter)=>removeMessage(filter)}
                  removeChips={(message)=>removeThisChips(message)}
                  filterValue={filterValue}
                  currFilters={currFilters}
                  loadMessages={loadMessages}
                  clearFilters={clearFilters}
                  addFilter={(filter)=>addFilter(filter)}
                  addValueInCurrFilter={(valFilt)=>addValueInCurrFilter(valFilt)}
                  create={(newMessage)=>createMessage(newMessage)}
                  messages={filtredMessage}
                />
              }/>
       </Routes>
    </div>
  );
}