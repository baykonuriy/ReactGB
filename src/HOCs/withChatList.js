import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const withChatList = (Component) =>{
    return (props) => {
        const navigate = useNavigate()
        const goToDefaultChat = () => navigate(`default_${props.user.id}`)
        const goToBack = () => navigate(-1)
        function updatingObjectList(list, filterVal){
            return  Object
                    .values(list)
                    .filter(elem => elem.id !== filterVal)
                    .reduce((acc, curr) => {
                        acc[curr.id] = curr
                        return acc
                    }, {})
        }

        function addChat(val){
            const updateUser = {...props.user}
            updateUser.chats = {[val.id]: props.users[val.id], ...props.user.chats}
            const updateUsers = updatingObjectList(props.users, val.id)
            props.setCurrentUser(updateUser)
            props.setUsers(updateUsers)
        }

        const removingThisChat = {
            wait:
                (updatedUsers, updatedCurrentUser) => 
                    setTimeout(() => {
                        goToBack()
                        props.setCurrentUser(updatedCurrentUser)
                        props.setUsers(updatedUsers)
                    }, 100)
        }

        function removeThisChat(chat){
            const updatedUsers = {[chat.id]: chat, ...props.users}
            const updatedChatsCurrentUser = updatingObjectList(props.user.chats, chat.id)
            const updatedCurrentUser = {...props.user, chats: {...updatedChatsCurrentUser}}
            removingThisChat.wait(updatedUsers, updatedCurrentUser)
        }

        useEffect(()=>{
            return () => {
                clearTimeout(removingThisChat.wait)
            }
        }, [])

        useEffect(() => {
            props.addCurrentChat(`default_${props.user.id}`)
            goToDefaultChat()
        }, [])

        return (
            <Component
                removeThisChat={removeThisChat}
                addChat={addChat}
                {...props}
                />)
    }
}
