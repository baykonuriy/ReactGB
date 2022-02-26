import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'

export const withAuth = (Component) => {

    return({users, addUser, setAuth}) =>{
        const [showAlert, setShowAlert] = useState(false)
        const [email, setEmail] = useState('')
        const [pass, setPass] = useState('')
        const auth = getAuth()
        const db = getDatabase()

        const addLogin = (login) => {
            setEmail(login)
        }

        const addPass = (pass) => {
            setPass(pass)
        }

        async function autorization(e){
            e.preventDefault()
            
            if(email !== '' && pass !== '')
                try{
                    const regexp = /([^\s]+)@([^\s\.]+)/gm
                    const id = email.match(regexp)[0]
                    await signInWithEmailAndPassword(auth, email, pass)
                    dispatchingCurrentUser(id)
                    setAuth(true)
                } catch(err){
                    setShowAlert(true)
                    setAuth(false)
                }
               
            // if(
            //     users[e.target.login.value] &&
            //     users[e.target.login.value].pass === e.target.user_pass.value){
            //     addUser(users[e.target.login.value])
            //     setShowAlert(false)
            //     setAuth(true)
            // } else{
            //     setShowAlert(true)
            //     setAuth(false)
            // }
        }
        const dispatchingCurrentUser = (user_id) => {
            const currentUser = ref(db, 'users/' + user_id)
                onValue(currentUser, (snapshot) => {
                    const data = snapshot.val()
                    addUser(data)
                })
            
        }
        return(
            <Component
                addLogin={addLogin}
                addPass={addPass}
                showAlert={showAlert}
                autorization={autorization}/>)
    }

}