import React, {useState} from "react";
import styled from "./InputText.module.scss"
import { FunctionButton } from "..";

export const InputText = (props) =>{
    const [value, setValue] = useState('')
    const
        {
            action,
            children,
            iconTitle
        } = props

    function sendValue(e){
        if(e.code === 'Enter'){
            action(value)
            setValue('')
        }
    }

    return(
        <div className={styled.InputText}>
            <input
                style={{paddingRight: "24px"}}
                className={styled.InputText__inp}
                onKeyDown={sendValue}
                value={value}
                onChange={(e)=> setValue(e.target.value)}
                onClick={(e)=> e.stopPropagation()}
                type="text"/>
            <div className={styled.InputText__enter}>
                <FunctionButton
                    action={()=>{
                        action(value)
                        setValue('')
                    }}
                    size="16px"
                    title={iconTitle}
                    disabled={value === ''? true : false}>
                    {children}
                </FunctionButton>
            </div>
            
        </div>
        
    )
}