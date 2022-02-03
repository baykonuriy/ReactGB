import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components';
import { useFetchingChats } from './hooks/useFethingChats';
import './App.scss';

function App() {
  const
  [
    getChats,
    addChat,
    removeChat,
    getCurrChat
  ] = useFetchingChats()

  useEffect(() => {
    getChats()
    // getCurrChat('0')
  }, [])

  return(
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
    
  )
}

export default App;
