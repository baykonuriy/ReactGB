import React, {useState, useRef, useEffect} from "react";
import styled from "./InputText.module.scss"
import { FunctionButton } from "..";

export const InputText = (props) =>{
    const [value, setValue] = useState('')
    const
        {
            action,
            children,
            iconTitle,
            placeholder,
            opened_list,
            type
        } = props
    const inp = useRef()

    function openListHandler(){
        setTimeout(() => {
            opened_list(false)
        }, 100)
    }

    if(type === 'select'){

      
        function sendValue(e){

        }
        return(
            <div className={styled.InputText}>
                <input
                    autoFocus
                    placeholder={placeholder}
                    style={{paddingRight: "24px"}}
                    className={styled.InputText__inp}
                    value={value}
                    onFocus={() => opened_list(true)}
                    onBlur={openListHandler}
                    onChange={(e)=> sendValue(e.target.value)}
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

    if(!type){
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
                    placeholder={placeholder}
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
}