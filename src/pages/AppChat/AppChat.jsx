import React, { useEffect, useState } from 'react';
import '../../App.scss';
import styled from './Layout.module.scss'
import { Route, Routes, useLocation, useParams, Outlet, useMatch } from 'react-router-dom';
import { ChatList1 } from '../../components';
import { Chats } from './Chats/Chats1';

export const AppChat = () => {
  const id = Object.values(useParams())
  
  return (
    <div className={styled.AppChat}>
      <ChatList1/>
       <Routes>
         <Route
            path={id[0]}
            element=
              {
                <Chats
                  id={id[0]}/>
              }/>
          
       </Routes>
    </div>
  );
}