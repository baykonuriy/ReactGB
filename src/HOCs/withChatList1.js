import { useEffect, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { addCurrentUserAction, addCurrentChatAction } from '../store/chats'

export const withChatList1 = (Component) =>{
    return () => {
        const navigate = useNavigate()
        const goToBack = () => navigate(-1)
        const db = getDatabase()
        const refFirebaseUsers = ref(db, 'users')
        const [firebseUsers, setFirebseUsers] = useState()

        function updatingObjectList(list, filterVal){
            return  Object
                    .values(list)
                    .filter(elem => elem.id !== filterVal)
                    .reduce((acc, curr) => {
                        acc[curr.id] = curr
                        return acc
                    }, {})
        }

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

        function removeThisChat(chat){
            const updatedChatsCurrentUser = updatingObjectList(user.chats, chat.id)
            const updatedCurrentUser = {...user, chats: {...updatedChatsCurrentUser}}
            dispatch(addCurrentUserAction(updatedCurrentUser))
            updateCurrentUserInBase(user.id, updatedCurrentUser)
            goToBack()
        }

        function addCurrentChat(chat){
            dispatch(addCurrentChatAction(chat))
        }

        useEffect(()=>{
            return () => {
                updateCurrentUserInBase()
                
            }
        }, [])

        useEffect(() => {
            dispatch(addCurrentChatAction(`default_${user.id}`))
            goToDefaultChat()
        }, [])

        return (
            <Component
                user={user}
                addCurrentChat={addCurrentChat}
                users={firebseUsers}
                removeThisChat={removeThisChat}
                addChat={addChat}
                />)
    }
}
