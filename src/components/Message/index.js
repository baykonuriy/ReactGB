import React, {Fragment} from "react";
import styled from './Message.module.scss'

export const Message = (props) =>{
    const {message} = props
    return(
        <Fragment>
            <div className={styled.messageCard}>
                <p className={styled.messageCard__user}>{message.user}</p>
                <p className={styled.messageCard__p}>{message.text}</p>
                <span className="description">{message.date}</span>
            </div>
        </Fragment>
    )
}