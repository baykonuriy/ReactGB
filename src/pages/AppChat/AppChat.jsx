import React, { useEffect, useState } from 'react';
import '../../App.scss';
import styled from './Layout.module.scss'
import { Route, Routes, useLocation, useParams, Outlet, useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChatList1 } from '../../components';
import { Chats } from './Chats/Chats1';
import { useFiltredMessage } from '../../hooks/useFiltredMessage';
import { useColdPage } from '../../hooks/useColdPage';
import { useFetchingMessages } from '../../hooks/useFetchingMessages1';
import { useFetchingChats } from '../../hooks/useFethingChats';

export const AppChat = () => {

  const id = Object.values(useParams())
  // const match = useMatch()
  // console.log(match)

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