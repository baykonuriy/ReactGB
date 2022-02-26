import { useEffect, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { addCurrentUserAction } from '../store/chats'

export const withChatList1 = (Component) =>{
    return () => {
        const navigate = useNavigate()
        const goToBack = () => navigate(-1)
        const db = getDatabase()
        const refFirebaseUsers = ref(db, 'users')
        const [firebseUsers, setFirebseUsers] = useState()

        const getFirebaseUsers = useCallback(() => {
            return onValue((refFirebaseUsers), (snapshot) => {
                setFirebseUsers(snapshot.val())
            }, {
                onlyOnce: false
            })
        }, [])

        useEffect(() => {
            getFirebaseUsers()
                return () =>{
                    getFirebaseUsers()
            }
        }, [])

        const user = useSelector(state => state.chats.user)
        const dispatch = useDispatch()

        useEffect(() => {
            console.log('firebseUsers', firebseUsers)
        }, [firebseUsers])

        const goToDefaultChat = () => navigate(`default_${user.id}`)

        function addChat(val){
            const updateUser = {...user}
            updateUser.chats = {[val.id]: firebseUsers[val.id], ...user.chats}
            dispatch(addCurrentUserAction(updateUser))
            updateCurrentUserInBase(user.id, updateUser)
        }

        async function updateCurrentUserInBase(user_id, update_user){
            try{
                await set(ref(db, 'users/' + user_id), update_user)
            } catch(err){
                console.log(err)
            }
        }

        const removingThisChat = {
            wait:
                (updatedCurrentUser) => 
                    setTimeout(() => {
                        goToBack()
                        dispatch(addCurrentUserAction(updatedCurrentUser))
                        updateCurrentUserInBase(user.id, updatedCurrentUser)
                    }, 100)
        }

        function removeThisChat(chat){
            
            // const updatedUsers = {[chat.id]: chat, ...props.users}
            // const updatedChatsCurrentUser = updatingObjectList(props.user.chats, chat.id)
            // const updatedCurrentUser = {...props.user, chats: {...updatedChatsCurrentUser}}
            // removingThisChat.wait(updatedUsers, updatedCurrentUser)
        }

        useEffect(()=>{
            return () => {
                updateCurrentUserInBase()
            }
        }, [])

        // useEffect(() => {
        //     props.addCurrentChat(`default_${props.user.id}`)
        //     goToDefaultChat()
        // }, [])

        return (
            <Component
                user={user}
                users={firebseUsers}
                removeThisChat={removeThisChat}
                addChat={addChat}
                />)
    }
}
