import React, {useState, useRef} from "react";
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
    const inp = useRef()
    function sendValue(e){
        if(e.code === 'Enter'){
            action(value)
            setValue('')
        }
    }

    return(
        <div className={styled.InputText}>
            <input
                autoFocus
                ref={inp}
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
                        inp.current.focus()
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