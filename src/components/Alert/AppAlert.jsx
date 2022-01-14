import React, {useContext} from "react";
import {AlertContext} from '../../context/alert/AlertContext'

export const AppAlert = () =>{
    const {alert, hide} = useContext(AlertContext)

    if(!alert) return null
    return(
        <div className={`alert alert-${alert.type || 'secondary'} alert-dismissible`}>
            {alert.text}
            <button onClick={hide}>close</button>
        </div>
    )
}