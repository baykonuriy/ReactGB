import React, { useEffect, useState } from 'react';
import '../../App.scss';
import styled from './Layout.module.scss'
import { Route, Routes, useLocation, useParams, Outlet, useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatList1 from '../../components/ChatList/index';
import Chat from './Chats/Chat';

export const AppChat = () => {
  const id = Object.values(useParams())
  const user = useSelector(state => state.chats.user)
  const state = useSelector(state => state.chats)
  // console.log('appchat state', state)

  return (
    <div className={styled.AppChat}>
      <ChatList1/>
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