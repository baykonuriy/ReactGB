import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { createStore } from 'redux'
import {Provider} from 'react-redux';
import {store} from './store';
import { FirebaseContext } from './context';
// import firebase from 'firebase';
// import 'firebase/firestore';

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

firebase.initializeApp(
  {
    apiKey: "AIzaSyCAgue9jvJ3htZyvLcCECP52sjdlSG2YV4",
    authDomain: "chat5-41d21.firebaseapp.com",
    projectId: "chat5-41d21",
    storageBucket: "chat5-41d21.appspot.com",
    messagingSenderId: "444657482616",
    appId: "1:444657482616:web:2e813fd54ce4335a24668d",
    measurementId: "G-QT8E4Z1KXM"
  }
);

const firestore = firebase.firestore()

ReactDOM.render(
  <FirebaseContext.Provider value={{
    firebase,
    firestore
  }}>
    <Provider store={store}>
      <App/> 
    </Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
// reportWebVitals();
