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
import { Icon } from "..";


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
                        <Icon
                            size={24}
                            name="exit"
                            color="#101828"
                            viewBox="0 0 24 24"/>
                    </div>
                </li>
                <li
                    className={styled.NavChat__list__item}
                    title="Main Page">
                    <NavLink to="/" className={activeLink}>
                        <Icon
                            size={24}
                            name="home"
                            color="#101828"
                            viewBox="0 0 24 24"/>
                    </NavLink>
                </li>
                <li
                    className={styled.NavChat__list__item}
                    title="User Profile">
                    <NavLink to="/profile" className={activeLink}>
                        <Icon
                            size={24}
                            name="user"
                            color="#101828"
                            viewBox="0 0 24 24"/>
                    </NavLink>
                </li>
                <li
                    className={styled.NavChat__list__item}
                    title="Chats">
                    <NavLink to="/chats" className={activeLink}>
                        <Icon
                            size={24}
                            name="chats"
                            color="#101828"
                            viewBox="0 0 24 24"/>
                    </NavLink>
                </li>
                <li
                    className={styled.NavChat__list__item}
                    title="Chats">
                    <NavLink to="/gists" className={activeLink}>
                        <Icon
                            size={24}
                            name="users"
                            color="#101828"
                            viewBox="0 0 24 24"/>
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
