import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../context";
import { usersRef } from "../services/firebase";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

export const withRegistration = (Component) => {
    return ({users, addUser}) =>{
        const auth = getAuth()
        const navigate = useNavigate()
        const goToAuth = ()  => navigate('/auth')

        const [name, setName] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [showAlert, setShowAlert] = useState(false)
        const db = getDatabase()

        const addingValuesInStates = (inputName, value) => {
            switch(inputName){
                case 'name':
                    setName(value)
                    break
                case 'pass':
                    setPassword(value)
                    break
                case 'login':
                    setEmail(value)
                    break
            }
        }

        const registrationUser  = async (e) => {
            e.preventDefault()
            if(email !== '' && password !== '' && name !== ''){
                try{
                    await createUserWithEmailAndPassword(auth, email, password)
                    createUser()
                    goToAuth()
                } catch(err){
                    setShowAlert(true)
                }
            }
        }

        const createUser = () => {
            const nameArr = name.split(' ')
            const newUser =
            {
                first_name: nameArr[1]? nameArr[1] : null,
                last_name: nameArr[0],
                patronim: nameArr[2]? nameArr[2] : null,
                nickname: name,
                login: email,
                pass: password,
                online: false,
                chats:{
                    [`default_${email}`]:
                    {
                        login: `default_${email}`,
                        online: false,
                        id: `default_${email}`,
                        removable: false
                    }
                },
                id: email,
                removable: true
            }
            // usersRef.set({...usersRef, ...newUser})
            
            set(ref, (db, 'root'), {us: 'hhh'})
            
        }

        //  const registrationUser  = async (e) => {
        //     e.preventDefault()
        //     setEmail(e.target.login.value)
        //     setPassword(e.target.user_pass.value)
        //         try{
        //             await createUserWithEmailAndPassword(auth, email, password)
        //             goToAuth()
        //         } catch(err){
        //             setError(err)
        //             setShowAlert(true)
        //         }
        //     // if(!users.hasOwnProperty(e.target.login.value)){
        //     //     const nameArr = e.target.user_name.value.split(' ')
        //     //     const newUser =
        //     //     {
        //     //         [e.target.login.value]:
        //     //         {
        //     //             first_name: nameArr[1]? nameArr[1] : null,
        //     //             last_name: nameArr[0],
        //     //             patronim: nameArr[2]? nameArr[2] : null,
        //     //             nickname: e.target.login.value,
        //     //             login: e.target.login.value,
        //     //             pass: e.target.user_pass.value,
        //     //             online: false,
        //     //             chats:{
        //     //                 [`default_${e.target.login.value}`]:
        //     //                 {
        //     //                     login: `default_${e.target.login.value}`,
        //     //                     online: false,
        //     //                     id: `default_${e.target.login.value}`,
        //     //                     removable: false
        //     //                 }
        //     //             },
        //     //             id: e.target.login.value,
        //     //             removable: true
        //     //         }
        //     //     }
        //     //     const updatedUsers = {...users, ...newUser}
        //     //     addUser(updatedUsers)
        //     //     goToAuth()
        //     //     setShowAlert(false)
        //     // } else{
        //     //     setShowAlert(true)
        //     // }
        // }
        return (
            <Component
                addingValuesInStates={addingValuesInStates}
                showAlert={showAlert}
                registrationUser={registrationUser}
               />
            )
    }
  
}



