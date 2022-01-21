import React from 'react';
import './App.scss';
import { AppChat } from './pages/AppChat';
import { useFiltredMessage } from './hooks/useFiltredMessage';
import { useColdPage } from './hooks/useColdPage';
import { useFetchingMessages1 } from './hooks/useFetchingMessages1';

function App() {

const
  [
    loadMessages,
    createMessage,
    removeMessage,
    messages,
    removedMessages,
    loading,
    error
  ] = useFetchingMessages1()
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

  return (
    <div className="App">
      <AppChat
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
