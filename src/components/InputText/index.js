import React, {useState, useRef, useEffect} from "react";
import styled from "./InputText.module.scss"
import { FunctionButton } from "..";
import { withSendMessagePanel } from "../../HOCs/withSendMessagePanel";

export const InputText = (props) =>{
    const
        {
            action,
            value,
            children,
            iconTitle,
            placeholder,
            sendValue,
            changeValueInInput,
            preventClick,
            disabledButton,
            sendValueInButtonClick
        } = props
    const inp = useRef()
   
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
                onChange={changeValueInInput}
                onClick={preventClick}
                type="text"/>
            <div className={styled.InputText__enter}>
                <FunctionButton
                    action={sendValueInButtonClick}
                    size="16px"
                    title={iconTitle}
                    disabled={disabledButton}>
                    {children}
                </FunctionButton>
            </div>
        </div>
    )
}

export default withSendMessagePanel(InputText)