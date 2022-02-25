import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export const withAuth = (Component) => {

    return({users, addUser, setAuth}) =>{
        const [showAlert, setShowAlert] = useState(false)
        const [email, setEmail] = useState('')
        const [pass, setPass] = useState('')
        const auth = getAuth()

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
                    addUser(id)
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
        return(
            <Component
                addLogin={addLogin}
                addPass={addPass}
                showAlert={showAlert}
                autorization={autorization}/>)
    }

}