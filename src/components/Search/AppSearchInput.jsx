import React, {Fragment, useContext, useState} from "react";
import { AlertContext } from "../../context/alert/AlertContext";
import { GitHubContext } from "../../context/gitHub/GitHubContext";
import classed from './search.module.scss'

export const AppSearchInput = ()=>{
    const [value, setValue] = useState('')
    const {show, hide} = useContext(AlertContext)
    const gitHub = useContext(GitHubContext)
    const onSubmit = event =>{
        // if(event.key === 'Enter'){
        //     // show('This alert')
        //     console.log(value)
        // }
        if(event.key !== 'Enter'){
            return
        }
        gitHub.clearUsers()
        if(value.trim()){
            hide()
            gitHub.search(value.trim())
            
        }
        else{
            show('Введите имя пользователя')
        }
    }


    return(
        <Fragment>
            <input
                type="text"
                className={classed.inp}
                placeholder={'Введите имя пользователя'}
                value={value}
                onChange = {event => setValue(event.target.value)}
                onKeyPress={onSubmit}/>
        </Fragment>
    )
}