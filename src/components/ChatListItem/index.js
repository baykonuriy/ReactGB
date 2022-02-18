import React, { useState } from "react";
import styled from './ChatListItem.module.scss'
import { NavLink } from "react-router-dom";
import { FunctionButton } from "..";
import { useSelector } from "react-redux";

export const ChatListItem = ({chat, action, clickHandler}) => {
    const [hover, setHover] = useState(false)
    const user = useSelector(state => state.chats.user)
    return(
        <NavLink
            onMouseOver={()=> setHover(true)}
            onMouseOut={()=> setHover(false)}
            onClick={() => clickHandler(chat.id)}
            to={chat? chat.id : '/chats'}
            className={({isActive})=> isActive? styled.ChatListItem + ' ' + styled.active : styled.ChatListItem}
            key={chat.id}>
            <div className={styled.ChatListItem__textWrapper}>
                <p>{chat.login}</p>
                <span className="description">
                    Online
                </span>
            </div>
            <div
                className={styled.ChatListItem__actions}
                style=
                    {
                        chat.removable === true
                        ?   {display: "block"}
                        :   {display: "none"}
                    }>
                <FunctionButton
                    size={20}
                    action={()=> action(chat)}>
                    <svg 
                        width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style=
                            {
                                hover === true
                                ? {display: 'block'}
                                : {display: 'none'}
                            }>
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="#101828"/>
                    </svg>
                    <svg
                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style=
                            {
                                hover === true
                                ? {display: 'none'}
                                : {display: 'block'}
                            }>
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.5 6C13.5 6.82843 12.8284 7.5 12 7.5C11.1716 7.5 10.5 6.82843 10.5 6C10.5 5.17157 11.1716 4.5 12 4.5C12.8284 4.5 13.5 5.17157 13.5 6ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12ZM12 19.5C12.8284 19.5 13.5 18.8284 13.5 18C13.5 17.1716 12.8284 16.5 12 16.5C11.1716 16.5 10.5 17.1716 10.5 18C10.5 18.8284 11.1716 19.5 12 19.5Z" fill="#101828"/>
                    </svg>
                </FunctionButton>
            </div>
        </NavLink>
    )
}