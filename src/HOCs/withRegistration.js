import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const withRegistration = (Component) => {
    return ({users, addUser}) =>{
        const [showAlert, setShowAlert] = useState(false)
        const navigate = useNavigate()
        const goToAuth = ()  => navigate('/auth')
        function registrationUser(e){
            e.preventDefault()
            if(!users.hasOwnProperty(e.target.login.value)){
                const nameArr = e.target.user_name.value.split(' ')
                const newUser =
                {
                    [e.target.login.value]:
                    {
                        first_name: nameArr[1]? nameArr[1] : null,
                        last_name: nameArr[0],
                        patronim: nameArr[2]? nameArr[2] : null,
                        nickname: e.target.login.value,
                        login: e.target.login.value,
                        pass: e.target.user_pass.value,
                        online: false,
                        chats:{
                            [`default_${e.target.login.value}`]:
                            {
                                login: `default_${e.target.login.value}`,
                                online: false,
                                id: `default_${e.target.login.value}`,
                                removable: false
                            }
                        },
                        id: e.target.login.value,
                        removable: true
                    }
                }
                const updatedUsers = {...users, ...newUser}
                addUser(updatedUsers)
                goToAuth()
                setShowAlert(false)
            } else{
                setShowAlert(true)
            }
        }
        return (
            <Component
                showAlert={showAlert}
                registrationUser={registrationUser}
               />
            )
    }
  
}





