import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, NavLink, Outlet, Navigate} from 'react-router-dom';
import './App.scss';
import { LayOutChat } from './pages/AppChat/Layout';
import { AppChat } from './pages/AppChat/AppChat';
import { Profile } from './pages/AppChat/Profile/Profile';
import { Main } from './pages/AppChat/Main/Main'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOutChat/>}>
          <Route index element={<Main/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="chats/*" element={<AppChat/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
