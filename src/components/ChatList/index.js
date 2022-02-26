import React from "react";
import styled from './ChatList.module.scss';
import { connect } from "react-redux";
import { ChatListItem } from "..";
import ChatCreator from "../ChatCreator";
import { withChatList1 } from "../../HOCs/withChatList1";
import { withChatList } from "../../HOCs/withChatList";

// import
// { 
//     getUser,
//     getUsers,
//     addCurrentChatAction,
//     addUserAction,
//     addCurrentUserAction
// } from "../../store/chats";

    const ChatList = (
    {
        user,
        users,
        addCurrentChat,
        setUsers,
        setCurrentUser,
        removeThisChat,
        addChat
    }) => {

    return(
        <div className={styled.chatList}>
            <div className={styled.chatList__addChat}>
               {
                   users
                   ?    <ChatCreator
                            value={
                                Object
                                .keys(users)
                                .filter(chat_name => chat_name !== user.id)
                                .map(elem => {
                                return {name: elem, id: elem}
                                    
                            })}
                            action={addChat}
                        />
                    :   <p>Loading...</p>

               }
            </div>
            {
                Object.values(user.chats).length > 0
                ?   Object.values(user.chats)
                        .map(chat => {
                            return (
                                <ChatListItem
                                    chat={chat}
                                    key={chat.id}
                                    action={(chat) => {removeThisChat(chat)}}
                                    clickHandler={chat => addCurrentChat(chat)}
                                />
                            )
                    })
                :   <div className="coldPage">
                        <p>Not chats</p>
                    </div>
            }
        </div>
    )
}

// const mapStateToProps = state => ({
//     user: getUser(state),
//     // users: getUsers(state),
// })

// const mapDispatchToProps = {
//     addCurrentChat: addCurrentChatAction,
//     // setUsers: addUserAction,
//     setCurrentUser: addCurrentUserAction 
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withChatList1(ChatList))
export default withChatList1(ChatList)
