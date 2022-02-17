import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentUserAction, getUsersAction } from './store/chats';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import { AuthContext } from './context'
import { fetchingUsers } from './asyncActions/users'
import AppRouter from './components/AppRouter/index';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const dispatch = useDispatch()
  const users = useSelector(state => state.chats.users)
  const user = useSelector(state => state.chats.user)
  const chats = useSelector(state => state.chats)

  useEffect(() =>{
     console.log('chats main', chats)
  }, [chats])

  return(
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
    
    
  )
}

export default App;
