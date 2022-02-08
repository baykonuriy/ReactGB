import React, {useEffect, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import styled from './ChatList.module.scss';
import { useSelector, useDispatch, connect } from "react-redux";
import { useFirebaseChats } from "../../hooks/useFirebaseChats";
import { useFarebaseUsers } from "../../hooks/useFirebaseUsers";
import { updateUsers } from "../../asyncActions/users";
import { addCurrentUserAction } from "../../store/chatsReducer";
import { ChatListItem, DropDownField } from "..";

const ChatList1 = ({user, users}) => {
    const
    [
        chat,
        createDefaultChat,
        getCurrentChat,
        createChat,
        addMessage
    ] = useFirebaseChats()

    const
    [
        showAlert,
        fireUsers,
        usersOnline,
        registrationUser,
        autorization,
        exit,
        getChatList,
        updateUserChatList
    ] = useFarebaseUsers()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const goFirstChat = () => navigate(`default_${user.id}`)
    const firstMessage = 'Write something to your interlocutor and he will receive this message'

    useEffect(() => {
        goFirstChat()
    }, [])

    // console.log('users list', users)

    // function getAvailableList(arr){
       
    //     return  Object.keys(arr[0])
    //             .filter(str => str !== user.id)
    //             .map(elem => {
    //                 return{
    //                     name: elem,
    //                     id: elem
    //                 }
    //     })
    // }
    // getAvailableList(users[0])

    const availableChats = useMemo(() => {
       return getChatList(users)
    }, [users])

    // function addNewChat(chat){
    //     const updatedUser = {...user}
    //     updatedUser.chats = {...updatedUser.chats, [chat.name]: users[chat.name]}
    //     const updatedAllUsers = {...users}
    //     updatedAllUsers[user.id] = {...updatedUser}
    //     updateUserChatList(updatedAllUsers, updatedUser)
    // }

    return(
        <div className={styled.chatList}>
            <div className={styled.chatList__addChat}>
                <DropDownField
                    value={availableChats}
                    type="field"
                    action={recipient => createChat(recipient, user, firstMessage, 'Robot')}
                    >
                </DropDownField>
            </div>
            {
                Object.values(user.chats)
                .map(chat => {
                    return (
                        <ChatListItem
                            chat={chat}
                            key={chat.id}
                            // action={(chat) => {
                            //     goBack()
                            //     elementActionHandler('chats', chat, 'remove')
                            // }}
                            clickHandler={id => getCurrentChat(id)}
                            />
                    )
                    
                })
             
            }
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.chats.user,
    users: state.chats.users
})

export default connect(mapStateToProps)(ChatList1)