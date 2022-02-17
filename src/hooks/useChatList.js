import { connect } from "react-redux";
import
{ 
    getUser,
    getUsers,
    getChatList,
    getCurrentChat
   
} from "../store/chats/selectors";

import {
    setChatsActions,
    addCurrentChatAction,
    addUserAction,
    addCurrentUserAction,
} from "../store/chats/actions"

export const useChatList = ({
    user,
    users,
    addCurrentChat,
    setUsers,
    setCurrentUser
}) => {
   
    return{
        user,
        users,
        addCurrentChat,
        setUsers,
        setCurrentUser,
    }
}
 
const mapStateToProps = state => ({
    user: getUser(state),
    users: getUsers(state),
    chats: getChatList(state),
    currentChat: getCurrentChat(state)
})

const mapDispatchToProps = {
    setChats: setChatsActions,
    addCurrentChat: addCurrentChatAction,
    setUsers: addUserAction,
    setCurrentUser: addCurrentUserAction 
}

export default connect(mapStateToProps, mapDispatchToProps)(useChatList)