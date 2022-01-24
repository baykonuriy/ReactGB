import React, { useEffect } from 'react';
import './App.scss';
import { AppChat } from './pages/AppChat/AppChat';
import { useFiltredMessage } from './hooks/useFiltredMessage';
import { useColdPage } from './hooks/useColdPage';
import { useFetchingMessages } from './hooks/useFetchingMessages';
import { useChatList } from './hooks/useChatList';


function App() {

const [chats] = useChatList()
console.log(chats)
const
  [
    loadMessages,
    createMessage,
    removeMessage,
    messages,
    loading,
    error
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

  useEffect(()=>{
    console.log(loading)
  }, [loading])

const ColdPage = useColdPage(filtredMessage, messages)

  return (
    <div className="App">
      <AppChat
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
        messages={filtredMessage}/>
    </div>
  );
}

export default App;
