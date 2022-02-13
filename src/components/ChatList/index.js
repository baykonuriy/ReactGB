import React, {useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from './ChatList.module.scss';
import { useSelector, useDispatch, connect } from "react-redux";
import { useFirebaseChats } from "../../hooks/useFirebaseChats";
import { useFarebaseUsers } from "../../hooks/useFirebaseUsers";
import { ChatListItem, Icon } from "..";
import ChatCreator from "../ChatCreator";

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
    const id = Object.values(useParams())
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const goFirstChat = () => navigate(`default_${user.id}`)
    const firstMessage = 'Write something to your interlocutor and he will receive this message'
    const recipientFirstMessage = `User ${user.id} added you to the chat list`

    useEffect(() => {
        if(id[0] === '')
            goFirstChat()
    }, [id])


    return(
        <div className={styled.chatList}>
            
            <div className={styled.chatList__addChat}>
                
                <ChatCreator
                    value=
                    {
                        fireUsersLoading
                            ? getChatList(users)
                            : getChatList(fireUsers[0])
                    }
                    iconTitle="Add new chat"
                    type="field"
                    action={recipient => 
                        createChat(
                            recipient,
                            user,
                            firstMessage,
                            recipientFirstMessage,
                            'Robot')}
                >
                    <Icon
                        name="add"
                        size={24}>
                    </Icon>
                </ChatCreator>

            </div>
            {
                fireUsersLoading
                    ? <p>Loading...</p>
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