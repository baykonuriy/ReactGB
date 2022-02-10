import React, {useEffect, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import styled from './ChatList.module.scss';
import { useSelector, useDispatch, connect } from "react-redux";
import { useFirebaseChats } from "../../hooks/useFirebaseChats";
import { useFarebaseUsers } from "../../hooks/useFirebaseUsers";
import { ChatListItem, ChatCreator, Icon } from "..";

const ChatList = ({user, users}) => {
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
        updateUserChatList,
        fireUsersLoading
    ] = useFarebaseUsers()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const goFirstChat = () => navigate(`default_${user.id}`)
    const firstMessage = 'Write something to your interlocutor and he will receive this message'

    useEffect(() => {
        goFirstChat()
    }, [])

    const availableChats = useMemo(() => {
        console.log('fireUsersLoading', fireUsersLoading)
        if(fireUsersLoading){
            return getChatList(users)
        } else{
            return getChatList(fireUsers)
        }
       
    }, [users])

    return(
        <div className={styled.chatList}>
            <div className={styled.chatList__addChat}>
                <ChatCreator
                    value={availableChats}
                    iconTitle="Add new chat"
                    type="field"
                    action={recipient => createChat(recipient, user, firstMessage, 'Robot')}
                    >
                    <Icon
                        name="add"
                        size={24}>
                    </Icon>
                </ChatCreator>
            </div>
            {
                fireUsersLoading ?
                <p>Loading...</p>
                : Object.values(fireUsers[0][user.id].chats)
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

export default connect(mapStateToProps)(ChatList)