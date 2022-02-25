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
                } catch(err){
                    setShowAlert(true)
                }
                goToAuth()
                
            }
        }

        const createUser = async () => {
            const nameArr = name.split(' ')
            const regexp = /([^\s]+)@([^\s\.]+)/gm
            const id = email.match(regexp)[0]
            const newUser =
            {
                first_name: nameArr[1]? nameArr[1] : null,
                last_name: nameArr[0],
                patronim: nameArr[2]? nameArr[2] : null,
                nickname: id,
                login: id,
                pass: password,
                online: false,
                chats:{
                    [`default_${id}`]:
                    {
                        login: `default_${id}`,
                        online: false,
                        id: `default_${id}`,
                        removable: false
                    }
                },
                id: id,
                removable: true
            }
            try{
                const db =  getDatabase()
                await set(ref(db, 'users/' + id), newUser)
            } catch(err){
                console.log('err', err)
            }
            
            
        }

        return (
            <Component
                createUser={createUser}
                addingValuesInStates={addingValuesInStates}
                showAlert={showAlert}
                registrationUser={registrationUser}
               />
            )
    }
  
}



