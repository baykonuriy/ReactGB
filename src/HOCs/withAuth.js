import React, { useState } from "react";

export const withAuth = (Component) => {

    return({users, addUser, setAuth}) =>{
        const [showAlert, setShowAlert] = useState(false)
        function autorization(e){
            e.preventDefault()
            if(
                users[e.target.login.value] &&
                users[e.target.login.value].pass === e.target.user_pass.value){
                addUser(users[e.target.login.value])
                setShowAlert(false)
                setAuth(true)
            } else{
                setShowAlert(true)
                setAuth(false)
            }
        }
        return(
            <Component
                showAlert={showAlert}
                autorization={autorization}/>)
    }

}