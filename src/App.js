import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentUserAction, getUsersAction } from './store/chats';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components';
import './App.scss';
import { AuthContext } from './context'
import { fetchingUsers } from './asyncActions/users'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const dispatch = useDispatch()
  const users = useSelector(state => state.chats.users)

  useEffect(() =>{
    // console.log('users main', users)
  }, [users])
  
  useEffect(() => {
    dispatch(fetchingUsers())
    if(localStorage.getItem('auth')){
      setIsAuth(true)
    }
    if(localStorage.getItem('user')){
      const curr_user = JSON.parse(localStorage.getItem('user'))
      dispatch(addCurrentUserAction(curr_user))
    }
    if(localStorage.getItem('users')){
      const AllUsers = JSON.parse(localStorage.getItem('users'))
      // console.log('AllUsers', AllUsers)
      dispatch(getUsersAction(AllUsers))
    }
  }, [])



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
