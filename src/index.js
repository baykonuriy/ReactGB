import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {Provider} from 'react-redux';
import { store, persistor } from './store';
import { FirebaseContext } from './context';
import { PersistGate } from 'redux-persist/integration/react'
import
{ 
  firestore,
  db,
  firebaseApp,
  firebaseAuth
} from './services/firebase'

ReactDOM.render(
  <FirebaseContext.Provider value={{
    firebaseApp,
    firestore,
    firebaseAuth,
    db
  }}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App/> 
      </PersistGate>
    </Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

