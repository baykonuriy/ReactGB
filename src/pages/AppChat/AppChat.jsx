import React, { useEffect } from 'react';
import '../../App.scss';
import styled from '../Layout.module.scss'
import { Route, Routes, useParams } from 'react-router-dom';
import ChatList from '../../components/ChatList/index';
import Chat from './Chats/Chat';

export const AppChat = () => {
  const id = Object.values(useParams())
  useEffect(() => {
    console.log('id', id)
  }, [id])

  return (
    <div className={styled.AppChat}>
      <ChatList/>
       <Routes>
         <Route
            path={id[0]}
            element=
              {
                <Chat
                  id={id[0]}/>
              }/>
       </Routes>
    </div>
  );
}