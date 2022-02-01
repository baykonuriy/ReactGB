import React from "react";
import styled from './Profile.module.scss'
import { CheckBox } from "../../../components"; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


export const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile)

    function getChecked(value){
        dispatch({type: 'CHANGE_STATUS', payload: value})
    }

    return(
        <div className={styled.Profile}>
            <div className={styled.Profile__User}>
                <div className={styled.Profile__User__FirstEndPatronim}>
                    <p>{ profile.first_name }</p>
                    <p>{ profile.patronim }</p>
                    <p>{ profile.last_name }</p>
                </div>
                <CheckBox
                    getChecked={(e)=> getChecked(e.target.checked)}
                    label={'show my status other users'}/>
            </div>
        </div>
    )
}