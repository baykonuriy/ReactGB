import React, {useState} from "react";
import styled from "./MultiSelect.module.scss"
import { FunctionButton } from "..";

export const MultiSelect = (props) =>{
    const [value, setValue] = useState('')
    const {action} = props

    function sendValue(e){
        if(e.code === 'Enter'){
            action(value)
            setValue('')
        }
    }
    return(
        <div className={styled.MultiSelect}>
            <input
                style={{paddingRight: "24px"}}
                className={styled.MultiSelect__inp}
                onKeyDown={sendValue}
                value={value}
                onChange={(e)=> setValue(e.target.value)}
                onClick={(e)=> e.stopPropagation()}
                type="text"/>
            <div className={styled.MultiSelect__enter}>
                <FunctionButton
                    action={()=>action(value)}
                    size="16px">
                    <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5909 6H12.5909C13.9716 6 15.0909 7.11929 15.0909 8.5V10.5C15.0909 11.8807 13.9716 13 12.5909 13H7.03024L8.88909 11.1412L8.18198 10.434L5.61603 13H5.5909V13.0251L5.35355 13.2625L5 13.616L5.35355 13.9696L8.18198 16.798L8.88909 16.0909L6.79819 14H12.5909C14.5239 14 16.0909 12.433 16.0909 10.5V8.5C16.0909 6.567 14.5239 5 12.5909 5H8.5909V6Z"
                            fill="#101828"/>
                    </svg>
                </FunctionButton>
            </div>
            
        </div>
        
    )
}