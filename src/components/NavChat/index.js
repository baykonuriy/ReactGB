import React from "react";
import { NavLink } from "react-router-dom";
import
{
    getUser,
    getUsers,
    setAuthAction,
    addCurrentUserAction,
    addUserAction
} from "../../store/chats";
import { connect } from "react-redux";
import styled from './NavChat.module.scss'
import { useNavChat } from "../../hooks/useNavChat";


const NavChat = (
    {
        user,
        users,
        setAuth,
        setCurrentUser,
        returnUserToList
    }) =>{
    const [
        exit,
        activeLink
    ] = useNavChat(
        {
            user,
            users,
            styled,
            setAuth,
            setCurrentUser,
            returnUserToList
        })

    return(
        <div className={styled.NavChat}>
            <ul className={styled.NavChat__list}>
                <li
                    className={styled.NavChat__list__item}
                    title="Main Page">
                    <div
                        className={styled.NavChat__list__item__exit}
                        onClick={exit}
                        title="Sign out">
                    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6 2.5H13V1H6C4.34315 1 3 2.34315 3 4V16C3 17.6569 4.34315 19 6 19H13V17.5H6C5.17157 17.5 4.5 16.8284 4.5 16V4C4.5 3.17157 5.17157 2.5 6 2.5ZM12.1125 13.1836L13.1716 14.2426L14.2322 13.182L16.7071 10.7071C17.0976 10.3166 17.0976 9.68342 16.7071 9.29289L14.2322 6.81802L13.1716 5.75736L12.1125 6.81641L14.5461 9.25L7 9.25V10.75L14.5461 10.75L12.1125 13.1836Z" fill="#101828"/>
                    </svg>

                    </div>
                </li>
                <li
                    className={styled.NavChat__list__item}
                    title="Main Page">
                    <NavLink to="/" className={activeLink}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M19.9548 10.4387L17.516 11.3466V18.0005C17.516 18.829 16.8445 19.5005 16.016 19.5005H15V14C15 12.8954 14.1046 12 13 12H11C9.89543 12 9 12.8954 9 14V19.5005H7.99273C7.16431 19.5005 6.49273 18.829 6.49273 18.0005V11.3456L4.04584 10.4372L12.0021 4.61948L19.9548 10.4387ZM21.3481 11.5205L19.016 12.3887V18.0005C19.016 19.6574 17.6729 21.0005 16.016 21.0005H7.99273C6.33588 21.0005 4.99273 19.6574 4.99273 18.0005V12.3887L2.65219 11.5198C1.90514 11.2425 1.76672 10.2455 2.40997 9.77514L11.412 3.19278C11.7636 2.93567 12.2412 2.93575 12.5927 3.19298L21.5897 9.77631C22.2324 10.2465 22.0944 11.2427 21.3481 11.5205ZM11 13.5H13C13.2761 13.5 13.5 13.7239 13.5 14V19.5H10.5V14C10.5 13.7239 10.7239 13.5 11 13.5Z" fill="#101828"/>
                        </svg>
                    </NavLink>
                </li>
                <li
                    className={styled.NavChat__list__item}
                    title="User Profile">
                    <NavLink to="/profile" className={activeLink}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M17.3266 18.6244C19.2617 17.0664 20.5 14.6778 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.6778 4.73826 17.0664 6.67343 18.6244C7.2842 16.2525 9.43744 14.5 12 14.5C14.5626 14.5 16.7158 16.2525 17.3266 18.6244ZM15.9712 19.5172C15.7328 17.5357 14.0457 16 12 16C9.95426 16 8.26721 17.5357 8.02884 19.5172C9.21409 20.1447 10.5655 20.5 12 20.5C13.4345 20.5 14.7859 20.1447 15.9712 19.5172ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.1716 8.5 10.5 9.17157 10.5 10C10.5 10.8284 11.1716 11.5 12 11.5ZM12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" fill="#101828"/>
                        </svg>
                    </NavLink>
                </li>
                <li
                    className={styled.NavChat__list__item}
                    title="Chats">
                    <NavLink to="/chats" className={activeLink}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7 12.4893H6.64618L6.32966 12.6474L3.5 14.061L3.5 5C3.5 4.17157 4.17157 3.5 5 3.5L15 3.5C15.8284 3.5 16.5 4.17157 16.5 5V10.9893C16.5 11.8177 15.8284 12.4893 15 12.4893L7 12.4893ZM7.5 13.9893L7.5 16.9857C7.5 17.8141 8.17157 18.4857 9 18.4857L17 18.4857H17.3773L17.7097 18.6642L20.5 20.1627V10.9955C20.5 10.1671 19.8284 9.49554 19 9.49554H18V10.9893C18 12.6461 16.6569 13.9893 15 13.9893L7.5 13.9893ZM18 7.99554V5C18 3.34315 16.6569 2 15 2H5C3.34315 2 2 3.34314 2 5L2 14.8697C2 15.6129 2.78202 16.0964 3.4469 15.7642L6 14.4888V16.9857C6 18.6426 7.34315 19.9857 9 19.9857L17 19.9857L20.5269 21.8797C21.1931 22.2375 22 21.7549 22 20.9987V10.9955C22 9.33869 20.6569 7.99554 19 7.99554H18Z" fill="#101828"/>
                        </svg>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}


const mapStateToProps = state => ({
    user: getUser(state),
    users: getUsers(state)
})

const mapDispatchToProps = {
    setAuth: setAuthAction,
    setCurrentUser: addCurrentUserAction,
    returnUserToList: addUserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(NavChat)
