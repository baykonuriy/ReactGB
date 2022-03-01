import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/database"
import "firebase/compat/auth"


export const firebaseApp = firebase.initializeApp(
    {
      apiKey: "AIzaSyDiXFxAbBcSvY0InKzAhyBKn9_tIMrZBMU",
      authDomain: "chat-9873752748903.firebaseapp.com",
      databaseURL: "https://chat-9873752748903-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "chat-9873752748903",
      storageBucket: "chat-9873752748903.appspot.com",
      messagingSenderId: "819835967150",
      appId: "1:819835967150:web:1452b616f2f96c3dd13f3f"
    }
  );

export const firestore = firebase.firestore()
export const db = firebase.database()
export const firebaseAuth = firebase.auth()

export const rootRef = db.ref('root')
export const chatsRef = rootRef.child('chats')
export const usersRef = rootRef.child('users')