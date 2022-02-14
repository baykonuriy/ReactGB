import React from "react";
// import { InputText } from "..";
import InputText from "../InputText";
import styled from './SendMessPanel.module.scss'

export const SendMessagePanel = ({sendMessage}) =>{

    function createEndSendMessage(e){
        if(e !== ''){
            sendMessage(e)
        }
    }
    
    return(
        <div className={styled.MessagePanel}>
            <InputText
                iconTitle="Отправить"
                action={createEndSendMessage}
            >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.50224 21.5535L3.54345 21.5329L20.941 12.8365L20.9486 12.8326L21.1277 12.7432L21.7237 12.4452C22.0923 12.261 22.0923 11.735 21.7237 11.5507L21.1276 11.2528L20.9486 11.1633L20.941 11.1595L3.54345 2.46309L3.50224 2.44249L3.17298 2.2779L2.72571 2.05433C2.32727 1.85517 1.88693 2.23715 2.02783 2.65972L2.18599 3.13408L2.30242 3.48329L2.31699 3.52699L5.08869 11.8398C5.12292 11.9425 5.12292 12.0535 5.08869 12.1561L2.31699 20.469L2.30242 20.5127L2.18599 20.8619L2.02783 21.3362C1.88693 21.7588 2.32727 22.1408 2.72571 21.9416L3.17297 21.7181L3.50224 21.5535ZM4.21441 4.47544L19.2636 11.998L4.21441 19.5205L6.24398 13.4335L7.50057 13.2452L10.8002 12.7509L11.6786 12.6193L12.3926 12.5123L12.5459 12.4894C13.113 12.4044 13.1143 11.5875 12.5474 11.5009L12.3942 11.4775L11.6806 11.3684L10.8026 11.2342L7.50037 10.7294L6.23513 10.536L4.21441 4.47544Z"
                            fill="#101828"/>
                    </svg>
            </InputText>
        </div>
    )
}