import { useContext, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { addCurrentUserAction } from "../store/chats";
import { updateUsers } from "../asyncActions/users";
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { FirebaseContext } from "../context";
import moment from "moment";

export const useFirebaseChats = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.chats.users)
    const user = useSelector(state => state.chats.user)
    const [currentChat, setCurrentChat] = useState('chats')
    const { _, firestore } = useContext(FirebaseContext)
    const [chat, loading] = useCollectionData(
        firestore.collection(currentChat)
    )

    function createDefaultChat(sender, message){
        const id = Date.now()
        firestore
        .collection(`default_${sender}`)
        .doc(String(id))
        .set(
            {
                chat_id: `default_chat_${sender}`,
                id: String(id),
                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                text: message,
                user: sender
            }
        )
    }

    function getCurrentChat(chatName){
        setCurrentChat(chatName)
    }

    function updateUserChatList(updatedUsers, updatedUser){
        firestore
        .collection('state')
        .doc('users')
        .set({...updatedUsers})
        dispatch(updateUsers(updatedUsers))
        localStorage.setItem('users', JSON.stringify(updatedUsers))
        if(updatedUser){
            dispatch(addCurrentUserAction(updatedUser))
            localStorage.setItem('user', JSON.stringify(updatedUser))
        }
    }

    function createChat(recipient, sender, message, signature, spaсe){
        const docId = Date.now()
        const updatedAllUsers = {...users}
        const updatedUser = {...sender}
        updatedUser.chats = {...updatedUser.chats, [recipient.id]: users[recipient.id]}
        updatedAllUsers[sender.id] = {...updatedUser}
        updatedAllUsers[recipient.id].chats = 
        {
            ...updatedAllUsers[recipient.id].chats,
            [sender.id]: users[sender.id] 
        }
        updateUserChatList(updatedAllUsers, updatedUser)

        firestore
        .collection(recipient.id + '_' + sender.id)
        .doc(String(docId))
        .set(
            {
                chat_id: recipient.id + '_' + sender.id,
                id: String(docId),
                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                text: message,
                user: sender.id
            }
        )
        firestore
        .collection(sender.id + '_' + recipient.id)
        .doc(String(docId))
        .set(
            {
                chat_id: sender.id + '_' + recipient.id,
                id: String(docId),
                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                text: message,
                user: sender.id
            }
        )
    }

    // function createPublicChat(chatName){
        
    //     firestore
    //     .collection(chatName)
    // }

    function addMessage(recipient, sender, message){
        messanger(recipient, sender, message)
    }

    function messanger(recipient, sender, message){
        const id = Date.now()
       firestore
        .collection(recipient + '_' + sender)
        .doc(String(id))
        .set(
            {
                chat_id: recipient + '_' + sender,
                id: String(id),
                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                text: message,
                user: sender
            }
        )
       firestore
        .collection(sender + '_' + recipient)
        .doc(String(id))
        .set(
            {
                chat_id: sender + '_' + recipient,
                id: String(id),
                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                text: message,
                user: sender
            }
        )
    }

    return[
        chat,
        createDefaultChat,
        getCurrentChat,
        createChat,
        addMessage,
        loading
    ]
}
