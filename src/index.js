import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {Provider} from 'react-redux';
import { store, persistor } from './store';
import { FirebaseContext } from './context';
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import { PersistGate } from 'redux-persist/integration/react'

firebase.initializeApp(
  {
    apiKey: "AIzaSyDiXFxAbBcSvY0InKzAhyBKn9_tIMrZBMU",
    authDomain: "chat-9873752748903.firebaseapp.com",
    projectId: "chat-9873752748903",
    storageBucket: "chat-9873752748903.appspot.com",
    messagingSenderId: "819835967150",
    appId: "1:819835967150:web:1452b616f2f96c3dd13f3f"
  }
);

const firestore = firebase.firestore()

ReactDOM.render(
  <FirebaseContext.Provider value={{
    firebase,
    firestore
  }}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App/> 
      </PersistGate>
    </Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

